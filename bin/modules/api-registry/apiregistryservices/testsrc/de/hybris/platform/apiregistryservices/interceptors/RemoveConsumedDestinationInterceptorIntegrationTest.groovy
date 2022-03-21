/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.apiregistryservices.interceptors

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.apiregistryservices.constants.ApiregistryservicesConstants
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.servicelayer.model.ModelService
import de.hybris.platform.servicelayer.search.FlexibleSearchService
import org.junit.Test
import de.hybris.platform.servicelayer.exceptions.ModelRemovalException
import spock.lang.Issue
import spock.lang.Unroll

import javax.annotation.Resource

@IntegrationTest
@Issue('https://cxjira.sap.com/browse/IAPI-4703')
class RemoveConsumedDestinationInterceptorIntegrationTest extends ServicelayerSpockSpecification {

    private static final def CONSUMEDDESTINATION_ID = "consumed-destination"

    @Resource
    RemoveConsumedDestinationInterceptor removeConsumedDestinationInterceptor

    @Resource
    FlexibleSearchService flexibleSearchService

    @Resource
    ModelService modelService



    def setup() {
        importCsv("/test/consumedDestinationIntegrationTest.impex", "UTF-8")
    }

    @Test
    def "successfully delete a consumed destination when it is not assigned to any item model"() {
        given:
        def sample = new ConsumedDestinationModel()
        sample.setId(CONSUMEDDESTINATION_ID)

        when:
        modelService.remove(flexibleSearchService.getModelByExample(sample))

        then:
        noExceptionThrown()
    }

    @Test
    @Unroll
    def "throw an exception when the item model is not found or the attribute name is not valid"() {
        given:
        def sample = new ConsumedDestinationModel()
        sample.setId(CONSUMEDDESTINATION_ID)

        and:
        Map<String, String> map = new HashMap<>()
        map.put(ApiregistryservicesConstants.ITEM_TYPE_CODE, typeCode)
        map.put(ApiregistryservicesConstants.ITEM_DESTINATION_ATTRIBUTE, attributeName)
        removeConsumedDestinationInterceptor.consumedDestinationPreventRemoveList.add(map)

        when:
        modelService.remove(flexibleSearchService.getModelByExample(sample))

        then:
        def e = thrown ModelRemovalException
        e.message.contains String.format("The item model with type code: [%s] has not been found or the attribute: [%s] is not valid consumed destination attribute", typeCode, attributeName)
        cleanup:
        removeConsumedDestinationInterceptor.consumedDestinationPreventRemoveList.clear()
        where:
        typeCode                    | attributeName
        ""                          | ""
        "WebhookConfiguration"      | "eventType"
        "NotFoundWebConfiguration"  | ""

    }
}