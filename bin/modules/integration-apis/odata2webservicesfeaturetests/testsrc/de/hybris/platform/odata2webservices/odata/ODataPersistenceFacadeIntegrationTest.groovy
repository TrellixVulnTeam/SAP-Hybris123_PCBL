/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.odata2webservices.odata

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.catalog.model.CatalogModel
import de.hybris.platform.catalog.model.classification.ClassificationClassModel
import de.hybris.platform.catalog.model.classification.ClassificationSystemModel
import de.hybris.platform.catalog.model.classification.ClassificationSystemVersionModel
import de.hybris.platform.category.model.CategoryModel
import de.hybris.platform.core.model.c2l.LanguageModel
import de.hybris.platform.core.model.product.ProductModel
import de.hybris.platform.core.model.test.TestItemModel
import de.hybris.platform.integrationservices.IntegrationObjectModelBuilder
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.ItemTracker
import de.hybris.platform.integrationservices.util.JsonBuilder
import de.hybris.platform.integrationservices.util.JsonObject
import de.hybris.platform.odata2webservices.odata.builders.ODataRequestBuilder
import de.hybris.platform.odata2webservices.odata.builders.PathInfoBuilder
import de.hybris.platform.odata2webservicesfeaturetests.model.TestIntegrationItemModel
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import org.apache.olingo.odata2.api.commons.HttpHeaders
import org.apache.olingo.odata2.api.commons.HttpStatusCodes
import org.apache.olingo.odata2.api.processor.ODataResponse
import org.junit.ClassRule
import org.junit.Rule
import org.junit.Test
import spock.lang.AutoCleanup
import spock.lang.Shared
import spock.lang.Unroll

import javax.annotation.Resource

import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.IntegrationObjectModelBuilder.integrationObject
import static de.hybris.platform.integrationservices.util.JsonBuilder.json
import static de.hybris.platform.odata2webservices.odata.ODataFacadeTestUtils.PRODUCTS_ENTITYSET
import static de.hybris.platform.odata2webservices.odata.ODataFacadeTestUtils.createContext
import static de.hybris.platform.odata2webservices.odata.ODataFacadeTestUtils.handleRequest
import static de.hybris.platform.odata2webservices.odata.ODataFacadeTestUtils.oDataPostRequest
import static de.hybris.platform.odata2webservices.odata.ODataFacadeTestUtils.postRequestBuilder
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE

/**
 * Tests for entity persistence feature scenarios.
 */
@IntegrationTest
class ODataPersistenceFacadeIntegrationTest extends ServicelayerSpockSpecification {
    private static final String TEST_NAME = "ODataPersistenceFacade"
    private static final String ERROR_CODE_PATH = 'error.code'
    private static final String ERROR_MSG_PATH = 'error.message.value'
    private static final String ENTITYSET = 'Products'
    private static final String PRODUCT_CODE = "product"
    private static final String IO_CODE_1 = "${TEST_NAME}_IO1"
    private static final String IO_CODE_2 = "${TEST_NAME}_IO2"
    private static final String PRODUCT_NAME_ENGLISH = "${TEST_NAME}_EnglishProduct"
    private static final String PRODUCT_NAME_GERMAN = "${TEST_NAME}_GermanProduct"
    private static final String CATALOG_ID_1 = "${TEST_NAME}_Catalog1"
    private static final String CATALOG_ID_2 = "${TEST_NAME}_Catalog2"
    private static final String CATALOG_INVALID_ID = 'Invalid'
    private static final String CATALOG_VERSION = 'Staged'
    private static final String INTEGRATION_KEY = "$CATALOG_VERSION|$CATALOG_ID_1|$PRODUCT_CODE"
    private static final String IO_ATTR = "uid"
    private static final String IO_ATTR_VALUE = "adminGroup"
    private static final String IO_ITEM = "PrincipalGroups"

    @Shared
    @ClassRule
    IntegrationObjectModelBuilder productIO = integrationObject().withCode(IO_CODE_1)
            .withItem(integrationObjectItem().withCode('Product')
                    .withAttribute(integrationObjectItemAttribute('code'))
                    .withAttribute(integrationObjectItemAttribute('name'))
                    .withAttribute(integrationObjectItemAttribute('description'))
                    .withAttribute(integrationObjectItemAttribute('catalogVersion').withReturnItem('CatalogVersion'))
                    .withAttribute(integrationObjectItemAttribute('supercategories').withReturnItem('Category')))
            .withItem(integrationObjectItem().withCode('Catalog')
                    .withAttribute(integrationObjectItemAttribute().withName('id'))
                    .withAttribute(integrationObjectItemAttribute().withName('version')))
            .withItem(integrationObjectItem().withCode('CatalogVersion')
                    .withAttribute(integrationObjectItemAttribute('version'))
                    .withAttribute(integrationObjectItemAttribute('catalog').withReturnItem('Catalog')))
            .withItem(integrationObjectItem().withCode('Category')
                    .withAttribute(integrationObjectItemAttribute('code'))
                    .withAttribute(integrationObjectItemAttribute('catalogVersion').withReturnItem('CatalogVersion')))
    @Rule
    ItemTracker itemTracker = ItemTracker.track(TestItemModel, ProductModel)
    @AutoCleanup('cleanup')
    def itemIO = integrationObject().withCode(IO_CODE_2)

    @Resource(name = "defaultODataFacade")
    private ODataFacade facade

    def setup() {
        createCoreData()
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Catalog; id[unique = true]; name[lang = en]; defaultCatalog',
                "                     ; $CATALOG_ID_1    ; $CATALOG_ID_1  ; true",
                'INSERT_UPDATE CatalogVersion; catalog(id)[unique = true]; version[unique = true]; active',
                "                            ; $CATALOG_ID_1             ; Staged                ; true")
    }

    @Test
    def 'reports error when navigation property refers non-existent item'() {
        given: '"catalog" attribute in the payload refers value that does not exist in the platform'
        def content = json()
                .withCode(PRODUCT_CODE)
                .withField("name", PRODUCT_NAME_ENGLISH)
                .withField("catalogVersion", json()
                        .withField("version", "Staged")
                        .withField("catalog", json().withId(CATALOG_INVALID_ID)))
                .build()

        when: 'the payload is sent for processing'
        def response = handleReq(content)

        then: 'the response reports missing_nav_property error'
        response.status == HttpStatusCodes.BAD_REQUEST
        def json = JsonObject.createFrom response.entityAsStream
        json.getString(ERROR_CODE_PATH) == 'missing_nav_property'
        and: 'payload item was not persisted'
        !getPersistedProduct()
    }

    @Test
    def 'persists new item with valid payload'() {
        given:
        def content = json()
                .withCode(PRODUCT_CODE)
                .withField("catalogVersion", json()
                        .withField("version", CATALOG_VERSION)
                        .withField("catalog", json().withId(CATALOG_ID_1)))
                .withField("name", PRODUCT_NAME_ENGLISH)
                .build()

        when:
        def response = handleReq(content)

        then:
        response.status == HttpStatusCodes.CREATED
        def json = JsonObject.createFrom response.entityAsStream
        json.getString('d.name') == PRODUCT_NAME_ENGLISH
        and:
        def persistedModel = getPersistedProduct()
        persistedModel.getName(Locale.ENGLISH) == PRODUCT_NAME_ENGLISH
    }

    @Test
    def 'ignores integration key value in the payload'() {
        given: 'payload contains integrationKey attribute with some value'
        def content = json()
                .withCode(PRODUCT_CODE)
                .withField("catalogVersion", json()
                        .withField("version", CATALOG_VERSION)
                        .withField("catalog", json().withId(CATALOG_ID_1)))
                .withField("integrationKey", 'does|not|matter')
                .build()

        when:
        def response = handleReq(content)

        then: 'item is successfully persisted'
        response.status == HttpStatusCodes.CREATED
        and: 'the persisted item contains correct integrationKey instead of the submitted in the request'
        def json = JsonObject.createFrom response.entityAsStream
        json.getString('d.integrationKey') == INTEGRATION_KEY
        and: 'item model is saved'
        getPersistedProduct()
    }

    @Test
    def 'item is updated when it already exists'() {
        given:
        "item with code=$PRODUCT_CODE already exists in the system"
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Product; code[unique = true]; description',
                "; $PRODUCT_CODE; Stored in the database")
        and:
        "payload contains item with code=$PRODUCT_CODE"
        def payload = json()
                .withCode(PRODUCT_CODE)
                .withField('catalogVersion', json()
                        .withField('version', CATALOG_VERSION)
                        .withField('catalog', json().withId(CATALOG_ID_1)))
                .withField('name', 'Name From Request')
                .build()

        when:
        def response = handleRequest facade, postRequest().withBody(payload).build()

        then: 'response indicates success'
        response.status == HttpStatusCodes.CREATED
        and: 'response body contains updated item'
        def json = JsonObject.createFrom response.entityAsStream
        json.getString('d.name') == 'Name From Request'
        json.getString('d.description') == 'Stored in the database'
        and: 'updated item is stored in the database'
        def persistedModel = getPersistedProduct()
        persistedModel.name == 'Name From Request'
        persistedModel.description == 'Stored in the database'
    }

    @Test
    def 'post of a primitive type not possible'() {
        given: '"entryGroupNumbers" attribute creates a primitive type Integer in metadata'
        itemIO.withItem(integrationObjectItem('Order')
                        .withAttribute(integrationObjectItemAttribute().withName('code')))
                .withItem(integrationObjectItem('OrderEntry')
                        .withAttribute(integrationObjectItemAttribute('order').withReturnItem('Order'))
                        .withAttribute(integrationObjectItemAttribute('entryGroupNumbers')))
                .build()
        and: 'payload is for the primitive type Integer'
        def request = postRequestBuilder(IO_CODE_2, "Integer", APPLICATION_JSON_VALUE)
                .withBody(json().withField("value", 3))
                .build()

        when:
        final ODataResponse response = handleRequest facade, request

        then: 'response indicates not_found error'
        response.status == HttpStatusCodes.NOT_FOUND
        def json = JsonObject.createFrom response.entityAsStream
        json.getString(ERROR_CODE_PATH) == null
        json.getString(ERROR_MSG_PATH).contains 'Integer'
    }

    @Test
    def 'persists item when Accept-Language differs from Content-Language'() {
        given: 'an item with English content exists in the system'
        IntegrationTestUtil.importImpEx(
                "INSERT_UPDATE Product; code[unique = true]; name[lang = 'en']    ; catalogVersion(version, catalog(id))",
                "                     ; $PRODUCT_CODE      ; $PRODUCT_NAME_ENGLISH; Staged:$CATALOG_ID_1")

        when: 'request is made with different Content-Language and Accept-Language values'
        def request = postRequest()
                .withContentLanguage(Locale.GERMAN)
                .withAcceptLanguage(Locale.ENGLISH)
                .withBody(product().withField("name", PRODUCT_NAME_GERMAN))
                .build()
        def response = handleRequest facade, request

        then: 'response contains values in Accept-Language locale'
        def json = JsonObject.createFrom response.entityAsStream
        json.getString('d.name') == PRODUCT_NAME_ENGLISH
        and: 'Content-Language value is persisted in the database'
        def model = getPersistedProduct()
        model.getName(Locale.GERMAN) == PRODUCT_NAME_GERMAN
    }

    @Test
    def "responds with the Content-Language including a region when only Content-Language is specified"() {
        given: 'English with US region language exists'
        def region = 'en_US'
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Language; isocode[unique=true]',
                "                      ; $region"
        )
        when: 'en_US content is posted and Accept-Language is not specified'
        def request = postRequest()
                .withHeader(HttpHeaders.CONTENT_LANGUAGE, region)
                .withBody(product().withField("name", PRODUCT_NAME_ENGLISH))
                .build()
        def response = handleRequest facade, request

        then: 'the response contains values of the Content-Language'
        def json = JsonObject.createFrom response.entityAsStream
        json.getString('d.name') == PRODUCT_NAME_ENGLISH
        then: 'request is handled successfully'
        response.status == HttpStatusCodes.CREATED
        and: 'the response header for Content-Language contains the language with region'
        response.getHeader('Content-Language') == region

        IntegrationTestUtil.remove LanguageModel, { it.isocode == region }
    }

    @Test
    def 'responds with Accept-Language when only Accept-Language is specified'() {
        given: 'a product with English content exists in the system'
        IntegrationTestUtil.importImpEx(
                "INSERT_UPDATE Product; code[unique = true]; name[lang = 'en']",
                "                     ; $PRODUCT_CODE      ; $PRODUCT_NAME_ENGLISH")

        when: 'German content is posted but only Accept-Language is specified'
        def request = postRequest()
                .withAcceptLanguage(Locale.ENGLISH)
                .withBody(product().withField("name", PRODUCT_NAME_GERMAN))
                .build()
        def response = handleRequest facade, request

        then: 'response contains values in Accept-Language'
        def json = JsonObject.createFrom response.entityAsStream
        json.getString('d.name') == PRODUCT_NAME_ENGLISH
    }

    @Test
    @Unroll
    def "item cannot be persisted with unsupported #header header value"() {
        given: 'payload contains values in a language not supported by the platform'
        def request = postRequest()
                .withContentLanguage(content)
                .withAcceptLanguage(accept)
                .withBody(product().withField("name", "Name in Korean"))
                .build()

        when:
        def response = handleRequest facade, request

        then:
        response.status == HttpStatusCodes.BAD_REQUEST
        def json = JsonObject.createFrom response.entityAsStream
        json.getString(ERROR_CODE_PATH) == 'invalid_language'
        json.getString(ERROR_MSG_PATH).contains Locale.KOREA.language
        and: 'the payload item is not saved'
        !getPersistedProduct()

        where:
        header             | content        | accept
        'Content-Language' | Locale.KOREA   | Locale.ENGLISH
        'Accept-Language'  | Locale.ENGLISH | Locale.KOREA
    }

    @Test
    def 'persists item referencing item(s) of the same type in their payload'() {
        given: 'IO item metadata has self-referencing attributes: "supercategories" and "category"'
        def categoryCode1 = "${TEST_NAME}_Category1"
        def categoryCode2 = "${TEST_NAME}_Category2"
        itemIO.withItem(integrationObjectItem().withCode('Category')
                .withAttribute(integrationObjectItemAttribute('code'))
                .withAttribute(integrationObjectItemAttribute('supercategories').withReturnItem('Category'))
                .withAttribute(integrationObjectItemAttribute('categories').withReturnItem('Category')))
                .build()
        and: 'a category exists in the system'
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Category; code[unique = true]',
                "                      ; $categoryCode1")

        when: 'item is posted with references to the existing category'
        def request = postRequestBuilder(IO_CODE_2, "Categories", APPLICATION_JSON_VALUE)
                .withBody(json()
                        .withCode(categoryCode2)
                        .withFieldValues("supercategories", json().withCode(categoryCode1)))
                .build()
        def response = handleRequest facade, request

        then: 'the new item is created'
        response.status == HttpStatusCodes.CREATED
        def json = JsonObject.createFrom response.entityAsStream
        json.getString('d.code') == categoryCode2
        json.getString('d.supercategories').contains '__deferred'
        json.getString('d.categories').contains '__deferred'
        and: 'the categories stored in the syatem are correctly connected'
        def category1 = getPersistedCategory categoryCode1
        def category2 = getPersistedCategory categoryCode2
        category2.supercategories == [category1]
        category1.categories == [category2]

        cleanup:
        IntegrationTestUtil.remove CategoryModel, {it.code == categoryCode2 }
        IntegrationTestUtil.remove CategoryModel, {it.code == categoryCode1 }
    }

    @Test
    def 'persists an item with all possible primitive attribute types'() {
        given: 'test item integration object exists'
        itemIO.withItem(integrationObjectItem().withCode('TestIntegrationItem')
                .withAttribute(integrationObjectItemAttribute().withName('code'))
                .withAttribute(integrationObjectItemAttribute().withName('string'))
                .withAttribute(integrationObjectItemAttribute().withName('primitiveBoolean'))
                .withAttribute(integrationObjectItemAttribute().withName('primitiveShort'))
                .withAttribute(integrationObjectItemAttribute().withName('primitiveChar'))
                .withAttribute(integrationObjectItemAttribute().withName('primitiveInteger'))
                .withAttribute(integrationObjectItemAttribute().withName('primitiveByte'))
                .withAttribute(integrationObjectItemAttribute().withName('primitiveFloat'))
                .withAttribute(integrationObjectItemAttribute().withName('primitiveDouble'))
                .withAttribute(integrationObjectItemAttribute().withName('date'))
                .withAttribute(integrationObjectItemAttribute().withName('long'))
                .withAttribute(integrationObjectItemAttribute().withName('bigDecimal'))
                .withAttribute(integrationObjectItemAttribute().withName('bigInteger')))
                .build()
        and: 'the payload item has attributes of all possible primitive types set'
        def itemCode = 'new-item'
        def longVal = Long.valueOf(92233720)
        def bigDecimalVal = new BigDecimal('854.775807')
        def bigIntegerVal = new BigInteger('-922337203685477')
        def request = postRequestBuilder(IO_CODE_2, "TestIntegrationItems", APPLICATION_JSON_VALUE)
                .withBody(json()
                        .withField("code", itemCode)
                        .withField("string", "new-item")
                        .withField("primitiveShort", Short.MAX_VALUE)
                        .withField("primitiveChar", 'b')
                        .withField("primitiveInteger", Integer.MAX_VALUE)
                        .withField("primitiveByte", Byte.MAX_VALUE)
                        .withField("primitiveBoolean", Boolean.TRUE)
                        .withField("primitiveFloat", 3.4028234f)
                        .withField("primitiveDouble", 1.7976931348623157d)
                        .withField("date", new Date(1574665200000L))
                        .withField("long", longVal.toString())
                        .withField("bigDecimal", bigDecimalVal.toString())
                        .withField("bigInteger", bigIntegerVal.toString()))
                .build()

        when:
        def response = handleRequest facade, request

        then: 'response is successful'
        response.status == HttpStatusCodes.CREATED
        and: 'the response body contains all correct primitive attribute values'
        def json = JsonObject.createFrom response.entityAsStream
        json.getString('d.code') == itemCode
        json.getString('d.string') == 'new-item'
        json.getObject('d.primitiveShort') == 32767
        json.getString('d.primitiveChar') == 'b'
        json.getObject('d.primitiveInteger') == 2147483647
        json.getObject('d.primitiveByte') == 127
        json.getBoolean('d.primitiveBoolean')
        json.getObject('d.primitiveFloat') == '3.4028234'
        json.getObject('d.primitiveDouble') == '1.7976931348623157'
        json.getString('d.date') == '/Date(1574665200000)/'
        json.getString('d.long') == longVal.toString()
        json.getString('d.bigDecimal').startsWith bigDecimalVal.toString()
        json.getString('d.bigInteger') == bigIntegerVal.toString()
        and: 'the primitive attributes are persited in the database'
        def persistedItem = IntegrationTestUtil.findAny(TestIntegrationItemModel, { it.code == itemCode })
                .orElse(null)
        persistedItem != null
        persistedItem.string == 'new-item'
        persistedItem.primitiveShort == Short.MAX_VALUE
        persistedItem.primitiveChar == 'b'
        persistedItem.primitiveInteger == Integer.MAX_VALUE
        persistedItem.primitiveByte == Byte.MAX_VALUE
        persistedItem.primitiveBoolean
        persistedItem.primitiveFloat == 3.4028235f
        persistedItem.primitiveDouble == 1.7976931348623157d
        persistedItem.date == new Date(1574665200000L)
        persistedItem.long == longVal
        persistedItem.bigDecimal == bigDecimalVal
        persistedItem.bigInteger == bigIntegerVal
    }

    @Test
    @Unroll
    def "persists #desc item when its payload contains a read only attribute"() {
        given: 'payload contains read-only "version" attribute in Catalog item'
        def request = postRequest(entitySet)
                .withBody(payload)
                .build()

        when:
        def response = handleRequest facade, request

        then:
        response.status == HttpStatusCodes.CREATED

        where:
        desc       | entitySet  | payload
        'the root' | 'Catalogs' | catalog(version: 'read-only')
        'a nested' | 'Products' | product(catalogVersion: catalogVersion(catalog: catalog(version: 'read-only')))
    }

    @Test
    def "persisting subtype is possible even when the attribute in the IO definition returns the supertype"() {
        given: "Classification Class, a subtype of Category"
        def classSysId = "${TEST_NAME}_Catalog_ClassificationSystem"
        def classSysVersion = 'MyTestClassificationSystemVersion'
        def classCode = 'MyTestClassificationClass'
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE ClassificationSystem; id[unique = true]',
                "                                  ; $classSysId",
                'INSERT_UPDATE ClassificationSystemVersion; catalog(id)[unique = true]; version[unique = true]; active',
                "                                         ; $classSysId               ; $classSysVersion      ; false",
                'INSERT_UPDATE ClassificationClass; code[unique = true]; catalogVersion(version, catalog(id))[unique = true]',
                "                                 ; $classCode         ; $classSysVersion:$classSysId")

        and:
        def content = json()
                .withCode(PRODUCT_CODE)
                .withField("catalogVersion", json()
                        .withField("version", CATALOG_VERSION)
                        .withField("catalog", json().withId(CATALOG_ID_1)))
                .withFieldValues('supercategories', json()
                        .withCode(classCode)
                        .withField("catalogVersion", json()
                                .withField("version", classSysVersion)
                                .withField("catalog", json().withId(classSysId))))
                .build()

        when:
        def response = handleReq(content)

        then:
        response.status == HttpStatusCodes.CREATED

        cleanup:
        IntegrationTestUtil.remove ClassificationClassModel, {
            it.code == classCode && it.catalogVersion.version == classSysVersion && it.catalogVersion.catalog.id == classSysId
        }
        IntegrationTestUtil.remove ClassificationSystemModel, { it.id == classSysId }
        IntegrationTestUtil.remove ClassificationSystemVersionModel, {
            it.version == classSysVersion && it.catalog.id == classSysId
        }
    }

    @Test
    @Unroll
    def "read-only attribute is ignored when #condition"() {
        given:
        def content = json()
                .withId(catalogId)
                .withField('version', 'non-writable-field-ignored')
                .build()

        def request = oDataPostRequest IO_CODE_1, 'Catalogs', content, APPLICATION_JSON_VALUE

        when:
        def response = handleRequest facade, request

        then:
        response.status == HttpStatusCodes.CREATED

        and:
        def catalog = IntegrationTestUtil.findAny CatalogModel, { it.id == catalogId }
        catalog.isPresent()
        catalog.get().version == version

        where:
        condition                   | catalogId    | version
        'creating a new item'       | CATALOG_ID_2 | null
        'updating an existing item' | CATALOG_ID_1 | 'Staged'
    }

    @Test
    def "an error reported when POST payload refers an attribute not declared in the integration object"() {
        given: 'payload contains attribute "name" that exists in the type but not declared in the IO'
        def content = json()
                .withCode('some-category')
                .withField('name', 'my_category')
                .build()

        def request = oDataPostRequest IO_CODE_1, 'Categories', content, APPLICATION_JSON_VALUE

        when:
        def response = handleRequest facade, request

        then: 'error is reported'
        response.status == HttpStatusCodes.BAD_REQUEST
        def json = JsonObject.createFrom response.entityAsStream
        json.getString(ERROR_CODE_PATH) == 'invalid_property'
        json.getString(ERROR_MSG_PATH).contains 'name'

        and: 'category is not created'
        IntegrationTestUtil.findAny(CategoryModel, { it.code == 'some-category' }).empty
    }

    @Test
    def "Error status returned when creating an instance of abstract type"() {
        given:
        itemIO.withItem(integrationObjectItem().withCode('PrincipalGroup')
                .withAttribute(integrationObjectItemAttribute().withName('uid').unique()))
                .build()
        def request = postRequestAbstractType().withBody(
                json()
                        .withField(IO_ATTR, IO_ATTR_VALUE))
        when:
        def response = facade.handleRequest createContext(request)

        then:
        response.status == HttpStatusCodes.BAD_REQUEST
        def json = JsonObject.createFrom response.entityAsStream
        json.getString('error.code') == 'invalid_type'
        json.getString('error.message.value') == "The type PrincipalGroup cannot be persisted because it is an abstract type."
    }

    private static ODataRequestBuilder postRequestAbstractType() {
        ODataRequestBuilder.oDataPostRequest()
                .withContentType(APPLICATION_JSON_VALUE)
                .withAccepts(APPLICATION_JSON_VALUE)
                .withPathInfo(PathInfoBuilder.pathInfo()
                        .withServiceName(IO_CODE_2)
                        .withEntitySet(IO_ITEM))
    }

    private static ProductModel getPersistedProduct(String code = PRODUCT_CODE) {
        IntegrationTestUtil.getModelByExample new ProductModel(code: code)
    }

    private static CategoryModel getPersistedCategory(String code) {
        IntegrationTestUtil.getModelByExample new CategoryModel(code: code)
    }

    private static JsonBuilder product(Map<String, ?> attributes = [:]) {
        def json = json()
                .withCode(PRODUCT_CODE)
                .withField('catalogVersion', catalogVersion())
        attributes.forEach({ k, v -> json = json.withField(k, v) })
        json
    }

    private static JsonBuilder catalogVersion(Map<String, ?> attributes = [:]) {
        def json = json()
                .withField('version', CATALOG_VERSION)
                .withField('catalog', catalog())
        attributes.forEach({ k, v -> json = json.withField(k, v) })
        json
    }

    private static JsonBuilder catalog(Map<String, String> attributes = [:]) {
        def json = json().withId(CATALOG_ID_1)
        attributes.forEach({ k, v -> json = json.withField(k, v) })
        json
    }

    private static ODataRequestBuilder postRequest(String entities = ENTITYSET) {
        postRequestBuilder IO_CODE_1, entities, APPLICATION_JSON_VALUE
    }

    private ODataResponse handleReq(String content) {
        handleRequest(facade, oDataPostRequest(IO_CODE_1, PRODUCTS_ENTITYSET, content, Locale.ENGLISH, APPLICATION_JSON_VALUE))
    }
}
