/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.odata2webservicesfeaturetests.useraccess

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.catalog.model.CatalogModel
import de.hybris.platform.catalog.model.CatalogVersionModel
import de.hybris.platform.core.model.c2l.CurrencyModel
import de.hybris.platform.core.model.order.OrderEntryModel
import de.hybris.platform.core.model.order.OrderModel
import de.hybris.platform.core.model.product.ProductModel
import de.hybris.platform.core.model.product.UnitModel
import de.hybris.platform.core.model.type.ComposedTypeModel
import de.hybris.platform.core.model.user.UserModel
import de.hybris.platform.integrationservices.enums.AuthenticationType
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.JsonBuilder
import de.hybris.platform.integrationservices.util.XmlObject
import de.hybris.platform.integrationservices.util.impex.ModuleEssentialData
import de.hybris.platform.odata2webservices.constants.Odata2webservicesConstants
import de.hybris.platform.odata2webservicesfeaturetests.ws.BasicAuthRequestBuilder
import de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.servicelayer.config.ConfigurationService
import de.hybris.platform.webservicescommons.testsupport.server.NeedsEmbeddedServer
import org.apache.commons.lang3.RandomStringUtils
import org.apache.olingo.odata2.api.commons.HttpStatusCodes
import org.junit.ClassRule
import org.junit.Rule
import org.junit.Test
import spock.lang.Ignore
import spock.lang.Shared
import spock.lang.Unroll

import javax.annotation.Resource
import javax.ws.rs.client.Entity
import javax.ws.rs.core.Response

import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.IntegrationObjectModelBuilder.integrationObject
import static de.hybris.platform.odata2services.util.Odata2ServicesEssentialData.odata2ServicesEssentialData
import static de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder.inboundChannelConfigurationBuilder

@NeedsEmbeddedServer(webExtensions = [Odata2webservicesConstants.EXTENSIONNAME])
@IntegrationTest
class AccessRightsIntegrationTest extends ServicelayerSpockSpecification {
    private static final def TEST_NAME = "AccessRights"
    private static final def AUTH_RIGHTS_PROPERTY = 'integrationservices.authorization.accessrights.enabled'
    private static final def USER = "${TEST_NAME}_User"
    private static final def PWD = RandomStringUtils.randomAlphanumeric(10)
    private static final def IO_CODE = "${TEST_NAME}_IO"
    private static final def CATALOG = "${TEST_NAME}_Catalog"
    private static final def CATALOG_VERSION = "version1"
    private static final def PRODUCT = "tp-24"
    private static final def UNIT = "${TEST_NAME}_packs"
    private static final def CURRENCY = 'PHX'
    private static final def EXISTING_ORDER = "${TEST_NAME}_Order"

    @Shared
    @ClassRule
    ModuleEssentialData essentialData = odata2ServicesEssentialData().withDependencies()
    @Shared
    @ClassRule
    InboundChannelConfigurationBuilder inboundChannel = inboundChannelConfigurationBuilder()
            .withAuthType(AuthenticationType.BASIC)
            .withIntegrationObject integrationObject().withCode(IO_CODE)
            .withItem(integrationObjectItem('TestUser').withType('User')
                    .withAttribute(integrationObjectItemAttribute().withName('uid')))
            .withItem(integrationObjectItem('TestCurrency').withType('Currency')
                    .withAttribute(integrationObjectItemAttribute().withName('isocode')))
            .withItem(integrationObjectItem('TestUnit').withType('Unit')
                    .withAttribute(integrationObjectItemAttribute().withName('code')))
            .withItem(integrationObjectItem('TestOrder').withType('Order').root()
                    .withAttribute(integrationObjectItemAttribute('currency').withReturnItem('TestCurrency'))
                    .withAttribute(integrationObjectItemAttribute('entries').withReturnItem('TestOrderEntry'))
                    .withAttribute(integrationObjectItemAttribute('code'))
                    .withAttribute(integrationObjectItemAttribute('user').withReturnItem('TestUser'))
                    .withAttribute(integrationObjectItemAttribute('date')))
            .withItem(integrationObjectItem('TestOrderEntry').withType('OrderEntry')
                    .withAttribute(integrationObjectItemAttribute('product').withReturnItem('TestProduct'))
                    .withAttribute(integrationObjectItemAttribute('entryNumber').unique())
                    .withAttribute(integrationObjectItemAttribute('quantity'))
                    .withAttribute(integrationObjectItemAttribute('unit').withReturnItem('TestUnit'))
                    .withAttribute(integrationObjectItemAttribute('order').withReturnItem('TestOrder').unique()))
            .withItem(integrationObjectItem('TestProduct').withType('Product')
                    .withAttribute(integrationObjectItemAttribute('catalogVersion').withReturnItem('CatalogSystem'))
                    .withAttribute(integrationObjectItemAttribute('code')))
            .withItem(integrationObjectItem('TestCatalog').withType('Catalog')
                    .withAttribute(integrationObjectItemAttribute().withName('id')))
            .withItem(integrationObjectItem('CatalogSystem').withType('CatalogVersion')
                    .withAttribute(integrationObjectItemAttribute('catalog').withReturnItem('TestCatalog'))
                    .withAttribute(integrationObjectItemAttribute('version')))
    @Rule
    AccessRightsManager accessRightsManager = AccessRightsManager.accessRights()
            .forUser(USER)
            .grantRead()
            .forTypes(CurrencyModel._TYPECODE, UnitModel._TYPECODE, UserModel._TYPECODE,
                    ProductModel._TYPECODE, CatalogModel._TYPECODE, CatalogVersionModel._TYPECODE)

    @Resource
    private ConfigurationService configurationService

    def setupSpec() {
        UserAccessTestUtils.createUser USER, PWD, 'integrationcreategroup,integrationviewgroup,integrationdeletegroup'

        IntegrationTestUtil.importImpEx(
                'INSERT Catalog; id[unique = true]',
                "              ; $CATALOG",
                'INSERT CatalogVersion; version[unique = true]; catalog(id)[unique = true]',
                "                     ; $CATALOG_VERSION      ; $CATALOG",
                'INSERT Product; code[unique = true]; catalogVersion(version, catalog(id))[unique = true]',
                "              ; $PRODUCT           ; $CATALOG_VERSION:$CATALOG",
                'INSERT Unit; code[unique = true]; unittype',
                "           ; $UNIT              ; discrete",
                'INSERT Currency; isocode[unique = true]; symbol',
                "               ; $CURRENCY             ; P")
    }

    def cleanupSpec() {
        IntegrationTestUtil.removeAll OrderModel
        IntegrationTestUtil.removeAll ProductModel
        IntegrationTestUtil.remove UnitModel, { it.code == UNIT }
        IntegrationTestUtil.remove CurrencyModel, { it.isocode == CURRENCY }
        IntegrationTestUtil.removeSafely CatalogVersionModel, { it.version == CATALOG_VERSION }
        IntegrationTestUtil.removeSafely CatalogModel, { it.id == CATALOG }
        UserAccessTestUtils.deleteUser USER
    }

    def setup() {
        configurationService.configuration.addProperty AUTH_RIGHTS_PROPERTY, 'true'
        createExistingOrder()
    }

    def cleanup() {
        configurationService.configuration.addProperty AUTH_RIGHTS_PROPERTY, 'false'
    }

    @Ignore("IAPI-4656")
    @Test
    def 'order creation forbidden when access rights not configured for the user'() {
        given: 'no permissions exist'
        accessRightsManager.reset()
        and:
        def payload = Entity.json minimalOrder().build()

        when:
        def response = requestBuilder()
                .path('TestOrders')
                .build()
                .post(payload)

        then:
        accessForbidden response, 'create', OrderModel._TYPECODE
    }

    @Test
    @Unroll
    def "order creation forbidden when create permission is revoked from #badType"() {
        given: 'CREATE permission is revoked for one of the types'
        accessRightsManager.forType(goodType).grantAll().apply()
        accessRightsManager.forType(badType).grantAll().revokeCreate().apply()
        and:
        def payload = Entity.json minimalOrder()
                .withFieldValues('entries', entry().build())
                .build()

        when:
        def response = requestBuilder()
                .path('TestOrders')
                .build()
                .post(payload)

        then:
        accessForbidden response, 'create', badType

        where:
        goodType                  | badType
        OrderEntryModel._TYPECODE | OrderModel._TYPECODE
        OrderModel._TYPECODE      | OrderEntryModel._TYPECODE
    }

    @Test
    @Unroll
    def "order creation forbidden when read permission is revoked from #badType"() {
        given: 'READ permission is revoked for one of the types'
        accessRightsManager.forType(goodType).grantAll().apply()
        accessRightsManager.forType(badType).grantAll().revokeRead().apply()
        and:
        def payload = Entity.json minimalOrder()
                .withFieldValues('entries', entry().build())
                .build()

        when:
        def response = requestBuilder()
                .path('TestOrders')
                .build()
                .post(payload)

        then:
        accessForbidden response, 'read', badType

        where:
        goodType                  | badType
        OrderEntryModel._TYPECODE | OrderModel._TYPECODE
        OrderModel._TYPECODE      | OrderEntryModel._TYPECODE
    }

    @Test
    def 'order creation forbidden when read permission is revoked from the item type referenced in the payload'() {
        given: 'READ permission is revoked for a very distant type that will be looked up while processing the request'
        accessRightsManager
                .forType(OrderModel._TYPECODE).grantAll().apply()
                .forType(OrderEntryModel._TYPECODE).grantAll().apply()
                .forType(CatalogModel._TYPECODE).revokeAll().apply()
        and:
        def payload = Entity.json minimalOrder()
                .withFieldValues('entries', entry().build())
                .build()

        when:
        def response = requestBuilder()
                .path('TestOrders')
                .build()
                .post(payload)

        then:
        accessForbidden response, 'read', CatalogModel._TYPECODE
    }

    @Test
    @Unroll
    def "nested partOf entries deletion by PATCHing Order with #cond permitted when user does not have DELETE permission for OrderEntry"() {
        given: 'DELETE permission is revoked for Order and OrderEntry'
        accessRightsManager.forType(OrderModel._TYPECODE).grantAll().revokeDelete().apply()
        accessRightsManager.forType(OrderEntryModel._TYPECODE).grantAll().revokeDelete().apply()
        and: 'payload that removes entries'
        def payload = Entity.json body.build()

        when:
        def response = requestBuilder()
                .path("TestOrders('$EXISTING_ORDER')")
                .build()
                .patch(payload)

        then:
        response.status == HttpStatusCodes.OK.statusCode

        where:
        cond                       | body
        'empty collection entries' | JsonBuilder.json().withField('entries', [])
        'different entries'        | JsonBuilder.json().withFieldValues('entries', entry(3).build())
    }

    @Test
    def 'GET TestOrders is permitted when READ permission is revoked for OrderEntry'() {
        given: 'only OrderEntry READ permission is revoked'
        accessRightsManager.forType(OrderModel._TYPECODE).grantAll().apply()
        accessRightsManager.forType(OrderEntryModel._TYPECODE).grantAll().revokeRead().apply()

        when:
        def response = requestBuilder()
                .path('TestOrders')
                .build()
                .get()

        then:
        response.status == HttpStatusCodes.OK.statusCode
    }

    @Test
    @Unroll
    def "GET TestOrders(...)/entries is forbidden when READ permission is revoked for #badType"() {
        given: 'READ permission is revoked only from one type'
        accessRightsManager.forType(goodType).grantAll().apply()
        accessRightsManager.forType(badType).grantAll().revokeRead().apply()

        when:
        def response = requestBuilder()
                .path("TestOrders('$EXISTING_ORDER')")
                .path('entries')
                .build()
                .get()

        then:
        accessForbidden response, 'read', badType

        where:
        badType                   | goodType
        OrderEntryModel._TYPECODE | OrderModel._TYPECODE
        OrderModel._TYPECODE      | OrderEntryModel._TYPECODE
    }

    @Test
    def "GET TestOrders(...)/entries is allowed when READ permission is permitted for Order and OrderEntry"() {
        given: 'READ permission is revoked only from one type'
        accessRightsManager.forType(OrderModel._TYPECODE).grantRead().apply()
        accessRightsManager.forType(OrderEntryModel._TYPECODE).grantRead().apply()

        when:
        def response = requestBuilder()
                .path("TestOrders('$EXISTING_ORDER')")
                .path('entries')
                .build()
                .get()

        then:
        response.status == HttpStatusCodes.OK.statusCode
    }

    @Test
    def "GET TestOrders(...)?\$expand=entries is forbidden when READ permission is revoked for OrderEntry"() {
        given: 'READ permission is revoked from Order and OrderEntry'
        accessRightsManager.forType(OrderModel._TYPECODE).grantAll().apply()
        accessRightsManager.forType(OrderEntryModel._TYPECODE).grantAll().revokeRead().apply()

        when:
        def response = requestBuilder()
                .path("TestOrders('$EXISTING_ORDER')")
                .queryParam('$expand', 'entries')
                .build()
                .get()

        then:
        accessForbidden response, 'read', OrderEntryModel._TYPECODE
    }

    @Test
    @Unroll
    def "GET TestOrderEntries?\$filter=product/code+eq+'tp-24' is forbidden when READ permission is revoked for #type"() {
        given: 'as the background READ permission is granted'
        accessRightsManager.forType(OrderModel._TYPECODE).grantRead().apply()
        accessRightsManager.forType(OrderEntryModel._TYPECODE).grantRead().apply()
        and: "READ permission revoked from #type"
        accessRightsManager.forType(type).revokeRead().apply()

        when:
        def response = requestBuilder()
                .path('TestOrderEntries')
                .queryParam('$filter', "product/code eq '$PRODUCT'")
                .build()
                .get()

        then:
        accessForbidden response, 'read', type

        where:
        type << [OrderEntryModel._TYPECODE, ProductModel._TYPECODE]
    }

    @Test
    def 'order update forbidden when update permission is revoked from Order'() {
        given: 'UPDATE permission is revoked for one of the types'
        accessRightsManager.forType(OrderModel._TYPECODE).grantAll().revokeUpdate().apply()
        and: 'the payload is for the existing order'
        def payload = Entity.json minimalOrder(EXISTING_ORDER)
                .withField('date', '2020-02-20T02:20:20')
                .build()

        when:
        def response = requestBuilder()
                .path('TestOrders')
                .build()
                .post payload

        then:
        accessForbidden response, 'change', OrderModel._TYPECODE
    }

    @Test
    @Unroll
    def "nested entity update forbidden by POSTing to /#url when user does not have update permission for it"() {
        given: 'UPDATE permission is revoked for one of the types'
        accessRightsManager.forType(OrderModel._TYPECODE).grantAll().apply()
        accessRightsManager.forType(OrderEntryModel._TYPECODE).grantAll().revokeUpdate().apply()
        and: 'the payload updating OrderEntry'
        def payload = Entity.json body.build()

        when:
        def response = requestBuilder()
                .path(url)
                .build()
                .post payload

        then:
        accessForbidden response, 'change', OrderEntryModel._TYPECODE

        where:
        url                | body
        'TestOrderEntries' | entry().withField('order', JsonBuilder.json().withCode(EXISTING_ORDER)).withField('quantity', '8')
        'TestOrders'       | minimalOrder(EXISTING_ORDER).withFieldValues('entries', entry().withField('quantity', '8'))
    }

    @Test
    @Unroll
    def "nested entity update forbidden by PATCHing #uri when user does not have update permission for it"() {
        given: 'UPDATE permission is revoked for one of the types'
        accessRightsManager.forType(OrderModel._TYPECODE).grantAll().apply()
        accessRightsManager.forType(OrderEntryModel._TYPECODE).grantAll().revokeUpdate().apply()
        and: 'the payload updating OrderEntry'
        def payload = Entity.json body.build()

        when:
        def response = requestBuilder()
                .path(uri)
                .build()
                .patch payload

        then:
        accessForbidden response, 'change', OrderEntryModel._TYPECODE

        where:
        uri                                       | body
        "TestOrderEntries('1%7C$EXISTING_ORDER')" | entry().withField('quantity', '8')
        "TestOrders('$EXISTING_ORDER')"           | JsonBuilder.json().withFieldValues('entries', entry().withField('quantity', '8'))
    }

    @Test
    @Unroll
    def "DELETE #uri forbidden when delete permission is revoked from #badType"() {
        given: 'DELETE permission is revoked for one of the types'
        accessRightsManager.forType(goodType).grantAll().apply()
        accessRightsManager.forType(badType).grantAll().revokeDelete().apply()

        when:
        def response = requestBuilder()
                .path(uri)
                .build()
                .delete()

        then:
        accessForbidden response, 'remove', badType

        where:
        uri                                       | goodType                  | badType
        "TestOrders('$EXISTING_ORDER')"           | OrderEntryModel._TYPECODE | OrderModel._TYPECODE
        "TestOrderEntries('1%7C$EXISTING_ORDER')" | OrderModel._TYPECODE      | OrderEntryModel._TYPECODE
    }

    @Test
    def 'DELETE TestOrders permitted when delete permission is revoked from OrderEntry'() {
        given: 'DELETE permission is revoked for OrderEntry type'
        accessRightsManager.forType(OrderModel._TYPECODE).grantAll().apply()
        accessRightsManager.forType(OrderEntryModel._TYPECODE).grantAll().revokeDelete().apply()

        when:
        def response = requestBuilder()
                .path("TestOrders('$EXISTING_ORDER')")
                .build()
                .delete()

        then:
        response.status == HttpStatusCodes.OK.statusCode
    }

    @Test
    @Unroll
    def "DELETE #uri forbidden when read permission is revoked from #badType"() {
        given: 'READ permission is revoked for one of the types'
        accessRightsManager.forType(goodType).grantAll().apply()
        accessRightsManager.forType(badType).grantAll().revokeRead().apply()

        when:
        def response = requestBuilder()
                .path(uri)
                .build()
                .delete()

        then:
        accessForbidden response, 'read', badType

        where:
        uri                                       | goodType                  | badType
        "TestOrders('$EXISTING_ORDER')"           | OrderEntryModel._TYPECODE | OrderModel._TYPECODE
        "TestOrderEntries('1%7C$EXISTING_ORDER')" | OrderModel._TYPECODE      | OrderEntryModel._TYPECODE
    }

    @Test
    def 'DELETE TestOrders is permitted when read permission is revoked from OrderEntry'() {
        given: 'READ permission is revoked for OrderEntry type'
        accessRightsManager.forType(OrderModel._TYPECODE).grantAll().apply()
        accessRightsManager.forType(OrderEntryModel._TYPECODE).grantAll().revokeRead().apply()

        when:
        def response = requestBuilder()
                .path("TestOrders('$EXISTING_ORDER')")
                .build()
                .delete()

        then:
        response.status == HttpStatusCodes.OK.statusCode
    }

    @Test
    def 'order creation forbidden when auto-create Product does not exist and create permission is revoked'() {
        given: 'OrderEntry.products attribute is auto-create in the IO'
        IntegrationTestUtil.importImpEx(
                '$item=integrationObjectItem(integrationObject(code), code)',
                'UPDATE IntegrationObjectItemAttribute; $item[unique = true]   ; attributeName[unique = true]; autocreate',
                "                                     ; $IO_CODE:TestOrderEntry; product                     ; true")
        and: 'all permissions are good except Product has create permission revoked'
        accessRightsManager
                .forType(OrderModel._TYPECODE).grantAll().apply()
                .forType(OrderEntryModel._TYPECODE).grantAll().apply()
                .forType(ProductModel._TYPECODE).grantAll().revokeCreate().apply()
        and: 'the payload refers a non-existent Product'
        def payload = Entity.json minimalOrder()
                .withFieldValues('entries', entry().withField('product', product('not-existent')))
                .build()

        when:
        def response = requestBuilder()
                .path('TestOrders')
                .build()
                .post(payload)

        then:
        accessForbidden response, 'create', ProductModel._TYPECODE

        cleanup:
        IntegrationTestUtil.importImpEx(
                '$item=integrationObjectItem(integrationObject(code), code)',
                'UPDATE IntegrationObjectItemAttribute; $item[unique = true]   ; attributeName[unique = true]; autocreate',
                "                                     ; $IO_CODE:TestOrderEntry; product                     ; false")
    }

    @Test
    def 'order creation permitted when auto-create Product does not exist and view/create permissions are granted'() {
        given: 'OrderEntry.products attribute is auto-create in the IO'
        IntegrationTestUtil.importImpEx(
                '$item=integrationObjectItem(integrationObject(code), code)',
                'UPDATE IntegrationObjectItemAttribute; $item[unique = true]   ; attributeName[unique = true]; autocreate',
                "                                     ; $IO_CODE:TestOrderEntry; product                     ; true")
        and: 'required permissions are granted'
        accessRightsManager
                .forType(OrderModel._TYPECODE).grantRead().grantCreate().apply()
                .forType(OrderEntryModel._TYPECODE).grantRead().grantCreate().apply()
                .forType(ProductModel._TYPECODE).grantRead().grantCreate().apply()
        and: 'the payload refers a non-existent Product'
        def payload = Entity.json minimalOrder('NPO')
                .withFieldValues('entries', entry().withField('product', product('NEP')))
                .build()

        when:
        def response = requestBuilder()
                .path('TestOrders')
                .build()
                .post(payload)

        then:
        response.status == HttpStatusCodes.CREATED.statusCode

        cleanup:
        IntegrationTestUtil.importImpEx(
                '$item=integrationObjectItem(integrationObject(code), code)',
                'UPDATE IntegrationObjectItemAttribute; $item[unique = true]   ; attributeName[unique = true]; autocreate',
                "                                     ; $IO_CODE:TestOrderEntry; product                     ; false")
        IntegrationTestUtil.remove(ProductModel) { it.code == 'NEP' }
        IntegrationTestUtil.remove(OrderModel) { it.code == 'NPO' }
    }

    @Test
    def 'order creation permitted when auto-create Product exists, for which only read permission granted'() {
        given: 'OrderEntry.products attribute is auto-create in the IO'
        IntegrationTestUtil.importImpEx(
                '$item=integrationObjectItem(integrationObject(code), code)',
                'UPDATE IntegrationObjectItemAttribute; $item[unique = true]   ; attributeName[unique = true]; autocreate',
                "                                     ; $IO_CODE:TestOrderEntry; product                     ; true")
        and: 'all permissions are good except Product has create permission revoked'
        accessRightsManager
                .forType(OrderModel._TYPECODE).grantAll().apply()
                .forType(OrderEntryModel._TYPECODE).grantAll().apply()
                .forType(ProductModel._TYPECODE).grantRead().apply()
        and: 'the payload refers a non-existent Product'
        def payload = Entity.json minimalOrder('NPO')
                .withFieldValues('entries', entry())
                .build()

        when:
        def response = requestBuilder()
                .path('TestOrders')
                .build()
                .post(payload)

        then:
        response.status == HttpStatusCodes.CREATED.statusCode

        cleanup:
        IntegrationTestUtil.importImpEx(
                '$item=integrationObjectItem(integrationObject(code), code)',
                'UPDATE IntegrationObjectItemAttribute; $item[unique = true]   ; attributeName[unique = true]; autocreate',
                "                                     ; $IO_CODE:TestOrderEntry; product                     ; false")
        IntegrationTestUtil.remove OrderModel, { it.code == 'NPO' }
    }

    JsonBuilder minimalOrder(String orderCode = 'some-order') {
        JsonBuilder.json()
                .withCode(orderCode)
                .withField('user', JsonBuilder.json().withField('uid', USER))
                .withField('date', '2020-02-20T00:00:00')
                .withField('currency', JsonBuilder.json().withField('isocode', CURRENCY))
    }

    JsonBuilder entry(int num = 1) {
        JsonBuilder.json()
                .withField('entryNumber', num)
                .withField('quantity', '1')
                .withField('unit', JsonBuilder.json().withCode(UNIT))
                .withField('product', contextProduct())
    }

    JsonBuilder contextProduct() {
        product(PRODUCT)
    }

    JsonBuilder product(String code) {
        JsonBuilder.json()
                .withCode(code)
                .withField('catalogVersion', contextCatalogVersion())
    }

    JsonBuilder contextCatalogVersion() {
        JsonBuilder.json()
                .withField('version', CATALOG_VERSION)
                .withField('catalog', JsonBuilder.json().withId(CATALOG))
    }

    BasicAuthRequestBuilder requestBuilder() {
        UserAccessTestUtils.basicAuthRequest(IO_CODE)
                .credentials(USER, PWD)
    }

    ComposedTypeModel type(String code) {
        IntegrationTestUtil.findAny(ComposedTypeModel, { it.code == code })
                .orElse(null) as ComposedTypeModel
    }

    UserModel contextUser() {
        IntegrationTestUtil.findAny(UserModel, { it.uid == USER })
                .orElse(null) as UserModel
    }

    private static createExistingOrder() {
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Order; code[unique = true]; &orderPk; user(uid); currency(isocode); date[dateformat=MM/dd/yyyy]',
                "                   ; $EXISTING_ORDER    ; ordkey-1; $USER    ; $CURRENCY        ; 02/02/2020",
                'INSERT_UPDATE OrderEntry; order(&orderPk)[unique = true]; entryNumber[unique = true]; quantity; unit(code); product(code, catalogVersion(version, catalog(id)))',
                "                        ; ordkey-1                      ; 1                         ; 3       ; $UNIT     ; $PRODUCT:$CATALOG_VERSION:$CATALOG")
    }

    def accessForbidden(Response response, String permission, String type) {
        assert response.status == HttpStatusCodes.FORBIDDEN.statusCode
        def xml = XmlObject.createFrom response.readEntity(String)
        assert xml.get('/error/code') == 'forbidden'
        assert xml.get('/error/message').contains("$permission ")
        assert xml.get('/error/message').contains("$type ")
        true
    }
}
