/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.odata2webservicesfeaturetests.useraccess

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.catalog.model.CatalogModel
import de.hybris.platform.core.model.user.EmployeeModel
import de.hybris.platform.integrationservices.enums.AuthenticationType
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.impex.ModuleEssentialData
import de.hybris.platform.odata2webservices.constants.Odata2webservicesConstants
import de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.webservicescommons.testsupport.server.NeedsEmbeddedServer
import org.apache.olingo.odata2.api.commons.HttpStatusCodes
import org.junit.ClassRule
import org.junit.Test
import org.springframework.http.MediaType
import spock.lang.Issue
import spock.lang.Shared
import spock.lang.Unroll

import javax.ws.rs.client.Entity

import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.IntegrationObjectModelBuilder.integrationObject
import static de.hybris.platform.integrationservices.util.JsonBuilder.json
import static de.hybris.platform.odata2webservices.util.Odata2WebServicesEssentialData.odata2WebservicesEssentialData
import static de.hybris.platform.odata2webservicesfeaturetests.useraccess.UserAccessTestUtils.PASSWORD
import static de.hybris.platform.odata2webservicesfeaturetests.useraccess.UserAccessTestUtils.basicAuthRequest
import static de.hybris.platform.odata2webservicesfeaturetests.useraccess.UserAccessTestUtils.givenUserExistsWithUidAndGroups
import static de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder.inboundChannelConfigurationBuilder

@NeedsEmbeddedServer(webExtensions = [Odata2webservicesConstants.EXTENSIONNAME])
@IntegrationTest
class HttpSecurityIntegrationTest extends ServicelayerSpockSpecification {
    private static final String TEST_NAME = "HttpSecurity"
    private static final String IO = "${TEST_NAME}_IO"
    private static final String EXISTING_CATALOG = "${TEST_NAME}_Catalog1"
    private static final String NEW_CATALOG = "${TEST_NAME}_Catalog2"
    private static final String USER = "${TEST_NAME}_User"

    @Shared
    @ClassRule
    ModuleEssentialData essentialData = odata2WebservicesEssentialData().withDependencies()
    @Shared
    @ClassRule
    InboundChannelConfigurationBuilder inboundChannel = inboundChannelConfigurationBuilder()
            .withAuthType(AuthenticationType.BASIC)
            .withIntegrationObject integrationObject().withCode(IO)
            .withItem(integrationObjectItem().withCode('Catalog')
                    .withAttribute(integrationObjectItemAttribute().withName('id'))
                    .withAttribute(integrationObjectItemAttribute().withName('name')))

    def setup() {
        IntegrationTestUtil.createCatalogWithId(EXISTING_CATALOG)
    }

    def cleanup() {
        IntegrationTestUtil.remove EmployeeModel, {it.uid == USER }
        IntegrationTestUtil.remove CatalogModel, {it.id == EXISTING_CATALOG || it.id == NEW_CATALOG }
    }

    @Test
    @Unroll
    def "User must be authenticated in order to GET #path"() {
        when:
        def response = basicAuthRequest(IO)
                .path(path)
                .build()
                .get()

        then:
        response.status == HttpStatusCodes.UNAUTHORIZED.statusCode

        where:
        path << ['$metadata', "Catalogs('$EXISTING_CATALOG')"]
    }

    @Test
    @Unroll
    def "User must be authenticated in order to POST to #path"() {
        when:
        def response = basicAuthRequest(IO)
                .path(path)
                .build()
                .post(Entity.json('{}'))

        then:
        response.status == HttpStatusCodes.UNAUTHORIZED.statusCode

        where:
        path << ['Catalogs', '$batch']
    }

    @Test
    def "User must be authenticated in order to DELETE"() {
        when:
        def response = basicAuthRequest(IO)
                .path('Catalogs')
                .build()
                .delete()

        then:
        response.status == HttpStatusCodes.UNAUTHORIZED.statusCode
    }

    @Test
    def "User must be authenticated in order to PATCH"() {
        when:
        def response = basicAuthRequest(IO)
                .path("Catalogs('$EXISTING_CATALOG')")
                .build()
                .patch Entity.json('{}')

        then:
        response.status == HttpStatusCodes.UNAUTHORIZED.statusCode
    }

    @Test
    def "Wrong credentials for GET"() {
        given: "User exist"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationviewgroup")

        when:
        def response = basicAuthRequest(IO)
                .credentials(USER, "wrong-$PASSWORD")
                .build()
                .get()

        then:
        response.status == HttpStatusCodes.UNAUTHORIZED.statusCode
    }

    @Test
    @Unroll
    def "Wrong credentials for POST to #path"() {
        given: "User exist"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationcreategroup")

        when:
        def response = basicAuthRequest(IO)
                .path(path)
                .credentials(USER, "wrong-$PASSWORD")
                .build()
                .post Entity.json(json().withField("id", NEW_CATALOG).build())

        then:
        response.status == HttpStatusCodes.UNAUTHORIZED.statusCode

        where:
        path << ['Catalogs', '$batch']
    }

    @Test
    def "Wrong credentials for DELETE"() {
        given: "User exist"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationdeletegroup")

        when:
        def response = basicAuthRequest(IO)
                .path("Catalogs('$EXISTING_CATALOG')")
                .credentials(USER, '123')
                .build()
                .delete()

        then:
        response.status == HttpStatusCodes.UNAUTHORIZED.statusCode
    }

    @Test
    def "Wrong credentials for PATCH"() {
        given: "User exist"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationcreategroup")

        when:
        def response = basicAuthRequest(IO)
                .path("Catalogs('$EXISTING_CATALOG')")
                .credentials(USER, '123')
                .build()
                .patch Entity.json('{}')

        then:
        response.status == HttpStatusCodes.UNAUTHORIZED.statusCode
    }

    @Test
    @Unroll
    def "User in group '#group' gets #status for GET #path"() {
        given: "User exist with #group"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, group)

        when:
        def response = basicAuthRequest(IO)
                .path(path)
                .credentials(USER, PASSWORD)
                .build()
                .get()

        then:
        response.status == status.statusCode

        where:
        group                        | status                    | path
        ''                           | HttpStatusCodes.FORBIDDEN | 'Catalogs'
        'integrationusergroup'       | HttpStatusCodes.FORBIDDEN | 'Catalogs'
        'integrationadmingroup'      | HttpStatusCodes.OK        | 'Catalogs'
        'integrationcreategroup'     | HttpStatusCodes.FORBIDDEN | 'Catalogs'
        'integrationviewgroup'       | HttpStatusCodes.OK        | 'Catalogs'
        'integrationdeletegroup'     | HttpStatusCodes.FORBIDDEN | 'Catalogs'
        'integrationservicegroup'    | HttpStatusCodes.FORBIDDEN | 'Catalogs'
        'integrationmonitoringgroup' | HttpStatusCodes.FORBIDDEN | 'Catalogs'
        ''                           | HttpStatusCodes.FORBIDDEN | '$metadata'
        'integrationusergroup'       | HttpStatusCodes.FORBIDDEN | '$metadata'
        'integrationadmingroup'      | HttpStatusCodes.OK        | '$metadata'
        'integrationcreategroup'     | HttpStatusCodes.OK        | '$metadata'
        'integrationviewgroup'       | HttpStatusCodes.OK        | '$metadata'
        'integrationdeletegroup'     | HttpStatusCodes.FORBIDDEN | '$metadata'
        'integrationservicegroup'    | HttpStatusCodes.FORBIDDEN | '$metadata'
        'integrationmonitoringgroup' | HttpStatusCodes.FORBIDDEN | '$metadata'
    }

    @Test
    @Unroll
    def "User in group '#group' gets #status for POST"() {
        given: "User exist with #group"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, group)

        when:
        def response = basicAuthRequest(IO)
                .path('Catalogs')
                .credentials(USER, PASSWORD)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .build()
                .post Entity.json(json().withField("id", NEW_CATALOG).build())

        then:
        response.status == status.statusCode

        where:
        group                        | status
        ''                           | HttpStatusCodes.FORBIDDEN
        'integrationusergroup'       | HttpStatusCodes.FORBIDDEN
        'integrationadmingroup'      | HttpStatusCodes.CREATED
        'integrationcreategroup'     | HttpStatusCodes.CREATED
        'integrationviewgroup'       | HttpStatusCodes.FORBIDDEN
        'integrationdeletegroup'     | HttpStatusCodes.FORBIDDEN
        'integrationservicegroup'    | HttpStatusCodes.FORBIDDEN
        'integrationmonitoringgroup' | HttpStatusCodes.FORBIDDEN
    }

    @Test
    @Unroll
    def "User in group '#group' gets #status for DELETE"() {
        given: "User exist with #group"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, group)

        when:
        def response = basicAuthRequest(IO)
                .path("Catalogs('$EXISTING_CATALOG')")
                .credentials(USER, PASSWORD)
                .build()
                .delete()

        then:
        response.status == status.statusCode

        where:
        group                        | status
        ''                           | HttpStatusCodes.FORBIDDEN
        'integrationusergroup'       | HttpStatusCodes.FORBIDDEN
        'integrationadmingroup'      | HttpStatusCodes.OK
        'integrationcreategroup'     | HttpStatusCodes.FORBIDDEN
        'integrationviewgroup'       | HttpStatusCodes.FORBIDDEN
        'integrationdeletegroup'     | HttpStatusCodes.OK
        'integrationservicegroup'    | HttpStatusCodes.FORBIDDEN
        'integrationmonitoringgroup' | HttpStatusCodes.FORBIDDEN
    }

    @Issue('https://jira.hybris.com/browse/STOUT-1608')
    @Test
    @Unroll
    def "User in group '#group' gets #status for PATCH"() {
        given: "User exist with #group"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, group)

        when:
        def response = basicAuthRequest(IO)
                .path("Catalogs('$EXISTING_CATALOG')")
                .credentials(USER, PASSWORD)
                .build()
                .patch Entity.json(json().withField("name", "testNewName").build())

        then:
        response.status == status.statusCode

        where:
        group                        | status
        ''                           | HttpStatusCodes.FORBIDDEN
        'integrationusergroup'       | HttpStatusCodes.FORBIDDEN
        'integrationadmingroup'      | HttpStatusCodes.OK
        'integrationcreategroup'     | HttpStatusCodes.OK
        'integrationviewgroup'       | HttpStatusCodes.FORBIDDEN
        'integrationdeletegroup'     | HttpStatusCodes.FORBIDDEN
        'integrationservicegroup'    | HttpStatusCodes.FORBIDDEN
        'integrationmonitoringgroup' | HttpStatusCodes.FORBIDDEN
    }

    @Test
    @Unroll
    def "User in group '#group' gets Forbidden when requesting with unsupported HTTP verb"() {
        given: "User exist with #group"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, group)

        when:
        def response = basicAuthRequest(IO)
                .path('Catalogs')
                .credentials(USER, PASSWORD)
                .build()
                .method 'PURGE'

        then:
        response.status == HttpStatusCodes.FORBIDDEN.statusCode

        where:
        group << ['integrationusergroup', 'integrationadmingroup', 'integrationcreategroup', 'integrationviewgroup', 'integrationdeletegroup', 'integrationservicegroup', 'integrationmonitoringgroup']
    }
}