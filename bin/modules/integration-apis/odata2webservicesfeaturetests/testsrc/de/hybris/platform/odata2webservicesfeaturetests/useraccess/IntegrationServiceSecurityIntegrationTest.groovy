/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.odata2webservicesfeaturetests.useraccess

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.core.model.user.EmployeeModel
import de.hybris.platform.integrationservices.IntegrationObjectModelBuilder
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.impex.ModuleEssentialData
import de.hybris.platform.odata2webservices.constants.Odata2webservicesConstants
import de.hybris.platform.odata2webservicesfeaturetests.ws.BasicAuthRequestBuilder
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.webservicescommons.testsupport.server.NeedsEmbeddedServer
import org.apache.olingo.odata2.api.commons.HttpStatusCodes
import org.junit.ClassRule
import org.junit.Test
import spock.lang.AutoCleanup
import spock.lang.Shared
import spock.lang.Unroll

import javax.ws.rs.client.Entity

import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.util.JsonBuilder.json
import static de.hybris.platform.odata2webservices.util.Odata2WebServicesEssentialData.odata2WebservicesEssentialData
import static de.hybris.platform.outboundsync.util.OutboundSyncEssentialData.outboundSyncEssentialData

@NeedsEmbeddedServer(webExtensions = [Odata2webservicesConstants.EXTENSIONNAME])
@IntegrationTest
class IntegrationServiceSecurityIntegrationTest extends ServicelayerSpockSpecification {
    private static final String TEST_NAME = "IntegrationServiceSecurity"
    private static final String INTEGRATION_SERVICE_IO = "IntegrationService"
    private static final String ORDER_IO = "${TEST_NAME}_IO"
    private static final String PASSWORD = 'password'
    private static final String GROUP_ADMIN = 'integrationadmingroup'
    private static final String GROUP_SERVICE = 'integrationservicegroup'
    private static final String GROUP_MONITOR = 'integrationmonitoringgroup'
    private static final String GROUP_OUTBOUNDSYNC = 'outboundsyncgroup'
    private static final String GROUP_CREATE = 'integrationcreategroup'
    private static final String GROUP_VIEW = 'integrationviewgroup'
    private static final String GROUP_DELETE = 'integrationdeletegroup'

    private static final String ADMIN_USER = "$TEST_NAME-integrationadmingroup-user"
    private static final String MONITOR_USER = "$TEST_NAME-integrationmonitoringgroup-user"
    private static final String SERVICE_USER = "$TEST_NAME-integrationservicegroup-user"
    private static final String CREATE_USER = "$TEST_NAME-integrationcreategroup-user"
    private static final String VIEW_USER = "$TEST_NAME-integrationviewgroup-user"
    private static final String DELETE_USER = "$TEST_NAME-integrationdeletegroup-user"
    private static final String ADMIN_MONITOR_USER = "$TEST_NAME-integrationmonitoringgroup-and-integrationadmingroup-user"
    private static final String ADMIN_SERVICE_USER = "$TEST_NAME-integrationservicegroup-and-integrationadmingroup-user"
    private static final String ADMIN_OUTBOUNDSYNC_USER = "$TEST_NAME-outboundsyncgroup-and-integrationadmingroup-user"
    private static final String ADMIN_OUTBOUNDSYNC_MONITOR_USER = "$TEST_NAME-outboundsyncgroup-and-integrationmonitoringgroup-user"
    private static final String ADMIN_SERVICE_OUTBOUNDSYNC_MONITOR_USER = "$TEST_NAME-outboundsyncgroup-integrationmonitoringgroup-integrationservicegroup-integrationadmingroup-user"
    private static final String ORDER_IO_PAYLOAD = json().withCode(ORDER_IO).build()
    private static final String ORDER_IOI_PAYLOAD = json().withCode("Order").withField("type", json().withCode("Order")).withField("integrationObject", json().withCode(ORDER_IO)).build()
    private static final String ORDER_CODE_IOI_ATTRIBUTE_PAYLOAD = json().withField("attributeName", "code").withField("attributeDescriptor", json().withField("qualifier", "code").withField("enclosingType", json().withCode("Order"))).withField("integrationObjectItem", json().withCode("Order").withField("type", json().withCode("Order")).withField("integrationObject", json().withCode(ORDER_IO))).build()
    private static final Collection users = [ADMIN_USER, MONITOR_USER, SERVICE_USER, CREATE_USER, VIEW_USER, DELETE_USER, ADMIN_MONITOR_USER, ADMIN_SERVICE_USER,
                                             ADMIN_OUTBOUNDSYNC_USER, ADMIN_OUTBOUNDSYNC_MONITOR_USER, ADMIN_SERVICE_OUTBOUNDSYNC_MONITOR_USER]

    @Shared
    @ClassRule
    ModuleEssentialData inboundEssentialData = odata2WebservicesEssentialData().withDependencies()
    @Shared
    @ClassRule
    ModuleEssentialData outboundEssentialData = outboundSyncEssentialData().withDependencies()
    @AutoCleanup('cleanup')
    def orderIO = IntegrationObjectModelBuilder.integrationObject().withCode(ORDER_IO)
            .withItem(integrationObjectItem().withCode('Order')
                    .withAttribute(integrationObjectItemAttribute().withName('code')))

    def setupSpec() {
        userInGroups(ADMIN_USER, GROUP_ADMIN)
        userInGroups(MONITOR_USER, GROUP_MONITOR)
        userInGroups(SERVICE_USER, GROUP_SERVICE)
        userInGroups(CREATE_USER, GROUP_CREATE)
        userInGroups(VIEW_USER, GROUP_VIEW)
        userInGroups(DELETE_USER, GROUP_DELETE)
        userInGroups(ADMIN_MONITOR_USER, "$GROUP_ADMIN,$GROUP_MONITOR")
        userInGroups(ADMIN_SERVICE_USER, "$GROUP_ADMIN,$GROUP_SERVICE")
        userInGroups(ADMIN_OUTBOUNDSYNC_USER, "$GROUP_ADMIN,$GROUP_OUTBOUNDSYNC")
        userInGroups(ADMIN_OUTBOUNDSYNC_MONITOR_USER, "$GROUP_ADMIN,$GROUP_OUTBOUNDSYNC,$GROUP_MONITOR")
        userInGroups(ADMIN_SERVICE_OUTBOUNDSYNC_MONITOR_USER, "$GROUP_ADMIN,$GROUP_SERVICE,$GROUP_OUTBOUNDSYNC,$GROUP_MONITOR")
    }

    def cleanupSpec() {
        users.each { user -> IntegrationTestUtil.remove EmployeeModel, { users.contains it.uid } }
    }

    @Test
    @Unroll
    def "User must be authenticated in order to #method /IntegrationService"() {
        when:
        def response = basicAuthRequest()
                .path(INTEGRATION_SERVICE_IO)
                .build()
                .method method

        then:
        response.status == HttpStatusCodes.UNAUTHORIZED.statusCode

        where:
        method << ['GET', 'POST', 'DELETE', 'PATCH']
    }

    @Test
    def "User must be authenticated in order to GET /IntegrationService/someFeedNameThatDoesNotMatter"() {
        when:
        def response = basicAuthRequest()
                .path(INTEGRATION_SERVICE_IO)
                .path('someFeedNameThatDoesNotMatter')
                .build()
                .get()

        then:
        response.status == HttpStatusCodes.UNAUTHORIZED.statusCode
    }


    @Test
    def "User in groups integrationadmingroup AND integrationservicegroup gets Forbidden when requesting with unsupported HTTP verb at /IntegrationService/someFeedNameThatDoesNotMatter"() {
        when:
        def response = basicAuthRequest()
                .path(INTEGRATION_SERVICE_IO)
                .path('someFeedNameThatDoesNotMatter')
                .credentials(ADMIN_SERVICE_USER, PASSWORD)
                .build()
                .method 'COPY'

        then:
        response.status == HttpStatusCodes.FORBIDDEN.statusCode
    }

    @Test
    @Unroll
    def "#user gets #status for GET /IntegrationService"() {
        when:
        def response = basicAuthRequest()
                .path(INTEGRATION_SERVICE_IO)
                .credentials(user, PASSWORD)
                .build()
                .get()

        then:
        response.status == status.statusCode

        where:
        user                    | status
        ADMIN_USER              | HttpStatusCodes.NOT_FOUND
        SERVICE_USER            | HttpStatusCodes.FORBIDDEN
        ADMIN_SERVICE_USER      | HttpStatusCodes.OK
        ADMIN_MONITOR_USER      | HttpStatusCodes.NOT_FOUND
        ADMIN_OUTBOUNDSYNC_USER | HttpStatusCodes.NOT_FOUND
        CREATE_USER             | HttpStatusCodes.FORBIDDEN
        VIEW_USER               | HttpStatusCodes.FORBIDDEN
        DELETE_USER             | HttpStatusCodes.FORBIDDEN
    }

    @Test
    @Unroll
    def "#user gets Forbidden for GET /IntegrationService/doesNotMatter"() {
        when:
        def response = basicAuthRequest()
                .path(INTEGRATION_SERVICE_IO)
                .path('doesNotMatter')
                .credentials(user, PASSWORD)
                .build()
                .get()

        then:
        response.status == HttpStatusCodes.FORBIDDEN.statusCode

        where:
        user << [SERVICE_USER, CREATE_USER, VIEW_USER, DELETE_USER]
    }

    @Test
    @Unroll
    def "#user gets #status for GET /IntegrationService/#feed"() {
        when:
        def response = basicAuthRequest()
                .path(INTEGRATION_SERVICE_IO)
                .path(feed)
                .credentials(user, PASSWORD)
                .build()
                .get()

        then:
        response.status == status.statusCode

        where:
        feed                                                                    | user                            | status
        'IntegrationObjects'                                                    | ADMIN_SERVICE_USER              | HttpStatusCodes.OK
        'IntegrationObjectItems'                                                | ADMIN_SERVICE_USER              | HttpStatusCodes.OK
        'IntegrationObjectItemAttributes'                                       | ADMIN_SERVICE_USER              | HttpStatusCodes.OK
        'IntegrationObjects'                                                    | ADMIN_USER                      | HttpStatusCodes.NOT_FOUND
        'IntegrationObjectItems'                                                | ADMIN_USER                      | HttpStatusCodes.NOT_FOUND
        'IntegrationObjectItemAttributes'                                       | ADMIN_USER                      | HttpStatusCodes.NOT_FOUND
        'IntegrationObjects'                                                    | ADMIN_MONITOR_USER              | HttpStatusCodes.NOT_FOUND
        'IntegrationObjectItems'                                                | ADMIN_MONITOR_USER              | HttpStatusCodes.NOT_FOUND
        'IntegrationObjectItemAttributes'                                       | ADMIN_MONITOR_USER              | HttpStatusCodes.NOT_FOUND
        'IntegrationObjects'                                                    | ADMIN_OUTBOUNDSYNC_USER         | HttpStatusCodes.NOT_FOUND
        'IntegrationObjectItems'                                                | ADMIN_OUTBOUNDSYNC_USER         | HttpStatusCodes.NOT_FOUND
        'IntegrationObjectItemAttributes'                                       | ADMIN_OUTBOUNDSYNC_USER         | HttpStatusCodes.NOT_FOUND

        "IntegrationObjects('OutboundChannelConfig')"                           | ADMIN_SERVICE_USER              | HttpStatusCodes.OK
        "IntegrationObjects('InboundIntegrationMonitoring')"                    | ADMIN_SERVICE_USER              | HttpStatusCodes.OK
        "IntegrationObjects('IntegrationService')"                              | ADMIN_SERVICE_USER              | HttpStatusCodes.OK
        "IntegrationObjectItems('ConsumedDestination|OutboundChannelConfig')"   | ADMIN_SERVICE_USER              | HttpStatusCodes.OK
        "IntegrationObjectItems('InboundRequest|InboundIntegrationMonitoring')" | ADMIN_SERVICE_USER              | HttpStatusCodes.OK
        "IntegrationObjects('OutboundChannelConfig')"                           | ADMIN_OUTBOUNDSYNC_MONITOR_USER | HttpStatusCodes.NOT_FOUND
        "IntegrationObjects('InboundIntegrationMonitoring')"                    | ADMIN_OUTBOUNDSYNC_MONITOR_USER | HttpStatusCodes.NOT_FOUND
        "IntegrationObjects('IntegrationService')"                              | ADMIN_OUTBOUNDSYNC_MONITOR_USER | HttpStatusCodes.NOT_FOUND
        "IntegrationObjectItems('ConsumedDestination|OutboundChannelConfig')"   | ADMIN_OUTBOUNDSYNC_MONITOR_USER | HttpStatusCodes.NOT_FOUND
        "IntegrationObjectItems('InboundRequest|InboundIntegrationMonitoring')" | ADMIN_OUTBOUNDSYNC_MONITOR_USER | HttpStatusCodes.NOT_FOUND
    }

    @Test
    @Unroll
    def "#user is Forbidden to #httpMethod to /IntegrationService"() {
        when:
        def response = basicAuthRequest()
                .path(INTEGRATION_SERVICE_IO)
                .credentials(user, PASSWORD)
                .build()
                .method(httpMethod, Entity.json('{}'))

        then:
        response.status == HttpStatusCodes.FORBIDDEN.statusCode

        where:
        user         | httpMethod
        SERVICE_USER | 'POST'
        CREATE_USER  | 'POST'
        VIEW_USER    | 'POST'
        DELETE_USER  | 'POST'
        MONITOR_USER | 'POST'

        SERVICE_USER | 'PATCH'
        CREATE_USER  | 'PATCH'
        VIEW_USER    | 'PATCH'
        DELETE_USER  | 'PATCH'
        MONITOR_USER | 'PATCH'

        SERVICE_USER | 'DELETE'
        CREATE_USER  | 'DELETE'
        VIEW_USER    | 'DELETE'
        DELETE_USER  | 'DELETE'
        MONITOR_USER | 'DELETE'
    }


    @Test
    @Unroll
    def "#user gets Not Found when sending a POST to /IntegrationService/#feed"() {
        when:
        def response = basicAuthRequest()
                .path(INTEGRATION_SERVICE_IO)
                .path(feed)
                .credentials(user, PASSWORD)
                .build()
                .post(Entity.json('{}'))

        then:
        response.status == HttpStatusCodes.NOT_FOUND.statusCode

        where:
        feed                              | user
        'IntegrationObjects'              | ADMIN_MONITOR_USER
        'IntegrationObjectItems'          | ADMIN_MONITOR_USER
        'IntegrationObjectItemAttributes' | ADMIN_MONITOR_USER

        'IntegrationObjects'              | ADMIN_OUTBOUNDSYNC_USER
        'IntegrationObjectItems'          | ADMIN_OUTBOUNDSYNC_USER
        'IntegrationObjectItemAttributes' | ADMIN_OUTBOUNDSYNC_USER
    }

    @Test
    @Unroll
    def "User in groups integrationadmingroup AND integrationservicegroup is authorized to POST to /IntegrationService/#feed"() {
        when:
        def response = basicAuthRequest()
                .path(INTEGRATION_SERVICE_IO)
                .path(feed)
                .credentials(ADMIN_SERVICE_USER, PASSWORD)
                .build()
                .post Entity.json(json)

        then:
        response.status == HttpStatusCodes.CREATED.statusCode

        where:
        feed                              | json
        'IntegrationObjects'              | ORDER_IO_PAYLOAD
        'IntegrationObjectItems'          | ORDER_IOI_PAYLOAD
        'IntegrationObjectItemAttributes' | ORDER_CODE_IOI_ATTRIBUTE_PAYLOAD
    }


    @Test
    @Unroll
    def "User in groups integrationadmingroup AND integrationservicegroup is authorized to PATCH to /IntegrationService/#feed"() {
        given:
        orderIO.build()

        when:
        def response = basicAuthRequest()
                .path(INTEGRATION_SERVICE_IO)
                .path(feed)
                .credentials(ADMIN_SERVICE_USER, PASSWORD)
                .build()
                .patch(Entity.json(jsonBody))

        then:
        response.status == HttpStatusCodes.OK.statusCode

        where:
        feed                                                      | jsonBody
        "IntegrationObjects('$ORDER_IO')"                         | ORDER_IO_PAYLOAD
        "IntegrationObjectItems('Order|$ORDER_IO')"               | ORDER_IOI_PAYLOAD
        "IntegrationObjectItems('Order|$ORDER_IO')"               | ORDER_IOI_PAYLOAD
        "IntegrationObjectItemAttributes('code|Order|$ORDER_IO')" | ORDER_CODE_IOI_ATTRIBUTE_PAYLOAD
    }

    @Test
    @Unroll
    def "#user gets Not Found when sending a PATCH to /IntegrationService/#feed"() {
        given:
        orderIO.build()

        when:
        def response = basicAuthRequest()
                .path(INTEGRATION_SERVICE_IO)
                .path(feed)
                .credentials(user, PASSWORD)
                .build()
                .patch(Entity.json(jsonBody))

        then:
        response.status == HttpStatusCodes.NOT_FOUND.statusCode

        where:
        feed                                                      | user                    | jsonBody
        "IntegrationObjects('$ORDER_IO')"                         | ADMIN_OUTBOUNDSYNC_USER | ORDER_IO_PAYLOAD
        "IntegrationObjectItems('Order|$ORDER_IO')"               | ADMIN_OUTBOUNDSYNC_USER | ORDER_IOI_PAYLOAD
        "IntegrationObjectItemAttributes('code|Order|$ORDER_IO')" | ADMIN_OUTBOUNDSYNC_USER | ORDER_CODE_IOI_ATTRIBUTE_PAYLOAD

        "IntegrationObjects('$ORDER_IO')"                         | ADMIN_MONITOR_USER      | ORDER_IO_PAYLOAD
        "IntegrationObjectItems('Order|$ORDER_IO')"               | ADMIN_MONITOR_USER      | ORDER_IOI_PAYLOAD
        "IntegrationObjectItemAttributes('code|Order|$ORDER_IO')" | ADMIN_MONITOR_USER      | ORDER_CODE_IOI_ATTRIBUTE_PAYLOAD
    }

    @Test
    @Unroll
    def "#user gets #responseStatus when DELETE /IntegrationService/#feed"() {
        given:
        orderIO.build()

        when:
        def response = basicAuthRequest()
                .path(INTEGRATION_SERVICE_IO)
                .path(feed)
                .credentials(user, PASSWORD)
                .build()
                .delete()

        then:
        response.status == responseStatus.statusCode

        where:
        feed                                                      | user                    | responseStatus
        "IntegrationObjects('$ORDER_IO')"                         | ADMIN_OUTBOUNDSYNC_USER | HttpStatusCodes.NOT_FOUND
        "IntegrationObjectItems('Order|$ORDER_IO')"               | ADMIN_OUTBOUNDSYNC_USER | HttpStatusCodes.NOT_FOUND
        "IntegrationObjectItemAttributes('code|Order|$ORDER_IO')" | ADMIN_OUTBOUNDSYNC_USER | HttpStatusCodes.NOT_FOUND

        "IntegrationObjects('$ORDER_IO')"                         | ADMIN_MONITOR_USER      | HttpStatusCodes.NOT_FOUND
        "IntegrationObjectItems('Order|$ORDER_IO')"               | ADMIN_MONITOR_USER      | HttpStatusCodes.NOT_FOUND
        "IntegrationObjectItemAttributes('code|Order|$ORDER_IO')" | ADMIN_MONITOR_USER      | HttpStatusCodes.NOT_FOUND

        "IntegrationObjects('$ORDER_IO')"                         | ADMIN_SERVICE_USER      | HttpStatusCodes.OK
        "IntegrationObjectItems('Order|$ORDER_IO')"               | ADMIN_SERVICE_USER      | HttpStatusCodes.OK
        "IntegrationObjectItemAttributes('code|Order|$ORDER_IO')" | ADMIN_SERVICE_USER      | HttpStatusCodes.OK
    }

    @Test
    @Unroll
    def "User in groups integrationadmingroup,integrationservicegroup,outboundsyncgroup & integrationmonitoringgroup gets Forbidden for DELETE /IntegrationService/#feed"() {
        when:
        def response = basicAuthRequest()
                .path(INTEGRATION_SERVICE_IO)
                .path(feed)
                .credentials(ADMIN_SERVICE_OUTBOUNDSYNC_MONITOR_USER, PASSWORD)
                .build()
                .delete()

        then:
        response.status == HttpStatusCodes.FORBIDDEN.statusCode

        where:
        feed << ["IntegrationObjects('IntegrationService')",
                 "IntegrationObjects('InboundIntegrationMonitoring')",
                 "IntegrationObjects('OutboundChannelConfig')",

                 "IntegrationObjectItems('doesNotMatter|IntegrationService')",
                 "IntegrationObjectItems('doesNotMatter|InboundIntegrationMonitoring')",
                 "IntegrationObjectItems('doesNotMatter|OutboundChannelConfig')",

                 "IntegrationObjectItemAttributes('doesNotMatter|IntegrationService')",
                 "IntegrationObjectItemAttributes('doesNotMatter|InboundIntegrationMonitoring')",
                 "IntegrationObjectItemAttributes('doesNotMatter|OutboundChannelConfig')"
        ]
    }

    @Test
    @Unroll
    def "User in groups integrationadmingroup,integrationservicegroup,outboundsyncgroup & integrationmonitoringgroup gets Forbidden for PATCH /IntegrationService/#feed"() {
        when:
        def response = basicAuthRequest()
                .path(INTEGRATION_SERVICE_IO)
                .path(feed)
                .credentials(ADMIN_SERVICE_OUTBOUNDSYNC_MONITOR_USER, PASSWORD)
                .build()
                .patch Entity.json('{}')

        then:
        response.status == HttpStatusCodes.FORBIDDEN.statusCode

        where:
        feed << ["IntegrationObjects('IntegrationService')",
                 "IntegrationObjects('InboundIntegrationMonitoring')",
                 "IntegrationObjects('OutboundChannelConfig')",

                 "IntegrationObjectItems('doesNotMatter|IntegrationService')",
                 "IntegrationObjectItems('doesNotMatter|InboundIntegrationMonitoring')",
                 "IntegrationObjectItems('doesNotMatter|OutboundChannelConfig')",

                 "IntegrationObjectItemAttributes('doesNotMatter|IntegrationService')",
                 "IntegrationObjectItemAttributes('doesNotMatter|InboundIntegrationMonitoring')",
                 "IntegrationObjectItemAttributes('doesNotMatter|OutboundChannelConfig')"
        ]
    }

    def userInGroups(final String user, final String groups) {
        IntegrationTestUtil.importImpEx(
                '$password=@password[translator = de.hybris.platform.impex.jalo.translators.UserPasswordTranslator]',
                'INSERT_UPDATE Employee; UID[unique = true]; $password  ; groups(uid)',
                "                      ; $user             ; *:$PASSWORD; $groups")
    }

    def basicAuthRequest() {
        new BasicAuthRequestBuilder()
                .extensionName(Odata2webservicesConstants.EXTENSIONNAME)
                .accept('application/json')
    }
}
