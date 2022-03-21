/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.b2bacceleratorfacades.customer.impl;

import de.hybris.platform.b2bacceleratorfacades.customer.exception.InvalidPasswordException;
import de.hybris.platform.commercefacades.customer.CustomerFacade;
import de.hybris.platform.commercefacades.customer.impl.DefaultCustomerFacade;
import de.hybris.platform.commercefacades.user.exceptions.PasswordMismatchException;
import de.hybris.platform.commerceservices.customer.TokenInvalidatedException;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Required;


/**
 * B2B implementation for {@link CustomerFacade}.
 */
public class DefaultB2BCustomerFacade extends DefaultCustomerFacade
{
	private String passwordPattern;

	@Override
	public void updatePassword(final String token, final String newPassword)
			throws TokenInvalidatedException, InvalidPasswordException
	{
		validatePassword(newPassword);
		super.updatePassword(token, newPassword);
	}

	@Override
	public void changePassword(final String oldPassword, final String newPassword)
			throws PasswordMismatchException, InvalidPasswordException
	{
		validatePassword(newPassword);
		super.changePassword(oldPassword, newPassword);
	}

	/**
	 * Validates password.
	 *
	 * @param password
	 *           containing the password string to be validated.
	 * @return returns a boolean (true ou false) result.
	 */
	public boolean validatePassword(final String password)
	{
		boolean isValid = false;
		if (StringUtils.isNotBlank(passwordPattern))
		{
			isValid = password.matches(passwordPattern);
		}
		if (!isValid)
		{
			throw new InvalidPasswordException("Password does not match pattern.");
		}
		return isValid;
	}

	public String getPasswordPattern()
	{
		return passwordPattern;
	}

	@Required
	public void setPasswordPattern(final String passwordPattern)
	{
		this.passwordPattern = passwordPattern;
	}

}
