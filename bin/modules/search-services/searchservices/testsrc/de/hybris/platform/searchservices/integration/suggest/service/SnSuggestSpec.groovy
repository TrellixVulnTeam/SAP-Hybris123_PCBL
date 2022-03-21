/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.searchservices.integration.suggest.service

import static de.hybris.platform.searchservices.support.ItemListenerMode.CLASS
import static de.hybris.platform.searchservices.support.util.ObjectUtils.matchContains

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.searchservices.integration.suggest.AbstractSnSuggestSpec
import de.hybris.platform.searchservices.suggest.data.SnSuggestResult
import de.hybris.platform.searchservices.support.ItemListener

import org.junit.Test

import spock.lang.Unroll

@Unroll
@IntegrationTest
@ItemListener(mode = CLASS)
class SnSuggestSpec extends AbstractSnSuggestSpec {

	@Override
	def setupSpecWithSpring() {
		super.setupSpecWithSpring()
		createTestData()
		loadCoreData()
		loadDefaultData()
	}

	@Override
	def cleanupSpecWithSpring() {
		deleteTestData()
		super.cleanupSpecWithSpring()
	}

	@Test
	def "Search with query (useForSuggesting) #row.testId: description=#row.description, data=#row.data"(row) {
		given:
		resetFields({ field ->
			field.setUseForSuggesting(false)
		})

		if (row.fields) {
			for (def field : row.fields) {
				patchField(field.id, field)
			}
		}

		executeFullIndexerOperation(INDEX_TYPE_ID)

		when:
		SnSuggestResult suggestResult = executeSuggestQuery(INDEX_TYPE_ID, {
			row.data
		})

		then:
		matchContains(suggestResult, row.expectedData)

		where:
		row << loadSuggestSpecJson("/searchservices/test/integration/suggest/validQueriesUseForSuggesting.json")
	}
}
