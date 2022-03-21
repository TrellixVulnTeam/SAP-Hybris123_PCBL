/*
 * [y] hybris Platform
 *
 * Copyright (c) 2020 SAP SE or an SAP affiliate company.  All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.productconfig.integrationtests.hybris.occ

import static groovyx.net.http.ContentType.JSON
import static groovyx.net.http.ContentType.URLENC
import static groovyx.net.http.ContentType.XML
import static org.apache.http.HttpStatus.SC_CREATED
import static org.apache.http.HttpStatus.SC_OK

import de.hybris.bootstrap.annotations.ManualTest

import org.slf4j.LoggerFactory

import groovyx.net.http.HttpResponseDecorator
import groovyx.net.http.RESTClient



@ManualTest
class OrderIntegrationWsIntegrationTest extends BaseSpockTest {

	org.slf4j.Logger LOG = LoggerFactory.getLogger(OrderIntegrationWsIntegrationTest.class)
	protected static final PRODUCT_KEY = 'CPQ_HOME_THEATER'
	static final CUSTOMER = ["id": USERNAME, "password": PASSWORD]
	protected static final DELIVERY_STANDARD = 'standard-gross'


	def "Authorize existing customer and create cart"(){
		given: "customer logs in"
		authorizeCustomer(restClient, CUSTOMER)

		when: "logged in user creates a new cart"
		def cart = createCart(restClient, CUSTOMER, format, basePathWithSite)

		then: "the new cart has been created sucessfully and is empty"
		if(isNotEmpty(cart)&&isNotEmpty(cart.errors))
			println(cart)
		!isNotEmpty(cart.entries)
		isNotEmpty(cart.guid)
		isNotEmpty(cart.code)

		where:
		format << [XML, JSON]
	}

	def "Authorize existing customer and create cart with configurable product"(){

		given: "Customer logs in and cart is created"
		authorizeCustomer(restClient, CUSTOMER)
		def cart = createCart(restClient, CUSTOMER, format, basePathWithSite)

		when: "Logged in customer tries to add a configurable product to the cart"
		def modification = addProductToCart(restClient, CUSTOMER.id, cart.code, PRODUCT_KEY, format)

		def entryNumber = 0
		HttpResponseDecorator response = restClient.get(
				path: basePathWithSite + '/users/'+ CUSTOMER.id + '/carts/'+cart.code+'/entries/' + entryNumber+SLASH_CONFIGURATOR_TYPE_OCC,
				contentType : format,
				query : ['fields' : FIELD_SET_LEVEL_BASIC],
				requestContentType: URLENC
				)

		then: "the configuration attached to the item could be read sucessfully and contains a configuration id"
		LOG.info("RESPONSE: "+response.data.toString())
		with(response) {
			status == SC_OK
			data.rootProduct == PRODUCT_KEY
			data.configId.isEmpty() == false
		}

		where:
		format <<[XML, JSON]
	}

	def "Authorize existing customer and place order with configurable product"(){

		if(isExtensionInSetup("sapproductconfigservicesssc")) {
			LOG.info("Session lifecycle implemented by sapproductconfigservicesssc is not fully compatible with OCC, hence skipping update cart part of the test");
			return;
		}
		given: "Customer logs in, creates cart and prepares order"
		authorizeCustomer(restClient, CUSTOMER)
		def cart = createCart(restClient, CUSTOMER, format, basePathWithSite)

		def cartModification = addProductToCart(restClient, CUSTOMER.id, cart.code, PRODUCT_KEY, format)
		def configId = updateConfigInCart(restClient, CUSTOMER, cart.code)

		def address = getAddress(restClient, CUSTOMER)
		setDeliveryAddressForCart(restClient, CUSTOMER, cart.code, address.addresses[0].id, format)

		def deliveryModes = getDeliveryModes(restClient, CUSTOMER, cart.code, format)
		setDeliveryModeForCart(restClient, CUSTOMER, cart.code, DELIVERY_STANDARD, format)

		def paymentDetails = getPaymentDetails(restClient, CUSTOMER, format)
		def paymentDetailsId = paymentDetails.payments[0].id
		setPaymentDetailsForCart(restClient, CUSTOMER, cart.code, paymentDetailsId, format)

		def orderData = placeOrder(restClient, CUSTOMER, cart.code, format)
		LOG.info("orderData: " + orderData.toString())

		when: "user retrieves overview for order entry"
		def overviewData = getOverviewForOrderEntry(restClient, CUSTOMER, orderData.code, 0, format)

		then: "he gets the configuration overview for an order entry"
		with(overviewData) {
			id == configId
			groups.size() == 2
			groups[0].groupDescription == "Powerful audio"
			groups[0].characteristicValues.size() == 1
			groups[0].characteristicValues[0].characteristic == "Surround Mode"
			groups[0].characteristicValues[0].value == "Stereo"
			groups[1].groupDescription == "Front Speakers"
			groups[1].characteristicValues.size() == 2
			groups[1].characteristicValues[0].characteristic == "Speaker Model"
			groups[1].characteristicValues[0].value == "Yamaha NS-F160"
			groups[1].characteristicValues[1].characteristic == "Speaker Color"
			groups[1].characteristicValues[1].value == "Black Gloss"
		}

		where:
		format << [XML, JSON]
	}

	protected updateConfigInCart(RESTClient client, customer, cartID, basePathWithSite = getBasePathWithSite()) {
		// configure cart entry
		def entryNumber = 0
		HttpResponseDecorator response = client.get(
				path: basePathWithSite + '/users/'+ customer.id + '/carts/' + cartID + '/entries/' + entryNumber + SLASH_CONFIGURATOR_TYPE_OCC,
				contentType : JSON,
				query : ['fields' : FIELD_SET_LEVEL_BASIC],
				requestContentType: JSON
				)
		String configId = response.data.configId

		// set SOURROUND MODE
		def putBody = response.data
		putBody.groups[0].attributes[0].value = "STEREO"
		HttpResponseDecorator responseAfterUpdate = client.patch(
				path: getBasePathWithSite() + SLASH_CONFIGURATOR_TYPE_OCC_SLASH + configId,
				body : putBody,
				contentType: JSON
				)

		// set FRONT SPEAKERS to make config complete
		response = restClient.get(
				path: getBasePathWithSite() + SLASH_CONFIGURATOR_TYPE_OCC_SLASH + configId  ,
				contentType: JSON,
				query:['groupId': '3-CPQ_FRONT_SPEAKERS@_GEN'],
				requestContentType: JSON
				)
		putBody = response.data;
		putBody.groups[3].subGroups[0].attributes[0].value = "YM_NS_F160"
		putBody.groups[3].subGroups[0].attributes[1].value = "BLK"
		responseAfterUpdate = client.patch(
				path: getBasePathWithSite() + SLASH_CONFIGURATOR_TYPE_OCC_SLASH + configId,
				body : putBody,
				contentType: JSON,
				)
		with(responseAfterUpdate) {
			data.complete == true
			data.consistent == true
		}

		// update cart entry
		def patchBody = orderToJsonMapping(PRODUCT_KEY, configId)
		HttpResponseDecorator responseAfterUpdateCart = client.put(
				path: basePathWithSite + '/users/' + customer.id + '/carts/' + cartID + '/entries/'+ entryNumber + SLASH_CONFIGURATOR_TYPE_OCC,
				body: patchBody,
				query: ['fields': FIELD_SET_LEVEL_FULL],
				contentType: JSON,
				requestContentType: JSON
				)
		if (isNotEmpty(responseAfterUpdateCart.data)) println(responseAfterUpdateCart.data)
		with(responseAfterUpdateCart) {
			status == SC_OK
		}
		return configId
	}

	protected getOverviewForOrderEntry(RESTClient client, customer, orderId, entryNumber, format, basePathWithSite = getBasePathWithSite()) {
		HttpResponseDecorator response = client.get(
				path: basePathWithSite + '/users/'+ CUSTOMER.id + '/orders/'+orderId+'/entries/' + entryNumber + SLASH_CONFIGURATOR_TYPE_OCC_SLASH + 'configurationOverview',
				contentType : format,
				query : ['fields' : FIELD_SET_LEVEL_BASIC],
				requestContentType: URLENC
				)

		LOG.info("overviewData: " + response.data.toString())
		with(response) {
			status == SC_OK
		}
		return response.data
	}

	protected void setPaymentDetailsForCart(RESTClient client, customer, cartID, paymentDetailsId, format, basePathWithSite = getBasePathWithSite()) {
		HttpResponseDecorator response = client.put(
				path: basePathWithSite + '/users/' + customer.id + '/carts/' + cartID + '/paymentdetails',
				query: ['paymentDetailsId': paymentDetailsId],
				contentType: format,
				requestContentType: URLENC
				)
		if (isNotEmpty(response.data)) println(response.data)
		with(response) { status == SC_OK }
	}

	protected placeOrder(RESTClient client, customer, cartID, format) {
		HttpResponseDecorator response = restClient.post(
				path: getBasePathWithSite() + '/users/' + customer.id + '/orders',
				query: [
					'cartId'      : cartID,
					'fields'      : FIELD_SET_LEVEL_FULL
				],
				contentType: format,
				requestContentType: URLENC
				)

		with(response) {
			if (isNotEmpty(data) && isNotEmpty(data.errors)) println(data)
			status == SC_CREATED
		}
		return response.data
	}

	protected getDeliveryModes(RESTClient client, customer, cartID, format, basePathWithSite = getBasePathWithSite()) {
		HttpResponseDecorator response = client.get(
				path: getBasePathWithSite() + '/users/' + customer.id + '/carts/' + cartID + '/deliverymodes',
				contentType: format,
				requestContentType: URLENC)

		if (isNotEmpty(response.data) && isNotEmpty(response.data.errors)) println(response.data)
		with(response) { status == SC_OK }
		return response.data
	}

	protected void setDeliveryModeForCart(RESTClient client, customer, cartID, deliveryModeId, format, basePathWithSite = getBasePathWithSite()) {
		HttpResponseDecorator response = client.put(
				path: basePathWithSite + '/users/' + customer.id + '/carts/' + cartID + '/deliverymode',
				query: ['deliveryModeId': deliveryModeId],
				contentType: format,
				requestContentType: URLENC
				)
		if (isNotEmpty(response.data)) println(response.data)
		with(response) { status == SC_OK }
	}

	protected getPaymentDetails(RESTClient client, customer, format, basePathWithSite = getBasePathWithSite()) {
		HttpResponseDecorator response = client.get(
				path: getBasePathWithSite() + '/users/' + customer.id + '/paymentdetails',
				query: ["fields": FIELD_SET_LEVEL_FULL],
				contentType: format,
				requestContentType: URLENC)
		if (isNotEmpty(response.data)) println(response.data)
		with(response) { status == SC_OK }
		return response.data
	}

	protected void setDeliveryAddressForCart(RESTClient client, customer, cartID, addressID, format, basePathWithSite = getBasePathWithSite()) {
		def response = client.put(
				path: basePathWithSite + '/users/' + customer.id + '/carts/' + cartID + '/addresses/delivery',
				query: ['addressId': addressID],
				contentType: format,
				requestContentType: URLENC
				)
		with(response) { status == SC_OK }
	}

	protected getAddress(RESTClient client, user, format = JSON, basePathWithSite = getBasePathWithSite()) {
		HttpResponseDecorator response = client.get(
				path: getBasePathWithSite() + '/users/' + user.id + "/addresses",
				query: [
					'fields': FIELD_SET_LEVEL_FULL
				],
				contentType: format,
				requestContentType: URLENC)

		with(response) {
			if (isNotEmpty(data) && isNotEmpty(data.errors)) println(data)
			status == SC_OK
			data.addresses[0].id != null
		}

		return response.data
	}

	protected createCart(RESTClient client, customer, format = JSON, basePathWithSite = getBasePathWithSite()) {
		def cart = returningWith(client.post(
				path: basePathWithSite + '/users/' + customer.id + '/carts',
				query: ['fields': FIELD_SET_LEVEL_FULL],
				contentType: format,
				requestContentType: URLENC), {
					if (isNotEmpty(data) && isNotEmpty(data.errors)) println(data)
					status == SC_OK
				}).data
		return cart
	}
}
