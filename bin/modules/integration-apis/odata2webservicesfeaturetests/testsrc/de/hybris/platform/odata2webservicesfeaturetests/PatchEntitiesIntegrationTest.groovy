/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.odata2webservicesfeaturetests

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.core.model.user.AddressModel
import de.hybris.platform.core.model.user.CustomerModel
import de.hybris.platform.core.model.user.EmployeeModel
import de.hybris.platform.integrationservices.enums.AuthenticationType
import de.hybris.platform.inboundservices.util.InboundMonitoringRule
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.impex.ModuleEssentialData
import de.hybris.platform.odata2webservices.constants.Odata2webservicesConstants
import de.hybris.platform.odata2webservicesfeaturetests.ws.BasicAuthRequestBuilder
import de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.webservicescommons.testsupport.server.NeedsEmbeddedServer
import org.junit.ClassRule
import org.junit.Test
import spock.lang.Issue
import spock.lang.Shared
import spock.lang.Unroll

import javax.ws.rs.client.Entity

import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.IntegrationObjectModelBuilder.integrationObject
import static de.hybris.platform.integrationservices.util.JsonBuilder.json
import static de.hybris.platform.odata2services.util.Odata2ServicesEssentialData.odata2ServicesEssentialData
import static de.hybris.platform.odata2webservicesfeaturetests.useraccess.UserAccessTestUtils.givenUserExistsWithUidAndGroups
import static de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder.inboundChannelConfigurationBuilder

@NeedsEmbeddedServer(webExtensions = Odata2webservicesConstants.EXTENSIONNAME)
@IntegrationTest
@Issue('https://jira.hybris.com/browse/STOUT-1608')
class PatchEntitiesIntegrationTest extends ServicelayerSpockSpecification {

    private static final String TEST_NAME = "PatchEntities"
    private static final String USER = "User"
    private static final String PASSWORD = 'secret'
    private static final String IO_CODE = "${TEST_NAME}_IO"
    private static final String CUSTOMER = "john"

    @Shared
    @ClassRule
    InboundMonitoringRule monitoring = InboundMonitoringRule.disabled()
    @Shared
    @ClassRule
    ModuleEssentialData essentialData = odata2ServicesEssentialData().withDependencies()
    @Shared
    @ClassRule
    InboundChannelConfigurationBuilder inboundChanel = inboundChannelConfigurationBuilder()
            .withAuthType(AuthenticationType.BASIC)
            .withIntegrationObject integrationObject().withCode(IO_CODE)
            .withItem(integrationObjectItem().withCode('Customer').root()
                    .withAttribute(integrationObjectItemAttribute('uid'))
                    .withAttribute(integrationObjectItemAttribute('disabled').withQualifier('loginDisabled'))
                    .withAttribute(integrationObjectItemAttribute('addresses').withReturnItem('Address')))
            .withItem(integrationObjectItem().withCode('Address')
                    .withAttribute(integrationObjectItemAttribute('owner').withReturnItem('Customer'))
                    .withAttribute(integrationObjectItemAttribute('cellphone').unique())
                    .withAttribute(integrationObjectItemAttribute('company')))

    def setupSpec() {
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Customer; uid[unique=true]; loginDisabled; &refId',
                "                      ; $CUSTOMER       ; false        ; jd",
                'INSERT_UPDATE Address; cellphone[unique = true]; company; owner(&refId)',
                '                     ; 1-927-398-3909          ; Sun    ; jd',
                '                     ; 1-927-847-2490          ; Sun    ; jd')
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationcreategroup")
    }

    def cleanupSpec() {
        IntegrationTestUtil.removeAll AddressModel
        IntegrationTestUtil.removeSafely CustomerModel, { it.uid == CUSTOMER }
        IntegrationTestUtil.removeSafely EmployeeModel, { it.uid == USER }
    }

    @Test
    @Unroll
    def "PATCH responds with 200 OK when an #desc item is successfully patched"() {
        when:
        def response = basicAuthRequest(IO_CODE)
                .path(entity)
                .build()
                .patch Entity.json(json)

        then:
        response.status == 200

        where:
        desc    | entity                        | json
        'owner' | "Customers('$CUSTOMER')"      | json().withField("disabled", true).build()
        'owned' | "Addresses('1-927-847-2490')" | json().withField("company", "SAP").build()
    }

    @Test
    def "PATCH responds with 400 Bad Request when integration key is malformed"() {
        when:
        def response = basicAuthRequest(IO_CODE)
                .path("Customers('malformedKey')")
                .build()
                .patch Entity.json()

        then:
        response.status == 400
    }

    @Test
    @Unroll
    def "PATCH responds with 405 Not Implemented when the URI points to all #desc items"() {
        when:
        def response = basicAuthRequest(IO_CODE)
                .path(entitySet)
                .build()
                .patch Entity.json()

        then:
        response.status == 405

        where:
        desc    | entitySet
        'owner' | 'Customers'
        'owned' | 'Addresses'
    }

    @Test
    @Unroll
    def "PATCH responds with 405 Not Implemented when the URI contains a filter condition for #desc items"() {
        when:
        def response = basicAuthRequest(IO_CODE)
                .path(entitySet)
                .queryParam('$filter', filter)
                .build()
                .patch Entity.json()

        then:
        response.status == 405

        where:
        desc    | entitySet   | filter
        'owner' | 'Customers' | "disabled%20eq%20true"
        'owned' | 'Addresses' | "company%20eq%20%27Oracle%27"
    }

    @Test
    def "PATCH responds with 501 Not Implemented when the URI contains a navigation property"() {
        when:
        def response = basicAuthRequest(IO_CODE)
                .path("Customers('$CUSTOMER')")
                .path('addresses')
                .build()
                .patch Entity.json()

        then:
        response.status == 501
    }

    @Test
    def "PATCH responds with 404 Not Found when the URI references a non-existent integration object"() {
        when:
        def response = basicAuthRequest('NonExistentIO')
                .path("/Customers('$CUSTOMER')")
                .build()
                .patch Entity.json()

        then:
        response.status == 404
    }

    @Test
    @Unroll
    def "PATCH responds with 404 Not Found when an #desc item does not exist"() {
        when:
        def response = basicAuthRequest(IO_CODE)
                .path(entity)
                .build()
                .patch Entity.json(json)

        then:
        response.status == 404

        where:
        desc    | entity                        | json
        'owner' | "Customers('scott.tiger')"    | json().withField("disabled", true).build()
        'owned' | "Addresses('1-404-404-4004')" | json().withField("company", "SAP").build()
    }

    BasicAuthRequestBuilder basicAuthRequest(final String path) {
        new BasicAuthRequestBuilder()
                .extensionName(Odata2webservicesConstants.EXTENSIONNAME)
                .credentials(USER, PASSWORD) // created in setup()
                .path(path)
                .accept("application/json")
    }
}
