/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.odata2webservicesfeaturetests

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.core.model.user.CustomerModel
import de.hybris.platform.core.model.user.EmployeeModel
import de.hybris.platform.integrationservices.enums.AuthenticationType
import de.hybris.platform.inboundservices.util.InboundMonitoringRule
import de.hybris.platform.integrationservices.IntegrationObjectModelBuilder
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.odata2services.util.Odata2ServicesEssentialData
import de.hybris.platform.odata2webservices.constants.Odata2webservicesConstants
import de.hybris.platform.odata2webservicesfeaturetests.ws.BasicAuthRequestBuilder
import de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.webservicescommons.testsupport.server.NeedsEmbeddedServer
import org.junit.ClassRule
import org.junit.Test
import spock.lang.Shared
import spock.lang.Unroll

import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.odata2webservicesfeaturetests.useraccess.UserAccessTestUtils.givenUserExistsWithUidAndGroups
import static de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder.inboundChannelConfigurationBuilder

@NeedsEmbeddedServer(webExtensions = Odata2webservicesConstants.EXTENSIONNAME)
@IntegrationTest
class DeleteEntitiesIntegrationTest extends ServicelayerSpockSpecification {
    private static final String TEST_NAME = "DeleteEntities"
    private static final String USER = "${TEST_NAME}_User"
    private static final String PASSWORD = 'secret'
    private static final String IO_CODE = "${TEST_NAME}_IO"
    private static final String CUSTOMER1 = "john.doe"
    private static final String CUSTOMER2 = "${TEST_NAME}_scott.tiger"

    @Shared
    @ClassRule
    Odata2ServicesEssentialData essentialData = Odata2ServicesEssentialData.odata2ServicesEssentialData()
    @Shared
    @ClassRule
    InboundChannelConfigurationBuilder inboundChannel = inboundChannelConfigurationBuilder()
            .withAuthType(AuthenticationType.BASIC)
            .withIntegrationObject IntegrationObjectModelBuilder.integrationObject().withCode(IO_CODE)
            .withItem(integrationObjectItem().withCode('Customer').root()
                    .withAttribute(integrationObjectItemAttribute('uid'))
                    .withAttribute(integrationObjectItemAttribute('disabled').withQualifier('loginDisabled'))
                    .withAttribute(integrationObjectItemAttribute('addresses').withReturnItem('Address')))
            .withItem(integrationObjectItem().withCode('Address')
                    .withAttribute(integrationObjectItemAttribute('owner').withReturnItem('Customer'))
                    .withAttribute(integrationObjectItemAttribute('cellphone').unique())
                    .withAttribute(integrationObjectItemAttribute('company')))

    @Shared
    @ClassRule
    InboundMonitoringRule monitoring = InboundMonitoringRule.disabled()

    def setup() {
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Customer; uid[unique=true]; loginDisabled; &refId',
                "                      ; $CUSTOMER1        ; false        ; jd",
                "                      ; $CUSTOMER2        ; true         ; st",
                'INSERT_UPDATE Address; cellphone[unique = true]; company; owner(&refId)',
                '                     ; 1-927-398-3909          ; Sun    ; jd',
                '                     ; 1-927-847-2490          ; Sun    ; jd',
                '                     ; 1-907-341-1313          ; Oracle ; st')

        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationdeletegroup")
    }

    def cleanup() {
        IntegrationTestUtil.remove CustomerModel, { it.uid == CUSTOMER1 }
        IntegrationTestUtil.remove CustomerModel, { it.uid == CUSTOMER2 }
        IntegrationTestUtil.remove EmployeeModel, { it.uid == USER }
    }

    @Test
    @Unroll
    def "DELETE responds with 200 OK when an #desc item is successfully deleted"() {
        when:
        def response = basicAuthRequest(IO_CODE)
                .path(entity)
                .build()
                .delete()

        then:
        response.status == 200

        where:
        desc    | entity
        'owner' | "Customers('$CUSTOMER1')"
        'owned' | "Addresses('1-927-847-2490')"
    }

    @Test
    def "DELETE responds with 400 Bad Request when integration key is malformed"() {
        when:
        def response = basicAuthRequest(IO_CODE)
                .path("Customers('malformedKey|malformedKey')")
                .build()
                .delete()

        then:
        response.status == 400
    }

    @Test
    @Unroll
    def "DELETE responds with 404 Not Found when the specified #desc item does not exist"() {
        when:
        def response = basicAuthRequest(IO_CODE)
                .path(entity)
                .build()
                .delete()

        then:
        response.status == 404

        where:
        desc    | entity
        'owner' | "Customers('peter.pan')"
        'owned' | "Addresses('1-111-111-1111')"
    }

    @Test
    @Unroll
    def "DELETE responds with 405 Not Implemented when the URI points to all #desc items"() {
        when:
        def response = basicAuthRequest(IO_CODE)
                .path(entitySet)
                .build()
                .delete()

        then:
        response.status == 405

        where:
        desc    | entitySet
        'owner' | 'Customers'
        'owned' | 'Addresses'
    }

    @Test
    @Unroll
    def "DELETE responds with 405 Not Implemented when the URI contains a filter condition for #desc items"() {
        when:
        def response = basicAuthRequest(IO_CODE)
                .path(entitySet)
                .queryParam('$filter', filter)
                .build()
                .delete()

        then:
        response.status == 405

        where:
        desc    | entitySet   | filter
        'owner' | 'Customers' | "disabled%20eq%20true"
        'owned' | 'Addresses' | "company%20eq%20%27Oracle%27"
    }

    @Test
    def "DELETE responds with 501 Not Implemented when the URI contains a navigation property"() {
        when:
        def response = basicAuthRequest(IO_CODE)
                .path("Customers($CUSTOMER1)")
                .path('addresses')
                .build()
                .delete()

        then:
        response.status == 501
    }

    @Test
    def "DELETE responds with 404 Not Found when the URI references a non-existent integration object"() {
        when:
        def response = basicAuthRequest('NonExistentIO')
                .path("/Customers($CUSTOMER1)")
                .build()
                .delete()

        then:
        response.status == 404
    }

    BasicAuthRequestBuilder basicAuthRequest(final String path) {
        new BasicAuthRequestBuilder()
                .extensionName(Odata2webservicesConstants.EXTENSIONNAME)
                .credentials(USER, PASSWORD) // created in setup()
                .path(path)
                .accept("application/json")
    }
}
