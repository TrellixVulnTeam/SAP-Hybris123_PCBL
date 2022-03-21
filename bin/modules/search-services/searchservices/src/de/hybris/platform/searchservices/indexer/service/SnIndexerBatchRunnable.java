/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.searchservices.indexer.service;

import java.util.List;


/**
 * Runnable for indexer batches.
 *
 * @deprecated Replaced by {@link SnIndexerBatchCallable}.
 */
@Deprecated(since = "2105", forRemoval = true)
public interface SnIndexerBatchRunnable extends Runnable
{
	/**
	 * Initializes the indexer batch runnable.
	 *
	 * @param indexerContext
	 *           - the indexer context
	 * @param indexerItemSourceOperations
	 *           - the indexer item source operations
	 * @param indexerBatchId
	 *           - the indexer batch id
	 */
	void initialize(SnIndexerContext indexerContext, List<SnIndexerItemSourceOperation> indexerItemSourceOperations,
			String indexerBatchId);

	/**
	 * Returns the indexer batch response.
	 *
	 * @return the indexer batch response
	 */
	SnIndexerBatchResponse getIndexerBatchResponse();
}
