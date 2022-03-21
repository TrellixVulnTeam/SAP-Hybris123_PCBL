/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.inboundservices.exceptions;

import de.hybris.platform.integrationservices.exception.LocalizedInterceptorException;
import de.hybris.platform.inboundservices.model.IntegrationClientCredentialsDetailsModel;

import java.util.Locale;

/**
 * An exception indicating an {@link IntegrationClientCredentialsDetailsModel}
 * cannot be created if {@link IntegrationClientCredentialsDetailsModel#getUser()}'s uid is admin
 */
public class CannotCreateIntegrationClientCredentialsDetailWithAdminException extends LocalizedInterceptorException
{
	private static final String ERROR_MSG = "Cannot create IntegrationClientCredentialsDetails with admin user.";
	private static final String BUNDLE_KEY = String.format("inboundservices.exceptionTranslation.msg.%s",
			CannotCreateIntegrationClientCredentialsDetailWithAdminException.class.getSimpleName())
	                                               .toLowerCase(Locale.ENGLISH);

	/**
	 * Constructor to create CannotCreateIntegrationClientCredentialsDetailWithAdminException
	 */
	public CannotCreateIntegrationClientCredentialsDetailWithAdminException()
	{
		super(ERROR_MSG);
	}

	@Override
	protected String getBundleKey()
	{
		return BUNDLE_KEY;
	}
}
