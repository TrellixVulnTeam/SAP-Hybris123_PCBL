/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.webhookservices.event;

import de.hybris.platform.core.PK;
import de.hybris.platform.outboundservices.event.EventType;
import de.hybris.platform.outboundservices.event.impl.DefaultEventType;
import de.hybris.platform.servicelayer.event.events.AbstractEvent;
import de.hybris.platform.tx.AfterSaveEvent;

import java.util.Objects;

/**
 * A saved event implementation of {@link WebhookEvent} and wraps the {@link AfterSaveEvent}
 */
public class ItemSavedEvent extends AbstractEvent implements WebhookEvent
{
	private static final long serialVersionUID = -5622198499441971419L;

	private final WebhookEvent event;

	/**
	 * Instantiates an ItemSavedEvent
	 *
	 * @param event The {@link AfterSaveEvent} that is wrapped.
	 */
	public ItemSavedEvent(final AfterSaveEvent event)
	{
		this.event = convertAfterSaveEvent(event) ;
	}

	@Override
	public PK getPk()
	{
		return event.getPk();
	}

	@Override
	public EventType getEventType()
	{
		return event.getEventType();
	}

	/**
	 * @deprecated Since 2105.0  Use getPk() instead
	 */
	@Deprecated(since = "2105.0", forRemoval = true)
	public PK getSavedItemPk()
	{
		return getPk();
	}

	/**
	 * @return {@link ItemSavedEventType}
	 * @deprecated Since 2105.0.  Use getOperation() instead
	 * <p>
	 * Retrieves the type of the event.
	 */
	@Deprecated(since = "2105.0", forRemoval = true)
	public ItemSavedEventType getType()
	{
		if(event instanceof ItemCreatedEvent)
		{
			return ItemSavedEventType.CREATE;
		}
		else if(event instanceof ItemUpdatedEvent)
		{
			return ItemSavedEventType.UPDATE;
		}

		throw new InvalidEventTypeException(-1);
	}

	private WebhookEvent convertAfterSaveEvent(final AfterSaveEvent type)
	{
		final WebhookEvent unKnownEvent = new UnknownWebhookEvent(type);

		if (type != null)
		{
			switch (type.getType())
			{
				case AfterSaveEvent.UPDATE:
					return new ItemUpdatedEvent(type);
				case AfterSaveEvent.CREATE:
					return new ItemCreatedEvent(type);
				default:
					return unKnownEvent;
			}
		}
		return unKnownEvent;
	}

	@Override
	public String toString()
	{
		return "ItemSavedEvent{pk='" + this.getPk() + "', type='" + this.event.getEventType()+ "'}";
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

		final ItemSavedEvent that = (ItemSavedEvent) o;
		return this.event.getEventType().equals(that.event.getEventType()) && this.getPk().equals(that.getPk());
	}

	@Override
	public int hashCode()
	{
		return Objects.hash(event, getPk());
	}

	private static class UnknownWebhookEvent extends BaseWebhookEvent
	{
		UnknownWebhookEvent(final AfterSaveEvent event)
		{
			super(event.getPk(), DefaultEventType.UNKNOWN);
		}
	}
}
