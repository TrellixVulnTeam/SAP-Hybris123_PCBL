/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.integrationbackoffice.exceptions;

import java.util.Locale;

/**
 * Exception that occurs when dealing with entity instances while no entity is selected in the export configuration editor.
 */
public class ExportConfigurationEntityNotSelectedException extends IntegrationBackofficeException
{
	private static final String MESSAGE_TEMPLATE = "No entity is currently selected in the editor.";
	private static final String LOCALIZED_STRING_KEY = String.format("integrationbackoffice.exceptionTranslation.msg.%s",
			ExportConfigurationEntityNotSelectedException.class.getSimpleName()).toLowerCase(Locale.ENGLISH);

	public ExportConfigurationEntityNotSelectedException()
	{
		super(MESSAGE_TEMPLATE);
	}

	@Override
	protected String getLocalizedStringKey()
	{
		return LOCALIZED_STRING_KEY;
	}
}
