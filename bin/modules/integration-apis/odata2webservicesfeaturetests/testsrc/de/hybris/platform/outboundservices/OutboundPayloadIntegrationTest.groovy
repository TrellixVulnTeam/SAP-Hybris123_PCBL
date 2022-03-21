/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundservices

import com.github.tomakehurst.wiremock.junit.WireMockRule
import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel
import de.hybris.platform.core.model.ItemModel
import de.hybris.platform.integrationservices.model.IntegrationObjectModel
import de.hybris.platform.integrationservices.util.ItemTracker
import de.hybris.platform.odata2webservicesfeaturetests.model.TestIntegrationItemModel
import de.hybris.platform.outboundservices.facade.OutboundServiceFacade
import de.hybris.platform.outboundservices.facade.SyncParameters
import de.hybris.platform.outboundservices.service.DeleteRequestSender
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import org.junit.Rule
import org.junit.Test
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import rx.observers.TestSubscriber
import spock.lang.AutoCleanup
import spock.lang.Issue

import javax.annotation.Resource
import java.text.SimpleDateFormat
import java.util.function.Predicate

import static com.github.tomakehurst.wiremock.client.WireMock.anyUrl
import static com.github.tomakehurst.wiremock.client.WireMock.containing
import static com.github.tomakehurst.wiremock.client.WireMock.delete
import static com.github.tomakehurst.wiremock.client.WireMock.deleteRequestedFor
import static com.github.tomakehurst.wiremock.client.WireMock.matchingJsonPath
import static com.github.tomakehurst.wiremock.client.WireMock.ok
import static com.github.tomakehurst.wiremock.client.WireMock.post
import static com.github.tomakehurst.wiremock.client.WireMock.postRequestedFor
import static com.github.tomakehurst.wiremock.client.WireMock.stubFor
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo
import static com.github.tomakehurst.wiremock.client.WireMock.verify
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig
import static de.hybris.platform.integrationservices.IntegrationObjectItemAttributeModelBuilder.integrationObjectItemAttribute
import static de.hybris.platform.integrationservices.IntegrationObjectItemModelBuilder.integrationObjectItem
import static de.hybris.platform.integrationservices.IntegrationObjectModelBuilder.integrationObject
import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.findAny
import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.importImpEx
import static de.hybris.platform.outboundservices.ConsumedDestinationBuilder.consumedDestinationBuilder

@IntegrationTest
class OutboundPayloadIntegrationTest extends ServicelayerSpockSpecification {
    private static final def TEST_NAME = "OutboundPayload"
    private static final def TEST_IO = "${TEST_NAME}_IO"
    private static final def DESTINATION_ENDPOINT = "/odata2webservices/$TEST_IO"
    private static final def DESTINATION_ID = "${TEST_NAME}_Destination"
    private static final def ITEM_CODE = "${TEST_NAME}_TestIntegrationItem"

    @Rule
    WireMockRule wireMockRule = new WireMockRule(wireMockConfig()
            .dynamicHttpsPort()
            .keystorePath("resources/devcerts/platform.jks")
            .keystorePassword('123456'))
    @Rule
    ItemTracker itemTracker = ItemTracker.track(TestIntegrationItemModel)
    @AutoCleanup('reset')
    ConsumedDestinationBuilder destinationBuilder = consumedDestinationBuilder().withId(DESTINATION_ID)
    @AutoCleanup('cleanup')
    def testIO = integrationObject().withCode(TEST_IO)

    @Resource
    private OutboundServiceFacade outboundServiceFacade
    @Resource(name = 'deleteRequestSender')
    private DeleteRequestSender deleteSender

    private TestSubscriber<ResponseEntity<Map>> subscriber = new TestSubscriber<>()

    def setup() {
        destinationBuilder
                .withUrl("https://localhost:${wireMockRule.httpsPort()}/$DESTINATION_ENDPOINT")
                .build()

        stubFor(post(urlEqualTo(DESTINATION_ENDPOINT)).willReturn(ok()))
        stubFor(delete(anyUrl()).willReturn(ok()))
    }

    @Issue(['https://jira.hybris.com/browse/IAPI-3925', 'https://jira.hybris.com/browse/IAPI-3959', 'https://cxjira.sap.com/browse/IAPI-3960'])
    @Test
    def "primitives in a collection are wrapped in an object"() {
        def dateFormatter = new SimpleDateFormat('YYYY-MM-dd-HH:mm:ss')
        def dateString = dateFormatter.format(new Date())
        def enumValue = "POST"

        given: 'the IO contains an item with enum value'
        testIO.withItem(integrationObjectItem().withCode('HttpMethod')
                .withAttribute(integrationObjectItemAttribute().withName('code')))
        and: 'an item containing a collection of date and enum attributes'
        testIO.withItem(integrationObjectItem().withCode('TestIntegrationItem').root()
                .withAttribute(integrationObjectItemAttribute().withName('code'))
                .withAttribute(integrationObjectItemAttribute().withName('dateCollection'))
                .withAttribute(integrationObjectItemAttribute().withName('enumList').withReturnItem('HttpMethod')))
                .build()
        and: 'a TestIntegrationItem instance'
        importImpEx(
                'INSERT_UPDATE TestIntegrationItem; code[unique = true]; dateCollection[dateformat = YYYY-MM-dd-HH:mm:ss]; enumList(code)',
                "                                 ; $ITEM_CODE         ; $dateString                                     ; $enumValue")

        when:
        outboundServiceFacade.send(item(TestIntegrationItemModel, ITEM_CODE), TEST_IO, DESTINATION_ID).subscribe(subscriber)

        then: 'verify the primitive is wrapped in an object such as { "value": "xyz" } and enum as {"code":"abc"}'
        verify(postRequestedFor(urlEqualTo(DESTINATION_ENDPOINT))
                .withRequestBody(matchingJsonPath("\$.dateCollection[0][?(@.value == '/Date(${dateFormatter.parse(dateString).getTime()})/')]"))
                .withRequestBody(matchingJsonPath("\$.enumList[0][?(@.code == '$enumValue')]")))


        and: "observable contains response with OK HTTP status"
        subscriber.getOnNextEvents().get(0).getStatusCode() == HttpStatus.OK
    }

    @Issue('https://jira.hybris.com/browse/IAPI-3887')
    @Test
    def 'primitives are in the appropriate format in the payload'() {
        given: 'the IO contains an item with all possible primitive attributes'
        testIO.withItem(integrationObjectItem().withCode('TestIntegrationItem').root()
                .withAttribute(integrationObjectItemAttribute().withName('bigDecimal'))
                .withAttribute(integrationObjectItemAttribute().withName('string'))
                .withAttribute(integrationObjectItemAttribute().withName('primitiveInteger'))
                .withAttribute(integrationObjectItemAttribute().withName('primitiveLong'))
                .withAttribute(integrationObjectItemAttribute().withName('primitiveBoolean'))
                .withAttribute(integrationObjectItemAttribute().withName('primitiveChar'))
                .withAttribute(integrationObjectItemAttribute().withName('date'))
                .withAttribute(integrationObjectItemAttribute().withName('primitiveDouble'))
                .withAttribute(integrationObjectItemAttribute().withName('primitiveFloat')))
                .build()
        and: 'a TestIntegrationItem'
        def bigDecimal = BigDecimal.valueOf(12121212.333333)
        def string = "i'm a string"
        def integer = 8675309
        def longVal = 1001010101001010L
        def boolVal = true
        def character = 'c'
        def dateFormatter = new SimpleDateFormat('yyyy-MM-dd HH:mm:ss')
        def dateString = dateFormatter.format(new Date())
        def doubleVal = 242342.2343
        def floatVal = 5656565.8f
        importImpEx(
                "INSERT_UPDATE TestIntegrationItem; code[unique = true] ; bigDecimal ; string ; primitiveInteger ; primitiveLong    ; primitiveBoolean ; primitiveChar ; date[dateformat = 'yyyy-MM-dd HH:mm:ss'] ; primitiveDouble  ; primitiveFloat",
                "                                 ; $ITEM_CODE          ; $bigDecimal; $string; $integer         ; $longVal         ; $boolVal         ; $character    ; $dateString                              ; $doubleVal       ; $floatVal")

        when:
        outboundServiceFacade.send(item(TestIntegrationItemModel, ITEM_CODE), TEST_IO, DESTINATION_ID).subscribe(subscriber)

        then:
        verify(postRequestedFor(urlEqualTo(DESTINATION_ENDPOINT))
                .withRequestBody(matchingJsonPath('$.bigDecimal', containing('12121212.3')))
                .withRequestBody(matchingJsonPath('$.string', containing(string)))
                .withRequestBody(matchingJsonPath('$.primitiveInteger', containing("$integer")))
                .withRequestBody(matchingJsonPath('$.primitiveLong', containing("$longVal")))
                .withRequestBody(matchingJsonPath('$.primitiveBoolean', containing("$boolVal")))
                .withRequestBody(matchingJsonPath('$.primitiveChar', containing("$character")))
                .withRequestBody(matchingJsonPath('$.date', containing("/Date(${dateFormatter.parse(dateString).getTime()})/")))
                .withRequestBody(matchingJsonPath('$.primitiveDouble', containing("$doubleVal")))
                .withRequestBody(matchingJsonPath('$.primitiveFloat', containing('5656566.0'))))

        and: "observable contains response with OK HTTP status"
        subscriber.getOnNextEvents().get(0).getStatusCode() == HttpStatus.OK
    }

    @Test
    @Issue('https://cxjira.sap.com/browse/IAPI-3466')
    def 'delete requests contain the integration key in the URI'() {
        given: 'the IO contains an item with a primitive key attribute'
        testIO.withItem(integrationObjectItem().withCode('TestIntegrationItem').root()
                .withAttribute(integrationObjectItemAttribute().withName('code').unique()))
                .build()
        and: 'delete parameters'
        def integrationKey = 'some-key-value'
        def parameters = SyncParameters.syncParametersBuilder()
                .withIntegrationObject(contextIntegrationObject())
                .withDestination(contextDestination())
                .withIntegrationKey(integrationKey)
                .build()

        when: 'the delete service is called with the parameters'
        deleteSender.send parameters

        then: 'key value for the key attribute is included in the destination URI'
        verify deleteRequestedFor(urlEqualTo("${DESTINATION_ENDPOINT}('$integrationKey')"))
    }

    ItemModel item(Class type, String code) {
        findAny(type, { code == it.code } as Predicate).orElse(null) as ItemModel
    }

    private static IntegrationObjectModel contextIntegrationObject() {
        findAny(IntegrationObjectModel, { it.code == TEST_IO })
                .orElseThrow { new IllegalStateException("$TEST_IO integration object was not created") } as IntegrationObjectModel
    }

    private static ConsumedDestinationModel contextDestination() {
        findAny(ConsumedDestinationModel, { it.id == DESTINATION_ID })
                .orElseThrow { new IllegalStateException("$DESTINATION_ID destination was not created") } as ConsumedDestinationModel
    }
}
