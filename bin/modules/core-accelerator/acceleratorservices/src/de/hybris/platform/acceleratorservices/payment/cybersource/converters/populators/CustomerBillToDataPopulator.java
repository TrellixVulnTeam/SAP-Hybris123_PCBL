/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.acceleratorservices.payment.cybersource.converters.populators;

import static de.hybris.platform.servicelayer.util.ServicesUtil.validateParameterNotNull;

import de.hybris.platform.acceleratorservices.payment.cybersource.converters.populators.response.AbstractResultPopulator;
import de.hybris.platform.acceleratorservices.payment.data.CustomerBillToData;
import de.hybris.platform.core.model.user.AddressModel;
import de.hybris.platform.servicelayer.dto.converter.ConversionException;


public class CustomerBillToDataPopulator extends AbstractResultPopulator<AddressModel, CustomerBillToData>
{
	@Override
	public void populate(final AddressModel source, final CustomerBillToData target) throws ConversionException
	{
		//We may not have any existing billing address.
		if (source == null)
		{
			return;
		}
		validateParameterNotNull(target, "Parameter [CustomerBillToData] target cannot be null");

		target.setBillToCustomerIdRef(source.getEmail()); //UID is the email address
		target.setBillToEmail(source.getEmail());

		target.setBillToCity(source.getTown());
		target.setBillToCompany(source.getCompany());
		target.setBillToCountry(source.getCountry().getIsocode());
		target.setBillToEmail(source.getEmail());
		target.setBillToFirstName(source.getFirstname());
		target.setBillToLastName(source.getLastname());
		target.setBillToPhoneNumber(source.getPhone1());
		target.setBillToPostalCode(source.getPostalcode());
		if (source.getRegion() != null)
		{
			target.setBillToState(source.getRegion().getIsocodeShort());
		}
		target.setBillToStreet1(source.getLine1());
		target.setBillToStreet2(source.getLine2());
	}
}
