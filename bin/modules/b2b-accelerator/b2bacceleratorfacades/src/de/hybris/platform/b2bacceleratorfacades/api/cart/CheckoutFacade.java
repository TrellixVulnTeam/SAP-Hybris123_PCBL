/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.b2bacceleratorfacades.api.cart;

import de.hybris.platform.b2bacceleratorfacades.checkout.data.PlaceOrderData;
import de.hybris.platform.b2bacceleratorfacades.order.data.B2BDaysOfWeekData;
import de.hybris.platform.b2bacceleratorfacades.order.data.B2BPaymentTypeData;
import de.hybris.platform.b2bacceleratorfacades.order.data.ScheduledCartData;
import de.hybris.platform.b2bacceleratorfacades.order.data.TriggerData;
import de.hybris.platform.commercefacades.order.data.AbstractOrderData;
import de.hybris.platform.commercefacades.order.data.CartData;
import de.hybris.platform.order.InvalidCartException;

import java.util.List;


/**
 * Defines an API for Checkout, responsible for managing all necessary information for checkout.
 *
 */
public interface CheckoutFacade
{

	/**
	 * update the checkout cart data
	 *
	 * @param cartData
	 * @return CartData
	 */
	CartData updateCheckoutCart(final CartData cartData);

	/**
	 * Sets the cost center on all the entries of the order
	 *
	 * @param costCenterCode
	 *           A unique identifier of a cost center, If null all entries of the order will be set with a null cost
	 *           center
	 * @param orderCode
	 *           A unique identifier of an Order or Cart.
	 * @return Order data
	 */
	<T extends AbstractOrderData> T setCostCenterForCart(String costCenterCode, String orderCode);

	/**
	 * Gets the list of possible PaymentTypes for user selection in checkout summary
	 *
	 * @return B2BPaymentTypeEnum
	 */
	List<B2BPaymentTypeData> getPaymentTypes();

	/**
	 * Call the Enum service to fetch the list of days in a week using DayOfWeek enum
	 *
	 * @return List of days in a week
	 */
	List<B2BDaysOfWeekData> getDaysOfWeekForReplenishmentCheckoutSummary();

	/**
	 * Places the cart that's in the session as a scheduled order scheduled by the Trigger parameter
	 *
	 * @param trigger
	 * @return ScheduledCartData created
	 */
	ScheduledCartData scheduleOrder(TriggerData trigger);

	/**
	 * Creates {@link de.hybris.platform.core.model.order.CartModel} based on an order removes the current session carts
	 * and sets the new cart into the session.
	 *
	 * @param orderCode
	 *           The unique identifier for an order
	 */
	void createCartFromOrder(final String orderCode);

	/**
	 * Place Order function
	 *
	 * @param placeOrderData
	 * @return OrderData
	 * @throws InvalidCartException
	 */
	<T extends AbstractOrderData> T placeOrder(PlaceOrderData placeOrderData) throws InvalidCartException;
}
