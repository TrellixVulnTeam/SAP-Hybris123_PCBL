/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.b2b.punchout.actions;

import de.hybris.platform.b2b.punchout.PunchOutException;
import de.hybris.platform.b2b.punchout.PunchOutResponseCode;
import de.hybris.platform.commercefacades.order.CheckoutFacade;
import de.hybris.platform.commercefacades.order.data.OrderData;
import de.hybris.platform.core.model.order.CartModel;
import de.hybris.platform.order.InvalidCartException;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.cxml.CXML;
import org.springframework.beans.factory.annotation.Required;


/**
 * Places an order using the session shopping cart.
 */
public class PlacePurchaseOrderProcessingAction implements PunchOutProcessingAction<CXML, CartModel>
{
	private static final Logger LOG = Logger.getLogger(PlacePurchaseOrderProcessingAction.class);

	/**
	 * @deprecated Since 5.5.
	 */
	@Deprecated(since = "5.5", forRemoval = true)
	@Resource(name = "b2bCheckoutFacade")
	private CheckoutFacade checkoutFacade;

	@Override
	public void process(final CXML input, final CartModel output)
	{
		final String cartCode = output.getCode();
		LOG.debug(String.format("Placing an order for cart with code: %s", cartCode));

		try
		{
			final OrderData orderData = checkoutFacade.placeOrder();
			LOG.debug(String.format("Order with code %s was placed.", orderData.getCode()));
		}
		catch (final InvalidCartException e)
		{
			throw new PunchOutException(PunchOutResponseCode.CONFLICT, "Unable to checkout", e);
		}
	}

	@Required
	public void setCheckoutFacade(final CheckoutFacade checkoutFacade)
	{
		this.checkoutFacade = checkoutFacade;
	}
}
