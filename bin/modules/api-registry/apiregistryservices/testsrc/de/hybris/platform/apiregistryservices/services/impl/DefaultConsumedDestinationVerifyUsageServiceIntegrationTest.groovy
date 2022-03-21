/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.apiregistryservices.services.impl

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.servicelayer.search.FlexibleSearchService
import org.junit.Test
import spock.lang.Issue

import javax.annotation.Resource

@IntegrationTest
@Issue('https://cxjira.sap.com/browse/IAPI-4703')
class DefaultConsumedDestinationVerifyUsageServiceIntegrationTest extends ServicelayerSpockSpecification{

    private static final def CONSUMEDDESTINATION_ID = "consumed-destination"

    @Resource
    DefaultConsumedDestinationVerifyUsageService consumedDestinationVerifyUsageService

    @Resource
    private FlexibleSearchService flexibleSearchService

    def setup() {
        importCsv("/test/consumedDestinationIntegrationTest.impex", "UTF-8")
    }

    @Test
    def "throw an exception when the type code is not found or the attribute name is not valid"() {
        given:
        def sample = new ConsumedDestinationModel()
        sample.setId(CONSUMEDDESTINATION_ID);

        when:
        consumedDestinationVerifyUsageService.findModelsAssignedConsumedDestination(
                "WebhookConfiguration",
                "test",
                flexibleSearchService.getModelByExample(sample))
        then:
        thrown IllegalArgumentException
    }
}