/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.outboundservices.client

import com.github.tomakehurst.wiremock.junit.WireMockRule
import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel
import de.hybris.platform.apiregistryservices.services.DestinationService
import de.hybris.platform.outboundservices.AbstractCredentialBuilder
import de.hybris.platform.outboundservices.BasicCredentialBuilder
import de.hybris.platform.outboundservices.ConsumedDestinationBuilder
import de.hybris.platform.outboundservices.ConsumedOAuthCredentialBuilder
import de.hybris.platform.outboundservices.DestinationTargetBuilder
import de.hybris.platform.outboundservices.EndpointBuilder
import de.hybris.platform.outboundservices.OAuthClientDetailsBuilder
import de.hybris.platform.outboundservices.client.impl.UnsupportedRestTemplateException
import de.hybris.platform.outboundservices.monitoring.DefaultOutboundRequestResponseInterceptor
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import org.junit.Rule
import org.junit.Test
import org.springframework.http.client.support.BasicAuthenticationInterceptor
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter
import org.springframework.web.client.DefaultResponseErrorHandler
import org.springframework.web.client.RestTemplate

import javax.annotation.Resource

import static com.github.tomakehurst.wiremock.client.WireMock.okJson
import static com.github.tomakehurst.wiremock.client.WireMock.post
import static com.github.tomakehurst.wiremock.client.WireMock.stubFor
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig
import static de.hybris.platform.outboundservices.BasicCredentialBuilder.basicCredentialBuilder
import static de.hybris.platform.outboundservices.ConsumedOAuthCredentialBuilder.consumedOAuthCredentialBuilder
import static de.hybris.platform.outboundservices.EndpointBuilder.endpointBuilder
import static de.hybris.platform.outboundservices.OAuthClientDetailsBuilder.oAuthClientDetailsBuilder

@IntegrationTest
class RestTemplateFactoryIntegrationTest extends ServicelayerSpockSpecification {

    private static final String TEST_NAME = "RestTemplateFactory"
    private static final String PASSWORD = UUID.randomUUID().toString()
    private static final String BASIC_CONSUMED_DESTINATION_ID = "${TEST_NAME}_Destination_Basic"
    private static final String BASIC_CREDENTIAL_ID = "${TEST_NAME}_BasicCredential"
    private static final String BASIC_USER_ID = 'testBasicUser'
    private static final String CONSUMED_OAUTH_CONSUMED_DESTINATION_ID = "${TEST_NAME}_Destination_Oauth"
    private static final String OAUTH_ENDPOINT = "/oauth2/api/v1/token"
    private static final String OAUTH_CLIENT_ID = "${TEST_NAME}_OAuthClientDetails"
    private static final String OAUTH_ACCESS_TOKEN = 'my-token'
    private static final String DESTINATION_TARGET_ID = "${TEST_NAME}_DestinationTarget"
    private static final String NO_AUTH_CONSUMED_DESTINATION_ID = "${TEST_NAME}_Destination"

    @Resource
    IntegrationRestTemplateFactory integrationRestTemplateFactory
    @Resource
    DestinationService<ConsumedDestinationModel> destinationService
    @Resource
    IntegrationRestTemplateCreator integrationOAuth2RestTemplateCreator
    @Resource
    IntegrationRestTemplateCreator integrationBasicRestTemplateCreator
    String oauthUrl

    @Rule
    ConsumedDestinationBuilder consumedDestinationBuilder
    @Rule
    DestinationTargetBuilder destinationTarget = DestinationTargetBuilder.destinationTarget()
            .withId(DESTINATION_TARGET_ID)
    @Rule
    WireMockRule wireMockRule = new WireMockRule(wireMockConfig()
            .dynamicHttpsPort()
            .keystorePath("resources/devcerts/platform.jks")
            .keystorePassword("123456"))

    def setup() {
        oauthUrl = "https://localhost:${wireMockRule.httpsPort()}/$OAUTH_ENDPOINT"
        def basicCredential = basicCredential BASIC_CREDENTIAL_ID, BASIC_USER_ID, PASSWORD
        consumedOauthConsumedDestination CONSUMED_OAUTH_CONSUMED_DESTINATION_ID
        basicConsumedDestination BASIC_CONSUMED_DESTINATION_ID, basicCredential
        noAuthConsumedDestination NO_AUTH_CONSUMED_DESTINATION_ID
    }

    @Test
    def "cannot create rest template with null destination"() {
        when:
        integrationRestTemplateFactory.create null

        then:
        def e = thrown IllegalArgumentException
        e.message.contains 'cannot be null'
    }

    @Test
    def "factory creates a default RestTemplate when authentication credentials are not assigned in Consumed Destination"() {
        given:
        def destination = consumedDestination NO_AUTH_CONSUMED_DESTINATION_ID

        when:
        def restOperations = integrationRestTemplateFactory.create destination

        then:
        restOperations instanceof RestTemplate
        restOperations.interceptors.size() == 1
        restOperations.interceptors[0] instanceof DefaultOutboundRequestResponseInterceptor
    }

    @Test
    def "factory creates OAuth2RestTemplate when consumed destination uses oauth credential of type ConsumedOAuthCredentialModel"() {
        given:
        oauthResponse OAUTH_ACCESS_TOKEN
        def destination = consumedDestination CONSUMED_OAUTH_CONSUMED_DESTINATION_ID

        when:
        def restOperations = integrationRestTemplateFactory.create destination

        then:
        with(restOperations) {
            with(resource) {
                clientId == OAUTH_CLIENT_ID
                clientSecret == PASSWORD
                accessTokenUri == oauthUrl
            }
            jacksonMessageConverterExists messageConverters
            interceptors.size() == 1
            accessToken.value == OAUTH_ACCESS_TOKEN
            !accessToken.isExpired()
        }
    }

    @Test
    def "oauth access token is the same for the same destination"() {
        given:
        oauthResponse OAUTH_ACCESS_TOKEN
        def destination = consumedDestination CONSUMED_OAUTH_CONSUMED_DESTINATION_ID

        when:
        def restTemplate1 = integrationRestTemplateFactory.create(destination)
        def restTemplate2 = integrationRestTemplateFactory.create(destination)

        then:
        restTemplate1.accessToken.value == OAUTH_ACCESS_TOKEN
        restTemplate2.accessToken.value == OAUTH_ACCESS_TOKEN
    }

    @Test
    def "oauth access token is different for the different destinations"() {
        given:
        oauthResponse OAUTH_ACCESS_TOKEN
        def destination = consumedDestination CONSUMED_OAUTH_CONSUMED_DESTINATION_ID

        and:
        def anotherAccessToken = "${OAUTH_ACCESS_TOKEN}_another"
        def anotherId = "${CONSUMED_OAUTH_CONSUMED_DESTINATION_ID}_another"
        def anotherDestination = consumedOauthConsumedDestination anotherId

        when:
        def restTemplate1 = integrationRestTemplateFactory.create(destination)

        and:
        oauthResponse anotherAccessToken
        def restTemplate2 = integrationRestTemplateFactory.create(anotherDestination)

        then:
        restTemplate1.accessToken.value == OAUTH_ACCESS_TOKEN
        restTemplate2.accessToken.value == anotherAccessToken
    }

    @Test
    def "cannot create oauth rest template with basic credential"() {
        given:
        def destination = consumedDestination BASIC_CONSUMED_DESTINATION_ID

        when:
        integrationOAuth2RestTemplateCreator.create destination

        then:
        thrown UnsupportedRestTemplateException
    }

    @Test
    def "factory creates RestTemplate when destination uses basic credential"() {
        given:
        def destination = consumedDestination BASIC_CONSUMED_DESTINATION_ID

        when:
        def restOperations = integrationRestTemplateFactory.create destination

        then:
        restOperations instanceof RestTemplate
        def restTemplate = (RestTemplate) restOperations
        restTemplate.interceptors.find { it instanceof BasicAuthenticationInterceptor }
        with(restTemplate) {
            jacksonMessageConverterExists messageConverters
            interceptors.size() == 2
            errorHandler instanceof DefaultResponseErrorHandler
        }
    }

    @Test
    def "basic auth credential is the same for the same destination"() {
        given:
        def destination = consumedDestination BASIC_CONSUMED_DESTINATION_ID

        when:
        def restTemplate1 = (RestTemplate) integrationRestTemplateFactory.create(destination)
        def restTemplate2 = (RestTemplate) integrationRestTemplateFactory.create(destination)

        then:
        restTemplate1.interceptors.find { it instanceof BasicAuthenticationInterceptor }
        restTemplate2.interceptors.find { it instanceof BasicAuthenticationInterceptor }
    }

    @Test
    def "basic auth credential is different for different destinations"() {
        given:
        def destination = consumedDestination BASIC_CONSUMED_DESTINATION_ID

        and:
        def anotherCredId = "${BASIC_CREDENTIAL_ID}_another"
        def anotherId = "${BASIC_CONSUMED_DESTINATION_ID}_another"
        def anotherUser = "${BASIC_USER_ID}_another"
        def anotherPassword = "${PASSWORD}_another"
        def anotherBasicCredential = basicCredential anotherCredId, anotherUser, anotherPassword
        def anotherDestination = basicConsumedDestination anotherId, anotherBasicCredential

        when:
        def restTemplate1 = (RestTemplate) integrationRestTemplateFactory.create(destination)
        def restTemplate2 = (RestTemplate) integrationRestTemplateFactory.create(anotherDestination)

        then:
        restTemplate1.interceptors.find { it instanceof BasicAuthenticationInterceptor }
        restTemplate2.interceptors.find { it instanceof BasicAuthenticationInterceptor }
    }

    @Test
    def "cannot create rest template with oauth credential"() {
        given:
        ConsumedDestinationModel destination = consumedDestination CONSUMED_OAUTH_CONSUMED_DESTINATION_ID

        when:
        integrationBasicRestTemplateCreator.create destination

        then:
        thrown UnsupportedRestTemplateException
    }

    private OAuthClientDetailsBuilder oauthClientDetails() {
        oAuthClientDetailsBuilder()
                .withClientId(OAUTH_CLIENT_ID)
                .withOAuthUrl(oauthUrl)
    }

    private static AbstractCredentialBuilder consumedOauthCredentials(OAuthClientDetailsBuilder oauthClientDetails) {
        consumedOAuthCredentialBuilder()
                .withId('consumedTestOauthCredential')
                .withClientDetails(oauthClientDetails)
                .withPassword(PASSWORD)
    }

    private static AbstractCredentialBuilder basicCredential(String id, String userName, String password) {
        basicCredentialBuilder()
                .withId(id)
                .withUsername(userName)
                .withPassword(password)
    }

    private static EndpointBuilder endpoint(String id, String specUrl) {
        endpointBuilder()
                .withId(id)
                .withVersion('unknown')
                .withName(id)
                .withSpecUrl(specUrl)
    }

    private ConsumedDestinationModel consumedOauthConsumedDestination(String id) {
        OAuthClientDetailsBuilder oauthClientDetails = oauthClientDetails()
        ConsumedOAuthCredentialBuilder oauthCredential = consumedOauthCredentials oauthClientDetails
        EndpointBuilder oauthEndpoint = endpoint 'c1203-tmn', 'https://some.url.com/http/oauthtest/specUrl'
        consumedDestinationBuilder
                .withId(id)
                .withUrl('https://some.url.com/http/oauthtest/test')
                .withEndpoint(oauthEndpoint)
                .withCredential(oauthCredential)
                .withDestinationTarget(destinationTarget)
                .build()
    }

    private ConsumedDestinationModel basicConsumedDestination(String id, BasicCredentialBuilder basicCredential) {
        EndpointBuilder basicEndpoint = endpoint 'local-hybris', 'https://localhost:9002/odata2webservices/InboundProduct/$metadata?Product'
        consumedDestinationBuilder
                .withId(id)
                .withUrl('https://localhost:9002/odata2webservices/InboundProduct/Products')
                .withEndpoint(basicEndpoint)
                .withCredential(basicCredential)
                .withDestinationTarget(destinationTarget)
                .build()
    }

    private ConsumedDestinationModel noAuthConsumedDestination(String id) {
        EndpointBuilder basicEndpoint = endpoint 'local-hybris', 'https://localhost:9002/odata2webservices/InboundProduct/$metadata?Product'
        consumedDestinationBuilder
                .withId(id)
                .withUrl('https://localhost:9002/odata2webservices/InboundProduct/Products')
                .withEndpoint(basicEndpoint)
                .withCredential(null)
                .withDestinationTarget(destinationTarget)
                .build()
    }

    private static void oauthResponse(String accessToken) {
        stubFor(post(urlEqualTo(OAUTH_ENDPOINT))
                .willReturn(okJson(oauthBody(accessToken))))
    }

    private static String oauthBody(String accessToken) {
        return "{\"access_token\": \"$accessToken\"," +
                "\"token_type\": \"Bearer\"," +
                "\"expires_in\": 86313600}"
    }

    private ConsumedDestinationModel consumedDestination(String consumedDestinationId) {
        destinationService.getDestinationByIdAndByDestinationTargetId(consumedDestinationId, DESTINATION_TARGET_ID)
    }

    private static boolean jacksonMessageConverterExists(List<HttpMessageConverter> converters) {
        converters.findIndexOf { c -> c instanceof MappingJackson2HttpMessageConverter } > -1
    }
}