/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.acceleratorwebservicesaddon.payment.service;


import de.hybris.platform.commercewebservicescommons.model.payment.PaymentSubscriptionResultModel;
import de.hybris.platform.servicelayer.exceptions.UnknownIdentifierException;


/**
 * Service for managing payment subscription result
 *
 * @spring.bean paymentSubscriptionResultService
 */
public interface PaymentSubscriptionResultService
{
	/**
	 * Returns payment subscription result by given cart id
	 *
	 * @param cartId
	 * 		- cart identifier
	 * @return payment subscription result
	 * @throws IllegalArgumentException
	 * 		when 'cartId' parameter is null
	 * @throws UnknownIdentifierException
	 * 		when there is no result related to cart with given id
	 */
	PaymentSubscriptionResultModel findPaymentSubscriptionResultByCart(String cartId);

	/**
	 * Remove payment subscription result related to cart with given cartId
	 *
	 * @param cartId
	 * 		- cart identifier (code or guid)
	 * @throws IllegalArgumentException
	 * 		when 'cartId' parameter is null
	 */
	void removePaymentSubscriptionResultForCart(String cartId);

	/**
	 * Remove payment subscription result related to cart with given cartCode or cart guid
	 *
	 * @param cartCode
	 * 		Cart code
	 * @param cartGuid
	 * 		Cart guid
	 * @throws IllegalArgumentException
	 * 		when 'cartCode' or 'cartGuid' parameter is null
	 */
	void removePaymentSubscriptionResultForCart(String cartCode, String cartGuid);

	/**
	 * Save payment subscription result model
	 *
	 * @param paymentSubscriptionResultModel
	 * 		- object to save
	 * @throws IllegalArgumentException
	 * 		when 'paymentSubscriptionResultModel' parameter is null
	 */
	void savePaymentSubscriptionResult(PaymentSubscriptionResultModel paymentSubscriptionResultModel);
}
