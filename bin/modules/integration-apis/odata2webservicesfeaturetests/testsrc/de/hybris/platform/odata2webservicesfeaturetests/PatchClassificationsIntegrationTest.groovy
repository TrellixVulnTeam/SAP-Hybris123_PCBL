/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.odata2webservicesfeaturetests

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.core.model.user.EmployeeModel
import de.hybris.platform.integrationservices.enums.AuthenticationType
import de.hybris.platform.integrationservices.model.InboundChannelConfigurationModel
import de.hybris.platform.integrationservices.util.ClassificationBuilder
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.JsonObject
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

import javax.ws.rs.client.Entity
import javax.ws.rs.core.Response

import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemClassificationAttributeBuilder.classificationAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.IntegrationObjectModelBuilder.integrationObject
import static de.hybris.platform.integrationservices.util.ClassificationAttributeUnitBuilder.classificationAttributeUnit
import static de.hybris.platform.integrationservices.util.ClassificationBuilder.attribute
import static de.hybris.platform.odata2services.util.Odata2ServicesEssentialData.odata2ServicesEssentialData
import static de.hybris.platform.odata2webservicesfeaturetests.useraccess.UserAccessTestUtils.givenUserExistsWithUidAndGroups
import static de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder.inboundChannelConfigurationBuilder

@NeedsEmbeddedServer(webExtensions = Odata2webservicesConstants.EXTENSIONNAME)
@IntegrationTest
class PatchClassificationsIntegrationTest extends ServicelayerSpockSpecification {

    private static final def TEST_NAME = "PatchClassifications"
    private static final def USER = "${TEST_NAME}_User"
    private static final def PASSWORD = 'secret'
    private static final def SYSTEM = "${TEST_NAME}_Electronics"
    private static final def VERSION = 'Test'
    private static final def TEST_IO = "${TEST_NAME}_IO"

    @Shared
    @ClassRule
    ModuleEssentialData essentialData = odata2ServicesEssentialData().withDependencies()
    @Shared
    @ClassRule
    ClassificationBuilder classificationSystem = ClassificationBuilder.classification()
            .withSystem(SYSTEM)
            .withVersion(VERSION)
            .withClassificationClass('dimensions')
            .withUnit(classificationAttributeUnit().withCode('centimeters').withUnitType('measurement').withSymbol('cm'))
            .withAttribute(attribute().withName('height').withUnit('centimeters').number())
    @Rule
    InboundChannelConfigurationBuilder inboundChannel = inboundChannelConfigurationBuilder()
            .withAuthType(AuthenticationType.BASIC)
            .withIntegrationObject integrationObject().withCode(TEST_IO)
            .withItem(integrationObjectItem().withCode('Catalog')
                    .withAttribute(integrationObjectItemAttribute().withName('id')))
            .withItem(integrationObjectItem().withCode('CatalogVersion')
                    .withAttribute(integrationObjectItemAttribute('version'))
                    .withAttribute(integrationObjectItemAttribute('catalog').withReturnItem('Catalog')))
            .withItem(integrationObjectItem().withCode('Product')
                    .withAttribute(integrationObjectItemAttribute('code'))
                    .withAttribute(integrationObjectItemAttribute('catalogVersion').withReturnItem('CatalogVersion'))
                    .withAttribute(classificationAttribute('height').withClassificationSystem(SYSTEM, VERSION)
                            .withClassAssignment('dimensions', 'height')))

    def setupSpec() {
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationcreategroup")
    }

    def cleanupSpec() {
        IntegrationTestUtil.removeSafely EmployeeModel, { it.uid == USER }
    }

    @Test
    def 'patching an integration object with classification attributes is not implemented'() {
        when:
        def response = basicAuthRequest(TEST_IO)
                .path("Products('some|integration|key')")
                .build()
                .patch Entity.json()

        then:
        response.status == 501
        def json = asJson(response)
        with(json) {
            getString('\$.error.code') == 'operation_not_supported'
            getString('\$.error.message.value').contains 'PATCH'
        }

        cleanup:
        IntegrationTestUtil.remove InboundChannelConfigurationModel, { it?.integrationObject?.code == TEST_IO }
    }

    BasicAuthRequestBuilder basicAuthRequest(final String path) {
        new BasicAuthRequestBuilder()
                .extensionName(Odata2webservicesConstants.EXTENSIONNAME)
                .credentials(USER, PASSWORD)
                .path(path)
                .accept("application/json")
    }

    JsonObject asJson(final Response response) {
        JsonObject.createFrom((InputStream) response.getEntity())
    }
}
