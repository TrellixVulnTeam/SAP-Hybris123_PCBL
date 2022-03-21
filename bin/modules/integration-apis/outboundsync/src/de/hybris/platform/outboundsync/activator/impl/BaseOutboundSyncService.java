/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundsync.activator.impl;

import com.google.common.base.Preconditions;

import de.hybris.platform.core.PK;
import de.hybris.platform.core.Registry;
import de.hybris.platform.cronjob.enums.CronJobResult;
import de.hybris.platform.cronjob.enums.CronJobStatus;
import de.hybris.platform.cronjob.model.CronJobModel;
import de.hybris.platform.integrationservices.service.ItemModelSearchService;
import de.hybris.platform.integrationservices.util.Log;
import de.hybris.platform.outboundsync.activator.OutboundItemConsumer;
import de.hybris.platform.outboundsync.dto.OutboundItemDTO;
import de.hybris.platform.outboundsync.dto.OutboundItemDTOGroup;
import de.hybris.platform.outboundsync.events.AbortedOutboundSyncEvent;
import de.hybris.platform.outboundsync.events.CompletedOutboundSyncEvent;
import de.hybris.platform.outboundsync.events.OutboundSyncEvent;
import de.hybris.platform.outboundsync.events.SystemErrorOutboundSyncEvent;
import de.hybris.platform.outboundsync.job.OutboundItemFactory;
import de.hybris.platform.servicelayer.event.EventService;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Required;

import javax.validation.constraints.NotNull;

import java.util.Collections;
import java.util.Optional;

/**
 * This base service provides common functionality across outbound sync services
 */
class BaseOutboundSyncService
{
	private static final Logger LOG = Log.getLogger(BaseOutboundSyncService.class);

	private ItemModelSearchService itemModelSearchService;
	private EventService eventService;
	private OutboundItemConsumer outboundItemConsumer;
	private OutboundItemFactory outboundItemFactory;

	/**
	 * Instantiates this service. No required dependencies will be injected after this service is instantiated. They
	 * need to be injected separately by calling the corresponding set methods.
	 *
	 * @see #setOutboundItemFactory(OutboundItemFactory)
	 * @see #setItemModelSearchService(ItemModelSearchService)
	 * @see #setEventService(EventService)
	 * @see #setOutboundItemConsumer(OutboundItemConsumer)
	 */
	protected BaseOutboundSyncService()
	{
		// Using setters to set the fields
	}

	/**
	 * Instantiates this base class.
	 *
	 * @param itemModelSearchService Service to search for item models
	 * @param eventService           Service to send events to update cronjob status
	 * @param outboundItemConsumer   Consumer to consume delta detect changes
	 */
	protected BaseOutboundSyncService(@NotNull final ItemModelSearchService itemModelSearchService,
	                                  @NotNull final EventService eventService,
	                                  @NotNull final OutboundItemConsumer outboundItemConsumer)
	{
		Preconditions.checkArgument(itemModelSearchService != null, "ItemModelSearchService cannot be null");
		Preconditions.checkArgument(eventService != null, "EventService cannot be null");
		Preconditions.checkArgument(outboundItemConsumer != null, "OutboundItemConsumer cannot be null");

		this.itemModelSearchService = itemModelSearchService;
		this.eventService = eventService;
		this.outboundItemConsumer = outboundItemConsumer;
	}

	/**
	 * This method checks the cronjob is in the appropriate state before calling the {@link Synchronizer}.
	 * <p>
	 * Here are the rules:
	 * <ul>
	 *     <li>If the job is aborting, an abort event is published. No synchronization will occur.
	 *     <li>If the job is in system error state, an system error event is published. No synchronization will occur.
	 *     <li>If the job is not aborted and not in system error state, synchronization will occur.
	 * </ul>
	 *
	 * @param cronJobPk    PK of the cronjob being executed
	 * @param items        a group of items being synchronized
	 * @param synchronizer Synchronizer to execute when the cronjob is in the appropriate state
	 */
	protected void syncInternal(final PK cronJobPk, final OutboundItemDTOGroup items, final Synchronizer synchronizer)
	{
		final var cronJobResult = getCronJob(cronJobPk);
		cronJobResult.ifPresent(cronJob -> {
			if (isCronJobAborting(cronJob))
			{
				publishAbortEvent(cronJob.getPk(), items);
			}
			else if (isSystemError(cronJob))
			{
				publishSystemErrorEvent(cronJob.getPk(), items);
			}
			else if (!isCronJobAborted(cronJob) && !isSystemError(cronJob))
			{
				synchronizer.sync();
			}
		});
	}

	private boolean isCronJobAborting(final CronJobModel cronJob)
	{
		return cronJob != null && Boolean.TRUE.equals(cronJob.getRequestAbort());
	}

	private boolean isCronJobAborted(final CronJobModel cronJob)
	{
		return cronJob != null && cronJob.getStatus() == CronJobStatus.ABORTED;
	}

	private boolean isSystemError(final CronJobModel cronJob)
	{
		return cronJob != null && cronJob.getResult() == CronJobResult.FAILURE;
	}

	private void publishAbortEvent(final PK cronJobPk, final OutboundItemDTOGroup group)
	{
		publish(new AbortedOutboundSyncEvent(cronJobPk, group));
	}

	/**
	 * Publish then {@link SystemErrorOutboundSyncEvent} if a system error occurs
	 *
	 * @param cronJobPk PK of the cronjob being executed
	 * @param group     group of the items, for which were not processed because of a systemic problem with the outbound sync.
	 */
	protected void publishSystemErrorEvent(final PK cronJobPk, final OutboundItemDTOGroup group)
	{
		publish(new SystemErrorOutboundSyncEvent(cronJobPk, group));
	}

	/**
	 * Publish the {@link CompletedOutboundSyncEvent} with success set to true when the synchronization is done
	 *
	 * @param group a group of items successfully synchronized
	 */
	protected void publishSuccessfulCompletedEvent(final OutboundItemDTOGroup group)
	{
		publish(new CompletedOutboundSyncEvent(group, true));
	}

	/**
	 * Publish the {@link CompletedOutboundSyncEvent} with success set to false when the synchronization is done
	 *
	 * @param group a group of items that failed to be synchronized
	 */
	protected void publishUnSuccessfulCompletedEvent(final OutboundItemDTOGroup group)
	{
		publish(new CompletedOutboundSyncEvent(group, false));
	}

	private void publish(final OutboundSyncEvent event)
	{
		LOG.debug("Publishing {}", event);
		eventService.publishEvent(event);
	}

	/**
	 * Gets the {@link CronJobModel} from the database
	 *
	 * @param cronJobPk PK of the cronjob being executed
	 * @return The cronjob wrapped in an {@link Optional} if found, otherwise an {@link Optional#empty()}
	 */
	protected Optional<CronJobModel> getCronJob(final PK cronJobPk)
	{
		return itemModelSearchService.nonCachingFindByPk(cronJobPk);
	}

	protected OutboundItemDTOGroup asItemGroup(final OutboundItemDTO item)
	{
		final var items = Collections.singleton(item);
		return OutboundItemDTOGroup.from(items, getOutboundItemFactory());
	}

	protected OutboundItemFactory getOutboundItemFactory()
	{
		if (outboundItemFactory == null)
		{
			outboundItemFactory = Registry.getApplicationContext()
			                              .getBean("outboundItemFactory", OutboundItemFactory.class);
		}
		return outboundItemFactory;
	}

	/**
	 * Injects implementation of the {@link OutboundItemFactory} to be passed into the {@link OutboundItemDTOGroup} created
	 * by this service. If this method is not called then, {@code OutboundItemFactory} configured in {@code "outboundItemFactory"}
	 * Spring bean will be used by default.
	 *
	 * @param factory an implementation of the outbound item factory to be used in this service
	 */
	public void setOutboundItemFactory(final OutboundItemFactory factory)
	{
		outboundItemFactory = factory;
	}

	/**
	 * Retrieves the change consumer used to clear changes in the delta detect module when the change is successfully synchronized
	 * or should be ignored.
	 *
	 * @return changes consumer user by this service
	 */
	public OutboundItemConsumer getOutboundItemConsumer()
	{
		return outboundItemConsumer;
	}

	/**
	 * Injects a change consumer, which clears changes in the delta detect module when the change is successfully synchronized or
	 * should be ignored.
	 *
	 * @param consumer an implementation of the change consumer to use.
	 */
	@Required
	public void setOutboundItemConsumer(final OutboundItemConsumer consumer)
	{
		outboundItemConsumer = consumer;
	}

	/**
	 * Injects implementation of the {@link EventService} to use for publishing outbound sync job events.
	 *
	 * @param service a service to use for publishing events
	 */
	@Required
	public void setEventService(final EventService service)
	{
		eventService = service;
	}

	protected ItemModelSearchService getItemModelSearchService()
	{
		if (itemModelSearchService == null)
		{
			itemModelSearchService = Registry.getApplicationContext()
			                                 .getBean("itemModelSearchService", ItemModelSearchService.class);
		}
		return itemModelSearchService;
	}

	/**
	 * Injects implementation of the {@link ItemModelSearchService} to be used for searching model instances by PK. If this method
	 * is not called then, {@code ItemModelSearchService} configured in {@code "itemModelSearchService"} Spring bean will be used
	 * by default.
	 *
	 * @param service an implementation to use.
	 */
	public void setItemModelSearchService(final ItemModelSearchService service)
	{
		itemModelSearchService = service;
	}

	/**
	 * The Synchronizer interface is defined to be used with the {@link #syncInternal(PK, OutboundItemDTOGroup, Synchronizer)} method.
	 * Because subclasses may have different synchronize method that takes different input parameters, this
	 * interface provides a common method to call when synchronizing.
	 */
	protected interface Synchronizer
	{
		/**
		 * Synchronizes the change.
		 * The user can supply an implementation by using lambda expression {@code () -> synchronizeAnItem(args1,...,argsN)},
		 * where {@code synchronizeAnItem(...)} is a method in the subclass of this base class.
		 */
		void sync();
	}
}
