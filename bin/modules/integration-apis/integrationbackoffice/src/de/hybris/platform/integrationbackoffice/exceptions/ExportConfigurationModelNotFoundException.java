/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.integrationbackoffice.exceptions;

import de.hybris.platform.servicelayer.exceptions.ModelNotFoundException;

import java.util.Locale;

public class ExportConfigurationModelNotFoundException extends IntegrationBackofficeException
{
	private static final String MESSAGE_TEMPLATE = "An entity or an entity instance may have been deleted. Please refresh the list of instances.";
	private static final String LOCALIZED_STRING_KEY = String.format("integrationbackoffice.exceptionTranslation.msg.%s",
			ExportConfigurationModelNotFoundException.class.getSimpleName()).toLowerCase(Locale.ENGLISH);

	public ExportConfigurationModelNotFoundException(final ModelNotFoundException e)
	{
		super(e, MESSAGE_TEMPLATE);
	}

	@Override
	protected String getLocalizedStringKey()
	{
		return LOCALIZED_STRING_KEY;
	}
}
