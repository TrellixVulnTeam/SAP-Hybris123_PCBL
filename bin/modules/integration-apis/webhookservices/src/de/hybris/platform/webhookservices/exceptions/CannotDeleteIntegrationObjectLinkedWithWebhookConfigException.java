/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.webhookservices.exceptions;

import de.hybris.platform.integrationservices.exception.CannotDeleteIntegrationObjectException;
import de.hybris.platform.webhookservices.model.WebhookConfigurationModel;

import java.util.Locale;


/**
 * An exception indicating an Integration Object {@link de.hybris.platform.integrationservices.model.IntegrationObjectModel}
 * cannot be deleted when a {@link WebhookConfigurationModel} references it
 */
public class CannotDeleteIntegrationObjectLinkedWithWebhookConfigException extends CannotDeleteIntegrationObjectException
{
	private static final String ERROR_MESSAGE_TEMPLATE = "The [%s] cannot be deleted because it is in use with at least one " +
			"WebhookConfiguration. Please delete the related WebhookConfiguration and try again.";
	private static final String BUNDLE_KEY = String.format("webhookservices.exceptionTranslation.msg.%s",
			CannotDeleteIntegrationObjectLinkedWithWebhookConfigException.class.getSimpleName())
	                                               .toLowerCase(Locale.ENGLISH);

	/**
	 * Constructor
	 *
	 * @param integrationObject integration object code
	 */
	public CannotDeleteIntegrationObjectLinkedWithWebhookConfigException(final String integrationObject)
	{
		super(String.format(ERROR_MESSAGE_TEMPLATE, integrationObject));
	}

	protected String getBundleKey()
	{
		return BUNDLE_KEY;
	}
}

