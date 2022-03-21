/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.odata2webservicesfeaturetests

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.core.model.user.EmployeeModel
import de.hybris.platform.integrationservices.enums.AuthenticationType
import de.hybris.platform.inboundservices.util.InboundMonitoringRule
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.XmlObject
import de.hybris.platform.integrationservices.util.impex.ModuleEssentialData
import de.hybris.platform.odata2webservices.constants.Odata2webservicesConstants
import de.hybris.platform.odata2webservicesfeaturetests.ws.BasicAuthRequestBuilder
import de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.webservicescommons.testsupport.server.NeedsEmbeddedServer
import org.junit.ClassRule
import org.junit.Rule
import org.junit.Test
import spock.lang.Shared

import javax.ws.rs.core.Response

import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.IntegrationObjectModelBuilder.integrationObject
import static de.hybris.platform.odata2services.util.Odata2ServicesEssentialData.odata2ServicesEssentialData
import static de.hybris.platform.odata2webservicesfeaturetests.useraccess.UserAccessTestUtils.givenUserExistsWithUidAndGroups
import static de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder.inboundChannelConfigurationBuilder

@NeedsEmbeddedServer(webExtensions = Odata2webservicesConstants.EXTENSIONNAME)
@IntegrationTest
class GetMetadataIntegrationTest extends ServicelayerSpockSpecification {

    private static final String USER = "${TEST_NAME}_User"
    private static final String PASSWORD = 'secret'
    private static final String TEST_NAME = "GetMetadata"
    private static final String IO = "${TEST_NAME}_IO"

    @Shared
    @ClassRule
    ModuleEssentialData essentialData = odata2ServicesEssentialData().withDependencies()
    @Shared
    @ClassRule
    InboundChannelConfigurationBuilder inboundChannel = inboundChannelConfigurationBuilder()
            .withAuthType(AuthenticationType.BASIC)
            .withIntegrationObject integrationObject().withCode(IO)
            .withItem(integrationObjectItem().withCode('Catalog')
                    .withAttribute(integrationObjectItemAttribute().withName('id')))
    @Rule
    InboundMonitoringRule monitoring = InboundMonitoringRule.disabled()

    def setupSpec() {
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationviewgroup")
    }

    def cleanupSpec() {
        IntegrationTestUtil.removeSafely EmployeeModel, { it.uid == USER }
    }

    @Test
    def 'retrieves EDMX for /$metadata'() {
        when:
        def response = basicAuthRequest()
                .path('$metadata')
                .build()
                .get()

        then:
        response.status == 200
        def xml = extractBody response
        xml.exists '//Schema/EntityType/Key'
        xml.exists '//Schema/EntityType/Property'
        xml.exists '//EntityContainer/EntitySet'
    }

    @Test
    def 'retrieves EDMX for /$metadata?Catalog='() {
        when:
        def response = basicAuthRequest()
                .path('$metadata')
                .queryParam('Catalog', '')
                .build()
                .get()

        then:
        response.status == 200
        def xml = extractBody response
        xml.exists '//Schema/EntityType/Key'
        xml.exists '//Schema/EntityType/Property'
        xml.exists '//EntityContainer/EntitySet'
    }

    BasicAuthRequestBuilder basicAuthRequest() {
        new BasicAuthRequestBuilder()
                .extensionName(Odata2webservicesConstants.EXTENSIONNAME)
                .credentials(USER, PASSWORD)
                .accept('application/xml')
                .path(IO)
    }

    XmlObject extractBody(Response response) {
        XmlObject.createFrom response.getEntity() as InputStream
    }
}
