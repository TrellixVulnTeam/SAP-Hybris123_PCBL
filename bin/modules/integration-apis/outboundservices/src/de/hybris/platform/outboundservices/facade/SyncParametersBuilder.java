/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundservices.facade;

import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel;
import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;
import de.hybris.platform.outboundservices.enums.OutboundSource;
import de.hybris.platform.outboundservices.event.EventType;

/**
 * A builder for creating {@link SyncParameters} instances.
 */
public class SyncParametersBuilder
{
	private ItemModel item;
	private String ioCode;
	private String destId;
	private OutboundSource source;
	private ConsumedDestinationModel destinationModel;
	private IntegrationObjectModel integrationObjectModel;
	private EventType eventType;
	private String integrationKey;

	SyncParametersBuilder()
	{
		// non-instantiable through constructor, use the factory method in SyncParameters
	}

	public static SyncParametersBuilder from(final SyncParameters params)
	{
		return new SyncParametersBuilder().withItem(params.getItem())
		                                  .withIntegrationObjectCode(params.getIntegrationObjectCode())
		                                  .withDestinationId(params.getDestinationId())
		                                  .withSource(params.getSource())
		                                  .withDestination(params.getDestination())
		                                  .withIntegrationObject(params.getIntegrationObject())
		                                  .withEventType(params.getEventType());
	}

	public SyncParametersBuilder withItem(final ItemModel item)
	{
		this.item = item;
		return this;
	}

	public SyncParametersBuilder withIntegrationObjectCode(final String ioCode)
	{
		this.ioCode = ioCode;
		return this;
	}

	public SyncParametersBuilder withDestinationId(final String destId)
	{
		this.destId = destId;
		return this;
	}

	public SyncParametersBuilder withSource(final OutboundSource src)
	{
		this.source = src;
		return this;
	}

	public SyncParametersBuilder withDestination(final ConsumedDestinationModel destinationModel)
	{
		this.destinationModel = destinationModel;
		return this;
	}

	public SyncParametersBuilder withIntegrationObject(final IntegrationObjectModel integrationObjectModel)
	{
		this.integrationObjectModel = integrationObjectModel;
		return this;
	}

	public SyncParametersBuilder withEventType(final EventType eventType)
	{
		this.eventType = eventType;
		return this;
	}

	public SyncParametersBuilder withIntegrationKey(final String keyValue)
	{
		integrationKey = keyValue;
		return this;
	}

	public SyncParameters build()
	{
		final SyncParameters params = new SyncParameters(item, source, eventType, integrationKey);
		params.integrationObjectCode = ioCode;
		params.integrationObjectModel = integrationObjectModel;
		params.destinationId = destId;
		params.destinationModel = destinationModel;
		return params;
	}
}
