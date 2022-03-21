/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.odata2webservicesfeaturetests.useraccess

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.catalog.model.CatalogModel
import de.hybris.platform.core.model.security.UserRightModel
import de.hybris.platform.core.model.type.SearchRestrictionModel
import de.hybris.platform.core.model.user.EmployeeModel
import de.hybris.platform.core.model.user.UserGroupModel
import de.hybris.platform.integrationservices.enums.AuthenticationType
import de.hybris.platform.inboundservices.model.IntegrationClientCredentialsDetailsModel
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.impex.ModuleEssentialData
import de.hybris.platform.oauth2.constants.OAuth2Constants
import de.hybris.platform.odata2services.util.Odata2ServicesEssentialData
import de.hybris.platform.odata2webservices.constants.Odata2webservicesConstants
import de.hybris.platform.odata2webservicesfeaturetests.ws.BasicAuthRequestBuilder
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.servicelayer.security.permissions.PermissionAssignment
import de.hybris.platform.servicelayer.security.permissions.PermissionManagementService
import de.hybris.platform.servicelayer.security.permissions.PermissionsConstants
import de.hybris.platform.servicelayer.type.TypeService
import de.hybris.platform.servicelayer.user.UserService
import de.hybris.platform.webservicescommons.testsupport.client.WsSecuredRequestBuilder
import de.hybris.platform.webservicescommons.testsupport.server.NeedsEmbeddedServer
import org.apache.olingo.odata2.api.commons.HttpStatusCodes
import org.junit.ClassRule
import org.junit.Test
import org.springframework.http.MediaType
import spock.lang.AutoCleanup
import spock.lang.Shared
import spock.lang.Unroll

import javax.annotation.Resource
import javax.ws.rs.client.Entity

import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.IntegrationObjectModelBuilder.integrationObject
import static de.hybris.platform.integrationservices.util.JsonBuilder.json
import static de.hybris.platform.odata2webservicesfeaturetests.useraccess.UserAccessTestUtils.*
import static de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder.inboundChannelConfigurationBuilder

@NeedsEmbeddedServer(webExtensions = [
        Odata2webservicesConstants.EXTENSIONNAME,
        OAuth2Constants.EXTENSIONNAME])
@IntegrationTest
class UserRestrictionsAccessIntegrationTest extends ServicelayerSpockSpecification {

    private static final String TEST_NAME = "UserRestrictionsAccess"
    private static final String IO = "${TEST_NAME}_IO"
    private static final String CATALOG_USER = "${TEST_NAME}_CatalogUser"
    private static final String EXISTING_CATALOG_ID = "${TEST_NAME}_Catalog1"
    private static final String NEW_CATALOG_ID = "${TEST_NAME}_Catalog2"
    private static final String CLIENT_ID = "${TEST_NAME}_Credentials"
    private static final String CLIENT_SECRET = "superSecretSecret"
    private static final String CATALOG_GROUP_ID = "${TEST_NAME}_UserGroup"
    private static final String CATALOG_SEARCH_RESTRICTION = "${TEST_NAME}_SearchRestriction"

    @Shared
    @ClassRule
    ModuleEssentialData essentialData = Odata2ServicesEssentialData.odata2ServicesEssentialData().withDependencies()
    @AutoCleanup('cleanup')
    def inboundChannel = inboundChannelConfigurationBuilder()
            .withIntegrationObject integrationObject().withCode(IO)
            .withItem(integrationObjectItem().withCode('Catalog')
                    .withAttribute(integrationObjectItemAttribute().withName('id'))
                    .withAttribute(integrationObjectItemAttribute().withName('name')))


    @Resource
    private PermissionManagementService permissionManagementService
    @Resource
    private TypeService typeService
    @Resource
    private UserService userService

    def setupSpec() {
        IntegrationTestUtil.createCatalogWithId(EXISTING_CATALOG_ID)

        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE UserGroup; UID[unique = true] ; description		; groups(uid)',
                "						; $CATALOG_GROUP_ID  ; Catalog IO Group	;",
                "\$searchQuery=({code}='$IO' AND EXISTS ({{ select {ug:PK} from {UserGroup as ug} where {ug:PK} IN (?session.user.groups) and {ug:uid} = '$CATALOG_GROUP_ID' }})) OR ({code}!='$IO')",
                'INSERT_UPDATE SearchRestriction; code[unique = true]         ; name[lang = en]            ; query       ; principal(UID)       ; restrictedType(code); active; generate',
                "                               ; $CATALOG_SEARCH_RESTRICTION ; TestCatalog IO Restriction ;\$searchQuery ; integrationusergroup ; IntegrationObject   ; true  ; true",
        )
        givenUserExistsWithUidAndGroups(ADMIN_USER, PASSWORD, "integrationadmingroup")
        givenUserExistsWithUidAndGroups(CATALOG_USER, PASSWORD, "integrationadmingroup,$CATALOG_GROUP_ID")
    }

    def cleanup() {
        removeAllPermissions(CatalogModel._TYPECODE)
        IntegrationTestUtil.removeSafely CatalogModel, { it.id == NEW_CATALOG_ID }
    }

    def cleanupSpec() {
        IntegrationTestUtil.remove SearchRestrictionModel, { it.code == CATALOG_SEARCH_RESTRICTION }
        IntegrationTestUtil.removeSafely EmployeeModel, { it.uid == ADMIN_USER || it.uid == CATALOG_USER }
        IntegrationTestUtil.remove UserGroupModel, { it.uid == CATALOG_GROUP_ID }
        IntegrationTestUtil.removeSafely CatalogModel, { it.id == EXISTING_CATALOG_ID }
        IntegrationTestUtil.removeSafely(UserRightModel, {
            it.code == PermissionsConstants.READ ||
                    PermissionsConstants.CREATE ||
                    PermissionsConstants.CHANGE ||
                    PermissionsConstants.REMOVE
        })
    }

    @Test
    @Unroll
    def "User #user gets #status for GET #path"() {
        given:
        inboundChannel
                .withAuthType(AuthenticationType.BASIC)
                .build()

        when:
        def response = basicAuthRequest()
                .path(path)
                .credentials(user, PASSWORD)
                .build()
                .get()

        then:
        response.status == status.statusCode

        where:
        user         | status                    | path
        ADMIN_USER   | HttpStatusCodes.NOT_FOUND | IO + '/$metadata'
        CATALOG_USER | HttpStatusCodes.OK        | IO + '/$metadata'
        ADMIN_USER   | HttpStatusCodes.NOT_FOUND | "$IO/Catalogs('$EXISTING_CATALOG_ID')"
        CATALOG_USER | HttpStatusCodes.OK        | "$IO/Catalogs('$EXISTING_CATALOG_ID')"
    }

    @Test
    @Unroll
    def "User #user gets #status for GET #path when an InboundChannelConfiguration with authenticationType set to OAUTH exists for the IO"() {
        given:
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE IntegrationClientCredentialsDetails; clientId[unique=true]; clientSecret  ; authorities                ; user(uid)',
                "                                                 ; $CLIENT_ID           ; $CLIENT_SECRET; ROLE_INTEGRATIONADMINGROUP ; $user",
                'INSERT_UPDATE IntegrationObject; code[unique = true]; integrationType(code)',
                "                               ; $IO                ; INBOUND",
                'INSERT_UPDATE IntegrationObjectItem; integrationObject(code)[unique = true]; code[unique = true]; type(code);root[default = false]',
                "                                   ; $IO                              ; Catalog            ; Catalog   ;true                 "
        )
        inboundChannel
                .withAuthType(AuthenticationType.OAUTH)
                .build()

        and:
        addPermission(CatalogModel._TYPECODE, PermissionsConstants.READ)

        when:
        def response = oAuth2Request()
                .client(CLIENT_ID, CLIENT_SECRET)
                .path(IO)
                .path(path)
                .build()
                .accept(accept)
                .get()

        then:
        response.status == status.statusCode

        cleanup:
        IntegrationTestUtil.removeAll IntegrationClientCredentialsDetailsModel

        where:
        user         | status                    | path                               | accept
        ADMIN_USER   | HttpStatusCodes.NOT_FOUND | '$metadata'                        | MediaType.APPLICATION_XML_VALUE
        CATALOG_USER | HttpStatusCodes.OK        | '$metadata'                        | MediaType.APPLICATION_XML_VALUE
        ADMIN_USER   | HttpStatusCodes.NOT_FOUND | "Catalogs('$EXISTING_CATALOG_ID')" | MediaType.APPLICATION_JSON_VALUE
        CATALOG_USER | HttpStatusCodes.OK        | "Catalogs('$EXISTING_CATALOG_ID')" | MediaType.APPLICATION_JSON_VALUE
    }

    @Test
    @Unroll
    def "User #user gets #status for POST TestCatalog/Catalogs"() {
        given:
        inboundChannel
                .withAuthType(AuthenticationType.BASIC)
                .build()

        and:
        addPermission(CatalogModel._TYPECODE, PermissionsConstants.CREATE)

        when:
        def response = basicAuthRequest()
                .path("$IO/Catalogs")
                .credentials(user, PASSWORD)
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .build()
                .post(Entity.json(json().withField("id", NEW_CATALOG_ID).build()))

        then:
        response.status == status.statusCode

        where:
        user         | status
        ADMIN_USER   | HttpStatusCodes.NOT_FOUND
        CATALOG_USER | HttpStatusCodes.CREATED
    }

    @Test
    @Unroll
    def "User #user gets #status for POST TestCatalog/Catalogs when an InboundChannelConfiguration with authenticationType set to OAUTH exists for the IO"() {
        given:
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE IntegrationClientCredentialsDetails; clientId[unique=true]; clientSecret  ; authorities                ; user(uid)',
                "                                                 ; $CLIENT_ID           ; $CLIENT_SECRET; ROLE_INTEGRATIONADMINGROUP ; $user",
        )
        inboundChannel
                .withAuthType(AuthenticationType.OAUTH)
                .build()

        and:
        addPermission(CatalogModel._TYPECODE, PermissionsConstants.CREATE)

        when:
        def response = oAuth2Request()
                .client(CLIENT_ID, CLIENT_SECRET)
                .path(IO)
                .path("Catalogs")
                .build()
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .post(Entity.json(json().withField("id", NEW_CATALOG_ID).build()))

        then:
        response.status == status.statusCode

        cleanup:
        IntegrationTestUtil.removeAll IntegrationClientCredentialsDetailsModel

        where:
        user         | status
        ADMIN_USER   | HttpStatusCodes.NOT_FOUND
        CATALOG_USER | HttpStatusCodes.CREATED
    }

    def oAuth2Request() {
        new WsSecuredRequestBuilder()
                .extensionName(Odata2webservicesConstants.EXTENSIONNAME)
                .grantClientCredentials()
    }

    def basicAuthRequest() {
        new BasicAuthRequestBuilder()
                .extensionName(Odata2webservicesConstants.EXTENSIONNAME)
                .accept(MediaType.APPLICATION_XML_VALUE)
    }

    def addPermission(final String typeCode, final String permission) {
        def composedType = typeService.getComposedTypeForCode(typeCode)
        permissionManagementService.addTypePermission(composedType, new PermissionAssignment(permission, userService.getUserForUID(CATALOG_USER)))
    }

    def removeAllPermissions(final String typeCode) {
        removePermission(typeCode, PermissionsConstants.READ)
        removePermission(typeCode, PermissionsConstants.CREATE)
        removePermission(typeCode, PermissionsConstants.CHANGE)
        removePermission(typeCode, PermissionsConstants.REMOVE)
    }

    def removePermission(final String typeCode, final String permission) {
        def composedType = typeService.getComposedTypeForCode(typeCode)
        permissionManagementService.removeTypePermission(composedType, new PermissionAssignment(permission, userService.getUserForUID(CATALOG_USER)))
    }
}