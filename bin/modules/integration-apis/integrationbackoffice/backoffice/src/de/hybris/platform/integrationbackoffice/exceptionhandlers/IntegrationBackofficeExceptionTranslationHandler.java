/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.integrationbackoffice.exceptionhandlers;

import java.util.List;

/**
 * A class for translating target exceptions to localized error messages for integration backoffice.
 */
public class IntegrationBackofficeExceptionTranslationHandler extends IntegrationApiExceptionTranslationHandler
{
	private static final List<String> TARGET_EXCEPTIONS = List.of(
			"CannotDeleteIntegrationObjectLinkedWithInboundChannelConfigException",
			"CannotDeleteIntegrationObjectLinkedWithOutboundChannelConfigException",
			"CannotDeleteIntegrationObjectLinkedWithWebhookConfigException",
			"ExportConfigurationModelNotFoundException",
			"ExportConfigurationEntityNotSelectedException",
			"CannotCreateIntegrationClientCredentialsDetailWithAdminException"
	);

	@Override
	public String convertExceptionToResourceMsg(final Throwable exception)
	{
		return "";
	}

	@Override
	protected final List<String> getTargetedException()
	{
		return TARGET_EXCEPTIONS;
	}
}
