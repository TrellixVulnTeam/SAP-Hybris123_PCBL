/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package de.hybris.platform.sap.productconfig.testdata.occ.setup;

import de.hybris.bootstrap.config.ConfigUtil;
import de.hybris.bootstrap.config.ExtensionInfo;
import de.hybris.bootstrap.config.PlatformConfig;
import de.hybris.platform.commerceservices.dataimport.impl.CoreDataImportService;
import de.hybris.platform.commerceservices.dataimport.impl.SampleDataImportService;
import de.hybris.platform.commerceservices.setup.AbstractSystemSetup;
import de.hybris.platform.core.initialization.SystemSetupParameter;
import de.hybris.platform.util.Utilities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Required;


public class ProductConfigOCCTestsSetup extends AbstractSystemSetup
{
	private static final String SEARCH_INDEX_NAME = "wsTest";
	private CoreDataImportService coreDataImportService;
	private SampleDataImportService sampleDataImportService;

	public void loadData(final boolean loadSolrData)
	{
		getSetupImpexService().importImpexFile(
				"/sapproductconfigocctests/import/sampledata/productCatalogs/testConfigureCatalog/sapProductConfig_basic_testDataStandalone.impex",
				false);

		getSetupImpexService().importImpexFile(
				"/sapproductconfigocctests/import/sampledata/productCatalogs/testConfigureCatalog/sapProductConfigMedia.impex",
				false);

		if (loadSolrData)
		{
			getSetupImpexService().importImpexFile(
					"/sapproductconfigocctests/import/sampledata/productCatalogs/testConfigureCatalog/sapProductConfigSolr.impex",
					false);
			getSetupSolrIndexerService().executeSolrIndexerCronJob(String.format("%sIndex", SEARCH_INDEX_NAME), true);
		}
		if (isExtensionInSetup("promotionengineservices"))
		{
			// to avoid log is flooded with
			// java.lang.IllegalStateException: No rule engine context could be derived for order/cart
			getSetupImpexService().importImpexFile("/sapproductconfigservices/test/sapProductConfig_promotionDummyTestData.impex",
					false);
		}
		if (isExtensionInSetup("sapproductconfigintegration"))
		{
			getSetupImpexService().importImpexFile(
					"/sapproductconfigocctests/import/sampledata/productCatalogs/testConfigureCatalog/sapProductConfig_sapconfiguration_testData.impex",
					false);
		}
	}

	public final boolean isExtensionInSetup(final String extension)
	{
		final PlatformConfig platformConfig = ConfigUtil.getPlatformConfig(Utilities.class);
		final ExtensionInfo extensionInfo = platformConfig.getExtensionInfo(extension);
		return (extensionInfo != null);
	}

	@Override
	public List<SystemSetupParameter> getInitializationOptions()
	{
		final List<SystemSetupParameter> params = new ArrayList<>();

		params.add(createBooleanSystemSetupParameter(CoreDataImportService.IMPORT_CORE_DATA, "Import Core Data", true));
		params.add(createBooleanSystemSetupParameter(SampleDataImportService.IMPORT_SAMPLE_DATA, "Import Sample Data", true));
		params.add(
				createBooleanSystemSetupParameter(CoreDataImportService.ACTIVATE_SOLR_CRON_JOBS, "Activate Solr Cron Jobs", true));

		return params;
	}

	public CoreDataImportService getCoreDataImportService()
	{
		return coreDataImportService;
	}

	@Required
	public void setCoreDataImportService(final CoreDataImportService coreDataImportService)
	{
		this.coreDataImportService = coreDataImportService;
	}

	public SampleDataImportService getSampleDataImportService()
	{
		return sampleDataImportService;
	}

	@Required
	public void setSampleDataImportService(final SampleDataImportService sampleDataImportService)
	{
		this.sampleDataImportService = sampleDataImportService;
	}

}
