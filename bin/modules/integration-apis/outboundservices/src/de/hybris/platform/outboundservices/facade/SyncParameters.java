/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundservices.facade;

import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel;
import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;
import de.hybris.platform.outboundservices.enums.OutboundSource;
import de.hybris.platform.outboundservices.event.EventType;
import de.hybris.platform.outboundservices.event.impl.DefaultEventType;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import com.google.common.base.Preconditions;

/**
 * Item synchronization parameters.
 */
public class SyncParameters
{
	private static final OutboundSource DEFAULT_SOURCE = OutboundSource.UNKNOWN;
	private static final EventType DEFAULT_EVENT_TYPE = DefaultEventType.UNKNOWN;

	private final ItemModel item;
	private final OutboundSource source;
	private final EventType eventType;
	private final String integrationKey;
	String integrationObjectCode;
	String destinationId;
	ConsumedDestinationModel destinationModel;
	IntegrationObjectModel integrationObjectModel;

	protected SyncParameters(final ItemModel item,
	                         final String ioCode,
	                         final IntegrationObjectModel ioModel,
	                         final String destId,
	                         final ConsumedDestinationModel destModel,
	                         final OutboundSource source)
	{
		this(item,source, DEFAULT_EVENT_TYPE, null);
		integrationObjectCode = ioCode;
		integrationObjectModel = ioModel;
		destinationId = destId;
		destinationModel = destModel;
	}

	SyncParameters(final ItemModel item,
	               final OutboundSource source,
	               final EventType eventType,
	               final String integrationKey)
	{
		Preconditions.checkArgument(item != null || integrationKey != null,
				"At least one of item or integrationKey must be provided");
		this.item = item;
		this.source = source == null ? DEFAULT_SOURCE : source;
		this.eventType = eventType == null ? DEFAULT_EVENT_TYPE : eventType;
		this.integrationKey = integrationKey;
	}

	public ItemModel getItem()
	{
		return item;
	}

	/**
	 * Retrieves information about the integration object used for outbound communication.
	 *
	 * @return code of the integration object to be used.
	 */
	public String getIntegrationObjectCode()
	{
		return getIntegrationObject() != null ? getIntegrationObject().getCode() : integrationObjectCode;
	}

	/**
	 * Retrieves information about the destination, to which data should be sent.
	 *
	 * @return ID of the {@link ConsumedDestinationModel} to send data to.
	 */
	public String getDestinationId()
	{
		return getDestination() != null ? getDestination().getId() : destinationId;
	}

	/**
	 * Retrieves information about the module that initiated the data exchange with the destination.
	 *
	 * @return module that sends data to the remote system.
	 * @see #getDestination()
	 */
	public OutboundSource getSource()
	{
		return source;
	}

	/**
	 * Retrieves destination to which data should be sent.
	 *
	 * @return a destination representing a remote system receiving data.
	 */
	public ConsumedDestinationModel getDestination()
	{
		return destinationModel;
	}

	/**
	 * Retrieves integration object used for outbound communication.
	 *
	 * @return integration object to be used.
	 */
	public IntegrationObjectModel getIntegrationObject()
	{
		return integrationObjectModel;
	}

	/**
	 * Retrieves type of the event that triggered outbound synchronization.
	 *
	 * @return type of the event or {@link DefaultEventType#UNKNOWN}, if the synchronization is not triggered by event but is a
	 * scheduled batch synchronization.
	 */
	public EventType getEventType()
	{
		return eventType;
	}

	/**
	 * Retrieves integration key value.
	 *
	 * @return integration key of the item being synchronized.
	 */
	public String getIntegrationKey()
	{
		return integrationKey;
	}

	/**
	 * Returns a builder for creation of {@code SyncParameters}.
	 *
	 * @return a builder to use for {@code SyncParameters} creation. Returned builder has empty state, that is no
	 * {@code SyncParameters} property is specified for it.
	 */
	public static SyncParametersBuilder syncParametersBuilder()
	{
		return new SyncParametersBuilder();
	}

	@Override
	public boolean equals(final Object o)
	{
		if (this == o)
		{
			return true;
		}
		if (o == null || getClass() != o.getClass())
		{
			return false;
		}

		final SyncParameters that = (SyncParameters) o;

		return new EqualsBuilder()
				.append(getItem(), that.getItem())
				.append(getIntegrationObjectCode(), that.getIntegrationObjectCode())
				.append(getDestinationId(), that.getDestinationId())
				.append(getSource(), that.getSource())
				.append(getEventType(), that.getEventType())
				.append(getIntegrationKey(), that.getIntegrationKey())
				.isEquals();
	}

	@Override
	public int hashCode()
	{
		return new HashCodeBuilder(17, 37)
				.append(getItem())
				.append(getIntegrationObjectCode())
				.append(getDestinationId())
				.append(getSource())
				.append(getEventType())
				.append(getIntegrationKey())
				.toHashCode();
	}

	@Override
	public String toString()
	{
		return "SyncParameters{" +
				"item='" + getItem() +
				"', integrationKey='" + getIntegrationKey() +
				"', integrationObject='" + getIntegrationObjectCode() +
				"', destination='" + getDestinationId() +
				"', source='" + getSource().getCode() +
				"', eventType='" + getEventType().getType() +
				"'}";
	}

	/**
	 * @deprecated Use {@link de.hybris.platform.outboundservices.facade.SyncParametersBuilder} instead.
	 */
	@Deprecated(since = "2105", forRemoval = true)
	public static final class SyncParametersBuilder extends de.hybris.platform.outboundservices.facade.SyncParametersBuilder
	{
	}
}
