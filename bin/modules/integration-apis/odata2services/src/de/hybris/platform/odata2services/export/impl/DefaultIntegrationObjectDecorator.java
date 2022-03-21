/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.odata2services.export.impl;

import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.integrationservices.model.DescriptorFactory;
import de.hybris.platform.integrationservices.model.IntegrationObjectDescriptor;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;
import de.hybris.platform.integrationservices.populator.ItemToMapConversionContext;
import de.hybris.platform.integrationservices.service.IntegrationObjectAndItemMismatchException;
import de.hybris.platform.integrationservices.service.IntegrationObjectConversionService;
import de.hybris.platform.integrationservices.service.IntegrationObjectService;
import de.hybris.platform.integrationservices.util.JsonObject;
import de.hybris.platform.integrationservices.util.Log;
import de.hybris.platform.odata2services.dto.ExportEntity;
import de.hybris.platform.odata2services.export.ExportConfigurationDecorator;
import de.hybris.platform.odata2services.odata.schema.entity.EntitySetNameGenerator;

import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;

import org.slf4j.Logger;

import com.google.common.base.Preconditions;

import groovy.json.JsonBuilder;

/**
 * The integration object decorator to augment export configuration with referenced integration objects.
 */
public class DefaultIntegrationObjectDecorator implements ExportConfigurationDecorator
{
	private static final Logger LOG = Log.getLogger(DefaultIntegrationObjectDecorator.class);

	private static final String OCC_IO = "OutboundChannelConfig";
	private static final String WEBHOOK_IO = "WebhookService";
	private static final String INTEGRATION_SERVICE_IO = "IntegrationService";
	private static final String ENTITY_SET = "IntegrationObject";
	private static final String JSON_PATH = "integrationObject.code";
	private static final String BASE_URL = "{{hostUrl}}/odata2webservices/";

	private final DescriptorFactory descriptorFactory;
	private final IntegrationObjectConversionService conversionService;
	private final IntegrationObjectService integrationObjectService;
	private final EntitySetNameGenerator nameGenerator;

	/**
	 * Instantiate a new instance of the integration object decorator.
	 *
	 * @param descriptorFactory        to create the integration object descriptor
	 * @param conversionService        to convert the integration object
	 * @param integrationObjectService to find the integration object
	 * @param nameGenerator            to generate the entity set name
	 */
	public DefaultIntegrationObjectDecorator(
			@NotNull final DescriptorFactory descriptorFactory,
			@NotNull final IntegrationObjectConversionService conversionService,
			@NotNull final IntegrationObjectService integrationObjectService,
			@NotNull final EntitySetNameGenerator nameGenerator)
	{
		Preconditions.checkArgument(descriptorFactory != null, "descriptorFactory must not be null.");
		Preconditions.checkArgument(conversionService != null, "conversionService must not be null.");
		Preconditions.checkArgument(integrationObjectService != null, "integrationObjectService must not be null.");
		Preconditions.checkArgument(nameGenerator != null, "nameGenerator must not be null.");

		this.descriptorFactory = descriptorFactory;
		this.conversionService = conversionService;
		this.integrationObjectService = integrationObjectService;
		this.nameGenerator = nameGenerator;
	}

	@Override
	public Set<ExportEntity> decorate(final Set<ExportEntity> exportEntities)
	{
		final Set<String> decoratedBodies = exportEntities.stream()
		                                                  .filter(this::canBeDecorated)
		                                                  .flatMap(exportEntity -> exportEntity.getRequestBodies().stream())
		                                                  .map(this::extractIntegrationObjectCode)
		                                                  .map(this::constructRequestBody)
		                                                  .collect(Collectors.toSet());

		return decoratedBodies.isEmpty() ? exportEntities : decorateEntities(exportEntities, decoratedBodies);
	}

	private boolean canBeDecorated(final ExportEntity exportEntity)
	{
		return exportEntity.getRequestUrl().contains(OCC_IO) || exportEntity.getRequestUrl().contains(WEBHOOK_IO);
	}

	private String extractIntegrationObjectCode(final String requestBodyJson)
	{
		return JsonObject.createFrom(requestBodyJson).getString(JSON_PATH);
	}

	private String constructRequestBody(final String ioCode)
	{
		final IntegrationObjectModel integrationService = integrationObjectService.findIntegrationObject(INTEGRATION_SERVICE_IO);
		final IntegrationObjectDescriptor descriptor = descriptorFactory.createIntegrationObjectDescriptor(integrationService);
		final IntegrationObjectModel integrationObject = integrationObjectService.findIntegrationObject(ioCode);
		final Map<String, Object> requestBody = conversionService.convert(getConversionContext(integrationObject, descriptor));
		final String requestBodyJson = new JsonBuilder(requestBody).toPrettyString();

		LOG.debug("The augmented request body for the integration object [{}]: {}", ioCode, requestBodyJson);
		return requestBodyJson;
	}

	private ItemToMapConversionContext getConversionContext(final ItemModel item, final IntegrationObjectDescriptor descriptor)
	{
		return descriptor.getItemTypeDescriptor(item)
		                 .map(type -> new ItemToMapConversionContext(item, type))
		                 .orElseThrow(() -> new IntegrationObjectAndItemMismatchException(item, descriptor));
	}

	private Set<ExportEntity> decorateEntities(final Set<ExportEntity> exportEntities, final Set<String> insertBodies)
	{
		final ExportEntity integrationObjectEntity = new ExportEntity();
		integrationObjectEntity.setRequestUrl(constructRequestUrl());
		integrationObjectEntity.setRequestBodies(insertBodies);

		final Set<ExportEntity> decoratedEntities = new LinkedHashSet<>();
		decoratedEntities.add(integrationObjectEntity);
		decoratedEntities.addAll(exportEntities);
		return decoratedEntities;
	}

	private String constructRequestUrl()
	{
		return BASE_URL + INTEGRATION_SERVICE_IO + "/" + nameGenerator.generate(ENTITY_SET);
	}

}
