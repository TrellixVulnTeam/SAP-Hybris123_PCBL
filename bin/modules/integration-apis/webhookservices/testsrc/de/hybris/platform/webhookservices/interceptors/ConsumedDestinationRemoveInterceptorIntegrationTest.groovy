/*
 *  Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.webhookservices.interceptors

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel
import de.hybris.platform.integrationservices.IntegrationObjectModelBuilder
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.ItemTracker
import de.hybris.platform.integrationservices.util.impex.ModuleEssentialData
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.webhookservices.model.WebhookConfigurationModel
import de.hybris.platform.webhookservices.util.WebhookServicesEssentialData
import org.junit.ClassRule
import org.junit.Rule
import org.junit.Test
import spock.lang.Issue
import spock.lang.Shared

import static de.hybris.platform.outboundservices.ConsumedDestinationBuilder.consumedDestinationBuilder
import static de.hybris.platform.webhookservices.WebhookConfigurationBuilder.webhookConfiguration

@IntegrationTest
@Issue('https://cxjira.sap.com/browse/IAPI-4703')
class ConsumedDestinationRemoveInterceptorIntegrationTest extends ServicelayerSpockSpecification {

    private static final def PRODUCT_IO = 'ProductIO'
    private static final def CONSUMEDDESTINATION_ID = 'webhookDestination'

    @Shared
    @ClassRule
    ModuleEssentialData essentialData = WebhookServicesEssentialData.webhookServicesEssentialData()

    @Shared
    @ClassRule
    IntegrationObjectModelBuilder io = IntegrationObjectModelBuilder.integrationObject().withCode(PRODUCT_IO)

    @Rule
    ItemTracker itemTracker = ItemTracker.track(WebhookConfigurationModel, ConsumedDestinationModel)

    @Test
    def "cannot delete a consumed destination when it is assigned to a webhook configuration"() {
        given:
        def consumedDestination = consumedDestinationBuilder()
                .withId(CONSUMEDDESTINATION_ID)
                .withUrl("https://path/to/webhooks")
                .withDestinationTarget('webhookServices') // created in essential data
                .build()
        webhookConfiguration()
                .withDestination(consumedDestination)
                .withIntegrationObject(PRODUCT_IO)
                .build()

        when:
        IntegrationTestUtil.importImpEx(
                'REMOVE ConsumedDestination; id[unique=true]',
                "                          ; $CONSUMEDDESTINATION_ID"
        )

        then:
        def e = thrown AssertionError
        e.message.contains "ConsumedDestinationModel [${consumedDestination.getId()}] cannot be deleted because it is used in one or more [${WebhookConfigurationModel._TYPECODE}]"
        and:
        IntegrationTestUtil.findAny(ConsumedDestinationModel, { it.id == CONSUMEDDESTINATION_ID }).present
    }

    @Test
    def "can delete a consumed destination when it is not assigned to any webhook configurations"() {
        given:
        consumedDestinationBuilder()
                .withId(CONSUMEDDESTINATION_ID)
                .withUrl("https://path/to/webhooks")
                .withDestinationTarget('webhookServices') // created in essential data
                .build()

        when:
        IntegrationTestUtil.importImpEx(
                'REMOVE ConsumedDestination; id[unique=true]',
                "                          ; $CONSUMEDDESTINATION_ID"
        )

        then:
        IntegrationTestUtil.findAny(ConsumedDestinationModel, { it.id == CONSUMEDDESTINATION_ID }).empty
    }
}