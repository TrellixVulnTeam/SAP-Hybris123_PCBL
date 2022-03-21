/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundsync.exceptions;

import de.hybris.platform.integrationservices.exception.CannotDeleteIntegrationObjectException;

import java.util.Locale;

/**
 * An exception indicating an Integration Object {@link de.hybris.platform.integrationservices.model.IntegrationObjectModel}
 * cannot be deleted if it was assigned to an OutboundChannelConfiguration
 * {@link de.hybris.platform.outboundsync.model.OutboundChannelConfigurationModel}
 */
public class CannotDeleteIntegrationObjectLinkedWithOutboundChannelConfigException extends CannotDeleteIntegrationObjectException
{
	private static final String ERROR_MESSAGE_TEMPLATE = "The [%s] cannot be deleted because it is in use with " +
			"OutboundChannelConfiguration: %s . Please delete the related OutboundChannelConfiguration and try again.";
	private static final String BUNDLE_KEY = String.format("outboundsync.exceptionTranslation.msg.%s",
			CannotDeleteIntegrationObjectLinkedWithOutboundChannelConfigException.class.getSimpleName())
	                                               .toLowerCase(Locale.ENGLISH);

	/**
	 * Constructor
	 *
	 * @param integrationObject integration object code
	 */
	public CannotDeleteIntegrationObjectLinkedWithOutboundChannelConfigException(final String integrationObject,
	                                                                             final String occCode)
	{
		super(String.format(ERROR_MESSAGE_TEMPLATE, integrationObject, occCode), occCode);
	}

	protected String getBundleKey()
	{
		return BUNDLE_KEY;
	}
}

