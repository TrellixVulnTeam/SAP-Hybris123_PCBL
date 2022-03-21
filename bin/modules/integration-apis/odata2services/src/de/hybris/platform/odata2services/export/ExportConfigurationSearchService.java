/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.odata2services.export;

import de.hybris.platform.core.model.ItemModel;
import de.hybris.platform.core.model.type.AttributeDescriptorModel;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;
import de.hybris.platform.odata2services.dto.ConfigurationBundleEntity;
import de.hybris.platform.odata2services.dto.IntegrationObjectBundleEntity;
import de.hybris.platform.odata2services.export.impl.DefaultExportConfigurationConverter;

import java.util.Set;

/**
 * Defines search helper methods for the configuration conversion service {@link DefaultExportConfigurationConverter}.
 */
public interface ExportConfigurationSearchService
{
	/**
	 * Find all the related root item model instances of a given integration object.
	 *
	 * @param integrationObjectBundleEntity passes an integration object and its root item instances {@link IntegrationObjectBundleEntity}
	 * @return set of integration object root item model instances {@link Set<ItemModel>}
	 */
	Set<ItemModel> findRootItemInstances(IntegrationObjectBundleEntity integrationObjectBundleEntity);

	/**
	 * Read the configured integration object codes from the project properties and return all the exportable integration objects.
	 *
	 * @return set of exportable integration objects {@link Set<IntegrationObjectModel>}.
	 */
	Set<IntegrationObjectModel> getExportableIntegrationObjects();

	/**
	 * Find an integration object with the given code.
	 *
	 * @param integrationObjectCode integration object code
	 * @return integration object with the given code
	 */
	IntegrationObjectModel findExportableIntegrationObjectByCode(String integrationObjectCode);

	/**
	 * Find the runtime attribute descriptors for all the integration object selected runtime attributes.
	 *
	 * @param configurationBundleEntity configuration bundle entity
	 * @return runtime attribute descriptors
	 */
	Set<AttributeDescriptorModel> findRuntimeAttributeDescriptors(ConfigurationBundleEntity configurationBundleEntity);

}
