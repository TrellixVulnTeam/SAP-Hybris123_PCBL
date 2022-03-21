package de.hybris.platform.webhookservices.service

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel
import de.hybris.platform.core.model.ItemModel
import de.hybris.platform.outboundservices.client.IntegrationRestTemplateFactory
import de.hybris.platform.outboundservices.event.impl.DefaultEventType
import de.hybris.platform.outboundservices.facade.OutboundServiceFacade
import de.hybris.platform.integrationservices.model.IntegrationObjectModel
import de.hybris.platform.webhookservices.exceptions.WebhookConfigurationValidationException
import de.hybris.platform.webhookservices.model.WebhookConfigurationModel
import de.hybris.platform.webhookservices.service.impl.DefaultCloudEventHeadersService
import de.hybris.platform.webhookservices.service.impl.DefaultWebhookValidationService
import org.junit.Test
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.client.RestClientResponseException
import org.springframework.web.client.RestOperations
import org.springframework.web.client.RestTemplate
import rx.Observable
import rx.observers.TestSubscriber
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Unroll

@UnitTest
class DefaultWebhookValidationServiceUnitTest extends Specification {

    private static final def INTEGRATION_KEY_VALUE = "TEST_KEY"
    private static final def INTEGRATION_KEY ="integrationKey"
    private static final def MSG ="msg"
    private static final def MSG_VALUE ="hello"
    private static final def PAYLOAD = "{\"$MSG\" : \"$MSG_VALUE\", \"$INTEGRATION_KEY\" : \"$INTEGRATION_KEY_VALUE\"}"
    private static final NULL_PAYLOAD = null
    private static final EMPTY_PAYLOAD = ''
    private static final ERROR_MESSAGE = 'Error message'
    private static final JSON_ERROR_BODY = '{"error": {"message": {"value": "' + ERROR_MESSAGE + '"}}}'
    private static final def CLOUD_EVENT_ID = "ce-id"
    private static final def CLOUD_EVENT_ID_VALUE = "1234-1234-efgh-5678"
    private static final def EVENT_TYPE = "ItemCreatedEvent"
    private static final def EVENT_TYPE_VALUE = "Created"
    private static final def IO_MODEL_CODE = "ioCode"
    private static final def IO_MODEL = new IntegrationObjectModel(code:IO_MODEL_CODE)
    private static final DESTINATION = new ConsumedDestinationModel(url: 'http://my.consumed.destination/some/path')
    private static final BAD_DESTINATION = new ConsumedDestinationModel(url: 'http://bad.consumed.destination/some/path')
    private static final ERR_DESTINATION = new ConsumedDestinationModel(url: 'http://err.consumed.destination/some/path')
    private static final configuration = new WebhookConfigurationModel(destination: DESTINATION)
    private static final badConfiguration = new WebhookConfigurationModel(destination: BAD_DESTINATION)
    private static final noConsumedDestinationConfiguration = new WebhookConfigurationModel(destination: null)
    private static final noIODestinationConfiguration = new WebhookConfigurationModel(destination: DESTINATION)
    private static final RESPONSE = new ResponseEntity(HttpStatus.ACCEPTED)
    private static final BAD_RESPONSE = new ResponseEntity(HttpStatus.BAD_REQUEST)
    private static final REST_EXCEPTION = new RestClientResponseException(ERROR_MESSAGE,
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            HttpStatus.INTERNAL_SERVER_ERROR.toString(),
            null,
            JSON_ERROR_BODY.getBytes(),
            null)
    private static final OBSERVABLE_RESPONSE = Observable.just(RESPONSE)
    private static final BAD_OBSERVABLE_RESPONSE = Observable.just(BAD_RESPONSE)

    @Shared
    def itemModel = Stub(ItemModel) {
        getItemtype() >> 'MyType'
    }

    def restTemplate = Mock(RestTemplate) {
        postForEntity(BAD_DESTINATION.url, _, _) >> { throw REST_EXCEPTION }
        postForEntity(ERR_DESTINATION.url, _, _) >> { throw REST_EXCEPTION }
    }

    def restTemplateFactory = Mock(IntegrationRestTemplateFactory) {
        create(_ as ConsumedDestinationModel) >> restTemplate
    }

    def outboundServiceFacade = Mock(OutboundServiceFacade) {}

    def cloudEventHeadersService = Stub(DefaultCloudEventHeadersService){
        generateCloudEventHeaders(IO_MODEL_CODE, INTEGRATION_KEY_VALUE, new DefaultEventType(EVENT_TYPE_VALUE), null) >>  new HttpHeaders([(CLOUD_EVENT_ID): CLOUD_EVENT_ID_VALUE])
    }

    def service = new DefaultWebhookValidationService(restTemplateFactory, outboundServiceFacade, cloudEventHeadersService)

    def setup(){
        configuration.setIntegrationObject(IO_MODEL)
        configuration.setEventType(EVENT_TYPE)
        badConfiguration.setIntegrationObject(IO_MODEL)
        badConfiguration.setEventType(EVENT_TYPE)
    }

    @Test
    @Unroll
    def "cannot be created with null #param"() {
        when:
        new DefaultWebhookValidationService(factory, facade, cloudService)

        then:
        def e = thrown IllegalArgumentException
        e.message == "$param cannot be null"

        where:
        param                            | factory                              | facade                      | cloudService
        'IntegrationRestTemplateFactory' | null                                 | Stub(OutboundServiceFacade) | Stub(CloudEventHeadersService)
        'OutboundServiceFacade'          | Stub(IntegrationRestTemplateFactory) | null                        | Stub(CloudEventHeadersService)
        'CloudEventHeadersService'       | Stub(IntegrationRestTemplateFactory) | Stub(OutboundServiceFacade) | null
    }

    @Test
    def "WebhookConfigurationService does not throw any Exception when webhook configuration is ok"() {
        when:
        service.pingWebhookDestination(configuration, PAYLOAD)

        then:
        noExceptionThrown()
    }

    @Test
    @Unroll
    def "pingWebhookDestination throws exception when webhook configuration is #config_status and payload is #payload_status"() {
        when:
        service.pingWebhookDestination(config, payload)

        then:
        def e = thrown exceptionType
        e.message == errorMessage

        where:
        config                              | config_status | payload       | payload_status | exceptionType                           | errorMessage
        configuration                       | 'ok'          | NULL_PAYLOAD  | 'not ok'       | IllegalArgumentException                | 'webhookPayload cannot be blank'
        configuration                       | 'ok'          | EMPTY_PAYLOAD | 'not ok'       | IllegalArgumentException                | 'webhookPayload cannot be blank'
        null                                | 'not ok'      | PAYLOAD       | 'ok'           | IllegalArgumentException                | 'webhookConfiguration cannot be null'
        badConfiguration                    | 'not ok'      | PAYLOAD       | 'ok'           | WebhookConfigurationValidationException | ERROR_MESSAGE
        noConsumedDestinationConfiguration  | 'not ok'      | PAYLOAD       | 'ok'           | IllegalArgumentException                | 'consumedDestination cannot be null'
        noIODestinationConfiguration        | 'not ok'      | PAYLOAD       | 'ok'           | IllegalArgumentException                | 'integrationObject cannot be null'
    }

    @Test
    @Unroll
    def "pingWebhookDestination sends an ItemModel and returns HTTP response #response_status when webhook configuration is #config_status"() {
        given:
        outboundServiceFacade.send(_) >> observable

        when:
        def subscriber = new TestSubscriber()
        service.pingWebhookDestination(config, model).subscribe subscriber

        then:
        subscriber.assertCompleted();
        subscriber.assertNoErrors();
        subscriber.assertValue(response)

        where:
        observable              | config           | config_status | model     | response     | response_status
        OBSERVABLE_RESPONSE     | configuration    | 'ok'          | itemModel | RESPONSE     | RESPONSE.getStatusCode()
        BAD_OBSERVABLE_RESPONSE | badConfiguration | 'bad'         | itemModel | BAD_RESPONSE | BAD_RESPONSE.getStatusCode()
    }

    @Test
    def 'CloudEvent headers is added when all data is offered'() {
        given: 'RestOperations respond with result to the POST call'
        def restOps = Mock(RestOperations)

        and:
        restTemplateFactory = Stub(IntegrationRestTemplateFactory) {
            create(configuration.destination) >> restOps
        }

        service = new DefaultWebhookValidationService(restTemplateFactory, outboundServiceFacade, cloudEventHeadersService)

        when:
        service.pingWebhookDestination(configuration, PAYLOAD)
        then:
        1 * restOps.postForEntity(_, _, Object.class) >> {List args ->
            def entity = args[1] as HttpEntity
            assert entity.headers.getFirst(CLOUD_EVENT_ID) == CLOUD_EVENT_ID_VALUE
            assert entity.headers.getFirst(HttpHeaders.CONTENT_TYPE) == MediaType.APPLICATION_JSON_VALUE
            assert entity.headers.getFirst(HttpHeaders.ACCEPT) == MediaType.APPLICATION_JSON_VALUE
        }
    }
}

