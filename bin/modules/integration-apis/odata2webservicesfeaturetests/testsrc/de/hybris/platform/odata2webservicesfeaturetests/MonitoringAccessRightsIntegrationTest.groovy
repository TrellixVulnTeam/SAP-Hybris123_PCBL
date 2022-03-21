/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.odata2webservicesfeaturetests

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.odata2webservices.constants.Odata2webservicesConstants
import de.hybris.platform.odata2webservices.util.Odata2WebServicesEssentialData
import de.hybris.platform.odata2webservicesfeaturetests.useraccess.UserAccessTestUtils
import de.hybris.platform.outboundservices.util.OutboundServicesEssentialData
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.servicelayer.config.ConfigurationService
import de.hybris.platform.webservicescommons.testsupport.server.NeedsEmbeddedServer
import org.apache.commons.lang3.RandomStringUtils
import org.apache.olingo.odata2.api.commons.HttpStatusCodes
import org.junit.ClassRule
import org.junit.Test
import spock.lang.Shared
import spock.lang.Unroll

import javax.annotation.Resource

import static de.hybris.platform.odata2webservices.util.Odata2WebServicesEssentialData.odata2WebservicesEssentialData
import static de.hybris.platform.outboundservices.util.OutboundServicesEssentialData.outboundServicesEssentialData
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE

@NeedsEmbeddedServer(webExtensions = [Odata2webservicesConstants.EXTENSIONNAME])
@IntegrationTest
class MonitoringAccessRightsIntegrationTest extends ServicelayerSpockSpecification {
    private static final String TEST_NAME = "MonitoringAccessRights"
    private static final String USER = "$TEST_NAME-test-monitoring-user"
    private static final def PWD = RandomStringUtils.randomAlphanumeric(10)
    private static final String INBOUND_MONITORING_SERVICE = 'InboundIntegrationMonitoring'
    private static final String OUTBOUND_MONITORING_SERVICE = 'OutboundIntegrationMonitoring'

    @Shared
    @ClassRule
    Odata2WebServicesEssentialData inboundEssentialData = odata2WebservicesEssentialData().withDependencies()
    @Shared
    @ClassRule
    OutboundServicesEssentialData outboundEssentialData = outboundServicesEssentialData()

    @Resource(name = "defaultConfigurationService")
    private ConfigurationService configurationService

    def setupSpec() {
        UserAccessTestUtils.createUser USER, PWD, 'integrationmonitoringgroup'
    }

    def setup() {
        setAccessRights(true)
    }

    def cleanupSpec() {
        UserAccessTestUtils.deleteUser USER
    }

    def cleanup() {
        setAccessRights(false)
    }

    @Test
    @Unroll
    def "access rights granted to GET /InboundIntegrationMonitoring/#entitySet"() {
        when:
        def response = getRequest(entitySet, INBOUND_MONITORING_SERVICE)

        then:
        response.status == HttpStatusCodes.OK.statusCode

        where:
        entitySet << ['IntegrationRequestStatuses', 'InboundRequests', 'InboundRequestErrors', 'InboundUsers']
    }

    @Test
    @Unroll
    def "access rights granted to GET /OutboundIntegrationMonitoring/#entitySet"() {
        when:
        def response = getRequest(entitySet, OUTBOUND_MONITORING_SERVICE)

        then:
        response.status == HttpStatusCodes.OK.statusCode

        where:
        entitySet << ['OutboundRequests', 'IntegrationRequestStatuses']
    }

    def getRequest(String path, String service) {
        UserAccessTestUtils.basicAuthRequest(service)
                .credentials(USER, PWD)
                .accept(APPLICATION_JSON_VALUE)
                .path(path)
                .build().get()
    }

    def setAccessRights(final boolean enabled) {
        configurationService.getConfiguration().setProperty("integrationservices.authorization.accessrights.enabled", String.valueOf(enabled))
    }
}
