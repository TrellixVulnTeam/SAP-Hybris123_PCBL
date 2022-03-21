/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.integrationbackoffice.exceptions;

import de.hybris.platform.core.Registry;
import de.hybris.platform.integrationservices.util.Log;
import de.hybris.platform.servicelayer.i18n.L10NService;

import java.text.MessageFormat;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.BeansException;

/**
 * The base exception for integration backoffice exceptions with localized messages.
 */
public abstract class IntegrationBackofficeException extends RuntimeException
{
	private static final Logger LOG = Log.getLogger(IntegrationBackofficeException.class);
	private final String[] parameters;

	/**
	 * @param throwable  The cause of this exception
	 * @param message    The error message of this exception
	 * @param parameters The error message's parameters.
	 */
	protected IntegrationBackofficeException(final Throwable throwable, final String message, final String... parameters)
	{
		super(MessageFormat.format(message, parameters), throwable);
		this.parameters = parameters;
	}

	/**
	 * @param message    The error message of this exception
	 * @param parameters The error message's parameters.
	 */
	protected IntegrationBackofficeException(final String message, final String... parameters)
	{
		this(null, message, parameters);
	}

	@Override
	public String getLocalizedMessage()
	{
		final L10NService l10NService = getL10nService();
		if (l10NService != null)
		{
			final String localizedString = l10NService.getLocalizedString(getLocalizedStringKey());
			if (!isLocalizedStringEmpty(localizedString))
			{
				return MessageFormat.format(localizedString, parameters);
			}
		}
		return this.getMessage();
	}

	/**
	 * For each exception that extends this exception, a key must be specified to obtain a localized string from which
	 * the localized error message will be built.
	 *
	 * @return the key of the localized string.
	 */
	protected abstract String getLocalizedStringKey();

	L10NService getL10nService()
	{
		try
		{
			return Registry.getApplicationContext().getBean(L10NService.class, "l10nService");
		}
		catch (final BeansException | ClassCastException exception)
		{
			LOG.warn("Cannot get bean l10nService for localization of {} message.", this.getClass().getSimpleName());
		}
		return null;
	}

	private boolean isLocalizedStringEmpty(final String localizedString)
	{
		return StringUtils.isBlank(localizedString) || getLocalizedStringKey().equalsIgnoreCase(localizedString);
	}
}
