/*
 * [y] hybris Platform
 *
 * Copyright (c) 2017 SAP SE or an SAP affiliate company.  All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.productconfig.integrationtests.hybris.occ

import static groovyx.net.http.ContentType.JSON
import static groovyx.net.http.ContentType.XML
import static org.apache.http.HttpStatus.SC_OK

import de.hybris.bootstrap.annotations.ManualTest

import org.slf4j.LoggerFactory

import groovyx.net.http.HttpResponseDecorator


@ManualTest
class ProductConfigOverviewWsIntegrationTest extends BaseSpockTest
{

	def org.slf4j.Logger LOG = LoggerFactory.getLogger(ProductConfigOverviewWsIntegrationTest.class)


	def "Get a configurationOverview by the config id"()
	{

		when: "creates a new configuration"
		HttpResponseDecorator response = restClient.get(
				path: getBasePathWithSite() + '/products/YSAP_SIMPLE_POC/configurators' + SLASH_CONFIGURATOR_TYPE_OCC,
				contentType: format
				)

		then: "gets a new default configuration with"
		LOG.info("RESPONSE: " + response.data.toString())
		with(response)
		{
			status == SC_OK
			data.configId.isEmpty() == false
		}

		when: "Afterwards get the created configuration by the config ID"
		String configId = response.data.configId

		response = restClient.get(
				path: getBasePathWithSite() + SLASH_CONFIGURATOR_TYPE_OCC_SLASH+ configId +'/configurationOverview'  ,
				contentType: format
				)

		then: "gets the newly create configuration by config ID with all fields mapped"
		LOG.info("RESPONSE: " + response.data.toString())
		with(response)
		{
			status == SC_OK
			data.id == configId
			data.groups.size() == 1
			data.groups[0].id == "_GEN"
			data.groups[0].groupDescription == "[_GEN]"
			data.groups[0].characteristicValues.size() == 1
			data.groups[0].characteristicValues[0].characteristic == "Simple Flag: Hide options"
			data.groups[0].characteristicValues[0].value == "Hide"
			data.pricing.basePrice.priceType == "BUY"
		}

		where:
		format << [XML, JSON]
	}
}
