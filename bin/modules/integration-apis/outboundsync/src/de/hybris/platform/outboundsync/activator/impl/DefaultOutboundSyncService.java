/*
 *  Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.outboundsync.activator.impl;

import de.hybris.platform.core.PK;
import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.cronjob.model.CronJobModel;
import de.hybris.platform.integrationservices.exception.IntegrationAttributeException;
import de.hybris.platform.integrationservices.exception.IntegrationAttributeProcessingException;
import de.hybris.platform.integrationservices.service.ItemModelSearchService;
import de.hybris.platform.integrationservices.util.Log;
import de.hybris.platform.outboundservices.enums.OutboundSource;
import de.hybris.platform.outboundservices.facade.OutboundServiceFacade;
import de.hybris.platform.outboundservices.facade.SyncParameters;
import de.hybris.platform.outboundsync.activator.OutboundSyncService;
import de.hybris.platform.outboundsync.dto.OutboundItemDTO;
import de.hybris.platform.outboundsync.dto.OutboundItemDTOGroup;
import de.hybris.platform.outboundsync.retry.RetryUpdateException;
import de.hybris.platform.outboundsync.retry.SyncRetryService;
import de.hybris.platform.servicelayer.model.ModelService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import rx.Observable;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;

/**
 * Default implementation of {@link OutboundSyncService} that uses {@link OutboundServiceFacade} for sending changes to the
 * destinations.
 */
public class DefaultOutboundSyncService extends BaseOutboundSyncService implements OutboundSyncService
{
	private static final Logger LOG = Log.getLogger(DefaultOutboundSyncService.class);

	private ModelService modelService;
	private OutboundServiceFacade outboundServiceFacade;
	private SyncRetryService syncRetryService;

	@Override
	public void sync(final Collection<OutboundItemDTO> outboundItemDTOs)
	{
		final OutboundItemDTOGroup itemGroup = OutboundItemDTOGroup.from(outboundItemDTOs, getOutboundItemFactory());
		syncInternal(itemGroup.getCronJobPk(), itemGroup, () -> synchronizeItem(itemGroup));
	}

	private void synchronizeItem(final OutboundItemDTOGroup outboundItemDTOGroup)
	{
		final Long rootItemPk = outboundItemDTOGroup.getRootItemPk();
		LOG.debug("Synchronizing changes in item with PK={}", rootItemPk);

		final ItemModel itemModel = findItemByPk(PK.fromLong(rootItemPk));
		if (itemModel != null)
		{
			synchronizeItem(outboundItemDTOGroup, itemModel);
		}
	}

	private void synchronizeItem(final OutboundItemDTOGroup dtoGroup, final ItemModel itemModel)
	{
		try
		{
			final SyncParameters syncParameters = SyncParameters.syncParametersBuilder().withItem(itemModel)
			                                                    .withIntegrationObjectCode(dtoGroup.getIntegrationObjectCode())
			                                                    .withDestinationId(dtoGroup.getDestinationId())
			                                                    .withSource(OutboundSource.OUTBOUNDSYNC)
			                                                    .build();

			final Observable<ResponseEntity<Map>> outboundResponse = getOutboundServiceFacade().send(syncParameters);
			outboundResponse.subscribe(r -> handleResponse(r, dtoGroup), e -> handleError(e, dtoGroup));
		}
		catch (final RuntimeException e)
		{
			handleError(e, dtoGroup);
		}
	}

	private void handleError(final Throwable throwable, final OutboundItemDTOGroup outboundItemDTOGroup)
	{
		LOG.error("Failed to send item with PK={}", outboundItemDTOGroup.getRootItemPk(), throwable);
		if (throwable instanceof IntegrationAttributeProcessingException)
		{
			handleError(outboundItemDTOGroup);
		}
		else if (throwable instanceof IntegrationAttributeException)
		{
			publishSystemErrorEvent(outboundItemDTOGroup.getCronJobPk(), outboundItemDTOGroup);
		}
		else
		{
			handleError(outboundItemDTOGroup);
		}
	}

	protected void handleError(final OutboundItemDTOGroup outboundItemDTOGroup)
	{
		LOG.warn("The item with PK={} couldn't be synchronized", outboundItemDTOGroup.getRootItemPk());
		try
		{
			publishUnSuccessfulCompletedEvent(outboundItemDTOGroup);
			if (getSyncRetryService().handleSyncFailure(outboundItemDTOGroup))
			{
				consumeChanges(outboundItemDTOGroup);
			}
		}
		// Due to the observable.onerror flow, we'll never get to this catch block. The plan is to get rid of the Observable in
		// the facade invocation, so this code block will then be correct
		catch (final RetryUpdateException e)
		{
			LOG.debug("Retry could not be updated", e);
		}
	}

	protected void handleResponse(final ResponseEntity<Map> responseEntity, final OutboundItemDTOGroup outboundItemDTOGroup)
	{
		if (isSuccessResponse(responseEntity))
		{
			handleSuccessfulSync(outboundItemDTOGroup);
		}
		else
		{
			handleError(outboundItemDTOGroup);
		}
	}

	@Override
	protected Optional<CronJobModel> getCronJob(final PK cronJobPk)
	{
		final var cronJob = (CronJobModel) findItemByPk(cronJobPk);
		return Optional.ofNullable(cronJob);
	}

	protected ItemModel findItemByPk(final PK pk)
	{
		final Optional<ItemModel> itemModel = getItemModelSearchService().nonCachingFindByPk(pk);
		return itemModel.orElse(null);
	}

	protected void handleSuccessfulSync(final OutboundItemDTOGroup outboundItemDTOGroup)
	{
		LOG.debug("The product with PK={} has been synchronized", outboundItemDTOGroup.getRootItemPk());
		try
		{
			getSyncRetryService().handleSyncSuccess(outboundItemDTOGroup);
			consumeChanges(outboundItemDTOGroup);
			publishSuccessfulCompletedEvent(outboundItemDTOGroup);
		}
		catch (final RetryUpdateException e)
		{
			LOG.debug("Retry could not be updated", e);
		}
	}

	private boolean isSuccessResponse(final ResponseEntity<Map> responseEntity)
	{
		return responseEntity.getStatusCode() == HttpStatus.CREATED || responseEntity.getStatusCode() == HttpStatus.OK;
	}

	protected void consumeChanges(final OutboundItemDTOGroup outboundItemDTOGroup)
	{
		outboundItemDTOGroup.getOutboundItemDTOs().forEach(getOutboundItemConsumer()::consume);
	}

	/**
	 * @deprecated This method will be removed without alternative
	 */
	@Deprecated(since = "2105", forRemoval = true)
	protected ModelService getModelService()
	{
		return modelService;
	}

	/**
	 * @deprecated Use {@link #setItemModelSearchService(ItemModelSearchService)} instead
	 */
	@Deprecated(since = "2105", forRemoval = true)
	@Required
	public void setModelService(final ModelService modelService)
	{
		this.modelService = modelService;
	}

	public OutboundServiceFacade getOutboundServiceFacade()
	{
		return outboundServiceFacade;
	}

	@Required
	public void setOutboundServiceFacade(final OutboundServiceFacade outboundServiceFacade)
	{
		this.outboundServiceFacade = outboundServiceFacade;
	}

	protected SyncRetryService getSyncRetryService()
	{
		return syncRetryService;
	}

	@Required
	public void setSyncRetryService(final SyncRetryService syncRetryService)
	{
		this.syncRetryService = syncRetryService;
	}
}

