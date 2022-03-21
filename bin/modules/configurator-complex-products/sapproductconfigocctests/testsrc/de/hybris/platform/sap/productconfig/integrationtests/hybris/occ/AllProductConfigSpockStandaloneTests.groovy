/*
 * [y] hybris Platform
 *
 * Copyright (c) 2017 SAP SE or an SAP affiliate company.  All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.productconfig.integrationtests.hybris.occ

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.sap.productconfig.testdata.occ.setup.TestSetupStandalone

import org.junit.AfterClass
import org.junit.BeforeClass
import org.junit.Test
import org.junit.runner.RunWith
import org.junit.runners.Suite
import org.slf4j.LoggerFactory

@RunWith(Suite.class)
@Suite.SuiteClasses([
	//MultipleConfiguratorsWsIntegrationTest,
	ProductConfigWsIntegrationTest,
	ProductConfigWsMediaTest,
	ProductConfigOverviewWsIntegrationTest,
	ProductConfigPricingWsIntegrationTest,
	CartIntegrationWsIntegrationTest,
	OrderIntegrationWsIntegrationTest
])
@IntegrationTest
class AllProductConfigSpockStandaloneTests {
	private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(AllProductConfigSpockStandaloneTests.class)

	@BeforeClass
	public static void setUpClass() {
		TestSetupStandalone.loadData(false)
		TestSetupStandalone.startServer()
		TestSetupStandalone.ensureMockProvider()
	}

	@AfterClass
	public static void tearDown() {
		TestSetupStandalone.cleanData()
	}

	@Test
	public static void testing() {
		//dummy test class
	}
}
