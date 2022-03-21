/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.webhookservices.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Preconditions;

import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;
import de.hybris.platform.integrationservices.util.Log;
import de.hybris.platform.outboundservices.client.IntegrationRestTemplateFactory;
import de.hybris.platform.webhookservices.event.ItemUpdatedEvent;
import de.hybris.platform.webhookservices.exceptions.WebhookConfigurationValidationException;
import de.hybris.platform.outboundservices.enums.OutboundSource;
import de.hybris.platform.outboundservices.event.impl.DefaultEventType;
import de.hybris.platform.outboundservices.event.EventType;
import de.hybris.platform.outboundservices.facade.OutboundServiceFacade;
import de.hybris.platform.outboundservices.facade.SyncParameters;
import de.hybris.platform.webhookservices.model.WebhookConfigurationModel;
import de.hybris.platform.webhookservices.service.CloudEventHeadersService;
import de.hybris.platform.webhookservices.service.WebhookValidationService;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.http.*;
import org.springframework.web.client.*;

import javax.validation.constraints.NotNull;

import java.net.SocketTimeoutException;
import java.util.List;
import java.util.Map;

import rx.Observable;

import static de.hybris.platform.integrationservices.constants.IntegrationservicesConstants.INTEGRATION_KEY_PROPERTY_NAME;

/**
 * Default implementation of WebhookValidationService
 */
public class DefaultWebhookValidationService implements WebhookValidationService
{
	private static final String UPDATED_EVENT_TYPE = "Updated";
	private static final String CREATED_EVENT_TYPE = "Created";
	private static final Logger LOG = Log.getLogger(DefaultWebhookValidationService.class);
	private static final CloudEventHeadersService DEFAULT_EVENT_HEADER_SERVICE = new DefaultCloudEventHeadersService(
			new DefaultCloudEventConfigurationService());
	private final IntegrationRestTemplateFactory integrationRestTemplateFactory;
	private final OutboundServiceFacade outboundServiceFacade;
	private final CloudEventHeadersService cloudEventHeadersService;
	private static final List<Integer> HTTP_STATUS_ERROR_CODES_LIST = List.of(
			HttpStatus.BAD_REQUEST.value(),
			HttpStatus.UNAUTHORIZED.value(),
			HttpStatus.FORBIDDEN.value(),
			HttpStatus.NOT_FOUND.value(),
			HttpStatus.METHOD_NOT_ALLOWED.value(),
			HttpStatus.INTERNAL_SERVER_ERROR.value(),
			HttpStatus.SERVICE_UNAVAILABLE.value());

	/**
	 * Instantiates the {@link DefaultWebhookValidationService}
	 *
	 * @param integrationRestTemplateFactory Factory class to create REST clients for webhook integrations.
	 * @param outboundServiceFacade          OutboundServiceFacade builds the payload and to integrate with restful endpoint
	 *
	 * @deprecated Since 2111. Use the new constructor instead.
	 */
	@Deprecated(since = "2111", forRemoval = true)
	public DefaultWebhookValidationService(@NotNull final IntegrationRestTemplateFactory integrationRestTemplateFactory,
	                                       @NotNull final OutboundServiceFacade outboundServiceFacade)
	{
		this(integrationRestTemplateFactory,outboundServiceFacade, DEFAULT_EVENT_HEADER_SERVICE);
	}

	/**
	 * Instantiates the {@link DefaultWebhookValidationService}
	 *
	 * @param integrationRestTemplateFactory Factory class to create REST clients for webhook integrations.
	 * @param outboundServiceFacade          OutboundServiceFacade builds the payload and to integrate with restful endpoint
	 * @param cloudEventHeadersService       to generate CloudEvent headers
	 */
	public DefaultWebhookValidationService(@NotNull final IntegrationRestTemplateFactory integrationRestTemplateFactory,
	                                       @NotNull final OutboundServiceFacade outboundServiceFacade,
	                                       @NotNull final CloudEventHeadersService cloudEventHeadersService)
	{
		Preconditions.checkArgument(integrationRestTemplateFactory != null, "IntegrationRestTemplateFactory cannot be null");
		Preconditions.checkArgument(outboundServiceFacade != null, "OutboundServiceFacade cannot be null");
		Preconditions.checkArgument(cloudEventHeadersService != null, "CloudEventHeadersService cannot be null");

		this.integrationRestTemplateFactory = integrationRestTemplateFactory;
		this.outboundServiceFacade = outboundServiceFacade;
		this.cloudEventHeadersService = cloudEventHeadersService;
	}

	@Override
	public void pingWebhookDestination(@NotNull final WebhookConfigurationModel webhookConfiguration,
	                                   @NotNull final String webhookPayload) throws WebhookConfigurationValidationException
	{
		final Map<String, Object> jsonPayload = parsePayload(webhookPayload);

		sendMockedPayload(webhookConfiguration, jsonPayload);
	}

	@Override
	public Observable<ResponseEntity<Map>> pingWebhookDestination(@NotNull final WebhookConfigurationModel webhookConfig,
	                                                              @NotNull final ItemModel item)
	{
		return sendItemToWebhook(webhookConfig, item);
	}

	private Map<String, Object> parsePayload(final String payload)
	{
		Preconditions.checkArgument(StringUtils.isNotBlank(payload), "webhookPayload cannot be blank");

		final ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> jsonPayload = null;
		try
		{
			jsonPayload = objectMapper.readValue(payload, new TypeReference<>()
			{
			});
		}
		catch (final JsonProcessingException e)
		{
			LOG.warn("Error while parsing payload {}.", payload, e);
		}
		return jsonPayload;
	}

	private void sendMockedPayload(final WebhookConfigurationModel webhookConfig, final Map<String, Object> jsonPayload)
			throws WebhookConfigurationValidationException
	{
		Preconditions.checkArgument(webhookConfig != null, "webhookConfiguration cannot be null");
		Preconditions.checkArgument(webhookConfig.getDestination() != null, "consumedDestination cannot be null" );

		final HttpEntity<Map<String, Object>> request = generateHttpEntityWithHeaders(webhookConfig, jsonPayload);

		final String url = webhookConfig.getDestination().getUrl();
		final String destinationId = webhookConfig.getDestination().getId();

		try
		{
			final RestOperations rest = integrationRestTemplateFactory.create(webhookConfig.getDestination());
			rest.postForEntity(url, request, Object.class);
		}
		catch (final HttpClientErrorException | HttpServerErrorException e)
		{
			if (HTTP_STATUS_ERROR_CODES_LIST.contains(e.getRawStatusCode()))
			{
				throw new WebhookConfigurationValidationException(e.getMessage(), e);
			}
		}
		catch (final ResourceAccessException e)
		{
			if (e.getCause() instanceof SocketTimeoutException)
			{
				throw new WebhookConfigurationValidationException(e.getMessage(), e.getCause());
			}
			else
			{
				throw new WebhookConfigurationValidationException(e.getMessage(), e);
			}
		}
		catch (final Exception e)
		{
			final String errorMessage = String.format("Request failed to destination [{%s}] with error [{%s}]", destinationId, e.getMessage());
			LOG.error(errorMessage);
			throw new WebhookConfigurationValidationException(e.getMessage(), e);
		}
	}

	private Observable<ResponseEntity<Map>> sendItemToWebhook(final WebhookConfigurationModel webhookConfig, final ItemModel item)
	{
		final SyncParameters params = SyncParameters.syncParametersBuilder()
		                                            .withItem(item)
		                                            .withSource(OutboundSource.WEBHOOKSERVICES)
		                                            .withIntegrationObject(webhookConfig.getIntegrationObject())
		                                            .withDestination(webhookConfig.getDestination())
		                                            .withEventType(new DefaultEventType(webhookConfig.getEventType()))
		                                            .build();

		return outboundServiceFacade.send(params);
	}

	private HttpEntity<Map<String, Object>> generateHttpEntityWithHeaders(final WebhookConfigurationModel webhookConfig,
	                                                                      final Map<String, Object> jsonPayload)
	{
		final HttpHeaders headers = generateHttpHeaders(webhookConfig.getIntegrationObject(), getIntegrationKey(jsonPayload),
				new DefaultEventType(getWebhookConfigEventType(webhookConfig)));
		return new HttpEntity<>(jsonPayload, headers);
	}

	private HttpHeaders generateHttpHeaders(final IntegrationObjectModel integrationObject,
	                                        final String integrationKeyValue,
	                                        final EventType eventType)
	{
		Preconditions.checkArgument(integrationObject != null, "integrationObject cannot be null");

		final HttpHeaders headers = cloudEventHeadersService
				.generateCloudEventHeaders(integrationObject.getCode(), integrationKeyValue, eventType, null);

		headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
		headers.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
		return headers;
	}

	private String getIntegrationKey(final Map<String, Object> payload)
	{
		final Object integrationKey = payload.get(INTEGRATION_KEY_PROPERTY_NAME);
		return integrationKey != null ? integrationKey.toString() : "";
	}

	private String getWebhookConfigEventType(final WebhookConfigurationModel webhookConfig)
	{
		final String eventType = webhookConfig.getEventType();
		if (StringUtils.isBlank(eventType))
		{
			return "";
		}

		return eventType.contains(ItemUpdatedEvent.class.getName()) ? UPDATED_EVENT_TYPE : CREATED_EVENT_TYPE;
	}
}
