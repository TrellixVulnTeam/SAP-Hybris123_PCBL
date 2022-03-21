/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.b2b.occ.v2.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import de.hybris.bootstrap.annotations.UnitTest;
import de.hybris.platform.b2b.occ.validators.B2BPlaceOrderCartValidator;
import de.hybris.platform.b2bacceleratorfacades.api.cart.CartFacade;
import de.hybris.platform.b2bacceleratorfacades.order.data.B2BPaymentTypeData;
import de.hybris.platform.b2bacceleratorfacades.order.impl.DefaultB2BAcceleratorCheckoutFacade;
import de.hybris.platform.b2bwebservicescommons.dto.order.ReplenishmentOrderWsDTO;
import de.hybris.platform.b2bwebservicescommons.dto.order.ScheduleReplenishmentFormWsDTO;
import de.hybris.platform.commercefacades.order.data.AbstractOrderData;
import de.hybris.platform.commercefacades.order.data.CartData;
import de.hybris.platform.commercefacades.order.data.CartModificationData;
import de.hybris.platform.commercefacades.user.UserFacade;
import de.hybris.platform.commerceservices.order.CommerceCartModificationException;
import de.hybris.platform.commerceservices.order.CommerceCartModificationStatus;
import de.hybris.platform.commercewebservicescommons.dto.order.OrderWsDTO;
import de.hybris.platform.commercewebservicescommons.errors.exceptions.PaymentAuthorizationException;
import de.hybris.platform.commercewebservicescommons.strategies.CartLoaderStrategy;
import de.hybris.platform.order.InvalidCartException;
import de.hybris.platform.webservicescommons.errors.exceptions.WebserviceValidationException;
import de.hybris.platform.webservicescommons.mapping.DataMapper;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.validation.Validator;

@UnitTest
@RunWith(MockitoJUnitRunner.class)
public class B2BOrdersControllerTest
{
	private static final String CART_ID = "MY_CART_ID";
	private static final String FIELDS = "MY_FIELDS";
	private static final String PAYMENT_CODE = "CARD";

	@Spy
	private OrderWsDTO orderWsDTO;
	@Spy
	private ReplenishmentOrderWsDTO replenishmentOrderWsDTO;
	@Mock
	private DataMapper dataMapper;
	@InjectMocks
	private B2BOrdersController controller;
	@Mock
	private CartData cartData;
	@Mock
	private UserFacade userFacade;
	@Mock
	private CartLoaderStrategy cartLoaderStrategy;
	@Mock
	private CartFacade cartFacade;
	@Mock
	private B2BPlaceOrderCartValidator placeOrderCartValidator;
	@Mock
	private DefaultB2BAcceleratorCheckoutFacade b2bCheckoutFacade;
	@Mock
	private Validator scheduleReplenishmentFormWsDTOValidator;
	@Mock
	private AbstractOrderData abstractOrderData;
	@Mock
	private B2BPaymentTypeData b2BPaymentTypeData;
	@Mock
	private ScheduleReplenishmentFormWsDTO scheduleReplenishmentFormWsDTO;

	@Test
	public void testPlaceOrgOrder() throws CommerceCartModificationException, PaymentAuthorizationException, InvalidCartException
	{
		when(userFacade.isAnonymousUser()).thenReturn(false);
		when(cartFacade.getCurrentCart()).thenReturn(cartData);
		when(dataMapper.map(abstractOrderData, OrderWsDTO.class, FIELDS)).thenReturn(orderWsDTO);
		when(cartData.getPaymentType()).thenReturn(b2BPaymentTypeData);
		when(b2BPaymentTypeData.getCode()).thenReturn(PAYMENT_CODE);
		when(b2bCheckoutFacade.authorizePayment(any())).thenReturn(true);
		when(b2bCheckoutFacade.placeOrder(any())).thenReturn(abstractOrderData);

		final OrderWsDTO initOrderWsDTO = controller.placeOrgOrder(CART_ID, true, FIELDS);

		verify(userFacade).isAnonymousUser();
		verify(cartLoaderStrategy).loadCart(CART_ID);
		verify(cartFacade).getCurrentCart();
		verify(cartFacade).validateCurrentCartData();

		verify(dataMapper).map(abstractOrderData, OrderWsDTO.class, FIELDS);
		assertThat(initOrderWsDTO).isSameAs(orderWsDTO);
	}

	@Test
	public void testPlaceOrgOrderCartValidationReturnModificationsList() throws CommerceCartModificationException
	{
		final List<CartModificationData> modifications = getNewCommerceCartModifications();

		when(userFacade.isAnonymousUser()).thenReturn(false);
		when(cartFacade.getCurrentCart()).thenReturn(cartData);
		when(cartFacade.validateCurrentCartData()).thenReturn(modifications);

		assertThatThrownBy(() -> controller.placeOrgOrder(CART_ID, true, FIELDS))
				.isInstanceOf(WebserviceValidationException.class)
				.hasMessage("Validation error");

		verifyNoMoreInteractions(cartData);
		verifyNoMoreInteractions(b2bCheckoutFacade);
		verifyNoMoreInteractions(dataMapper);
	}

	@Test
	public void testPlaceOrgOrderCartValidationReturnCommerceCartModificationException() throws CommerceCartModificationException
	{
		final CommerceCartModificationException commerceCartModificationException = new CommerceCartModificationException("Error when validating a cart");
		doThrow(commerceCartModificationException).when(cartFacade).validateCurrentCartData();
		when(userFacade.isAnonymousUser()).thenReturn(false);
		when(cartFacade.getCurrentCart()).thenReturn(cartData);

		assertThatThrownBy(() -> controller.placeOrgOrder(CART_ID, true, FIELDS))
				.isInstanceOf(InvalidCartException.class)
				.hasCause(commerceCartModificationException);

		verifyNoMoreInteractions(cartData);
		verifyNoMoreInteractions(b2bCheckoutFacade);
		verifyNoMoreInteractions(dataMapper);
	}

	@Test
	public void testPlaceReplenishmentOrder() throws CommerceCartModificationException, PaymentAuthorizationException, InvalidCartException
	{
		when(userFacade.isAnonymousUser()).thenReturn(false);
		when(cartFacade.getCurrentCart()).thenReturn(cartData);
		when(dataMapper.map(abstractOrderData, ReplenishmentOrderWsDTO.class, FIELDS)).thenReturn(replenishmentOrderWsDTO);
		when(cartData.getPaymentType()).thenReturn(b2BPaymentTypeData);
		when(b2BPaymentTypeData.getCode()).thenReturn(PAYMENT_CODE);
		when(b2bCheckoutFacade.authorizePayment(any())).thenReturn(true);
		when(b2bCheckoutFacade.placeOrder(any())).thenReturn(abstractOrderData);


		final ReplenishmentOrderWsDTO initReplenishmentOrderWsDTO = controller.createReplenishmentOrder(CART_ID, true,scheduleReplenishmentFormWsDTO,FIELDS);

		verify(userFacade).isAnonymousUser();
		verify(cartLoaderStrategy).loadCart(CART_ID);
		verify(cartFacade).validateCurrentCartData();

		verify(dataMapper).map(abstractOrderData, ReplenishmentOrderWsDTO.class, FIELDS);
		assertThat(initReplenishmentOrderWsDTO).isSameAs(replenishmentOrderWsDTO);
	}

	@Test
	public void testPlaceReplenishmentOrderCartValidationReturnModificationsList() throws CommerceCartModificationException
	{
		final List<CartModificationData> modifications = getNewCommerceCartModifications();

		when(userFacade.isAnonymousUser()).thenReturn(false);
		when(cartFacade.getCurrentCart()).thenReturn(cartData);
		when(cartFacade.validateCurrentCartData()).thenReturn(modifications);

		assertThatThrownBy(() -> controller.createReplenishmentOrder(CART_ID, true, scheduleReplenishmentFormWsDTO, FIELDS))
				.isInstanceOf(WebserviceValidationException.class)
				.hasMessage("Validation error");

		verifyNoMoreInteractions(cartData);
		verifyNoMoreInteractions(b2bCheckoutFacade);
		verifyNoMoreInteractions(dataMapper);
	}

	@Test
	public void testPlaceReplenishmentOrderCartValidationReturnCommerceCartModificationException() throws CommerceCartModificationException
	{
		final CommerceCartModificationException commerceCartModificationException = new CommerceCartModificationException("Error when validating a cart");
		doThrow(commerceCartModificationException).when(cartFacade).validateCurrentCartData();
		when(userFacade.isAnonymousUser()).thenReturn(false);
		when(cartFacade.getCurrentCart()).thenReturn(cartData);

		assertThatThrownBy(() -> controller.createReplenishmentOrder(CART_ID, true, scheduleReplenishmentFormWsDTO, FIELDS))
				.isInstanceOf(InvalidCartException.class)
				.hasCause(commerceCartModificationException);

		verifyNoMoreInteractions(cartData);
		verifyNoMoreInteractions(b2bCheckoutFacade);
		verifyNoMoreInteractions(dataMapper);
	}

	private List<CartModificationData> getNewCommerceCartModifications() {
		final List<CartModificationData> modifications = new ArrayList<>();
		final CartModificationData cartModificationData = new CartModificationData();
		cartModificationData.setStatusCode(CommerceCartModificationStatus.NO_STOCK);

		modifications.add(cartModificationData);

		return modifications;
	}
}
