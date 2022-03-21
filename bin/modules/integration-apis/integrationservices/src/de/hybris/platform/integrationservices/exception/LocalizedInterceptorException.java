/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.integrationservices.exception;

import de.hybris.platform.core.Registry;
import de.hybris.platform.integrationservices.util.Log;
import de.hybris.platform.servicelayer.i18n.L10NService;
import de.hybris.platform.servicelayer.interceptor.InterceptorException;

import java.text.MessageFormat;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.BeansException;

/**
 * An exception with localized message that is thrown by an interceptor.
 */
public abstract class LocalizedInterceptorException extends InterceptorException
{
	private static final Logger LOG = Log.getLogger(LocalizedInterceptorException.class);

	private String localizedMessage;
	private final String[] parameters;

	/**
	 * @param message    The error message of this exception. This message is assigned in exceptions that extend this one and is used to clarify its meaning.
	 * @param parameters The parameters that are used for interpolation. The localized error messages returned by localization service
	 *                   may contain one or more placeholders and need to be evaluated with given parameters.
	 */
	protected LocalizedInterceptorException(final String message, final String... parameters)
	{
		super(message);
		this.parameters = parameters;
	}

	@Override
	public String getLocalizedMessage()
	{
		if (localizedMessage == null)
		{
			localizedMessage = createLocalizedMessage();
		}
		return localizedMessage;
	}

	private String createLocalizedMessage()
	{
		L10NService l10NService = getL10nService();
		if (l10NService != null)
		{
			final String bundleMsg = l10NService.getLocalizedString(getBundleKey());
			if (!StringUtils.isBlank(bundleMsg) && !getBundleKey().equalsIgnoreCase(bundleMsg))
			{
				return MessageFormat.format(bundleMsg, parameters);
			}
		}
		return this.getMessage();
	}


	/**
	 * It returns a localization service that offers localized error messages for this exception.
	 *
	 * @return a localization service or null if the service is not available.
	 */
	protected L10NService getL10nService()
	{
		try
		{
			return (L10NService) Registry.getApplicationContext().getBean("l10nService");
		}
		catch (BeansException | ClassCastException exception)
		{
			LOG.warn("cannot get bean: l10nService for localizing error message in creating {}.",
					this.getClass().getSimpleName());
		}
		return null;
	}


	/**
	 * For each exception that extends this exception, it has to specify the bundle key with which the localized error message could
	 * be retrieved from the bundle resource.
	 *
	 * @return bundle key.
	 */
	protected abstract String getBundleKey();
}
