/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.webhookbackoffice.handlers;

import de.hybris.platform.integrationbackoffice.exceptionhandlers.IntegrationApiExceptionTranslationHandler;

import java.util.List;

import org.zkoss.util.resource.Labels;

/**
 * Handler that translates exceptions so they appear in the Backoffice
 */
public class WebhookExceptionTranslationHandler extends IntegrationApiExceptionTranslationHandler
{
	private static final List<String> targetedException = List.of("DestinationCredNotMatchException",
			"WebhookConfigNotValidLocationException",
			"WebhookConfigInvalidChannelException", "DestinationTargetNoSupportedEventConfigException",
			"WebhookConfigNoEventConfigException");

	/**
	 * The exceptions that this handler is able to handle.
	 */
	@Override
	protected final List<String> getTargetedException()
	{
		return targetedException;
	}

	/**
	 * Try to get bundle resource with the className of the exception that is being handled.
	 * @param exception The exception that is being translated. Use its class name as key to get bundle resource
	 */
	@Override
	protected String convertExceptionToResourceMsg(final Throwable exception)
	{
		final String errorMessageFromExceptionPrefix = "webhookbackoffice.exceptionTranslation.msg.";
		return Labels.getLabel(errorMessageFromExceptionPrefix + exception.getClass().getSimpleName());
	}

}
