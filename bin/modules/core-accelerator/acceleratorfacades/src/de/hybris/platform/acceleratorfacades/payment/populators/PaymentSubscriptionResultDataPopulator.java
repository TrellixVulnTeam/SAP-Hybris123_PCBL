/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.acceleratorfacades.payment.populators;

import de.hybris.platform.acceleratorfacades.payment.data.PaymentSubscriptionResultData;
import de.hybris.platform.acceleratorservices.payment.data.PaymentSubscriptionResultItem;
import de.hybris.platform.commercefacades.order.data.CCPaymentInfoData;
import de.hybris.platform.converters.Populator;
import de.hybris.platform.core.model.order.payment.CreditCardPaymentInfoModel;
import de.hybris.platform.servicelayer.dto.converter.ConversionException;
import de.hybris.platform.servicelayer.dto.converter.Converter;

import org.springframework.beans.factory.annotation.Required;

/**
 */
public class PaymentSubscriptionResultDataPopulator implements Populator<PaymentSubscriptionResultItem, PaymentSubscriptionResultData>
{
	private Converter<CreditCardPaymentInfoModel, CCPaymentInfoData> creditCardPaymentInfoConverter;

	protected Converter<CreditCardPaymentInfoModel, CCPaymentInfoData> getCreditCardPaymentInfoConverter()
	{
		return creditCardPaymentInfoConverter;
	}

	@Required
	public void setCreditCardPaymentInfoConverter(final Converter<CreditCardPaymentInfoModel, CCPaymentInfoData> creditCardPaymentInfoConverter)
	{
		this.creditCardPaymentInfoConverter = creditCardPaymentInfoConverter;
	}

	@Override
	public void populate(final PaymentSubscriptionResultItem source, final PaymentSubscriptionResultData target) throws ConversionException
	{
		target.setSuccess(source.isSuccess());
		target.setDecision(source.getDecision());
		target.setResultCode(source.getResultCode());
		target.setErrors(source.getErrors());

		if (source.getStoredCard() != null)
		{
			target.setStoredCard(getCreditCardPaymentInfoConverter().convert(source.getStoredCard()));
		}
	}
}
