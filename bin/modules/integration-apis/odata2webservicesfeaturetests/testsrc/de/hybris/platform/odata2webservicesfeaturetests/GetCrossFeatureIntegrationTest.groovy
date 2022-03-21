/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.odata2webservicesfeaturetests

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.category.model.CategoryModel
import de.hybris.platform.core.model.product.ProductModel
import de.hybris.platform.core.model.user.EmployeeModel
import de.hybris.platform.integrationservices.enums.AuthenticationType
import de.hybris.platform.inboundservices.util.InboundMonitoringRule
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.JsonObject
import de.hybris.platform.odata2webservices.constants.Odata2webservicesConstants
import de.hybris.platform.odata2webservices.util.Odata2WebServicesEssentialData
import de.hybris.platform.odata2webservicesfeaturetests.ws.BasicAuthRequestBuilder
import de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.webservicescommons.testsupport.server.NeedsEmbeddedServer
import org.junit.ClassRule
import org.junit.Rule
import org.junit.Test
import spock.lang.Shared

import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response

import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.IntegrationObjectModelBuilder.integrationObject
import static de.hybris.platform.odata2webservices.util.Odata2WebServicesEssentialData.odata2WebservicesEssentialData
import static de.hybris.platform.odata2webservicesfeaturetests.useraccess.UserAccessTestUtils.givenUserExistsWithUidAndGroups
import static de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder.inboundChannelConfigurationBuilder

@NeedsEmbeddedServer(webExtensions = Odata2webservicesConstants.EXTENSIONNAME)
@IntegrationTest
class GetCrossFeatureIntegrationTest extends ServicelayerSpockSpecification {

    private static final String TEST_NAME = "GetCrossFeature"
    private static final String CROSS_FEATURE_IO = "${TEST_NAME}_IO"
    private static final String USER_UID = "${TEST_NAME}_User"
    private static final String PASSWORD = "retset"
    private static final String CATALOG = "${TEST_NAME}_Catalog"
    private static final String VERSION = "Staged"
    private static final String CATALOG_VERSION = "$CATALOG:$VERSION"
    private static final String CATEGORY1 = "${TEST_NAME}_Category1"
    private static final String CATEGORY2 = "${TEST_NAME}_Category2"
    private static final String CATEGORY3 = "${TEST_NAME}_Category3"

    @Shared
    @ClassRule
    Odata2WebServicesEssentialData essentialData = odata2WebservicesEssentialData().withDependencies()
    @Shared
    @ClassRule
    InboundChannelConfigurationBuilder inboundChannel = inboundChannelConfigurationBuilder()
            .withAuthType(AuthenticationType.BASIC)
            .withIntegrationObject integrationObject().withCode(CROSS_FEATURE_IO)
            .withItem(integrationObjectItem().withCode('Catalog')
                    .withAttribute(integrationObjectItemAttribute().withName('id')))
            .withItem(integrationObjectItem().withCode('CatalogVersion')
                    .withAttribute(integrationObjectItemAttribute('version'))
                    .withAttribute(integrationObjectItemAttribute('catalog').withReturnItem('Catalog')))
            .withItem(integrationObjectItem().withCode('Product')
                    .withAttribute(integrationObjectItemAttribute('code'))
                    .withAttribute(integrationObjectItemAttribute('catalogVersion').withReturnItem('CatalogVersion'))
                    .withAttribute(integrationObjectItemAttribute('supercategories').withReturnItem('Category')))
            .withItem(integrationObjectItem().withCode('Category')
                    .withAttribute(integrationObjectItemAttribute('code'))
                    .withAttribute(integrationObjectItemAttribute('products').withReturnItem('Product')))

    @Rule
    InboundMonitoringRule monitoring = InboundMonitoringRule.disabled()

    def setupSpec() {
        IntegrationTestUtil.importImpEx(
                '$catalog = Default',
                '$version = Staged',
                '$catalogVersion = $catalog:$version',
                'INSERT_UPDATE Catalog; id[unique = true]; name[lang = en]; defaultCatalog;',
                "; $CATALOG ; $CATALOG ; true",
                'INSERT_UPDATE CatalogVersion; catalog(id)[unique = true]; version[unique = true]; active;',
                "; $CATALOG ; $VERSION ; true",
                'INSERT_UPDATE Category; code[unique = true];',
                "; $CATEGORY1",
                "; $CATEGORY2",
                "; $CATEGORY3",
                'INSERT_UPDATE Product; code[unique = true]; catalogVersion(catalog(id), version); supercategories(code)',
                "; pr1-1   ; $CATALOG_VERSION; $CATEGORY1",
                "; pr2-1   ; $CATALOG_VERSION; $CATEGORY1",
                "; pr3-2   ; $CATALOG_VERSION; $CATEGORY2",
                "; pr4-2   ; $CATALOG_VERSION; $CATEGORY2",
                "; pr5-2_3 ; $CATALOG_VERSION; $CATEGORY2, $CATEGORY3",
                "; pr6     ; $CATALOG_VERSION;")
        givenUserExistsWithUidAndGroups(USER_UID, PASSWORD, "integrationadmingroup")
    }

    def cleanupSpec() {
        IntegrationTestUtil.removeAll ProductModel
        IntegrationTestUtil.removeAll CategoryModel
        IntegrationTestUtil.removeSafely EmployeeModel, { it.uid == USER_UID }
    }

    @Test
    def "request with \$expand, \$top, \$skip, and \$inlinecount"() {
        when:
        def response = basicAuthRequest()
                .path('Products')
                .queryParam('$expand', 'supercategories')
                .queryParam('$top', 10)
                .queryParam('$skip', 1)
                .queryParam('$inlinecount', 'allpages')
                .build()
                .accept(MediaType.APPLICATION_JSON_TYPE)
                .get()

        then:
        response.status == 200
        def json = extractBody response
        json.getCollection("\$.d.results").size() == 5
        json.getString('d.__count') == '6'
        json.getCollectionOfObjects('d.results[?(@.code == "pr2-1")].supercategories.results[*].code') == [CATEGORY1]
        json.getCollectionOfObjects('d.results[?(@.code == "pr3-2")].supercategories.results[*].code') == [CATEGORY2]
        json.getCollectionOfObjects('d.results[?(@.code == "pr4-2")].supercategories.results[*].code') == [CATEGORY2]
        json.getCollectionOfObjects('d.results[?(@.code == "pr5-2_3")].supercategories.results[*].code') == [CATEGORY2, CATEGORY3]
        json.getCollectionOfObjects('d.results[?(@.code == "pr6")].supercategories.results[*]') == []
        json.getCollectionOfObjects("d.results[*].supercategories.__deferred").isEmpty()
    }

    BasicAuthRequestBuilder basicAuthRequest() {
        new BasicAuthRequestBuilder()
                .extensionName(Odata2webservicesConstants.EXTENSIONNAME)
                .credentials(USER_UID, PASSWORD) // defined inside setup()
                .path(CROSS_FEATURE_IO)
    }

    JsonObject extractBody(final Response response) {
        JsonObject.createFrom((InputStream) response.getEntity())
    }
}
