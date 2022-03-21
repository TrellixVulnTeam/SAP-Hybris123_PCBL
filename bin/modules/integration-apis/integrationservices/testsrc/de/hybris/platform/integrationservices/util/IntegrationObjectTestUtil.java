/*
 *  Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.integrationservices.util;

import de.hybris.platform.impex.jalo.ImpExException;
import de.hybris.platform.integrationservices.enums.AuthenticationType;
import de.hybris.platform.integrationservices.model.InboundChannelConfigurationModel;
import de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder;
import de.hybris.platform.integrationservices.IntegrationObjectModelBuilder;
import de.hybris.platform.integrationservices.model.DescriptorFactory;
import de.hybris.platform.integrationservices.model.IntegrationObjectDescriptor;
import de.hybris.platform.integrationservices.model.IntegrationObjectItemModel;
import de.hybris.platform.integrationservices.model.IntegrationObjectModel;

import java.util.Collection;
import java.util.Optional;

/**
 * Integration object test utility class.
 */
public class IntegrationObjectTestUtil
{
	public static IntegrationObjectModel createIntegrationObject(final String integrationObjectCode)
	{
		return IntegrationObjectModelBuilder.integrationObject().withCode(integrationObjectCode).build();
	}

	public static IntegrationObjectItemModel createIntegrationObjectRootItem(final IntegrationObjectModel integrationObject,
	                                                                         final String itemCode)
	{
		return createIntegrationObjectItem(integrationObject, itemCode, true);
	}

	public static IntegrationObjectItemModel createIntegrationObjectItem(final IntegrationObjectModel integrationObject,
	                                                                     final String itemCode, final boolean isRoot)
	{
		return IntegrationObjectItemModelBuilder.integrationObjectItem()
		                                        .withIntegrationObject(integrationObject)
		                                        .withCode(itemCode)
		                                        .withRoot(isRoot)
		                                        .build();
	}

	public static IntegrationObjectItemModel createIntegrationObjectItem(final IntegrationObjectModel integrationObject,
	                                                                     final String itemCode)
	{
		return IntegrationObjectTestUtil.createIntegrationObjectItem(integrationObject, itemCode, false);
	}

	public static IntegrationObjectModel findIntegrationObjectByCode(final String code)
	{
		return IntegrationTestUtil.findAny(IntegrationObjectModel.class,
				integrationObject -> integrationObject.getCode().equals(code)).orElse(null);
	}

	public static IntegrationObjectItemModel findIntegrationObjectItemByCodeAndIntegrationObject(final String code,
	                                                                                             final IntegrationObjectModel integrationObject)
	{
		return IntegrationTestUtil.findAny(IntegrationObjectItemModel.class,
				integrationObjectItem -> integrationObjectItem.getCode().equals(code) &&
						integrationObjectItem.getIntegrationObject().equals(integrationObject)).orElse(null);
	}

	/**
	 * Searches for a descriptor of the specified integration object.
	 *
	 * @param code code of the integration object to search descriptor for
	 * @return descriptor of the specified integration object or {@code null}, if such object does not exist.
	 */
	public static IntegrationObjectDescriptor findIntegrationObjectDescriptorByCode(final String code)
	{
		final DescriptorFactory factory = IntegrationTestUtil.getService("integrationServicesDescriptorFactory",
				DescriptorFactory.class);

		final Optional<IntegrationObjectModel> model = IntegrationTestUtil.findAny(IntegrationObjectModel.class,
				integrationObject -> integrationObject.getCode().equals(code));

		return model.map(factory::createIntegrationObjectDescriptor).orElse(null);
	}

	public static InboundChannelConfigurationModel createInboundChannelConfigurationModel(
			final IntegrationObjectModel integrationObject, final AuthenticationType authenticationType)
	{
		try
		{
			IntegrationTestUtil.importImpEx(
					"INSERT_UPDATE InboundChannelConfiguration; " + "integrationObject(code)[unique = true]; authenticationType(code)",
					"; " + integrationObject.getCode() + "; " + authenticationType.getCode() + ";");
		}
		catch (final ImpExException ex)
		{
			throw new RuntimeException(ex);
		}

		return findInboundChannelConfigurationObject(integrationObject.getCode());
	}

	public static IntegrationObjectModel createNullIntegrationTypeIntegrationObject(final String integrationObjectCode)
			throws ImpExException
	{
		IntegrationTestUtil.importImpEx("INSERT_UPDATE IntegrationObject; code[unique = true]; integrationType(code)",
				"                               ; " + integrationObjectCode + "; ;");
		return findIntegrationObjectByCode(integrationObjectCode);
	}

	public static InboundChannelConfigurationModel findInboundChannelConfigurationObject(final String iccCode)
	{

		return IntegrationTestUtil.findAny(InboundChannelConfigurationModel.class,
				icc -> Optional.ofNullable(icc.getIntegrationObject())
				               .map(integrationObject -> integrationObject.getCode().equals(iccCode))
				               .orElse(false)).orElse(null);

	}

	public static Collection<IntegrationObjectModel> cleanup()
	{
		return IntegrationTestUtil.removeAll(IntegrationObjectModel.class);
	}

}
