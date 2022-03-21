/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.odata2webservicesfeaturetests

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.apiregistryservices.model.BasicCredentialModel
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel
import de.hybris.platform.apiregistryservices.model.ConsumedOAuthCredentialModel
import de.hybris.platform.apiregistryservices.model.DestinationTargetModel
import de.hybris.platform.apiregistryservices.model.EndpointModel
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.JsonBuilder
import de.hybris.platform.integrationservices.util.JsonObject
import de.hybris.platform.odata2services.odata.ODataContextGenerator
import de.hybris.platform.odata2webservices.odata.IntegrationODataResponse
import de.hybris.platform.odata2webservices.odata.ODataFacade
import de.hybris.platform.odata2webservices.odata.ODataFacadeTestUtils
import de.hybris.platform.odata2webservices.odata.builders.ODataRequestBuilder
import de.hybris.platform.odata2webservices.odata.builders.PathInfoBuilder
import de.hybris.platform.outboundsync.model.OutboundChannelConfigurationModel
import de.hybris.platform.outboundsync.model.OutboundSyncCronJobModel
import de.hybris.platform.outboundsync.model.OutboundSyncJobModel
import de.hybris.platform.outboundsync.model.OutboundSyncStreamConfigurationContainerModel
import de.hybris.platform.outboundsync.model.OutboundSyncStreamConfigurationModel
import de.hybris.platform.outboundsync.util.OutboundSyncEssentialData
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import de.hybris.platform.servicelayer.session.SessionService
import org.apache.olingo.odata2.api.commons.HttpStatusCodes
import org.apache.olingo.odata2.api.processor.ODataContext
import org.junit.ClassRule
import org.junit.Test
import spock.lang.Shared

import javax.annotation.Resource

import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.findAll
import static de.hybris.platform.integrationservices.util.IntegrationTestUtil.findAny
import static de.hybris.platform.integrationservices.util.JsonBuilder.json
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE

@IntegrationTest
class OutboundChannelConfigIntegrationTest extends ServicelayerSpockSpecification {
    private static final String SERVICE_NAME = "OutboundChannelConfig"
    private static final String DESTINATION_TARGET_ID = "${SERVICE_NAME}_ConsumedDestinationTest"
    private static final String ENDPOINT = "${SERVICE_NAME}_Endpoint"
    private static def originalLocale

    @Shared
    @ClassRule
    OutboundSyncEssentialData essentialData = OutboundSyncEssentialData.outboundSyncEssentialData()

    @Resource(name = 'oDataContextGenerator')
    private ODataContextGenerator contextGenerator
    @Resource(name = "defaultODataFacade")
    private ODataFacade facade
    @Resource(name = 'sessionService')
    private SessionService sessionService

    def setup() {
        originalLocale = sessionService.getAttribute('locale')
        sessionService.setAttribute('locale', Locale.GERMAN)
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Language; isocode[unique=true]; active',
                "                             ; de                  ; false"
        )
    }

    def cleanup() {
        IntegrationTestUtil.removeAll OutboundChannelConfigurationModel
        IntegrationTestUtil.removeAll OutboundSyncStreamConfigurationContainerModel
        IntegrationTestUtil.removeAll OutboundSyncStreamConfigurationModel
        IntegrationTestUtil.removeAll OutboundSyncJobModel
        IntegrationTestUtil.removeAll OutboundSyncCronJobModel
        IntegrationTestUtil.removeAll ConsumedDestinationModel
        IntegrationTestUtil.removeAll EndpointModel
        IntegrationTestUtil.removeAll DestinationTargetModel
        IntegrationTestUtil.removeAll BasicCredentialModel
        IntegrationTestUtil.removeAll ConsumedOAuthCredentialModel
        sessionService.setAttribute('locale', originalLocale)
        IntegrationTestUtil.importImpEx(
                'REMOVE Language; isocode[unique=true]',
                "                      ; de                  "
        )
    }

    @Test
    def "Get objects from OutboundSyncStreamConfiguration"() {
        given: "a ConsumedDestination, Channel, Stream Container and Stream"
        def consumedDestinationId = "${SERVICE_NAME}_Destination"
        def destinationTargetId = "${SERVICE_NAME}_DestinationTarget"
        def streamContainerId = "${SERVICE_NAME}_StreamContainer"
        def streamId = "${SERVICE_NAME}_Stream"
        def endpointVersion = 'unknown'
        def basicCredentialId = "${SERVICE_NAME}_BasicCred"
        def channelCode = "${SERVICE_NAME}_ChannelCode"
        def IO = "${SERVICE_NAME}_OutboundProductIO"

        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Endpoint; id[unique = true]   ; version[unique = true] ; name         ; specUrl',
                "                      ; $ENDPOINT         ; $endpointVersion       ; local-hybris ; https://localhost:9002",
                'INSERT_UPDATE DestinationTarget; id[unique = true]',
                "                               ; $destinationTargetId",
                'INSERT_UPDATE BasicCredential; id[unique = true]   ; username; password',
                "                             ; $basicCredentialId  ; aaa     ; bbb",
                'INSERT_UPDATE ConsumedDestination; id[unique = true]             ; url                    ; endpoint(id, version)       ; credential(id)     ; destinationTarget(id)',
                "                                 ; $consumedDestinationId        ; https://localhost:9002 ; $ENDPOINT:$endpointVersion; $basicCredentialId ; $destinationTargetId",
                'INSERT_UPDATE IntegrationObject; code[unique = true]; integrationType(code)',
                "                                                    ; $IO; INBOUND",
                'INSERT_UPDATE OutboundChannelConfiguration; code[unique = true] ; integrationObject(code); destination(id)',
                "                                          ; $channelCode        ; $IO        ; $consumedDestinationId",
                'INSERT_UPDATE OutboundSyncStreamConfigurationContainer; id[unique = true]',
                "                                                      ; $streamContainerId",
                'INSERT_UPDATE OutboundSyncStreamConfiguration; streamId[unique = true]; container(id)                ; itemTypeForStream(code); outboundChannelConfiguration(code); whereClause',
                "                                             ; $streamId              ; $streamContainerId           ; Product                ; $channelCode"
        )

        def context = oDataGetContext "OutboundSyncStreamConfigurations",
                ['$expand':
                         '''
                            outboundChannelConfiguration, 
                            container, 
                            outboundChannelConfiguration/destination, 
                            outboundChannelConfiguration/destination/destinationTarget, 
                            outboundChannelConfiguration/destination/endpoint, 
                            outboundChannelConfiguration/destination/credentialBasic
                        '''
                ]

        when:
        def response = facade.handleRequest context
        def getBody = extractBody(response as IntegrationODataResponse)

        then:
        getBody.getCollectionOfObjects("d.results").size() == 1
        getBody.getString('d.results[0].streamId') == streamId
        getBody.getString('d.results[0].outboundChannelConfiguration.code') == channelCode
        getBody.getString('d.results[0].outboundChannelConfiguration.destination.destinationTarget.id') == destinationTargetId
        getBody.getString('d.results[0].outboundChannelConfiguration.destination.endpoint.id') == ENDPOINT
        getBody.getString('d.results[0].outboundChannelConfiguration.destination.endpoint.version') == endpointVersion
        getBody.getString('d.results[0].outboundChannelConfiguration.destination.id') == consumedDestinationId
        getBody.getString('d.results[0].outboundChannelConfiguration.destination.credentialBasic.id') == basicCredentialId
        getBody.getString('d.results[0].container.id') == streamContainerId
    }

    @Test
    def "Create ConsumedDestination and auto generate multiple streams with single POST to OutboundChannelConfigurations"() {
        given:
        def integrationObjectCode = "${SERVICE_NAME}_MultiStreamIO"
        and: 'An IntegrationObject exists with 2 Items that have paths back to the root Item'
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE IntegrationObject; code[unique = true]    ; integrationType(code)',
                "                               ; $integrationObjectCode ; INBOUND",
                'INSERT_UPDATE IntegrationObjectItem; integrationObject(code)[unique = true]; code[unique = true]; type(code)    ; root',
                "                                   ; $integrationObjectCode                ; Category           ; Category      ; true",
                "                                   ; $integrationObjectCode                ; CatalogVersion     ; CatalogVersion; false",
                ' INSERT_UPDATE IntegrationObjectItemAttribute; integrationObjectItem(integrationObject(code), code)[unique = true]; attributeName[unique = true]; attributeDescriptor(enclosingType(code), qualifier); returnIntegrationObjectItem(integrationObject(code), code)',
                "                                             ; $integrationObjectCode:CatalogVersion                              ; rootCategories              ; CatalogVersion:rootCategories                      ; $integrationObjectCode:Category",
                "                                             ; $integrationObjectCode:CatalogVersion                              ; version                     ; CatalogVersion:version                             ;",
                "                                             ; $integrationObjectCode:Category                                    ; code                        ; Category:code                                      ;")

        and: 'a channel configuration payload with autogenerate = true'
        def consumedDestinationId = "${SERVICE_NAME}_Destination"
        def channelId = "${SERVICE_NAME}_Channel"
        def apiOAuthCredential = "${SERVICE_NAME}_OAuthCred"
        def apiBasicCredential = "${SERVICE_NAME}_BasicCred"
        def targetID = "${SERVICE_NAME}_Target"
        def channelConfigurationPayload = json()
                .withField('code', channelId)
                .withField('integrationObject', json()
                        .withField('code', integrationObjectCode))
                .withField('destination', json()
                        .withId(consumedDestinationId)
                        .withField('url', "https://localhost:9002/odata2webservices/OutboundProduct/Products")
                        .withField('endpoint', json()
                                .withId(ENDPOINT)
                                .withField('name', ENDPOINT)
                                .withField('specUrl', 'specURL')
                                .withField('version', 'endpointVersion'))
                        .withField('destinationTarget', json()
                                .withId(targetID))
                        .withField('credentialConsumedOAuth', json()
                                .withId(apiOAuthCredential)
                                .withField('clientId', 'foo')
                                .withField('clientSecret', 'bar'))
                        .withField('credentialBasic', json()
                                .withId(apiBasicCredential)
                                .withField('username', 'foo')
                                .withField('password', 'bar'))
                        .withFieldValues('additionalProperties', mapEntry('cat', 'Tom'), mapEntry('mouse', 'Jerry')))
                .withField('autoGenerate', true)
                .build()

        when: 'the payload is posted'
        facade.handleRequest oDataPostContext("OutboundChannelConfigurations", channelConfigurationPayload)

        then: 'We expect the following models to exist'
        findAny(OutboundChannelConfigurationModel, { it.code == channelId }).present
        findAny(OutboundSyncStreamConfigurationContainerModel, { it.id.contains(channelId) }).present
        findAll(OutboundSyncStreamConfigurationModel, { it.streamId.contains(channelId) }).size() == 2
        findAny(OutboundSyncJobModel, { it.code.contains(channelId) }).present
        findAny(OutboundSyncCronJobModel, { it.code.contains(channelId) }).present
        findAny(BasicCredentialModel, { it.id == apiBasicCredential }).present
        findAny(ConsumedOAuthCredentialModel, { it.id == apiOAuthCredential }).present
        findAny(ConsumedDestinationModel, { it.id == consumedDestinationId }).present
        findAny(EndpointModel, { it.id == ENDPOINT }).present
        findAny(DestinationTargetModel, { it.id == targetID }).present
    }

    @Test
    def "auto generate OutboundSyncCronJobModel when creating an OutboundChannelConfiguration with autoGenerate = true"() {
        given:
        def integrationObjectCode = "${SERVICE_NAME}_IO"
        def consumedDestinationId = "${SERVICE_NAME}_Destination"
        def channelId = "${SERVICE_NAME}_Channel"
        and: 'Integration object is created'
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE IntegrationObject; code[unique = true]',
                "                               ; $integrationObjectCode")
        and: 'Consumed destination is created'
        createConsumedDestination(consumedDestinationId)
        when: 'Outbound channel configuration is are created with autoGenerate = true'
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE OutboundChannelConfiguration; code[unique = true]; integrationObject(code); destination(id, destinationTarget(id))        ; autoGenerate',
                "                                          ; $channelId         ; $integrationObjectCode ; $consumedDestinationId:$DESTINATION_TARGET_ID ; true")


        then:
        findAny(OutboundSyncCronJobModel, { it.sessionLanguage.getIsocode() == ('de') && it.code.contains(channelId) }).present
    }

    @Test
    def 'Patch OutboundSyncStreamConfiguration and nested objects'() {
        given:
        def consumedDestinationId = "${SERVICE_NAME}_Destination"
        def destinationTargetId = "${SERVICE_NAME}_DestinationTarget"
        def streamContainerId = "${SERVICE_NAME}_StreamContainer"
        def streamId = "${SERVICE_NAME}_Stream"
        def endpointVersion = 'unknown'
        def basicCredentialId = "${SERVICE_NAME}_BasicCred"
        def channelCode = "${SERVICE_NAME}_ChannelCode"
        def IO = "${SERVICE_NAME}_OutboundProductIO"

        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Endpoint; id[unique = true]   ; version[unique = true] ; name         ; specUrl',
                "                      ; $ENDPOINT         ; $endpointVersion       ; local-hybris ; https://localhost:9002",
                'INSERT_UPDATE DestinationTarget; id[unique = true]',
                "                               ; $destinationTargetId",
                'INSERT_UPDATE BasicCredential; id[unique = true]   ; username; password',
                "                             ; $basicCredentialId  ; aaa     ; bbb",
                'INSERT_UPDATE ConsumedDestination; id[unique = true]             ; url                    ; endpoint(id, version)       ; credential(id)     ; destinationTarget(id)',
                "                                 ; $consumedDestinationId        ; https://localhost:9002 ; $ENDPOINT:$endpointVersion; $basicCredentialId ; $destinationTargetId",
                'INSERT_UPDATE IntegrationObject; code[unique = true]; integrationType(code)',
                "                                                    ; $IO; INBOUND",
                'INSERT_UPDATE OutboundChannelConfiguration; code[unique = true] ; integrationObject(code); destination(id)',
                "                                          ; $channelCode        ; $IO        ; $consumedDestinationId",
                'INSERT_UPDATE OutboundSyncStreamConfigurationContainer; id[unique = true]',
                "                                                      ; $streamContainerId",
                'INSERT_UPDATE OutboundSyncStreamConfiguration; streamId[unique = true]; container(id)                ; itemTypeForStream(code); outboundChannelConfiguration(code); whereClause',
                "                                             ; $streamId              ; $streamContainerId           ; Product                ; $channelCode"
        )

        and: 'the URL and itemTypeForStream is updated with patch'
        def newUrl = 'https://differentLocalHost'
        def newItemTypeCode = 'Catalog'
        def content = json()
                .withField('itemTypeForStream', json()
                        .withCode('Catalog'))
                .withField('outboundChannelConfiguration', json()
                        .withCode(channelCode)
                        .withField('destination', json()
                                .withId(consumedDestinationId)
                                .withField('url', newUrl)
                                .withField('destinationTarget', json()
                                        .withId(destinationTargetId)
                                )
                        )
                )
        when:
        def response = facade.handleRequest patch(SERVICE_NAME,'OutboundSyncStreamConfigurations',streamId, content)

        then: 'the response is successful'
        response.status == HttpStatusCodes.OK
        and: 'the stream exists with its updated fields'
        findAny(OutboundSyncStreamConfigurationModel, { it.streamId == streamId })
                .filter({ it.outboundChannelConfiguration.destination.url == newUrl })
                .filter({ it.itemTypeForStream.code == newItemTypeCode })
                .present
    }

    @Test
    def "Get trigger through outboundsync cronjob"() {
        given:
        def integrationObjectCode = "${SERVICE_NAME}_IO"
        def consumedDestinationId = "${SERVICE_NAME}_Destination"
        def channelId = "${SERVICE_NAME}_Channel"
        and: 'Integration object is created'
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE IntegrationObject; code[unique = true]    ; integrationType(code)',
                "                               ; $integrationObjectCode ; INBOUND")
        and: 'Consumed destination is created'
        createConsumedDestination(consumedDestinationId)
        and: 'Outbound channel configuration and other required components are created'
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE OutboundChannelConfiguration; code[unique = true]; integrationObject(code); destination(id, destinationTarget(id))        ; autoGenerate',
                "                                          ; $channelId         ; $integrationObjectCode ; $consumedDestinationId:$DESTINATION_TARGET_ID ; true")
        and: 'Trigger is created'
        String cronJobCode = "${channelId}CronJob"
        String cronExpression = "0 0 0 * * ?"
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Trigger; cronJob(code)[unique = true]; cronExpression;',
                "                     ; $cronJobCode                ; $cronExpression")

        when:
        def response = facade.handleRequest oDataGetContext("OutboundSyncCronJobs", ['$expand': 'triggers/cronJob'])

        then: 'Response body contains triggers via the OutboundSynCronJob'
        def getBody = extractBody(response as IntegrationODataResponse)
        getBody.getCollectionOfObjects('d.results[*].triggers.results[*].cronJob.code').containsAll(cronJobCode)
        getBody.getCollectionOfObjects('d.results[*].triggers.results[*].cronExpression').containsAll(cronExpression)
    }

    @Test
    def "Get all ConsumedDestinations returns ConsumedDestinations with both basic and oauth credentials"() {
        given: '2 ConsumedDestinations exist with different ids'
        def destinationTargetId = "${SERVICE_NAME}_DestinationTarget"
        def oAuthCredential = "${SERVICE_NAME}_OAuthCred"
        def basicCredential = "${SERVICE_NAME}_BasicCred"
        def basicConsumedDestinationId = "BasicCredential-ConsumedDestination"
        def oAuthConsumedDestinationId = "ConsumedOAuthCredential-ConsumedDestination"
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Endpoint; id[unique = true]   ; version[unique = true] ; name         ; specUrl',
                "                      ; $ENDPOINT        ; unknown                ; local-hybris ; https://localhost:9002",
                'INSERT_UPDATE DestinationTarget; id[unique = true]',
                "                               ; $destinationTargetId",
                'INSERT_UPDATE BasicCredential; id[unique = true]   ; username; password',
                "                             ; $oAuthCredential ; aaa   ; bbb",
                'INSERT_UPDATE ConsumedOAuthCredential; id[unique = true]   ; clientId; clientSecret',
                "                                     ; $basicCredential ; foo   ; bar",
                'INSERT_UPDATE ConsumedDestination; id[unique = true]             ; url                   ; endpoint(id, version); credential(id)     ; destinationTarget(id)',
                "                                 ; $basicConsumedDestinationId   ; https://localhost:9002; $ENDPOINT:unknown ; $basicCredential; $destinationTargetId",
                "                                 ; $oAuthConsumedDestinationId   ; https://localhost:9002; $ENDPOINT:unknown ; $oAuthCredential; $destinationTargetId"
        )

        def context = oDataGetContext("ConsumedDestinations")

        when:
        def response = facade.handleRequest(context)
        def getBody = extractBody(response as IntegrationODataResponse)

        then:
        getBody.getCollectionOfObjects("d.results").size() == 2
        getBody.getCollectionOfObjects('d.results[*].id').containsAll(basicConsumedDestinationId, oAuthConsumedDestinationId)
    }

    private static createConsumedDestination(final String id) {
        IntegrationTestUtil.importImpEx(
                'INSERT_UPDATE Endpoint; id[unique = true]   ; version[unique = true] ; name         ; specUrl',
                "                      ; $ENDPOINT        ; unknown                ; local-hybris ; https://localhost:9002",
                'INSERT_UPDATE DestinationTarget; id[unique = true]',
                "                               ; $DESTINATION_TARGET_ID",
                'INSERT_UPDATE BasicCredential; id[unique = true]   ; username; password',
                '                             ; testBasicCredential ; aaa     ; bbb',
                'INSERT_UPDATE ConsumedDestination; id[unique = true]             ; url                    ; endpoint(id, version); credential(id)     ; destinationTarget(id)',
                "                                 ; $id                           ; https://localhost:9002 ; $ENDPOINT:unknown ; testBasicCredential; $DESTINATION_TARGET_ID"
        )
    }

    private static JsonBuilder mapEntry(String key, String value) {
        json().withField('key', key).withField('value', value)
    }

    static ODataContext patch(String serviceName, String entitySet, String key, JsonBuilder body) {
        ODataFacadeTestUtils.createContext ODataRequestBuilder.oDataPatchRequest()
                .withPathInfo(PathInfoBuilder.pathInfo()
                        .withServiceName(serviceName)
                        .withEntitySet(entitySet)
                        .withEntityKeys(key))
                .withContentType('application/json')
                .withAccepts('application/json')
                .withBody(body)
    }

    ODataContext oDataGetContext(String entitySetName) {
        oDataGetContext(entitySetName, [:])
    }

    ODataContext oDataGetContext(String entitySetName, Map params) {
        def request = ODataRequestBuilder.oDataGetRequest()
                .withAccepts(APPLICATION_JSON_VALUE)
                .withPathInfo(PathInfoBuilder.pathInfo()
                        .withServiceName(SERVICE_NAME)
                        .withEntitySet(entitySetName))
                .withParameters(params)
                .build()
        contextGenerator.generate request
    }

    ODataContext oDataPostContext(String entitySetName, String body) {
        def request = ODataRequestBuilder.oDataPostRequest()
                .withBody(body)
                .withAccepts(APPLICATION_JSON_VALUE)
                .withContentType(APPLICATION_JSON_VALUE)
                .withPathInfo(PathInfoBuilder.pathInfo()
                        .withServiceName(SERVICE_NAME)
                        .withEntitySet(entitySetName))
                .build()
        contextGenerator.generate request
    }

    JsonObject extractBody(IntegrationODataResponse response) {
        JsonObject.createFrom response.entityAsStream
    }
}