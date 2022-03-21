/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.outboundservices.service

import com.github.tomakehurst.wiremock.junit.WireMockRule
import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel
import de.hybris.platform.integrationservices.IntegrationObjectModelBuilder
import de.hybris.platform.integrationservices.model.IntegrationObjectModel
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.outboundservices.ConsumedDestinationBuilder
import de.hybris.platform.outboundservices.config.DefaultOutboundServicesConfiguration
import de.hybris.platform.outboundservices.facade.SyncParameters
import de.hybris.platform.outboundservices.model.OutboundRequestModel
import de.hybris.platform.outboundservices.util.OutboundMonitoringRule
import de.hybris.platform.outboundservices.util.OutboundRequestPersistenceContext
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import org.junit.ClassRule
import org.junit.Rule
import org.junit.Test
import org.springframework.web.client.HttpClientErrorException
import spock.lang.AutoCleanup
import spock.lang.Shared

import javax.annotation.Resource

import static com.github.tomakehurst.wiremock.client.WireMock.badRequest
import static com.github.tomakehurst.wiremock.client.WireMock.delete
import static com.github.tomakehurst.wiremock.client.WireMock.deleteRequestedFor
import static com.github.tomakehurst.wiremock.client.WireMock.equalTo
import static com.github.tomakehurst.wiremock.client.WireMock.get
import static com.github.tomakehurst.wiremock.client.WireMock.matching
import static com.github.tomakehurst.wiremock.client.WireMock.matchingJsonPath
import static com.github.tomakehurst.wiremock.client.WireMock.notFound
import static com.github.tomakehurst.wiremock.client.WireMock.ok
import static com.github.tomakehurst.wiremock.client.WireMock.stubFor
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo
import static com.github.tomakehurst.wiremock.client.WireMock.verify
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig
import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.assertModelDoesNotExist
import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.assertModelExists
import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.findAny
import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.removeAll
import static de.hybris.platform.outboundservices.ConsumedDestinationBuilder.consumedDestinationBuilder

@IntegrationTest
class DeleteRequestSenderIntegrationTest extends ServicelayerSpockSpecification {

    private static final String TEST_NAME = "DeleteRequestSender"
    private static final String DESTINATION_ENDPOINT = '/odata2webservices/OutboundCatalogVersion/CatalogVersions'
    private static final String CATALOG_VERSION_VERSION = 'DeleteRequestSenderTestVersion'
    private static final String CATALOG_ID = "${TEST_NAME}Catalog"
    private static final String INTEGRATION_KEY = "$CATALOG_VERSION_VERSION|$CATALOG_ID"
    private static final String INTEGRATION_KEY_ENCODED = "$CATALOG_VERSION_VERSION%7C$CATALOG_ID"
    private static final String DELETE_URL = "${DESTINATION_ENDPOINT}('$INTEGRATION_KEY_ENCODED')"
    private static final String DESTINATION_ID = "${TEST_NAME}_Destination"
    private static final String TEST_IO = "${TEST_NAME}_CatalogVersionIO"

    @Shared
    @ClassRule
    IntegrationObjectModelBuilder integrationObject = IntegrationObjectModelBuilder.integrationObject()
            .withCode(TEST_IO)
            .withItem(integrationObjectItem().withCode('Catalog')
                    .withAttribute(integrationObjectItemAttribute().withName('id')))
            .withItem(integrationObjectItem().withCode('CatalogVersion').root()
                    .withAttribute(integrationObjectItemAttribute().withName('version'))
                    .withAttribute(integrationObjectItemAttribute().withName('catalog').withReturnItem('Catalog')))

    @Rule
    WireMockRule wireMockRule = new WireMockRule(wireMockConfig()
            .dynamicHttpsPort()
            .keystorePath("resources/devcerts/platform.jks")
            .keystorePassword('123456'))
    @Rule
    OutboundMonitoringRule outboundMonitoringRule = OutboundMonitoringRule.enabled()
    @Rule
    OutboundRequestPersistenceContext requestPersistenceContext = OutboundRequestPersistenceContext.create()
    @AutoCleanup('cleanup')
    ConsumedDestinationBuilder destinationBuilder = consumedDestinationBuilder().withId(DESTINATION_ID)

    @Resource
    private DeleteRequestSender deleteRequestSender
    @Resource(name = "defaultOutboundServicesConfiguration")
    private DefaultOutboundServicesConfiguration configurationService


    def setup() {
        destinationBuilder
                .withUrl("https://localhost:${wireMockRule.httpsPort()}/$DESTINATION_ENDPOINT")
                .build()
    }

    def cleanup() {
        removeAll OutboundRequestModel
    }

    @Test
    def "delete outbound request returning success is logged when monitoring is enabled"() {
        given: 'destination server returns OK'
        stubFor(delete(urlEqualTo(DELETE_URL)).willReturn(ok()))

        and:
        def outboundRequestSample = new OutboundRequestModel(integrationKey: INTEGRATION_KEY)
        assertModelDoesNotExist(outboundRequestSample)

        when:
        deleteRequestSender.send(deleteParameters())

        then: "destination server stub is called"
        verify(deleteRequestedFor(urlEqualTo(DELETE_URL)))

        and:
        assertModelExists(outboundRequestSample)
    }

    @Test
    def "delete outbound request with errors is logged when monitoring is enabled"() {
        given: 'destination server returns NOT FOUND'
        stubFor(delete(urlEqualTo(DELETE_URL)).willReturn(notFound()))

        and:
        def outboundRequestSample = new OutboundRequestModel()
        outboundRequestSample.setIntegrationKey(INTEGRATION_KEY)
        assertModelDoesNotExist(outboundRequestSample)

        when:
        deleteRequestSender.send(deleteParameters())

        then: "destination server stub is called"
        verify(deleteRequestedFor(urlEqualTo(DELETE_URL)))

        and:
        thrown(HttpClientErrorException)

        and:
        assertModelExists(outboundRequestSample)
    }

    @Test
    def "CSRF and SAP passport headers are added to the request"() {
        given: 'a destination with the CSRF URL specified that returns a valid token'
        integrationObject.build()
        csrfDestination()
        and: 'POST to destination is successful'
        stubFor delete(urlEqualTo(DELETE_URL)).willReturn(ok())

        when:
        deleteRequestSender.send(deleteParameters())

        then: 'retrieved CSRF token is sent to the destination'
        verify deleteRequestedFor(urlEqualTo(DELETE_URL))
                .withHeader('X-CSRF-Token', equalTo('x-token'))
                .withHeader('SAP-PASSPORT', matching('^[a-fA-F0-9]+$'))
                .withCookie('trusted', equalTo(''))
                .withCookie('alive', equalTo(''))
    }

    @Test
    def "delete outbound request is not logged when monitoring is off"() {
        given: 'destination server returns BAD REQUEST'
        outboundMonitoringRule.disabled()
        stubFor delete(urlEqualTo(DELETE_URL)).willReturn(badRequest())

        when:
        deleteRequestSender.send(deleteParameters())

        then:
        thrown(HttpClientErrorException)

        and:
        requestPersistenceContext.getAllMedia().isEmpty()
        requestPersistenceContext.searchAllOutboundRequest().isEmpty()
    }

    private static SyncParameters deleteParameters(def destination = DESTINATION_ID) {
        SyncParameters.syncParametersBuilder()
                .withIntegrationObject(contextIntegrationObject())
                .withDestination(contextDestination(destination))
                .withIntegrationKey(INTEGRATION_KEY)
                .build()
    }

    def matchVersion(String version) {
        matchingJsonPath("\$.[?(@.version == '$version')]")
    }

    def matchCatalogId(String catalogId) {
        matchingJsonPath("\$.catalog[?(@.id == '$catalogId')]")
    }

    def matchPassport() {
        matching('[\\w]+')
    }

    def noOutboundRequestExists() {
        IntegrationTestUtil.findAll(OutboundRequestModel).isEmpty()
    }

    def csrfDestination() {
        destinationBuilder
                .withAdditionalParameters([csrfURL: "https://localhost:${wireMockRule.httpsPort()}/csrf"])
                .withUrl("https://localhost:${wireMockRule.httpsPort()}$DESTINATION_ENDPOINT")
                .build()
        stubFor get(urlEqualTo('/csrf'))
                .willReturn(ok().withHeader('X-CSRF-Token', 'x-token').withHeader('Set-Cookie', 'trusted', 'alive'))
    }

    private static IntegrationObjectModel contextIntegrationObject() {
        findAny(IntegrationObjectModel, { it.code == TEST_IO })
                .orElseThrow { new IllegalStateException("$TEST_IO integration object was not created") } as IntegrationObjectModel
    }

    private static ConsumedDestinationModel contextDestination(String destinationId) {
        findAny(ConsumedDestinationModel, { it.id == destinationId })
                .orElseThrow { new IllegalStateException("$DESTINATION_ID destination was not created") } as ConsumedDestinationModel
    }
}
