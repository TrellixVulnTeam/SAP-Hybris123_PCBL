/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.searchservices.unit.indexer.service.impl

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.core.PK
import de.hybris.platform.core.model.ItemModel
import de.hybris.platform.searchservices.admin.data.SnIndexConfiguration
import de.hybris.platform.searchservices.admin.data.SnIndexType
import de.hybris.platform.searchservices.core.SnException
import de.hybris.platform.searchservices.core.service.SnIdentityProvider
import de.hybris.platform.searchservices.core.service.SnListenerFactory
import de.hybris.platform.searchservices.core.service.SnQualifierTypeFactory
import de.hybris.platform.searchservices.core.service.SnSessionService
import de.hybris.platform.searchservices.document.data.SnDocumentBatchOperationResponse
import de.hybris.platform.searchservices.document.data.SnDocumentBatchResponse
import de.hybris.platform.searchservices.enums.SnDocumentOperationStatus
import de.hybris.platform.searchservices.enums.SnDocumentOperationType
import de.hybris.platform.searchservices.enums.SnIndexerOperationStatus
import de.hybris.platform.searchservices.enums.SnIndexerOperationType
import de.hybris.platform.searchservices.indexer.SnIndexerException
import de.hybris.platform.searchservices.indexer.data.SnIndexerOperation
import de.hybris.platform.searchservices.indexer.service.SnIndexerBatchListener
import de.hybris.platform.searchservices.indexer.service.SnIndexerBatchRequest
import de.hybris.platform.searchservices.indexer.service.SnIndexerContext
import de.hybris.platform.searchservices.indexer.service.SnIndexerContextFactory
import de.hybris.platform.searchservices.indexer.service.SnIndexerItemSource
import de.hybris.platform.searchservices.indexer.service.SnIndexerItemSourceOperation
import de.hybris.platform.searchservices.indexer.service.SnIndexerListener
import de.hybris.platform.searchservices.indexer.service.SnIndexerResponse
import de.hybris.platform.searchservices.indexer.service.impl.DefaultSnIndexerBatchStrategy
import de.hybris.platform.searchservices.spi.service.SnSearchProvider
import de.hybris.platform.searchservices.spi.service.SnSearchProviderFactory
import de.hybris.platform.servicelayer.search.FlexibleSearchQuery
import de.hybris.platform.servicelayer.search.FlexibleSearchService
import de.hybris.platform.servicelayer.search.SearchResult

import org.junit.Test
import org.springframework.context.ApplicationContext

import spock.lang.Specification
import spock.lang.Unroll


@UnitTest
@Unroll
public class DefaultSnIndexerBatchStrategySpec extends Specification {

	static final String INDEX_CONFIGURATION_ID = "indexConfiguration"
	static final String INDEX_TYPE_ID = "indexType"
	static final String INDEX_ID = "index"
	static final String IDENTITY_PROVIDER_ID = "identityProvider"

	SnSessionService snSessionService = Mock()
	SnIndexerContextFactory snIndexerContextFactory = Mock()
	SnListenerFactory snListenerFactory = Mock()
	FlexibleSearchService flexibleSearchService = Mock()
	SnQualifierTypeFactory snQualifierTypeFactory = Mock()
	SnSearchProviderFactory snSearchProviderFactory = Mock()
	ApplicationContext applicationContext = Mock()

	SnIdentityProvider identityProvider = Mock()
	SnIndexerItemSource indexerItemSource = Mock()
	SnIndexerItemSourceOperation indexerItemSourceOperation = Mock()
	SnIndexerBatchRequest indexerBatchRequest = Mock()
	SnIndexerContext indexerContext = Mock()
	SnIndexConfiguration indexConfiguration = Mock()
	SnIndexType indexType = Mock()
	SnSearchProvider<?> searchProvider = Mock()
	SnIndexerOperation indexerOperation = Mock()
	SearchResult flexibleSearchResult = Mock()

	SnIndexerBatchListener listener1 = Mock()
	SnIndexerBatchListener listener2 = Mock()

	PK itemPk = PK.fromLong(1)
	ItemModel item = Mock()

	DefaultSnIndexerBatchStrategy snIndexerBatchStrategy

	def setup() {
		indexerBatchRequest.getIndexTypeId() >> INDEX_TYPE_ID
		indexerBatchRequest.getIndexId() >> INDEX_ID
		indexerBatchRequest.getIndexerOperationType() >> SnIndexerOperationType.FULL
		indexerBatchRequest.getIndexerItemSourceOperations() >> List.of(indexerItemSourceOperation)
		indexerItemSourceOperation.getDocumentOperationType() >> SnDocumentOperationType.CREATE
		indexerItemSourceOperation.getIndexerItemSource() >> indexerItemSource
		indexerItemSource.getPks(indexerContext) >> List.of(itemPk)

		indexConfiguration.getId() >> INDEX_TYPE_ID
		indexType.getId() >> INDEX_TYPE_ID
		indexType.getIdentityProvider() >> IDENTITY_PROVIDER_ID

		indexerContext.getIndexConfiguration() >> indexConfiguration
		indexerContext.getIndexType() >> indexType
		indexerContext.getIndexId() >> INDEX_ID
		indexerContext.getIndexerRequest() >> indexerBatchRequest
		indexerContext.getIndexerItemSourceOperations() >> List.of(indexerItemSourceOperation)

		snIndexerContextFactory.createIndexerContext(indexerBatchRequest) >> indexerContext
		snSearchProviderFactory.getSearchProviderForContext(indexerContext) >> searchProvider

		flexibleSearchService.search(_ as FlexibleSearchQuery) >> flexibleSearchResult
		flexibleSearchResult.getResult() >> List.of(item)

		applicationContext.getBean(IDENTITY_PROVIDER_ID, SnIdentityProvider.class) >> identityProvider

		snIndexerBatchStrategy = new DefaultSnIndexerBatchStrategy()
		snIndexerBatchStrategy.setSnSessionService(snSessionService)
		snIndexerBatchStrategy.setSnIndexerContextFactory(snIndexerContextFactory)
		snIndexerBatchStrategy.setSnListenerFactory(snListenerFactory)
		snIndexerBatchStrategy.setFlexibleSearchService(flexibleSearchService)
		snIndexerBatchStrategy.setSnSearchProviderFactory(snSearchProviderFactory)
		snIndexerBatchStrategy.setSnQualifierTypeFactory(snQualifierTypeFactory)
		snIndexerBatchStrategy.setApplicationContext(applicationContext)
	}

	@Test
	def "Execute indexer batch strategy with document operation status '#documentOperationStatus' '#testId'"(testId, documentOperationStatus, expectedIndexerOperationStatus) {
		given:
		searchProvider.executeDocumentBatch(indexerContext, INDEX_ID, _, _) >>
				new SnDocumentBatchResponse(responses: List.of(new SnDocumentBatchOperationResponse(status: documentOperationStatus)))

		when:
		SnIndexerResponse indexerResponse = snIndexerBatchStrategy.execute(indexerBatchRequest)

		then:
		indexerResponse.status == expectedIndexerOperationStatus

		where:
		testId | documentOperationStatus           || expectedIndexerOperationStatus
		1      | SnDocumentOperationStatus.CREATED || SnIndexerOperationStatus.COMPLETED
		2      | SnDocumentOperationStatus.UPDATED || SnIndexerOperationStatus.COMPLETED
		3      | SnDocumentOperationStatus.DELETED || SnIndexerOperationStatus.COMPLETED
		4      | SnDocumentOperationStatus.FAILED  || SnIndexerOperationStatus.FAILED
	}

	@Test
	def "Fail to execute indexer batch strategy because exception '#exception' is thrown '#testId'"(testId, exception) {
		given:
		searchProvider.executeDocumentBatch(indexerContext, INDEX_ID, _, _) >> {
			throw exception
		}

		when:
		SnIndexerResponse indexerResponse = snIndexerBatchStrategy.execute(indexerBatchRequest)

		then:
		thrown(SnIndexerException)

		where:
		testId | exception
		1      | new SnException()
		2      | new SnIndexerException()
		3      | new RuntimeException()
	}

	@Test
	def "No listener"() {
		given:
		searchProvider.executeDocumentBatch(indexerContext, INDEX_ID, _, _) >>
				new SnDocumentBatchResponse(responses: List.of(new SnDocumentBatchOperationResponse(status: SnDocumentOperationStatus.CREATED)))

		final List<SnIndexerListener> listeners = List.of()

		snListenerFactory.getListeners(indexerContext, SnIndexerBatchListener) >> listeners

		when:
		snIndexerBatchStrategy.execute(indexerBatchRequest)

		then:
		0 * listener1.beforeIndexBatch(indexerContext)
		0 * listener2.beforeIndexBatch(indexerContext)
		0 * listener2.beforeIndexBatch(indexerContext)
		0 * listener1.beforeIndexBatch(indexerContext)
	}

	@Test
	def "Single listener"() {
		given:
		searchProvider.executeDocumentBatch(indexerContext, INDEX_ID, _, _) >>
				new SnDocumentBatchResponse(responses: List.of(new SnDocumentBatchOperationResponse(status: SnDocumentOperationStatus.CREATED)))

		final List<SnIndexerBatchListener> listeners = List.of(listener1)

		snListenerFactory.getListeners(indexerContext, SnIndexerBatchListener) >> listeners

		when:
		snIndexerBatchStrategy.execute(indexerBatchRequest)

		then:
		1 * listener1.beforeIndexBatch(indexerContext)

		then:
		1 * listener1.afterIndexBatch(indexerContext)

		then:
		0 * listener1.afterIndexBatchError(indexerContext)
	}

	@Test
	def "Single listener exception on before index batch"() {
		given:
		searchProvider.executeDocumentBatch(indexerContext, INDEX_ID, _, _) >>
				new SnDocumentBatchResponse(responses: List.of(new SnDocumentBatchOperationResponse(status: SnDocumentOperationStatus.CREATED)))

		final List<SnIndexerBatchListener> listeners = List.of(listener1)

		snListenerFactory.getListeners(indexerContext, SnIndexerBatchListener) >> listeners

		when:
		snIndexerBatchStrategy.execute(indexerBatchRequest)

		then:
		1 * listener1.beforeIndexBatch(indexerContext) >> {
			throw new RuntimeException()
		}

		then:
		0 * listener1.afterIndexBatch(indexerContext)

		then:
		1 * listener1.afterIndexBatchError(indexerContext)

		then:
		thrown(SnIndexerException)
	}

	@Test
	def "Single listener exception on execute"() {
		given:
		searchProvider.executeDocumentBatch(indexerContext, INDEX_ID, _, _) >>
				new SnDocumentBatchResponse(responses: List.of(new SnDocumentBatchOperationResponse(status: SnDocumentOperationStatus.CREATED)))

		final List<SnIndexerBatchListener> listeners = List.of(listener1)

		snListenerFactory.getListeners(indexerContext, SnIndexerBatchListener) >> listeners
		indexerContext.setIndexerResponse(_) >> {
			throw new RuntimeException()
		}

		when:
		snIndexerBatchStrategy.execute(indexerBatchRequest)

		then:
		1 * listener1.beforeIndexBatch(indexerContext)

		then:
		0 * listener1.afterIndexBatch(indexerContext)

		then:
		1 * listener1.afterIndexBatchError(indexerContext)

		then:
		thrown(SnIndexerException)
	}

	@Test
	def "Single listener exception on after index batch"() {
		given:
		searchProvider.executeDocumentBatch(indexerContext, INDEX_ID, _, _) >>
				new SnDocumentBatchResponse(responses: List.of(new SnDocumentBatchOperationResponse(status: SnDocumentOperationStatus.CREATED)))

		final List<SnIndexerBatchListener> listeners = List.of(listener1)

		snListenerFactory.getListeners(indexerContext, SnIndexerBatchListener) >> listeners

		when:
		snIndexerBatchStrategy.execute(indexerBatchRequest)

		then:
		1 * listener1.beforeIndexBatch(indexerContext)

		then:
		1 * listener1.afterIndexBatch(indexerContext) >> {
			throw new RuntimeException()
		}

		then:
		1 * listener1.afterIndexBatchError(indexerContext)

		then:
		thrown(SnIndexerException)
	}

	@Test
	def "Multiple listeners"() {
		given:
		searchProvider.executeDocumentBatch(indexerContext, INDEX_ID, _, _) >>
				new SnDocumentBatchResponse(responses: List.of(new SnDocumentBatchOperationResponse(status: SnDocumentOperationStatus.CREATED)))

		final List<SnIndexerBatchListener> listeners = List.of(listener1, listener2)

		snListenerFactory.getListeners(indexerContext, SnIndexerBatchListener) >> listeners

		when:
		snIndexerBatchStrategy.execute(indexerBatchRequest)

		then:
		1 * listener1.beforeIndexBatch(indexerContext)

		then:
		1 * listener2.beforeIndexBatch(indexerContext)

		then:
		1 * listener2.afterIndexBatch(indexerContext)

		then:
		1 * listener1.afterIndexBatch(indexerContext)

		then:
		0 * listener2.afterIndexBatchError(indexerContext)

		then:
		0 * listener1.afterIndexBatchError(indexerContext)
	}

	@Test
	def "Multiple listeners exception on before index batch 1"() {
		given:
		searchProvider.executeDocumentBatch(indexerContext, INDEX_ID, _, _) >>
				new SnDocumentBatchResponse(responses: List.of(new SnDocumentBatchOperationResponse(status: SnDocumentOperationStatus.CREATED)))

		final List<SnIndexerBatchListener> listeners = List.of(listener1, listener2)

		snListenerFactory.getListeners(indexerContext, SnIndexerBatchListener) >> listeners

		when:
		snIndexerBatchStrategy.execute(indexerBatchRequest)

		then:
		1 * listener1.beforeIndexBatch(indexerContext) >> {
			throw new RuntimeException()
		}

		then:
		0 * listener2.beforeIndexBatch(indexerContext)

		then:
		0 * listener2.afterIndexBatch(indexerContext)

		then:
		0 * listener1.afterIndexBatch(indexerContext)

		then:
		1 * listener2.afterIndexBatchError(indexerContext)

		then:
		1 * listener1.afterIndexBatchError(indexerContext)

		then:
		thrown(SnIndexerException)
	}

	@Test
	def "Multiple listeners exception on before index batch 2"() {
		given:
		searchProvider.executeDocumentBatch(indexerContext, INDEX_ID, _, _) >>
				new SnDocumentBatchResponse(responses: List.of(new SnDocumentBatchOperationResponse(status: SnDocumentOperationStatus.CREATED)))

		final List<SnIndexerBatchListener> listeners = List.of(listener1, listener2)

		snListenerFactory.getListeners(indexerContext, SnIndexerBatchListener) >> listeners

		when:
		snIndexerBatchStrategy.execute(indexerBatchRequest)

		then:
		1 * listener1.beforeIndexBatch(indexerContext)

		then:
		1 * listener2.beforeIndexBatch(indexerContext) >> {
			throw new RuntimeException()
		}

		then:
		0 * listener2.afterIndexBatch(indexerContext)

		then:
		0 * listener1.afterIndexBatch(indexerContext)

		then:
		1 * listener2.afterIndexBatchError(indexerContext)

		then:
		1 * listener1.afterIndexBatchError(indexerContext)

		then:
		thrown(SnIndexerException)
	}

	@Test
	def "Multiple listeners exception on execute"() {
		given:
		searchProvider.executeDocumentBatch(indexerContext, INDEX_ID, _, _) >>
				new SnDocumentBatchResponse(responses: List.of(new SnDocumentBatchOperationResponse(status: SnDocumentOperationStatus.CREATED)))

		final List<SnIndexerBatchListener> listeners = List.of(listener1, listener2)

		snListenerFactory.getListeners(indexerContext, SnIndexerBatchListener) >> listeners
		indexerContext.setIndexerResponse(_) >> {
			throw new RuntimeException()
		}

		when:
		snIndexerBatchStrategy.execute(indexerBatchRequest)

		then:
		1 * listener1.beforeIndexBatch(indexerContext)

		then:
		1 * listener2.beforeIndexBatch(indexerContext)

		then:
		0 * listener2.afterIndexBatch(indexerContext)

		then:
		0 * listener1.afterIndexBatch(indexerContext)

		then:
		1 * listener2.afterIndexBatchError(indexerContext)

		then:
		1 * listener1.afterIndexBatchError(indexerContext)

		then:
		thrown(SnIndexerException)
	}

	@Test
	def "Multiple listeners exception on after index batch 1"() {
		given:
		searchProvider.executeDocumentBatch(indexerContext, INDEX_ID, _, _) >>
				new SnDocumentBatchResponse(responses: List.of(new SnDocumentBatchOperationResponse(status: SnDocumentOperationStatus.CREATED)))

		final List<SnIndexerBatchListener> listeners = List.of(listener1, listener2)

		snListenerFactory.getListeners(indexerContext, SnIndexerBatchListener) >> listeners

		when:
		snIndexerBatchStrategy.execute(indexerBatchRequest)

		then:
		1 * listener1.beforeIndexBatch(indexerContext)

		then:
		1 * listener2.beforeIndexBatch(indexerContext)

		then:
		1 * listener2.afterIndexBatch(indexerContext)

		then:
		1 * listener1.afterIndexBatch(indexerContext) >> {
			throw new RuntimeException()
		}

		then:
		1 * listener2.afterIndexBatchError(indexerContext)

		then:
		1 * listener1.afterIndexBatchError(indexerContext)

		then:
		thrown(SnIndexerException)
	}

	@Test
	def "Multiple listeners exception on after index batch 2"() {
		given:
		searchProvider.executeDocumentBatch(indexerContext, INDEX_ID, _, _) >>
				new SnDocumentBatchResponse(responses: List.of(new SnDocumentBatchOperationResponse(status: SnDocumentOperationStatus.CREATED)))

		final List<SnIndexerBatchListener> listeners = List.of(listener1, listener2)

		snListenerFactory.getListeners(indexerContext, SnIndexerBatchListener) >> listeners

		when:
		snIndexerBatchStrategy.execute(indexerBatchRequest)

		then:
		1 * listener1.beforeIndexBatch(indexerContext)

		then:
		1 * listener2.beforeIndexBatch(indexerContext)

		then:
		1 * listener2.afterIndexBatch(indexerContext) >> {
			throw new RuntimeException()
		}

		then:
		0 * listener1.afterIndexBatch(indexerContext)

		then:
		1 * listener2.afterIndexBatchError(indexerContext)

		then:
		1 * listener1.afterIndexBatchError(indexerContext)

		then:
		thrown(SnIndexerException)
	}
}
