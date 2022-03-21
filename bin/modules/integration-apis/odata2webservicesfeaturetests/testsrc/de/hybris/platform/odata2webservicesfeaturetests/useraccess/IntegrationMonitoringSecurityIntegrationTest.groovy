/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.odata2webservicesfeaturetests.useraccess

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.core.model.user.EmployeeModel
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.impex.ModuleEssentialData
import de.hybris.platform.odata2webservices.constants.Odata2webservicesConstants
import de.hybris.platform.odata2webservicesfeaturetests.ws.BasicAuthRequestBuilder
import de.hybris.platform.outboundservices.util.OutboundServicesEssentialData
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.webservicescommons.testsupport.server.NeedsEmbeddedServer
import org.apache.olingo.odata2.api.commons.HttpStatusCodes
import org.junit.ClassRule
import org.junit.Test
import spock.lang.Shared
import spock.lang.Unroll

import javax.ws.rs.client.Entity

import static de.hybris.platform.odata2webservices.util.Odata2WebServicesEssentialData.odata2WebservicesEssentialData

@NeedsEmbeddedServer(webExtensions = [Odata2webservicesConstants.EXTENSIONNAME])
@IntegrationTest
class IntegrationMonitoringSecurityIntegrationTest extends ServicelayerSpockSpecification {
    private static final String TEST_NAME = "IntegrationMonitoringSecurity"
    private static final String PASSWORD = 'password'
    private static final String GROUP_ADMIN = 'integrationadmingroup'
    private static final String GROUP_MONITOR = 'integrationmonitoringgroup'
    private static final String GROUP_MONITOR_ADMIN = "$GROUP_ADMIN,$GROUP_MONITOR"
    private static final String GROUP_SERVICE = 'integrationservicegroup'
    private static final String GROUP_CREATE = 'integrationcreategroup'
    private static final String GROUP_VIEW = 'integrationviewgroup'
    private static final String GROUP_DELETE = 'integrationdeletegroup'

    private static final String ADMIN_USER = "$TEST_NAME-integrationadmingroup-user"
    private static final String MONITOR_USER = "$TEST_NAME-integrationmonitoringgroup-user"
    private static final String SERVICE_USER = "$TEST_NAME-integrationservicegroup-user"
    private static final String CREATE_USER = "$TEST_NAME-integrationcreategroup-user"
    private static final String VIEW_USER = "$TEST_NAME-integrationviewgroup-user"
    private static final String DELETE_USER = "$TEST_NAME-integrationdeletegroup-user"
    private static final String MONITOR_ADMIN_USER = "$TEST_NAME-integrationadmingroup+integrationmonitoringgroup-user"

    private static final def users = [ADMIN_USER, MONITOR_USER, SERVICE_USER, CREATE_USER, VIEW_USER, DELETE_USER]

    private static final String INBOUND_MONITORING_IO = 'InboundIntegrationMonitoring'
    private static final String OUTBOUND_MONITORING_IO = 'OutboundIntegrationMonitoring'

    @Shared
    @ClassRule
    ModuleEssentialData inboundEssentialData = odata2WebservicesEssentialData().withDependencies()
    @Shared
    @ClassRule
    ModuleEssentialData outboundEssentialData = OutboundServicesEssentialData.outboundServicesEssentialData()

    def setupSpec() {
        userInGroups(ADMIN_USER, GROUP_ADMIN)
        userInGroups(MONITOR_USER, GROUP_MONITOR)
        userInGroups(SERVICE_USER, GROUP_SERVICE)
        userInGroups(CREATE_USER, GROUP_CREATE)
        userInGroups(VIEW_USER, GROUP_VIEW)
        userInGroups(DELETE_USER, GROUP_DELETE)
        userInGroups(MONITOR_ADMIN_USER, GROUP_MONITOR_ADMIN)
    }

    def cleanupSpec() {
        users.each { user -> IntegrationTestUtil.remove EmployeeModel, { users.contains it.uid } }
    }

    def userInGroups(final String user, final String groups) {
        IntegrationTestUtil.importImpEx(
                '$password=@password[translator = de.hybris.platform.impex.jalo.translators.UserPasswordTranslator]',
                'INSERT_UPDATE Employee; UID[unique = true]; $password  ; groups(uid)',
                "                      ; $user             ; *:$PASSWORD; $groups")
    }

    @Test
    @Unroll
    def "User must be authenticated in order to GET /#service"() {
        when:
        def response = basicAuthRequest(service)
                .build()
                .get()

        then:
        response.status == HttpStatusCodes.UNAUTHORIZED.statusCode

        where:
        service << [INBOUND_MONITORING_IO, OUTBOUND_MONITORING_IO]
    }

    @Test
    @Unroll
    def "GET /#service returns #status for #user"() {
        when:
        def response = basicAuthRequest(service)
                .credentials(user, PASSWORD)
                .build()
                .get()

        then:
        response.status == status.statusCode

        where:
        service                | user               | status
        INBOUND_MONITORING_IO  | MONITOR_ADMIN_USER | HttpStatusCodes.OK
        INBOUND_MONITORING_IO  | ADMIN_USER         | HttpStatusCodes.FORBIDDEN
        INBOUND_MONITORING_IO  | MONITOR_USER       | HttpStatusCodes.OK
        INBOUND_MONITORING_IO  | SERVICE_USER       | HttpStatusCodes.FORBIDDEN
        INBOUND_MONITORING_IO  | CREATE_USER        | HttpStatusCodes.FORBIDDEN
        INBOUND_MONITORING_IO  | VIEW_USER          | HttpStatusCodes.FORBIDDEN
        INBOUND_MONITORING_IO  | DELETE_USER        | HttpStatusCodes.FORBIDDEN
        OUTBOUND_MONITORING_IO | ADMIN_USER         | HttpStatusCodes.FORBIDDEN
        OUTBOUND_MONITORING_IO | MONITOR_USER       | HttpStatusCodes.OK
        OUTBOUND_MONITORING_IO | MONITOR_ADMIN_USER | HttpStatusCodes.OK
        OUTBOUND_MONITORING_IO | SERVICE_USER       | HttpStatusCodes.FORBIDDEN
        OUTBOUND_MONITORING_IO | CREATE_USER        | HttpStatusCodes.FORBIDDEN
        OUTBOUND_MONITORING_IO | VIEW_USER          | HttpStatusCodes.FORBIDDEN
        OUTBOUND_MONITORING_IO | DELETE_USER        | HttpStatusCodes.FORBIDDEN
    }

    @Test
    @Unroll
    def "GET /#service/anyfeed returns #status for #user"() {
        when:
        def response = basicAuthRequest(service)
                .path('IntegrationRequestStatuses')
                .credentials(user, PASSWORD)
                .build()
                .get()

        then:
        response.status == status.statusCode

        where:
        service                | user               | status
        INBOUND_MONITORING_IO  | ADMIN_USER         | HttpStatusCodes.FORBIDDEN
        INBOUND_MONITORING_IO  | MONITOR_USER       | HttpStatusCodes.OK
        INBOUND_MONITORING_IO  | MONITOR_ADMIN_USER | HttpStatusCodes.OK
        INBOUND_MONITORING_IO  | SERVICE_USER       | HttpStatusCodes.FORBIDDEN
        INBOUND_MONITORING_IO  | CREATE_USER        | HttpStatusCodes.FORBIDDEN
        INBOUND_MONITORING_IO  | VIEW_USER          | HttpStatusCodes.FORBIDDEN
        INBOUND_MONITORING_IO  | DELETE_USER        | HttpStatusCodes.FORBIDDEN
        OUTBOUND_MONITORING_IO | ADMIN_USER         | HttpStatusCodes.FORBIDDEN
        OUTBOUND_MONITORING_IO | MONITOR_USER       | HttpStatusCodes.OK
        OUTBOUND_MONITORING_IO | MONITOR_ADMIN_USER | HttpStatusCodes.OK
        OUTBOUND_MONITORING_IO | SERVICE_USER       | HttpStatusCodes.FORBIDDEN
        OUTBOUND_MONITORING_IO | CREATE_USER        | HttpStatusCodes.FORBIDDEN
        OUTBOUND_MONITORING_IO | VIEW_USER          | HttpStatusCodes.FORBIDDEN
        OUTBOUND_MONITORING_IO | DELETE_USER        | HttpStatusCodes.FORBIDDEN
    }

    @Test
    @Unroll
    def "POST to /#service/anyfeed is Forbidden for #user"() {
        when:
        def response = basicAuthRequest(service)
                .path('IntegrationRequestStatuses')
                .credentials(user, PASSWORD)
                .build()
                .post(Entity.json('{}'))

        then:
        response.status == HttpStatusCodes.FORBIDDEN.statusCode

        where:
        service                | user
        INBOUND_MONITORING_IO  | ADMIN_USER
        INBOUND_MONITORING_IO  | MONITOR_USER
        INBOUND_MONITORING_IO  | MONITOR_ADMIN_USER
        INBOUND_MONITORING_IO  | SERVICE_USER
        INBOUND_MONITORING_IO  | CREATE_USER
        INBOUND_MONITORING_IO  | VIEW_USER
        INBOUND_MONITORING_IO  | DELETE_USER
        OUTBOUND_MONITORING_IO | ADMIN_USER
        OUTBOUND_MONITORING_IO | MONITOR_USER
        OUTBOUND_MONITORING_IO | MONITOR_ADMIN_USER
        OUTBOUND_MONITORING_IO | SERVICE_USER
        OUTBOUND_MONITORING_IO | CREATE_USER
        OUTBOUND_MONITORING_IO | VIEW_USER
        OUTBOUND_MONITORING_IO | DELETE_USER
    }

    @Test
    @Unroll
    def "DELETE from /#service/anyfeed is Forbidden for #user"() {
        when:
        def response = basicAuthRequest(service)
                .path('IntegrationRequestStatuses')
                .credentials(user, PASSWORD)
                .build()
                .delete()

        then:
        response.status == HttpStatusCodes.FORBIDDEN.statusCode

        where:
        service                | user
        INBOUND_MONITORING_IO  | ADMIN_USER
        INBOUND_MONITORING_IO  | MONITOR_USER
        INBOUND_MONITORING_IO  | MONITOR_ADMIN_USER
        INBOUND_MONITORING_IO  | SERVICE_USER
        INBOUND_MONITORING_IO  | CREATE_USER
        INBOUND_MONITORING_IO  | VIEW_USER
        INBOUND_MONITORING_IO  | DELETE_USER
        OUTBOUND_MONITORING_IO | ADMIN_USER
        OUTBOUND_MONITORING_IO | MONITOR_USER
        OUTBOUND_MONITORING_IO | MONITOR_ADMIN_USER
        OUTBOUND_MONITORING_IO | SERVICE_USER
        OUTBOUND_MONITORING_IO | CREATE_USER
        OUTBOUND_MONITORING_IO | VIEW_USER
        OUTBOUND_MONITORING_IO | DELETE_USER
    }

    @Test
    @Unroll
    def "PATCH /#service/anyfeed is Forbidden for #user"() {
        when:
        def response = basicAuthRequest(service)
                .path('IntegrationRequestStatuses')
                .credentials(user, PASSWORD)
                .build()
                .patch Entity.json('{}')

        then:
        response.status == HttpStatusCodes.FORBIDDEN.statusCode

        where:
        service                | user
        INBOUND_MONITORING_IO  | ADMIN_USER
        INBOUND_MONITORING_IO  | MONITOR_USER
        INBOUND_MONITORING_IO  | MONITOR_ADMIN_USER
        INBOUND_MONITORING_IO  | SERVICE_USER
        INBOUND_MONITORING_IO  | CREATE_USER
        INBOUND_MONITORING_IO  | VIEW_USER
        INBOUND_MONITORING_IO  | DELETE_USER
        OUTBOUND_MONITORING_IO | ADMIN_USER
        OUTBOUND_MONITORING_IO | MONITOR_USER
        OUTBOUND_MONITORING_IO | MONITOR_ADMIN_USER
        OUTBOUND_MONITORING_IO | SERVICE_USER
        OUTBOUND_MONITORING_IO | CREATE_USER
        OUTBOUND_MONITORING_IO | VIEW_USER
        OUTBOUND_MONITORING_IO | DELETE_USER
    }

    def basicAuthRequest(String path) {
        new BasicAuthRequestBuilder()
                .extensionName(Odata2webservicesConstants.EXTENSIONNAME)
                .accept("application/json")
                .path(path)
    }
}
