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

import spock.lang.Unroll

@ManualTest
@Unroll
class MultipleConfiguratorsWsIntegrationTest extends BaseSpockTest
{

	private final static String PRODUCT_CODE = 'KD990SOL'
	private final static String TEXTFIELD_PRODUCT_CODE = '2116282'

	private final static String CONFIG_TYPE = 'CPQCONFIGURATOR'	
	private final static String TEXTFIELD_TYPE = 'TEXTFIELD'
	private final static String TEXTFIELD_TYPE_URL = 'textfield'

	def org.slf4j.Logger LOG = LoggerFactory.getLogger(MultipleConfiguratorsWsIntegrationTest.class)

	def "Get product details for configuratorType #configuratorType with format #format"()
	{
		when: "reading a product"

		def response = restClient.get(
				path: getBasePathWithSite() + '/products/' + productCode,
				contentType: format
				)

		then: "getting a product detail with #configuratorType"

		LOG.info("RESPONSE: " + response.data.toString())
		with(response)
		{
			status == SC_OK
			data.code == productCode
			data.configurable == true
			data.configuratorType == configuratorType
		}

		where:
		configuratorType | productCode            | format
		CONFIG_TYPE      | PRODUCT_CODE           | XML
		CONFIG_TYPE      | PRODUCT_CODE           | JSON
		TEXTFIELD_TYPE   | TEXTFIELD_PRODUCT_CODE | XML
		TEXTFIELD_TYPE   | TEXTFIELD_PRODUCT_CODE | JSON
	}

	def "Get a default configuration for #configuratorType 'CPQCONFIGURATOR'"()
	{
		when: "getting a configurable product"

		def response = restClient.get(
				path: getBasePathWithSite() + '/products/' + PRODUCT_CODE + SLASH_CONFIGURATOR_TYPE_OCC,
				contentType: format
				)

		then: "getting a default configuraion for #configuratorType 'CPQCONFIGURATOR'"
		LOG.info("RESPONSE: " + response.data.toString())
		with(response)
		{
			status == SC_OK
			data.configId.isEmpty() == false
			data.consistent == true
			data.complete == false
			data.rootProduct == PRODUCT_CODE
			data.groups.size() == 1
		}

		where:
		format << [XML, JSON]
	}

	def "Get a default configuration for #configuratorType 'TEXTFIELD'"()
	{
		when: "getting a configurable product"

		def response = restClient.get(
				path: getBasePathWithSite() + '/products/' + TEXTFIELD_PRODUCT_CODE + '/configurator/' + TEXTFIELD_TYPE_URL,
				contentType: format
				)

		then: "getting a default configuraion for #configuratorType 'TEXTFIELD'"
		LOG.info("RESPONSE: " + response.data.toString())
		with(response)
		{
			status == SC_OK
			data.configurationInfos.size() == 3
			data.configurationInfos[0].configurationLabel == 'Font Type'
			data.configurationInfos[0].configuratorType == TEXTFIELD_TYPE

			data.configurationInfos[1].configurationLabel == 'Font Size'
			data.configurationInfos[1].configuratorType == TEXTFIELD_TYPE

			data.configurationInfos[2].configurationLabel == 'Company Name'
			data.configurationInfos[2].configuratorType == TEXTFIELD_TYPE
		}

		where:
		format << [XML, JSON]
	}

	def "Create a new cart with a configurable entry"()
	{
		given: "anonymous cart"
		def cart = createEmptyCart(restClient, format)

		when: "add a configurable product to the cart"
		def response = restClient.post(
				path: getBasePathWithSite() + '/users/anonymous/carts/' + cart.guid + '/entries',
				contentType: format,
				query: ['code': PRODUCT_CODE],
				requestContentType: format
				)


		then: "the item was added sucessfully"
		LOG.info("RESPONSE: " + response.data.toString())
		with(response)
		{
			status == SC_OK
			data.statusCode == 'success'
		}

		where:
		format <<[XML, JSON]
	}

	def "Add a product with #productCode and qty #qty to the cart for #configuratorType 'TEXTFIELD'"()
	{
		given: "anonymous user with cart"
		def customer = ['id': 'anonymous']
		def cart = createEmptyCart(restClient, responseFormat)

		when: "adding a product to cart"
		def response = restClient.post(
				path: getBasePathWithSite() + '/users/' + customer.id + '/carts/' + cart.guid + '/entries/configurator/' +
				TEXTFIELD_TYPE_URL,
				query: ['fields': FIELD_SET_LEVEL_FULL],
				body: postBody,
				contentType: responseFormat,
				requestContentType: requestFormat
				)

		then: "a new entry has been added to the cart"
		LOG.info("RESPONSE: " + response.data.toString())
		with(response)
		{
			status == SC_OK
			data.statusCode == 'success'
			data.quantityAdded == 2
			data.entry.configurationInfos.size() == 1
			data.entry.configurationInfos[0].configurationValue == 'Hans'
		}

		where:
		productCode  				| qty | requestFormat | responseFormat | postBody
		TEXTFIELD_PRODUCT_CODE 	| 2   | JSON          | JSON           | "{\"configurationInfos\": [ {\"configurationLabel\": \"Font Type\", \"configurationValue\": \"Hans\", \"configuratorType\": \"TEXTFIELD\", \"status\": \"SUCCESS\" }], \"product\" : {\"code\" : \"" + productCode + "\"},\"quantity\" : " + qty + "}"
	}

	def "Get a configuration for the cart entry for #configuratorType 'TEXTFIELD'"()
	{
		given: "anonymous user with cart"
		def customer = ['id': 'anonymous']
		def cart = createEmptyCart(restClient, JSON)

		and: "add a cart entry for #configuratorType 'TEXTFIELD'"
		def cartEntry = restClient.post(
				path: getBasePathWithSite() + '/users/' + customer.id + '/carts/' + cart.guid + '/entries/configurator/' +
				TEXTFIELD_TYPE_URL,
				query: ['fields': FIELD_SET_LEVEL_FULL],
				body: "{\"product\" : {\"code\" : \"" + TEXTFIELD_PRODUCT_CODE + "\"},\"quantity\" : 2, \"configurationInfos\": [{\"configurationLabel\": \"Font Type\", \"configurationValue\": \"Hans\", \"configuratorType\": \"TEXTFIELD\", \"status\": \"SUCCESS\" }]}",
				contentType: JSON,
				requestContentType: JSON).data


		when: "customer requests a configuration of the cart entry for #configuratorType 'TEXTFIELD'"
		def response = restClient.get(
				path: getBasePathWithSite() + '/users/' + customer.id + '/carts/' + cart.guid + '/entries/' + cartEntry.entry
				.entryNumber + '/configurator/' + TEXTFIELD_TYPE_URL,
				contentType: JSON,
				)

		then: "the configuration infos of the cart entry for #configuratorType 'TEXTFIELD'"
		with(response)
		{
			status == SC_OK
			data.configurationInfos.size() == 1
			data.configurationInfos[0].configurationValue == 'Hans'
		}

		when: "customer requests to update a configuration of a cart entry for #configuratorType 'TEXTFIELD'"
		def updateReponse = restClient.post(
				path: getBasePathWithSite() + '/users/' + customer.id + '/carts/' + cart.guid + '/entries/' + cartEntry.entry
				.entryNumber + '/configurator/' + TEXTFIELD_TYPE_URL,
				body: "{\"product\" : {\"code\" : \"" + TEXTFIELD_PRODUCT_CODE + "\"},\"quantity\" : 2, \"configurationInfos\": [{\"configurationLabel\": \"Font Type\", \"configurationValue\": \"Max\", \"configuratorType\": \"TEXTFIELD\", \"status\": \"SUCCESS\" }]}",
				contentType: JSON,
				requestContentType: JSON)

		then: "the configuration info was updated in the cart entry"
		with(updateReponse)
		{
			status == SC_OK
			data.quantityAdded == 0
			data.quantity == 2
			data.entry.configurationInfos.size() == 1
			data.entry.configurationInfos[0].configurationValue == 'Max'
		}
	}
	def "Get generic config infos for cart entries using generic endpoint"()
	{
		given: "anonymous user with cart"
		def customer = ['id': 'anonymous']
		def cart = createEmptyCart(restClient, JSON)

		and: "add a cart entry for #configuratorType 'TEXTFIELD'"
		def cartEntry = restClient.post(
				path: getBasePathWithSite() + '/users/' + customer.id + '/carts/' + cart.guid + '/entries/configurator/' +
				TEXTFIELD_TYPE_URL,
				query: ['fields': FIELD_SET_LEVEL_FULL],
				body: "{\"product\" : {\"code\" : \"" + TEXTFIELD_PRODUCT_CODE + "\"},\"quantity\" : 2, \"configurationInfos\": [{\"configurationLabel\": \"Font Type\", \"configurationValue\": \"Hans\", \"configuratorType\": \"TEXTFIELD\", \"status\": \"SUCCESS\" }]}",
				contentType: JSON,
				requestContentType: JSON).data


		when: "customer requests generic configuration infos"
		def response = restClient.get(
				path: getBasePathWithSite() + '/users/' + customer.id + '/carts/' + cart.guid + '/entries',
				query: ['fields': FIELD_SET_LEVEL_FULL ],
				contentType: JSON,
				)

		then: "response contains required info"
		with(response)
		{
			status == SC_OK
			data.orderEntries[0].configurationInfos.size() == 1
			data.orderEntries[0].configurationInfos[0].configurationValue == 'Hans'
			data.orderEntries[0].statusSummaryList.size() == 1
			data.orderEntries[0].statusSummaryList[0].numberOfIssues ==1
			data.orderEntries[0].statusSummaryList[0].status == 'SUCCESS'
		}

	
	}
}
