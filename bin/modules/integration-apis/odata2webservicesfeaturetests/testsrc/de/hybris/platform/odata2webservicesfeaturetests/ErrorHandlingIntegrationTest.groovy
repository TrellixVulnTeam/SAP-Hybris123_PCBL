/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.odata2webservicesfeaturetests

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.core.model.user.EmployeeModel
import de.hybris.platform.integrationservices.enums.AuthenticationType
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.JsonObject
import de.hybris.platform.integrationservices.util.XmlObject
import de.hybris.platform.odata2webservices.constants.Odata2webservicesConstants
import de.hybris.platform.odata2webservices.util.Odata2WebServicesEssentialData
import de.hybris.platform.odata2webservicesfeaturetests.ws.BasicAuthRequestBuilder
import de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder
import de.hybris.platform.outboundservices.util.OutboundServicesEssentialData
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.webservicescommons.testsupport.server.NeedsEmbeddedServer
import org.apache.http.HttpStatus
import org.junit.ClassRule
import org.junit.Test
import spock.lang.Shared
import spock.lang.Unroll

import javax.ws.rs.client.Entity

import static de.hybris.platform.integrationservices.IntegrationObjectModelBuilder.integrationObject
import static de.hybris.platform.odata2webservices.util.Odata2WebServicesEssentialData.odata2WebservicesEssentialData
import static de.hybris.platform.odata2webservicesfeaturetests.useraccess.UserAccessTestUtils.givenUserExistsWithUidAndGroups
import static de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder.inboundChannelConfigurationBuilder
import static de.hybris.platform.outboundservices.util.OutboundServicesEssentialData.outboundServicesEssentialData

@NeedsEmbeddedServer(webExtensions = [Odata2webservicesConstants.EXTENSIONNAME])
@IntegrationTest
class ErrorHandlingIntegrationTest extends ServicelayerSpockSpecification {
    private static final String TEST_NAME = "ErrorHandling"
    private static final String USER = "${TEST_NAME}_User"
    private static final String PASSWORD = 'password'
    private static final String INTEGRATION_SERVICE = "IntegrationService"
    private static final String INTEGRATION_INBOUND_MONITORING = "InboundIntegrationMonitoring"
    private static final String INTEGRATION_OUTBOUND_MONITORING = "OutboundIntegrationMonitoring"
    private static final String INBOUND_PRODUCT = "${TEST_NAME}_InboundProduct"

    @Shared
    @ClassRule
    Odata2WebServicesEssentialData inboundEssentialData = odata2WebservicesEssentialData().withDependencies()
    @Shared
    @ClassRule
    OutboundServicesEssentialData outboundEssentialData = outboundServicesEssentialData()
    @Shared
    @ClassRule
    InboundChannelConfigurationBuilder inboundProduct = inboundChannelConfigurationBuilder()
            .withAuthType(AuthenticationType.BASIC)
            .withIntegrationObject integrationObject().withCode(INBOUND_PRODUCT)

    def cleanup() {
        IntegrationTestUtil.removeSafely EmployeeModel, { it.uid == USER }
    }

    @Test
    def 'handles 401 Unauthorized in application/json content'() {
        when:
        def response = basicAuthRequest()
                .accept('application/json')
                .build()
                .get()

        then:
        response.status == HttpStatus.SC_UNAUTHORIZED
        response.getHeaderString('Content-Type') == 'application/json;charset=UTF-8'
        def json = JsonObject.createFrom response.readEntity(String)
        json.getString('error.code') == 'unauthorized'
        json.getString('error.message.lang') == 'en'
    }

    @Test
    def 'handles 401 Unauthorized in application/xml content'() {
        when:
        def response = basicAuthRequest()
                .accept('application/xml')
                .build()
                .get()

        then:
        response.status == HttpStatus.SC_UNAUTHORIZED
        response.getHeaderString('Content-Type') == 'application/xml;charset=UTF-8'
        def xml = XmlObject.createFrom response.readEntity(String)
        xml.get('/error/code') == 'unauthorized'
        xml.get('/error/message/@lang') == 'en'
    }

    @Test
    @Unroll
    def "GET /#io: 404 Not Found in application/json content"() {
        given: "A User with integrationadmingroup"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationadmingroup")

        when:
        def response = basicAuthRequest(io)
                .credentials(USER, PASSWORD)
                .accept('application/json')
                .build()
                .get()

        then:
        response.status == HttpStatus.SC_NOT_FOUND
        response.getHeaderString('Content-Type') == 'application/json;charset=UTF-8'
        def json = JsonObject.createFrom response.readEntity(String)
        json.getString('error.code') == 'not_found'
        json.getString('error.message.lang') == 'en'

        where:
        io << [INTEGRATION_SERVICE, "NonExistentIO"]
    }

    @Test
    @Unroll
    def "GET /#io: 404 Not Found in application/xml content"() {
        given: "A User with integrationadmingroup"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationadmingroup")

        when:
        def response = basicAuthRequest(io)
                .credentials(USER, PASSWORD)
                .accept('application/xml')
                .build()
                .get()

        then:
        response.status == HttpStatus.SC_NOT_FOUND
        response.getHeaderString('Content-Type') == 'application/xml;charset=UTF-8'
        def xml = XmlObject.createFrom response.readEntity(String)
        xml.get('/error/code') == 'not_found'
        xml.get('/error/message/@lang') == 'en'

        where:
        io << [INTEGRATION_SERVICE, "NonExistentIO"]
    }

    @Test
    @Unroll
    def "GET /#io: 403 Forbidden in application/json content for integrationadmingroup"() {
        given: "User is in integrationadmingroup"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationadmingroup")

        when:
        def response = basicAuthRequest(io)
                .credentials(USER, PASSWORD)
                .accept('application/json')
                .build()
                .get()

        then:
        response.status == HttpStatus.SC_FORBIDDEN
        response.getHeaderString('Content-Type') == 'application/json;charset=UTF-8'
        def json = JsonObject.createFrom response.readEntity(String)
        json.getString('error.code') == 'forbidden'
        json.getString('error.message.lang') == 'en'

        where:
        io << [INTEGRATION_INBOUND_MONITORING, INTEGRATION_OUTBOUND_MONITORING]
    }

    @Test
    @Unroll
    def "GET /#io: 403 Forbidden in application/xml content for integrationadmingroup"() {
        given: "User is in integrationadmingroup"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationadmingroup")

        when:
        def response = basicAuthRequest(io)
                .credentials(USER, PASSWORD)
                .accept('application/xml')
                .build()
                .get()

        then:
        response.status == HttpStatus.SC_FORBIDDEN
        response.getHeaderString('Content-Type') == 'application/xml;charset=UTF-8'
        def xml = XmlObject.createFrom response.readEntity(String)
        xml.get('/error/code') == 'forbidden'
        xml.get('/error/message/@lang') == 'en'

        where:
        io << [INTEGRATION_INBOUND_MONITORING, INTEGRATION_OUTBOUND_MONITORING]
    }

    @Test
    @Unroll
    def "GET /#io: 403 Forbidden in application/json content for integrationcreategroup"() {
        given: "User is in integrationcreategroup"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationcreategroup")

        when:
        def response = basicAuthRequest(io)
                .credentials(USER, PASSWORD)
                .accept('application/json')
                .build()
                .get()

        then:
        response.status == HttpStatus.SC_FORBIDDEN
        response.getHeaderString('Content-Type') == 'application/json;charset=UTF-8'
        def json = JsonObject.createFrom response.readEntity(String)
        json.getString('error.code') == 'forbidden'
        json.getString('error.message.lang') == 'en'

        where:
        io << [INTEGRATION_SERVICE, INTEGRATION_INBOUND_MONITORING, INTEGRATION_OUTBOUND_MONITORING, INBOUND_PRODUCT]
    }

    @Test
    @Unroll
    def "GET /#io: 403 Forbidden in application/xml content"() {
        given: "User is in integrationcreategroup"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationcreategroup")

        when:
        def response = basicAuthRequest(io)
                .credentials(USER, PASSWORD)
                .accept('application/xml')
                .build()
                .get()

        then:
        response.status == HttpStatus.SC_FORBIDDEN
        response.getHeaderString('Content-Type') == 'application/xml;charset=UTF-8'
        def xml = XmlObject.createFrom response.readEntity(String)
        xml.get('/error/code') == 'forbidden'
        xml.get('/error/message/@lang') == 'en'

        where:
        io << [INTEGRATION_SERVICE, INTEGRATION_INBOUND_MONITORING, INTEGRATION_OUTBOUND_MONITORING, INBOUND_PRODUCT]
    }

    @Test
    def 'POST /InboundProduct 403 Forbidden with application/json content'() {
        given: "User is in integrationviewgroup"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationviewgroup")

        when:
        def response = basicAuthRequest(INBOUND_PRODUCT)
                .credentials(USER, PASSWORD)
                .accept('application/json')
                .build()
                .post(Entity.json('{}'))

        then:
        response.status == HttpStatus.SC_FORBIDDEN
        response.getHeaderString('Content-Type') == 'application/json;charset=UTF-8'
        def json = JsonObject.createFrom response.readEntity(String)
        json.getString('error.code') == 'forbidden'
        json.getString('error.message.lang') == 'en'
    }

    @Test
    def 'POST /InboundProduct 403 Forbidden with application/xml content'() {
        given: "User is in integrationviewgroup"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationviewgroup")

        when:
        def response = basicAuthRequest(INBOUND_PRODUCT)
                .credentials(USER, PASSWORD)
                .accept('application/xml')
                .build()
                .post(Entity.xml('<product />'))

        then:
        response.status == HttpStatus.SC_FORBIDDEN
        response.getHeaderString('Content-Type') == 'application/xml;charset=UTF-8'
        def xml = XmlObject.createFrom response.readEntity(String)
        xml.get('/error/code') == 'forbidden'
        xml.get('/error/message/@lang') == 'en'
    }

    def basicAuthRequest(String path = '') {
        new BasicAuthRequestBuilder()
                .extensionName(Odata2webservicesConstants.EXTENSIONNAME)
                .path(path)
    }
}
