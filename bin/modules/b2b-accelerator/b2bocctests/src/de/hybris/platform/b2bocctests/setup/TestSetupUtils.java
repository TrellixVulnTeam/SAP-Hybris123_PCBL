/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.b2bocctests.setup;

import de.hybris.platform.commerceservices.constants.CommerceServicesConstants;
import de.hybris.platform.commerceservices.order.strategies.impl.DefaultQuoteUserTypeIdentificationStrategy;
import de.hybris.platform.core.Registry;
import de.hybris.platform.servicelayer.user.UserService;
import de.hybris.platform.util.Config;

/**
 * Utility class to be used in test suites to manage tests (e.g. start server, load data).
 */
public class TestSetupUtils extends de.hybris.platform.commercewebservicestests.setup.TestSetupUtils
{
	public static void loadExtensionDataInJunit()
	{
		Registry.setCurrentTenantByID("junit");
		loginAdmin();
		loadExtensionData();
		defineQuoteRoles();
		defineQuoteThresholds();
	}

	public static void loadExtensionData()
	{
		final B2BOCCTestSetup b2bOccTestSetup = Registry.getApplicationContext().getBean("b2BOCCTestSetup", B2BOCCTestSetup.class);
		b2bOccTestSetup.loadData();
	}

	private static void loginAdmin()
	{
		final UserService userService = Registry.getApplicationContext().getBean("userService", UserService.class);
		userService.setCurrentUser(userService.getAdminUser());

	}

	private static void defineQuoteRoles()
	{
		final DefaultQuoteUserTypeIdentificationStrategy defaultQuoteUserTypeIdentificationStrategy = Registry
				.getApplicationContext()
				.getBean("defaultQuoteUserTypeIdentificationStrategy", DefaultQuoteUserTypeIdentificationStrategy.class);
		defaultQuoteUserTypeIdentificationStrategy.setBuyerGroup("b2bcustomergroup");
		defaultQuoteUserTypeIdentificationStrategy.setSellerGroup("b2bsellergroup");
		defaultQuoteUserTypeIdentificationStrategy.setSellerApproverGroup("b2bapprovergroup");
	}

	private static void defineQuoteThresholds()
	{
		Config.setParameter(CommerceServicesConstants.QUOTE_REQUEST_INITIATION_THRESHOLD, "1500");
		Config.setParameter(CommerceServicesConstants.QUOTE_APPROVAL_THRESHOLD, "7500");
	}

}
