/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundservices.facade.impl

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel
import de.hybris.platform.outboundservices.client.IntegrationRestTemplateFactory
import org.junit.Test
import org.springframework.http.HttpEntity
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.client.RestOperations
import spock.lang.Specification

@UnitTest
class DefaultRemoteSystemClientUnitTest extends Specification {
    private static final def DESTINATION_URL = 'http://does.not.matter'
    private static final def SOME_ENTITY = new HttpEntity('request body - irrelevant')

    def restTemplateFactory = Stub IntegrationRestTemplateFactory
    def client = new DefaultRemoteSystemClient(restTemplateFactory)

    @Test
    def 'rest template factory is required for DefaultRemoteSystemClient'() {
        when:
        new DefaultRemoteSystemClient(null)

        then:
        def e = thrown IllegalArgumentException
        e.message == 'IntegrationRestTemplateFactory cannot be null'
    }

    @Test
    def 'uses RestOperations created by the factory to perform POST'() {
        given: 'RestOperations respond with some result to the POST call'
        def response = new ResponseEntity(HttpStatus.CREATED)
        def restOps = Stub(RestOperations) {
            postForEntity(DESTINATION_URL, SOME_ENTITY, Map) >> response
        }
        and: 'the REST template factory creates the RestOperations for a destination'
        def destination = destination(DESTINATION_URL)
        restTemplateFactory.create(destination) >> restOps

        expect: 'response that was received from the RestOperations'
        client.post(destination, SOME_ENTITY) == response
    }

    private ConsumedDestinationModel destination(String url) {
        Stub(ConsumedDestinationModel) {
            getUrl() >> url
        }
    }
}
