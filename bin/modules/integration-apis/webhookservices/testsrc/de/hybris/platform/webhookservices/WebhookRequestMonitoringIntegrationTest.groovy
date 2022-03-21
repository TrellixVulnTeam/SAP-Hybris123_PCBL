/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.webhookservices

import com.github.tomakehurst.wiremock.junit.WireMockRule
import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.apiregistryservices.model.DestinationTargetModel
import de.hybris.platform.apiregistryservices.model.events.EventConfigurationModel
import de.hybris.platform.catalog.model.CatalogVersionModel
import de.hybris.platform.category.model.CategoryModel
import de.hybris.platform.integrationservices.IntegrationObjectModelBuilder
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.impex.ModuleEssentialData
import de.hybris.platform.outboundservices.enums.OutboundSource
import de.hybris.platform.outboundservices.model.OutboundRequestModel
import de.hybris.platform.outboundservices.util.OutboundMonitoringRule
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.webhookservices.event.ItemSavedEvent
import de.hybris.platform.webhookservices.util.WebhookServicesEssentialData
import org.junit.ClassRule
import org.junit.Rule
import org.junit.Test
import spock.lang.AutoCleanup
import spock.lang.Shared

import java.time.Duration

import static com.github.tomakehurst.wiremock.client.WireMock.anyUrl
import static com.github.tomakehurst.wiremock.client.WireMock.ok
import static com.github.tomakehurst.wiremock.client.WireMock.post
import static com.github.tomakehurst.wiremock.client.WireMock.postRequestedFor
import static com.github.tomakehurst.wiremock.client.WireMock.stubFor
import static com.github.tomakehurst.wiremock.client.WireMock.urlPathEqualTo
import static com.github.tomakehurst.wiremock.client.WireMock.verify
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig
import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.util.EventualCondition.eventualCondition
import static de.hybris.platform.outboundservices.ConsumedDestinationBuilder.consumedDestinationBuilder
import static de.hybris.platform.webhookservices.WebhookConfigurationBuilder.webhookConfiguration

@IntegrationTest
class WebhookRequestMonitoringIntegrationTest extends ServicelayerSpockSpecification {
    private static final String TEST_NAME = 'WebhookRequestMonitoring'
    private static final String IO = "${TEST_NAME}_CategoryIO"
    private static final String WEBHOOK_ENDPOINT = "${TEST_NAME}_Endpoint"
    private static final String CATEGORY = "${TEST_NAME}_Category"
    private static final String CATALOG = "${TEST_NAME}_Catalog"
    private static final String CATALOG_VERSION = "$CATALOG:Staged"
    private static final String DESTINATION_ID = "${TEST_NAME}_Destination"
    private static final Duration REASONABLE_TIME = Duration.ofSeconds(7)

    @Shared
    @ClassRule
    ModuleEssentialData essentialData = WebhookServicesEssentialData.webhookServicesEssentialData()
    @Shared
    @ClassRule
    IntegrationObjectModelBuilder io = IntegrationObjectModelBuilder.integrationObject().withCode(IO)
            .withItem(integrationObjectItem().withCode('Category').root()
                    .withAttribute(integrationObjectItemAttribute().withName('code')))

    @Rule
    WireMockRule wireMockRule = new WireMockRule(wireMockConfig()
            .dynamicHttpsPort()
            .keystorePath("resources/devcerts/platform.jks")
            .keystorePassword('123456'))
    @Rule
    OutboundMonitoringRule outboundMonitoring = OutboundMonitoringRule.enabled()
    @AutoCleanup('cleanup')
    WebhookConfigurationBuilder webhookBuilder = webhookConfiguration().withIntegrationObject(IO)

    @Shared
    private EventConfigurationModel eventConfig

    def setup() {
        stubFor(post(anyUrl()).willReturn(ok()))
    }

    def cleanup() {
        IntegrationTestUtil.removeAll(OutboundRequestModel)
    }

    def setupSpec() {
        IntegrationTestUtil.importCatalogVersion('Staged', CATALOG, true)
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Category; code[unique = true]; catalogVersion(catalog(id), version)',
                "                             ; $CATEGORY          ; $CATALOG_VERSION",
        )
        eventConfig = IntegrationTestUtil.findAny(EventConfigurationModel,
                { it.eventClass == ItemSavedEvent.canonicalName }).get() as EventConfigurationModel
    }

    def cleanupSpec() {
        IntegrationTestUtil.remove(CategoryModel) { it.code == CATEGORY }
        IntegrationTestUtil.removeSafely(CatalogVersionModel) { it.catalog.name == CATALOG }
    }

    @Test
    def 'outbound request monitoring entry is created when webhook is sent'() {
        given: 'a webhook is configured'
        webhookBuilder
                .withEvent(ItemSavedEvent)
                .withDestination(webhookDestination(WEBHOOK_ENDPOINT))
                .build()

        when: 'an item of Category type is updated'
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Category; code[unique = true]; name[lang=en]; catalogVersion(catalog(id), version)',
                "                             ;$CATEGORY           ; CategoryName ; $CATALOG_VERSION"
        )

        then: 'the outbound request is created'
        eventualCondition().within(REASONABLE_TIME).expect {
            verify postRequestedFor(urlPathEqualTo("/$WEBHOOK_ENDPOINT"))
            def outboundRequest = IntegrationTestUtil.findAny OutboundRequestModel,
                    { it.type == IO }
            !outboundRequest.empty
            with(outboundRequest.get()) {
                source == OutboundSource.WEBHOOKSERVICES
                destination == "https://localhost:${wireMockRule.httpsPort()}/$WEBHOOK_ENDPOINT"
                !integrationKey.isEmpty()
                !sapPassport.isEmpty()
            }
        }
    }

    def webhookDestination(String uri, String id = DESTINATION_ID) {
        def destinationTargetModel = IntegrationTestUtil.findAny(DestinationTargetModel, { it.id == "webhookServices" })
                .get() as DestinationTargetModel
        eventConfig.setDestinationTarget(destinationTargetModel)
        consumedDestinationBuilder()
                .withId(id)
                .withUrl("https://localhost:${wireMockRule.httpsPort()}/$uri")
                .withDestinationTarget(destinationTargetModel)
    }
}
