/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.odata2webservicesfeaturetests

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.catalog.model.CatalogModel
import de.hybris.platform.catalog.model.CatalogVersionModel
import de.hybris.platform.core.model.c2l.CurrencyModel
import de.hybris.platform.core.model.order.OrderEntryModel
import de.hybris.platform.core.model.order.OrderModel
import de.hybris.platform.core.model.product.ProductModel
import de.hybris.platform.core.model.product.UnitModel
import de.hybris.platform.core.model.user.AddressModel
import de.hybris.platform.core.model.user.EmployeeModel
import de.hybris.platform.integrationservices.enums.AuthenticationType
import de.hybris.platform.inboundservices.util.InboundMonitoringRule
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.JsonObject
import de.hybris.platform.odata2webservices.constants.Odata2webservicesConstants
import de.hybris.platform.odata2webservices.util.Odata2WebServicesEssentialData
import de.hybris.platform.odata2webservicesfeaturetests.model.TestIntegrationItemModel
import de.hybris.platform.odata2webservicesfeaturetests.ws.BasicAuthRequestBuilder
import de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder
import de.hybris.platform.ordersplitting.model.ConsignmentEntryModel
import de.hybris.platform.ordersplitting.model.ConsignmentModel
import de.hybris.platform.ordersplitting.model.VendorModel
import de.hybris.platform.ordersplitting.model.WarehouseModel
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.webservicescommons.testsupport.server.NeedsEmbeddedServer
import org.junit.ClassRule
import org.junit.Rule
import org.junit.Test
import spock.lang.AutoCleanup
import spock.lang.Issue
import spock.lang.Shared

import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response

import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.IntegrationObjectModelBuilder.integrationObject
import static de.hybris.platform.odata2webservices.util.Odata2WebServicesEssentialData.odata2WebservicesEssentialData
import static de.hybris.platform.odata2webservicesfeaturetests.useraccess.UserAccessTestUtils.givenUserExistsWithUidAndGroups
import static de.hybris.platform.odata2webservicesfeaturetests.ws.InboundChannelConfigurationBuilder.inboundChannelConfigurationBuilder

/**
 * Tests for STOUT-1258 Expand Support feature
 */
@NeedsEmbeddedServer(webExtensions = Odata2webservicesConstants.EXTENSIONNAME)
@IntegrationTest
class GetExpandSupportIntegrationTest extends ServicelayerSpockSpecification {
    private static final String TEST_NAME = "GetExpandSupport"
    private static String TEST_EXPAND_2_LEVEL = "${TEST_NAME}_IO2"
    private static String EXPAND_SUPPORT_IO = "${TEST_NAME}_IO"
    private static String USER = "${TEST_NAME}_User"
    private static String PASSWORD = 'retset'
    private static String PRODUCT_1 = "product1"
    private static String PRODUCT_2 = "product2"
    private static String CATALOG = "${TEST_NAME}_Catalog"
    private static String CATALOG_VERSION = 'expandTestCatalogVersion'
    private static String CURRENCY_ISOCODE = "${TEST_NAME}_expandTestEUR"

    @Shared
    @ClassRule
    Odata2WebServicesEssentialData essentialData = odata2WebservicesEssentialData().withDependencies()
    @Shared
    @ClassRule
    InboundChannelConfigurationBuilder inboundChannel = inboundChannelConfigurationBuilder()
            .withAuthType(AuthenticationType.BASIC)
            .withIntegrationObject integrationObject().withCode(EXPAND_SUPPORT_IO)
                    .withItem(integrationObjectItem().withCode('Catalog')
                            .withAttribute(integrationObjectItemAttribute().withName('id')))
                    .withItem(integrationObjectItem().withCode('CatalogVersion')
                            .withAttribute(integrationObjectItemAttribute().withName('version'))
                            .withAttribute(integrationObjectItemAttribute().withName('catalog').withReturnItem('Catalog')))
                    .withItem(integrationObjectItem().withCode('Product')
                            .withAttribute(integrationObjectItemAttribute().withName('code'))
                            .withAttribute(integrationObjectItemAttribute().withName('catalogVersion').withReturnItem('CatalogVersion')))

    @Rule
    InboundMonitoringRule monitoring = InboundMonitoringRule.disabled()
    @AutoCleanup('cleanup')
    def spareInboundChannel = inboundChannelConfigurationBuilder().withAuthType(AuthenticationType.BASIC)

    def setupSpec() {
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Catalog; id[unique = true]',
                "                     ; $CATALOG",
                'INSERT_UPDATE CatalogVersion; catalog(id)[unique = true]; version[unique = true]',
                "                            ; $CATALOG                  ; $CATALOG_VERSION",
                'INSERT_UPDATE Product; code[unique = true]; catalogVersion(catalog(id), version)',
                "                     ; $PRODUCT_1         ; $CATALOG:$CATALOG_VERSION",
                "                     ; $PRODUCT_2         ; $CATALOG:$CATALOG_VERSION",
                'INSERT_UPDATE Currency; isocode[unique = true]; symbol',
                "                      ; $CURRENCY_ISOCODE     ; EUR",
        )
    }

    def cleanupSpec() {
        IntegrationTestUtil.remove ProductModel, { it.code == PRODUCT_1 || it.code == PRODUCT_2 }
        IntegrationTestUtil.remove CatalogVersionModel, { it.version == CATALOG_VERSION && it.catalog.id == CATALOG }
        IntegrationTestUtil.remove CatalogModel, { it.id == CATALOG }
        IntegrationTestUtil.remove CurrencyModel, { it.isocode == CURRENCY_ISOCODE }
        IntegrationTestUtil.remove EmployeeModel, { it.uid == USER }
    }

    def setup() {
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationadmingroup")
    }

    def cleanup() {
        IntegrationTestUtil.findAny(EmployeeModel, { it.uid == USER }).ifPresent { IntegrationTestUtil.remove it }
    }

    @Test
    def "entities not expanded when \$expand is not present"() {
        when:
        def response = basicAuthRequest(EXPAND_SUPPORT_IO)
                .path('Products')
                .build()
                .accept(MediaType.APPLICATION_JSON_TYPE)
                .get()

        then:
        response.status == 200
        def json = extractBody response
        json.exists "\$.d.results[?(@.code == '$PRODUCT_1')].catalogVersion.__deferred"
        json.exists "\$.d.results[?(@.code == '$PRODUCT_2')].catalogVersion.__deferred"
    }

    @Test
    def "entities are expanded when \$expand is present"() {
        when:
        def response = basicAuthRequest(EXPAND_SUPPORT_IO)
                .path('Products')
                .queryParam('$expand', 'catalogVersion')
                .build()
                .accept(MediaType.APPLICATION_JSON_TYPE)
                .get()

        then:
        response.status == 200
        def json = extractBody(response)
        json.getCollectionOfObjects("\$.d.results[*].catalogVersion.version") == [CATALOG_VERSION, CATALOG_VERSION]
    }

    @Test
    def "expands collection of enums"() {
        given:
        def itemKey = "${TEST_NAME}_key"
        def enumKey1 = "string"
        def enumKey2 = "bool"
        IntegrationTestUtil.importImpEx(
                "INSERT_UPDATE IntegrationObjectItem; integrationObject(code)[unique = true]; code[unique = true]                         ; type(code)",
                "                                   ; $EXPAND_SUPPORT_IO                    ; TestIntegrationItem                         ; TestIntegrationItem",
                "                                   ; $EXPAND_SUPPORT_IO                    ; OData2webservicesFeatureTestPropertiesTypes ; OData2webservicesFeatureTestPropertiesTypes",
                "INSERT_UPDATE IntegrationObjectItemAttribute ; integrationObjectItem(integrationObject(code), code)[unique = true] ; attributeName[unique = true] ; attributeDescriptor(enclosingType(code), qualifier) ; returnIntegrationObjectItem(integrationObject(code), code)     ; unique[default = false]",
                "                                             ; $EXPAND_SUPPORT_IO:TestIntegrationItem                              ; code                         ; TestIntegrationItem:code",
                "                                             ; $EXPAND_SUPPORT_IO:TestIntegrationItem                              ; testEnums                    ; TestIntegrationItem:testEnums                      ; $EXPAND_SUPPORT_IO:OData2webservicesFeatureTestPropertiesTypes  ; false",
                "                                             ; $EXPAND_SUPPORT_IO:OData2webservicesFeatureTestPropertiesTypes      ; code                         ; OData2webservicesFeatureTestPropertiesTypes:code",

                "INSERT_UPDATE TestIntegrationItem ; code[unique = true] ; testEnums(code)",
                "                                  ; $itemKey            ; $enumKey1,$enumKey2"
        )

        when:
        def response = basicAuthRequest(EXPAND_SUPPORT_IO)
                .path('TestIntegrationItems')
                .queryParam('$expand', 'testEnums')
                .build()
                .accept(MediaType.APPLICATION_JSON_TYPE)
                .get()

        then:
        response.status == 200
        def json = extractBody(response)
        json.getCollectionOfObjects("d.results[?(@.code == '$itemKey')].testEnums.results[*].code").containsAll([enumKey1, enumKey2])

        cleanup:
        IntegrationTestUtil.remove TestIntegrationItemModel, { it.code == itemKey }
    }

    @Test
    def "not found error returned when invalid \$expand option is specified"() {
        when:
        def response = basicAuthRequest(EXPAND_SUPPORT_IO)
                .path('Products')
                .queryParam('$expand', 'units')
                .build()
                .accept(MediaType.APPLICATION_JSON_TYPE)
                .get()

        then:
        response.status == 404
        def json = extractBody(response)
        json.getString("\$.error.message.value").contains "units"
    }

    @Test
    def "entities are expanded when \$expand option of an enum is provided at the second level"() {
        given:
        spareInboundChannel.withIntegrationObject(integrationObject().withCode(TEST_EXPAND_2_LEVEL)
                .withItem(integrationObjectItem().withCode('Order')
                        .withAttribute(integrationObjectItemAttribute('code'))
                        .withAttribute(integrationObjectItemAttribute('paymentAddress').withReturnItem('Address')))
                .withItem(integrationObjectItem().withCode('Gender')
                        .withAttribute(integrationObjectItemAttribute().withName('code')))
                .withItem(integrationObjectItem().withCode('Address')
                        .withAttribute(integrationObjectItemAttribute('firstname').unique())
                        .withAttribute(integrationObjectItemAttribute('lastname').unique())
                        .withAttribute(integrationObjectItemAttribute('gender').withReturnItem('Gender'))))
                .build()
        and:
        def order = "${TEST_NAME}_Order"
        IntegrationTestUtil.importImpEx(
                "INSERT_UPDATE Address; firstname[unique = true]; lastname[unique = true]; gender(code); owner(User.uid)",
                "                     ; Alberto                 ; Contador               ; MALE        ; admin",
                "INSERT_UPDATE Order; code[unique = true]; paymentAddress(firstname, lastname); date[dateformat = dd/MM/yyyy]; currency(isocode); user(uid)",
                "                   ; $order             ; Alberto:Contador                   ; 04/04/2019                   ; $CURRENCY_ISOCODE; admin")

        when:
        def response = basicAuthRequest(TEST_EXPAND_2_LEVEL)
                .path('Orders')
                .queryParam('$expand', 'paymentAddress/gender')
                .build()
                .accept(MediaType.APPLICATION_JSON_TYPE)
                .get()

        then:
        response.status == 200
        def json = extractBody(response)
        json.getCollectionOfObjects("\$.d.results[*].paymentAddress.firstname").contains('Alberto')
        json.getCollectionOfObjects("\$.d.results[*].paymentAddress.lastname").contains('Contador')
        json.getCollectionOfObjects("\$.d.results[*].paymentAddress.gender.code").contains('MALE')

        cleanup:
        IntegrationTestUtil.remove OrderModel, { it.code == order}
        IntegrationTestUtil.remove AddressModel, { it.firstname == 'Alberto' && it.lastname == 'Contador' }
    }

    @Test
    def 'entities are expanded when $expand for collection'() {
        given: "User is in both in integrationadmingroup and integrationservicegroup"
        givenUserExistsWithUidAndGroups(USER, PASSWORD, "integrationadmingroup,integrationservicegroup")

        when:
        def response = basicAuthRequest('IntegrationService')
                .path("IntegrationObjects('$EXPAND_SUPPORT_IO')")
                .queryParam('$expand', 'items/attributes')
                .build()
                .accept(MediaType.APPLICATION_JSON_TYPE)
                .get()

        then:
        response.status == 200
        def json = extractBody(response)
        !json.getCollectionOfObjects("\$.d.items.results[*].attributes.results[*].attributeName").empty
    }

    @Issue('https://jira.hybris.com/browse/IAPI-4103')
    @Test
    def "entities are expanded with many levels"() {
        given: 'IO with deep levels'
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE IntegrationObjectItem; integrationObject(code)[unique = true]; code[unique = true]; type(code)         ; root[default = false]; itemTypeMatch(code)',
                "                                   ; $EXPAND_SUPPORT_IO                    ; Consignment        ; Consignment        ;                      ; ;",
                "                                   ; $EXPAND_SUPPORT_IO                    ; AbstractOrderEntry ; AbstractOrderEntry ;                      ; ;",
                "                                   ; $EXPAND_SUPPORT_IO                    ; ConsignmentEntry   ; ConsignmentEntry   ;                      ; ;",
                "                                   ; $EXPAND_SUPPORT_IO                    ; AbstractOrder      ; AbstractOrder      ;                      ; ;",
                "                                   ; $EXPAND_SUPPORT_IO                    ; Order              ; Order              ; true                 ; ;",
                'INSERT_UPDATE IntegrationObjectItemAttribute; integrationObjectItem(integrationObject(code), code)[unique = true]; attributeName[unique = true]; attributeDescriptor(enclosingType(code), qualifier); returnIntegrationObjectItem(integrationObject(code), code); unique[default = false]; autoCreate[default = false]',
                "                                            ; $EXPAND_SUPPORT_IO:Consignment                                     ; code                        ; Consignment:code                                   ;                                                           ; true                   ;",
                "                                            ; $EXPAND_SUPPORT_IO:Consignment                                     ; consignmentEntries          ; Consignment:consignmentEntries                     ; $EXPAND_SUPPORT_IO:ConsignmentEntry                       ;                        ;",
                "                                            ; $EXPAND_SUPPORT_IO:AbstractOrderEntry                              ; order                       ; AbstractOrderEntry:order                           ; $EXPAND_SUPPORT_IO:AbstractOrder                          ; true                   ;",
                "                                            ; $EXPAND_SUPPORT_IO:AbstractOrderEntry                              ; entryNumber                 ; AbstractOrderEntry:entryNumber                     ;                                                           ; true                   ;",
                "                                            ; $EXPAND_SUPPORT_IO:AbstractOrderEntry                              ; product                     ; AbstractOrderEntry:product                         ; $EXPAND_SUPPORT_IO:Product                                ;                        ;",
                "                                            ; $EXPAND_SUPPORT_IO:ConsignmentEntry                                ; quantity                    ; ConsignmentEntry:quantity                          ;                                                           ; true                   ;",
                "                                            ; $EXPAND_SUPPORT_IO:ConsignmentEntry                                ; orderEntry                  ; ConsignmentEntry:orderEntry                        ; $EXPAND_SUPPORT_IO:AbstractOrderEntry                     ;                        ;",
                "                                            ; $EXPAND_SUPPORT_IO:AbstractOrder                                   ; code                        ; AbstractOrder:code                                 ;                                                           ; true                   ;",
                "                                            ; $EXPAND_SUPPORT_IO:Order                                           ; code                        ; Order:code                                         ;                                                           ; true                   ;",
                "                                            ; $EXPAND_SUPPORT_IO:Order                                           ; consignments                ; Order:consignments                                 ; $EXPAND_SUPPORT_IO:Consignment                            ;                        ;"
        )

        and: 'Order containing a product that can be reached 4 levels down'
        def orderIO = "${TEST_NAME}_expandTestOrder"
        def unit = "${TEST_NAME}_expandTestUnit"
        def vendor = "${TEST_NAME}_expandTestVendor"
        def warehouse = "${TEST_NAME}_expandTestWarehouse"
        def address = "${TEST_NAME}_expandTestAddress"
        def cosignment = "${TEST_NAME}_expandTestCosignment"
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Order; code[unique = true]; date[dateformat = YYYY-MM-dd]; currency(isocode); user(uid)',
                "                   ; $orderIO   ; 2020-04-16                   ; $CURRENCY_ISOCODE; $USER",

                'INSERT_UPDATE Unit; code[unique = true]; unitType',
                "                  ; $unit    ; expandTestType",

                'INSERT_UPDATE OrderEntry; entryNumber[unique = true]; order(code)     ; product(code, catalogVersion(version, catalog(id))) ; quantity; unit(code)',
                "                        ; 1                         ; $orderIO ; $PRODUCT_1:$CATALOG_VERSION:$CATALOG                ; 1       ; $unit",

                'INSERT_UPDATE Vendor; code[unique = true]',
                "                    ; $vendor",

                'INSERT_UPDATE Warehouse; code[unique = true] ; vendor(code)',
                "                       ; $warehouse ; $vendor",

                'INSERT Address; &addrId           ; owner(Order.code)',
                "              ; $address ; $orderIO",

                'INSERT_UPDATE Consignment; code[unique = true]   ;  warehouse(code)     ; status(code); shippingAddress(&addrId)',
                "                         ; $cosignment ;  $warehouse  ; READY       ; $address",

                'INSERT_UPDATE ConsignmentEntry; quantity[unique = true]; orderEntry(entryNumber); consignment(code)',
                "                              ; 1                      ; 1                      ; $cosignment",

                'UPDATE Consignment; code[unique = true]   ; consignmentEntries(quantity)',
                "                  ; $cosignment ; 1",

                'UPDATE Order; code[unique = true]; consignments(code)',
                "            ; $orderIO   ; $cosignment"
        )

        when:
        def response = basicAuthRequest(EXPAND_SUPPORT_IO)
                .path("Orders")
                .queryParam('$expand', 'consignments/consignmentEntries/orderEntry/product/catalogVersion/catalog')
                .build()
                .accept(MediaType.APPLICATION_JSON_TYPE)
                .get()

        then: 'catalog is expanded at the 6th level'
        response.status == 200
        def json = extractBody(response)
        json.getString("\$.d.results[0].consignments.results[0].consignmentEntries.results[0].orderEntry.product.catalogVersion.catalog.id") == CATALOG

        cleanup:
        IntegrationTestUtil.remove ConsignmentEntryModel, { it.quantity == 1 }
        IntegrationTestUtil.remove OrderEntryModel, { it.entryNumber == 1 }
        IntegrationTestUtil.remove UnitModel, { it.code == unit }
        IntegrationTestUtil.remove ConsignmentModel, { it.code == cosignment }
        IntegrationTestUtil.remove VendorModel, { it.code == vendor }
        IntegrationTestUtil.remove WarehouseModel, { it.code == warehouse }
        IntegrationTestUtil.findAny(OrderModel, { it.code == orderIO })
                .ifPresent({ order ->
                    IntegrationTestUtil.remove(AddressModel, { it.owner == order })
                })
        IntegrationTestUtil.remove OrderModel, { it.code == orderIO }
    }

    BasicAuthRequestBuilder basicAuthRequest(String serviceName) {
        new BasicAuthRequestBuilder()
                .extensionName(Odata2webservicesConstants.EXTENSIONNAME)
                .credentials(USER, PASSWORD) // defined inside setup()
                .path(serviceName)
    }

    JsonObject extractBody(final Response response) {
        JsonObject.createFrom((InputStream) response.getEntity())
    }
}