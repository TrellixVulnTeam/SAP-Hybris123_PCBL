/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.webhookservices.event.impl;

import de.hybris.platform.tx.AfterSaveEvent;
import de.hybris.platform.webhookservices.event.ItemCreatedEvent;
import de.hybris.platform.webhookservices.event.ItemSavedEvent;
import de.hybris.platform.webhookservices.event.ItemUpdatedEvent;
import de.hybris.platform.webhookservices.event.WebhookEvent;
import de.hybris.platform.webhookservices.event.WebhookEventFactory;

import java.util.Collections;
import java.util.List;

/**
 * Default implementation of {@link WebhookEventFactory} to create list of {@link WebhookEvent}
 */
public class DefaultWebhookEventFactory implements WebhookEventFactory
{
	@Override
	public List<WebhookEvent> create(final AfterSaveEvent event)
	{
		if (event != null)
		{
			switch (event.getType())
			{
				case AfterSaveEvent.UPDATE:
					return convertToUpdatedEvents(event);
				case AfterSaveEvent.CREATE:
					return convertToCreatedEvents(event);
				default:
					return Collections.emptyList();
			}
		}
		return Collections.emptyList();
	}

	private List<WebhookEvent> convertToCreatedEvents(final AfterSaveEvent event)
	{
		return List.of(new ItemCreatedEvent(event), new ItemSavedEvent(event));
	}

	private List<WebhookEvent> convertToUpdatedEvents(final AfterSaveEvent event)
	{
		return List.of(new ItemUpdatedEvent(event), new ItemSavedEvent(event));
	}
}
