/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.webhookservices.event;

import de.hybris.platform.core.PK;
import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.integrationservices.util.Log;
import de.hybris.platform.integrationservices.util.lifecycle.TenantLifecycle;
import de.hybris.platform.servicelayer.event.EventSender;
import de.hybris.platform.servicelayer.event.events.AbstractEvent;
import de.hybris.platform.servicelayer.model.ModelService;
import de.hybris.platform.tx.AfterSaveEvent;
import de.hybris.platform.tx.AfterSaveListener;
import de.hybris.platform.webhookservices.event.impl.DefaultWebhookEventFactory;
import de.hybris.platform.webhookservices.model.WebhookConfigurationModel;
import de.hybris.platform.webhookservices.service.WebhookConfigurationService;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;

import org.slf4j.Logger;

import com.google.common.base.Preconditions;

/**
 * An AfterSaveEvent listener that converts the {@link AfterSaveEvent} to {@link WebhookEvent}s
 * before sending it to the {@link EventSender}
 */
public class WebhookServicesAfterSaveEventListener implements AfterSaveListener
{
	private static final Logger LOGGER = Log.getLogger(WebhookServicesAfterSaveEventListener.class);
	private final EventSender eventSender;
	private final TenantLifecycle tenantLifecycle;
	private WebhookConfigurationService webhookConfigurationService;
	private ModelService modelService;
	private final WebhookEventFactory webhookEventFactory;

	/**
	 * @param eventSender     An event sender that will send {@link WebhookEvent}
	 * @param tenantLifecycle TenantLifecycle to regulate the operation of this listener
	 * @deprecated Since 2105.0. Use the new constructor instead.
	 * <p>
	 * Instantiates a {@link WebhookServicesAfterSaveEventListener}
	 */
	@Deprecated(since = "2105.0", forRemoval = true)
	public WebhookServicesAfterSaveEventListener(@NotNull final EventSender eventSender,
	                                             @NotNull final TenantLifecycle tenantLifecycle)
	{
		this(eventSender, tenantLifecycle, new DefaultWebhookEventFactory());
	}

	/**
	 * Instantiates a {@link WebhookServicesAfterSaveEventListener}
	 *
	 * @param eventSender         An event sender that will send {@link WebhookEvent}
	 * @param tenantLifecycle     TenantLifecycle to regulate the operation of this listener
	 * @param webhookEventFactory A factory to create {@link WebhookEvent}s
	 */
	public WebhookServicesAfterSaveEventListener(@NotNull final EventSender eventSender,
	                                             @NotNull final TenantLifecycle tenantLifecycle,
	                                             @NotNull final WebhookEventFactory webhookEventFactory)
	{
		Preconditions.checkArgument(eventSender != null, "eventSender cannot be null");
		Preconditions.checkArgument(tenantLifecycle != null, "tenantLifecycle cannot be null");
		Preconditions.checkArgument(webhookEventFactory != null, "webhookEventFactory cannot be null");
		this.eventSender = eventSender;
		this.tenantLifecycle = tenantLifecycle;
		this.webhookEventFactory = webhookEventFactory;
	}

	/**
	 * {@inheritDoc}
	 * Converts each {@link AfterSaveEvent} into {@link WebhookEvent}s
	 *
	 * @param events A collection of {@link AfterSaveEvent}
	 */
	@Override
	public void afterSave(final Collection<AfterSaveEvent> events)
	{
		if (tenantLifecycle.isOperational())
		{
			events.forEach(this::convertAndSendEvent);
		}
	}

	private void convertAndSendEvent(final AfterSaveEvent event)
	{
		LOGGER.trace("Event {}", event);
		final List<AbstractEvent> sendEventList = filterForEventsWithWebhookConfiguration(event);
		sendEventList.forEach(eventSender::sendEvent);
	}

	private boolean isAbstractEvent(@NotNull final WebhookEvent event)
	{
		return event instanceof AbstractEvent;
	}

	private List<AbstractEvent> filterForEventsWithWebhookConfiguration(final AfterSaveEvent afterSaveEvent)
	{
		final List<AbstractEvent> events = webhookEventFactory.create(afterSaveEvent)
		                                                      .stream()
		                                                      .filter(this::isAbstractEvent)
		                                                      .map(AbstractEvent.class::cast)
		                                                      .collect(Collectors.toList());

		if (webhookConfigurationService != null && modelService != null)
		{
			return events.stream().filter(event -> isSendEvent(event, afterSaveEvent)).collect(Collectors.toList());
		}
		return events;
	}

	private boolean isSendEvent(final AbstractEvent event, final AfterSaveEvent saveEvent)
	{
		if (webhookConfigurationService != null && modelService != null)
		{
			final Optional<ItemModel> item = getItem(saveEvent.getPk());
			return item
					.map(model -> isWebhookConfigurationExistForItem(event, model))
					.orElse(false);
		}
		return true;
	}

	private boolean isWebhookConfigurationExistForItem(final AbstractEvent event, final ItemModel model)
	{
		LOGGER.trace("Event {} is for item type {}", event, model.getItemtype());

		final Collection<WebhookConfigurationModel> configs =
				webhookConfigurationService.getWebhookConfigurationsByEventAndItemModel(event, model);

		return !configs.isEmpty();
	}

	private Optional<ItemModel> getItem(final PK pk)
	{
		try
		{
			final Object object = modelService.get(pk);
			if (object instanceof ItemModel)
			{
				return Optional.of(object).map(ItemModel.class::cast);
			}
			else
			{
				LOGGER.trace("Saved object for event {} is not of ItemModel type", pk);
			}
		}
		catch (final RuntimeException e)
		{
			logException(pk, e);
		}
		return Optional.empty();
	}

	private void logException(final PK pk, final RuntimeException e)
	{
		LOGGER.trace("Cannot retrieve the item for event {}", pk, e);
	}

	/**
	 * Sets the WebhookConfigurationService
	 *
	 * @param webhookConfigurationService WebhookConfigurationService to search for WebhookConfigurations
	 */
	public void setWebhookConfigurationService(final WebhookConfigurationService webhookConfigurationService)
	{
		this.webhookConfigurationService = webhookConfigurationService;
	}

	/**
	 * Sets the ModelService
	 *
	 * @param modelService ModelService to search for items
	 */
	public void setModelService(final ModelService modelService)
	{
		this.modelService = modelService;
	}
}
