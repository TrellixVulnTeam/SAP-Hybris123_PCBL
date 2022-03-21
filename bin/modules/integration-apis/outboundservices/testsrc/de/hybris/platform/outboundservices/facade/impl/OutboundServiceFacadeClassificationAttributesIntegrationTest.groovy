/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.outboundservices.facade.impl

import com.github.tomakehurst.wiremock.junit.WireMockRule
import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.core.model.product.ProductModel
import de.hybris.platform.core.model.user.EmployeeModel
import de.hybris.platform.integrationservices.util.ClassificationBuilder
import de.hybris.platform.integrationservices.util.IntegrationObjectTestUtil
import de.hybris.platform.outboundservices.ConsumedDestinationBuilder
import de.hybris.platform.outboundservices.facade.OutboundServiceFacade
import de.hybris.platform.outboundservices.util.OutboundMonitoringRule
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import org.junit.Rule
import org.junit.Test
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import rx.observers.TestSubscriber
import spock.lang.Issue

import javax.annotation.Resource

import static com.github.tomakehurst.wiremock.client.WireMock.matchingJsonPath
import static com.github.tomakehurst.wiremock.client.WireMock.ok
import static com.github.tomakehurst.wiremock.client.WireMock.post
import static com.github.tomakehurst.wiremock.client.WireMock.postRequestedFor
import static com.github.tomakehurst.wiremock.client.WireMock.stubFor
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo
import static com.github.tomakehurst.wiremock.client.WireMock.verify
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig
import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.findAny
import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.importImpEx
import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.remove
import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.removeAll
import static de.hybris.platform.outboundservices.ConsumedDestinationBuilder.consumedDestinationBuilder

@IntegrationTest
@Issue('https://jira.hybris.com/browse/STOUT-2920')
class OutboundServiceFacadeClassificationAttributesIntegrationTest extends ServicelayerSpockSpecification {

    private static final def TEST_NAME = "OutboundServiceFacadeClassificationAttributes"
    private static final def DESTINATION_ENDPOINT = '/odata2webservices/InboundProduct/Products'
    private static final def DESTINATION_ID = "${TEST_NAME}_Destination"
    private static final def CLASS = "QA"
    private static final def SYSTEM = "${TEST_NAME}_Electronics"
    private static final def VERSION = 'Test'
    private static final def SYSTEM_VERSION = "$SYSTEM:$VERSION"
    private static final def IO = "${TEST_NAME}_IO"
    private static final def PRODUCT_CODE = "${TEST_NAME}_Product"
    private static final def UID = "${TEST_NAME}_robbert"
    private static final def classificationBuilder = ClassificationBuilder.classification()
            .withSystem(SYSTEM)
            .withVersion(VERSION)
            .withClassificationClass(CLASS)

    @Rule
    public WireMockRule wireMockRule = new WireMockRule(wireMockConfig()
            .dynamicHttpsPort()
            .keystorePath("resources/devcerts/platform.jks")
            .keystorePassword('123456'))
    @Rule
    OutboundMonitoringRule outboundMonitoringRule = OutboundMonitoringRule.disabled()
    @Rule
    ConsumedDestinationBuilder destinationBuilder = consumedDestinationBuilder().withId(DESTINATION_ID)

    def tester = createEmployee(UID)

    @Resource
    private OutboundServiceFacade outboundServiceFacade
    private TestSubscriber<ResponseEntity<Map>> subscriber = new TestSubscriber<>()

    def setupSpec() {
        classificationBuilder
                .withAttribute(ClassificationBuilder.attribute().withName('tester').references('Employee'))
                .setup()
        importImpEx(
                'INSERT_UPDATE IntegrationObject; code[unique = true]',
                "                               ; $IO",
                'INSERT_UPDATE IntegrationObjectItem; integrationObject(code)[unique = true]; code[unique = true]; type(code) ; root[default = false]',
                "                                   ; $IO                                   ; Product            ; Product    ; true",
                "                                   ; $IO                                   ; Catalog            ; Catalog",
                "                                   ; $IO                                   ; CatalogVersion     ; CatalogVersion",
                "                                   ; $IO                                   ; Employee           ; Employee",
                '$integrationItem = integrationObjectItem(integrationObject(code), code)[unique = true]',
                '$attributeName = attributeName[unique = true]',
                '$attributeDescriptor = attributeDescriptor(enclosingType(code), qualifier)',
                'INSERT_UPDATE IntegrationObjectItemAttribute; $integrationItem   ; $attributeName ; $attributeDescriptor   ; returnIntegrationObjectItem(integrationObject(code), code)',
                "                                            ; $IO:Catalog        ; id             ; Catalog:id             ;",
                "                                            ; $IO:CatalogVersion ; catalog        ; CatalogVersion:catalog ; $IO:Catalog",
                "                                            ; $IO:CatalogVersion ; version        ; CatalogVersion:version ;",
                "                                            ; $IO:Product        ; code           ; Product:code           ;",
                "                                            ; $IO:Product        ; catalogVersion ; Product:catalogVersion ; $IO:CatalogVersion",
                "                                            ; $IO:Product        ; catalogVersion ; Product:catalogVersion ; $IO:CatalogVersion",
                "                                            ; $IO:Product        ; catalogVersion ; Product:catalogVersion ; $IO:CatalogVersion",
                "                                            ; $IO:Employee       ; uid            ; Employee:uid           ;",
                "                                            ; $IO:Employee       ; name           ; Employee:name          ;",
                '$item=integrationObjectItem(integrationObject(code), code)',
                '$systemVersionHeader=systemVersion(catalog(id), version)',
                '$classificationClassHeader=classificationClass(catalogVersion(catalog(id), version), code)',
                '$classificationAttributeHeader=classificationAttribute($systemVersionHeader, code)',
                '$classificationAssignment=classAttributeAssignment($classificationClassHeader, $classificationAttributeHeader)',
                'INSERT_UPDATE IntegrationObjectItemClassificationAttribute; $item[unique = true]; attributeName[unique = true]; $classificationAssignment                    ; returnIntegrationObjectItem(integrationObject(code), code)',
                "                                                          ; $IO:Product         ; qualityController           ; $SYSTEM_VERSION:$CLASS:$SYSTEM_VERSION:tester; $IO:Employee")
        importImpEx(
                'INSERT_UPDATE Product; code[unique = true]; catalogVersion(catalog(id), version)[unique = true]',
                "                     ; $PRODUCT_CODE      ; $SYSTEM_VERSION")
    }

    def setup() {
        destinationBuilder
                .withUrl("https://localhost:${wireMockRule.httpsPort()}/$DESTINATION_ENDPOINT")
                .build()
        stubFor(post(urlEqualTo(DESTINATION_ENDPOINT)).willReturn(ok()))
    }

    def cleanup() {
        remove tester
        removeAll ProductModel
    }

    def cleanupSpec() {
        IntegrationObjectTestUtil.cleanup()
        classificationBuilder.cleanup()
    }

    @Test
    def "sends a product with classification attribute to the destination"() {
        given: 'the product is associated with the classification class'
        importImpEx(
                '$catalogVersionHeader=catalogVersion(catalog(id), version)',
                'INSERT_UPDATE ClassificationClass; code[unique = true]; $catalogVersionHeader[unique = true]; products($catalogVersionHeader, code)',
                "                                 ; $CLASS             ; $SYSTEM_VERSION                     ; $SYSTEM_VERSION:$PRODUCT_CODE")
        and: 'product has classification attribute assigned'
        importImpEx(
                '$catalogVersionHeader = catalogVersion(catalog(id), version)',
                '$systemVersionHeader = systemVersion(catalog(id), version)',
                '$classificationClassHeader = classificationClass($catalogVersionHeader, code)',
                '$classificationAttributeHeader = classificationAttribute($systemVersionHeader, code)',
                '$assignmentHeader=classificationAttributeAssignment($classificationClassHeader, $classificationAttributeHeader)',
                '$valueHeader=value[translator = de.hybris.platform.catalog.jalo.classification.impex.ProductFeatureValueTranslator]',
                'INSERT_UPDATE ProductFeature; product($catalogVersionHeader, code)[unique = true]; $assignmentHeader[unique = true]             ; qualifier                     ; $valueHeader               ; valuePosition[unique = true]',
                "                            ; $SYSTEM_VERSION:$PRODUCT_CODE                      ; $SYSTEM_VERSION:$CLASS:$SYSTEM_VERSION:tester; $SYSTEM/$VERSION/${CLASS}.tester; \"reference, ${tester.pk}\"; 0")

        when:
        outboundServiceFacade.send(product(PRODUCT_CODE), IO, DESTINATION_ID).subscribe(subscriber)

        then: "destination server stub is called"
        verify(postRequestedFor(urlEqualTo(DESTINATION_ENDPOINT))
                .withRequestBody(matchQualityControllerId(tester.uid))
                .withRequestBody(matchQualityControllerName(tester.name)))

        and: "observable contains response with OK HTTP status"
        subscriber.getOnNextEvents().get(0).getStatusCode() == HttpStatus.OK
    }

    def product(String code) {
        findAny(ProductModel, { code == it.code })
                .orElse(null)
    }

    def createEmployee(String uid) {
        importImpEx(
                'INSERT_UPDATE Employee; uid[unique = true]; name',
                "                      ; $uid              ; Bob Tester")
        findAny(EmployeeModel, { it.uid == uid }).orElse(null)
    }

    def matchQualityControllerId(String uid) {
        matchingJsonPath("\$.qualityController[?(@.uid == '$uid')]")
    }

    def matchQualityControllerName(String name) {
        matchingJsonPath("\$.qualityController[?(@.name == '$name')]")
    }
}
