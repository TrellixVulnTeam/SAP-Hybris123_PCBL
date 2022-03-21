/*
 *  Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.odata2webservicesfeaturetests

import de.hybris.bootstrap.annotations.IntegrationTest
import de.hybris.platform.integrationservices.model.InboundChannelConfigurationModel
import de.hybris.platform.integrationservices.model.IntegrationObjectModel
import de.hybris.platform.integrationservices.util.IntegrationTestUtil
import de.hybris.platform.integrationservices.util.JsonObject
import de.hybris.platform.odata2webservices.odata.ODataFacade
import de.hybris.platform.odata2webservices.odata.builders.ODataRequestBuilder
import de.hybris.platform.odata2webservices.odata.builders.PathInfoBuilder
import de.hybris.platform.outboundservices.model.OutboundRequestModel
import de.hybris.platform.outboundservices.util.OutboundServicesEssentialData
import de.hybris.platform.servicelayer.ServicelayerSpockSpecification
import org.apache.olingo.odata2.api.commons.HttpStatusCodes
import org.apache.olingo.odata2.api.processor.ODataContext
import org.apache.olingo.odata2.api.processor.ODataResponse
import org.junit.ClassRule
import org.junit.Test
import spock.lang.Shared
import spock.lang.Unroll

import javax.annotation.Resource

import static de.hybris.platform.odata2webservices.odata.ODataFacadeTestUtils.createContext

@IntegrationTest
class OutboundIntegrationMonitoringIntegrationTest extends ServicelayerSpockSpecification {
    private static final String TEST_NAME = 'OutboundIntegrationMonitoring'
    private static final String IO_CODE = TEST_NAME
    private static final String DESTINATION = "${TEST_NAME}_scpi"

    @Shared
    @ClassRule
    OutboundServicesEssentialData essentialData = OutboundServicesEssentialData.outboundServicesEssentialData()

    @Resource(name = "oDataWebMonitoringFacade")
    private ODataFacade facade

    def setupSpec() {
        IntegrationTestUtil.importImpEx(
                'INSERT OutboundRequest; destination; status(code); type   ; integrationKey; messageId; sapPassport; error',
                "                      ; $DESTINATION       ; ERROR       ; Order  ; test-500      ; 123      ; UK123      ; something went wrong",

                'INSERT OutboundRequest; destination; status(code); type   ; integrationKey; messageId; sapPassport; source(code)',
                "                      ; $DESTINATION       ; SUCCESS     ; Catalog; test-200      ; 321      ; US123      ; WEBHOOKSERVICES"
        )
    }

    def cleanupSpec() {
        IntegrationTestUtil.removeAll OutboundRequestModel
        IntegrationTestUtil.remove InboundChannelConfigurationModel, {it?.integrationObject?.code == IO_CODE}
        IntegrationTestUtil.remove IntegrationObjectModel, { it.code == IO_CODE }
    }

    @Test
    @Unroll
    def "can GET /OutboundIntegrationMonitoring/#feed"() {
        when:
        def response = facade.handleRequest request(feed)

        then:
        response.getStatus() == HttpStatusCodes.OK
        def json = asJson response
        def content = json.getCollectionOfObjects path
        content.size() == result.size()
        content.containsAll result

        where:
        feed                         | path                | result
        ''                           | 'd.EntitySets'      | ['OutboundRequests', 'IntegrationRequestStatuses', 'OutboundSources', 'HttpMethods']
        'IntegrationRequestStatuses' | 'd.results[*].code' | ['SUCCESS', 'ERROR']
        'OutboundRequests'           | 'd.results[*].type' | ['Order', 'Catalog']
        'OutboundSources'            | 'd.results[*].code' | ['UNKNOWN', 'OUTBOUNDSYNC', 'WEBHOOKSERVICES']
        'HttpMethods'                | 'd.results[*].code' | ['POST', 'DELETE', 'PATCH']
    }

    @Test
    def "can GET /OutboundIntegrationMonitoring/IntegrationRequestStatuses('key')"() {
        when:
        def response = facade.handleRequest request('IntegrationRequestStatuses', 'SUCCESS')

        then:
        response.getStatus() == HttpStatusCodes.OK
        asJson(response).getString('d.code') == 'SUCCESS'
    }

    @Test
    @Unroll
    def "can GET /OutboundIntegrationMonitoring/OutboundRequests('#key')"() {
        when:
        def response = facade.handleRequest request('OutboundRequests', key, ['$expand': 'source'])

        then:
        response.getStatus() == HttpStatusCodes.OK
        def entity = asJson(response)
        entity.exists('d.status.__deferred')
        entity.getString('d.destination') == destination
        entity.getString('d.type') == type
        entity.getString('d.requestIntegrationKey').contains requestKey
        entity.getString('d.messageId') == msgId
        entity.getString('d.sapPassport') == passport
        entity.getString('d.error') == error
        entity.getString('d.source.code') == source

        where:
        key     | destination    | type      | requestKey | msgId | passport | error                  | source
        'UK123' | "$DESTINATION" | 'Order'   | 'test-500' | '123' | 'UK123'  | 'something went wrong' | 'UNKNOWN'
        'US123' | "$DESTINATION" | 'Catalog' | 'test-200' | '321' | 'US123'  | null                   | 'WEBHOOKSERVICES'
    }

    ODataContext request(String entitySet) {
        createContext ODataRequestBuilder.oDataGetRequest()
                .withAccepts('application/json')
                .withPathInfo(PathInfoBuilder.pathInfo()
                        .withServiceName(TEST_NAME)
                        .withEntitySet(entitySet))
    }

    ODataContext request(String entitySet, String key, Map queryParams = [:]) {
        createContext ODataRequestBuilder.oDataGetRequest()
                .withAccepts('application/json')
                .withPathInfo(PathInfoBuilder.pathInfo()
                        .withServiceName(TEST_NAME)
                        .withEntitySet(entitySet)
                        .withEntityKeys(key))
                .withParameters(queryParams)
    }

    JsonObject asJson(ODataResponse response) {
        JsonObject.createFrom response.getEntityAsStream()
    }
}
