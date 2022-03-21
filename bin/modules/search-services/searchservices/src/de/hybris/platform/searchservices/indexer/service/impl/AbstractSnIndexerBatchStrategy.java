/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.searchservices.indexer.service.impl;

import de.hybris.platform.searchservices.core.SnException;
import de.hybris.platform.searchservices.core.service.SnListenerFactory;
import de.hybris.platform.searchservices.core.service.SnSessionService;
import de.hybris.platform.searchservices.enums.SnIndexerOperationStatus;
import de.hybris.platform.searchservices.indexer.SnIndexerException;
import de.hybris.platform.searchservices.indexer.service.SnIndexerBatchListener;
import de.hybris.platform.searchservices.indexer.service.SnIndexerBatchRequest;
import de.hybris.platform.searchservices.indexer.service.SnIndexerBatchResponse;
import de.hybris.platform.searchservices.indexer.service.SnIndexerBatchStrategy;
import de.hybris.platform.searchservices.indexer.service.SnIndexerContext;
import de.hybris.platform.searchservices.indexer.service.SnIndexerContextFactory;

import java.text.MessageFormat;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Required;

import com.google.common.collect.Lists;


/**
 * Base class for {@link SnIndexerBatchStrategy} implementations.
 */
public abstract class AbstractSnIndexerBatchStrategy implements SnIndexerBatchStrategy
{
	private static final Logger LOG = LoggerFactory.getLogger(AbstractSnIndexerBatchStrategy.class);

	private SnSessionService snSessionService;
	private SnIndexerContextFactory snIndexerContextFactory;
	private SnListenerFactory snListenerFactory;

	@Override
	public SnIndexerBatchResponse execute(final SnIndexerBatchRequest indexerBatchRequest)
			throws SnIndexerException, InterruptedException
	{
		LOG.debug("Indexer batch operation {} started", indexerBatchRequest.getIndexerBatchId());

		SnIndexerContext indexerContext = null;
		List<SnIndexerBatchListener> listeners = null;

		try
		{
			snSessionService.initializeSession();

			indexerContext = snIndexerContextFactory.createIndexerContext(indexerBatchRequest);
			indexerContext.setIndexId(indexerBatchRequest.getIndexId());
			indexerContext.setIndexerOperationId(indexerBatchRequest.getIndexerOperationId());

			// aborts current indexer batch if cancellation was requested
			if (Thread.interrupted() || (indexerBatchRequest.getProgressTracker() != null
					&& indexerBatchRequest.getProgressTracker().isCancellationRequested()))
			{
				return createIndexerBatchResponse(indexerContext, 0, 0, SnIndexerOperationStatus.ABORTED);
			}

			listeners = snListenerFactory.getListeners(indexerContext, SnIndexerBatchListener.class);
			executeBeforeIndexBatchListeners(indexerContext, listeners);

			snSessionService.updateSessionForContext(indexerContext);

			SnIndexerBatchResponse indexerBatchResponse;

			if (CollectionUtils.isEmpty(indexerContext.getIndexerItemSourceOperations()))
			{
				indexerBatchResponse = createIndexerBatchResponse(indexerContext, 0, 0, SnIndexerOperationStatus.COMPLETED);
			}
			else
			{
				indexerBatchResponse = doExecute(indexerContext, indexerBatchRequest.getIndexerBatchId());
			}

			indexerContext.setIndexerResponse(indexerBatchResponse);

			executeAfterIndexBatchListeners(indexerContext, listeners);

			LOG.debug("Indexer batch operation {} finished", indexerBatchRequest.getIndexerBatchId());

			return indexerBatchResponse;
		}
		catch (final SnException | RuntimeException e)
		{
			if (indexerContext != null)
			{
				indexerContext.addException(e);
				executeAfterIndexBatchErrorListeners(indexerContext, listeners);
			}

			LOG.debug("Indexer batch operation {} failed", indexerBatchRequest.getIndexerBatchId());

			throw new SnIndexerException(
					MessageFormat.format("Indexer batch operation {0} failed", indexerBatchRequest.getIndexerBatchId()), e);
		}
		finally
		{
			snSessionService.destroySession();
		}
	}

	protected void executeBeforeIndexBatchListeners(final SnIndexerContext indexerContext,
			final List<SnIndexerBatchListener> listeners) throws SnException
	{
		if (CollectionUtils.isEmpty(listeners))
		{
			return;
		}

		for (final SnIndexerBatchListener listener : listeners)
		{
			if (LOG.isDebugEnabled())
			{
				LOG.debug("Running {}.beforeIndexBatch ...", listener.getClass().getCanonicalName());
			}

			listener.beforeIndexBatch(indexerContext);
		}
	}

	protected void executeAfterIndexBatchListeners(final SnIndexerContext indexerContext,
			final List<SnIndexerBatchListener> listeners) throws SnException
	{
		if (CollectionUtils.isEmpty(listeners))
		{
			return;
		}

		for (final SnIndexerBatchListener listener : Lists.reverse(listeners))
		{
			if (LOG.isDebugEnabled())
			{
				LOG.debug("Running {}.afterIndexBatch ...", listener.getClass().getCanonicalName());
			}

			listener.afterIndexBatch(indexerContext);
		}
	}

	protected void executeAfterIndexBatchErrorListeners(final SnIndexerContext indexerContext,
			final List<SnIndexerBatchListener> listeners)
	{
		if (CollectionUtils.isEmpty(listeners))
		{
			return;
		}

		for (final SnIndexerBatchListener listener : Lists.reverse(listeners))
		{
			try
			{
				if (LOG.isDebugEnabled())
				{
					LOG.debug("Running {}.afterIndexBatchError ...", listener.getClass().getCanonicalName());
				}

				listener.afterIndexBatchError(indexerContext);
			}
			catch (final SnIndexerException | RuntimeException exception)
			{
				indexerContext.addException(exception);
			}
		}
	}

	protected abstract SnIndexerBatchResponse doExecute(final SnIndexerContext indexerContext, final String indexerBatchId)
			throws SnException, InterruptedException;

	protected SnIndexerBatchResponse createIndexerBatchResponse(final SnIndexerContext indexerContext, final Integer totalItems,
			final Integer processedItems, final SnIndexerOperationStatus status)
	{
		final DefaultSnIndexerBatchResponse indexerBatchResponse = new DefaultSnIndexerBatchResponse(
				indexerContext.getIndexConfiguration(), indexerContext.getIndexType());
		indexerBatchResponse.setTotalItems(totalItems);
		indexerBatchResponse.setProcessedItems(processedItems);
		indexerBatchResponse.setStatus(status);

		return indexerBatchResponse;
	}

	public SnSessionService getSnSessionService()
	{
		return snSessionService;
	}

	@Required
	public void setSnSessionService(final SnSessionService snSessionService)
	{
		this.snSessionService = snSessionService;
	}

	public SnIndexerContextFactory getSnIndexerContextFactory()
	{
		return snIndexerContextFactory;
	}

	@Required
	public void setSnIndexerContextFactory(final SnIndexerContextFactory snIndexerContextFactory)
	{
		this.snIndexerContextFactory = snIndexerContextFactory;
	}

	public SnListenerFactory getSnListenerFactory()
	{
		return snListenerFactory;
	}

	@Required
	public void setSnListenerFactory(final SnListenerFactory snListenerFactory)
	{
		this.snListenerFactory = snListenerFactory;
	}
}
