/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundservices.facade.impl;

import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel;
import de.hybris.platform.integrationservices.util.Log;
import de.hybris.platform.outboundservices.client.IntegrationRestTemplateFactory;

import java.util.Map;

import javax.validation.constraints.NotNull;

import org.slf4j.Logger;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestOperations;

import com.google.common.base.Preconditions;

/**
 * Default implementation of the {@code RemoteSystemClient} that uses {@link org.springframework.web.client.RestOperations} for
 * communication with the remote system.
 */
public class DefaultRemoteSystemClient implements RemoteSystemClient
{
	private static final Logger LOG = Log.getLogger(DefaultRemoteSystemClient.class);

	private final IntegrationRestTemplateFactory restTemplateFactory;

	/**
	 * Instantiates this client with required dependencies.
	 *
	 * @param factory implementation of the {@code IntegrationRestTemplateFactory} to use in this client for
	 *                creating the {@link RestOperations}.
	 */
	public DefaultRemoteSystemClient(@NotNull final IntegrationRestTemplateFactory factory)
	{
		Preconditions.checkArgument(factory != null, "IntegrationRestTemplateFactory cannot be null");
		restTemplateFactory = factory;
	}

	@Override
	public ResponseEntity<Map> post(final @NotNull ConsumedDestinationModel destination,
	                                final HttpEntity<Map<String, Object>> entity)
	{
		final RestOperations rest = restTemplateFactory.create(destination);
		final String url = destination.getUrl();
		LOG.debug("POSTing to {}", url);
		return rest.postForEntity(url, entity, Map.class);
	}
}
