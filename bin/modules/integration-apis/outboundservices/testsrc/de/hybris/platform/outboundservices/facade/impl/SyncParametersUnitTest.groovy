/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.outboundservices.facade.impl

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel
import de.hybris.platform.core.model.ItemModel
import de.hybris.platform.integrationservices.model.IntegrationObjectModel
import de.hybris.platform.outboundservices.enums.OutboundSource
import de.hybris.platform.outboundservices.event.EventType
import de.hybris.platform.outboundservices.facade.SyncParameters
import de.hybris.platform.outboundservices.event.impl.DefaultEventType
import de.hybris.platform.outboundservices.facade.SyncParametersBuilder
import org.junit.Test
import spock.lang.Issue
import spock.lang.Specification
import spock.lang.Unroll

@UnitTest
class SyncParametersUnitTest extends Specification {
    private static final def CREATED_EVENT_TYPE = new DefaultEventType('Created')
    private static final def IO_CODE = 'TestObject'
    private static final def DESTINATION_ID = 'TestConsumedDest'
    private static final def INTEGRATION_KEY = 'key'
    private static final def INTEGRATION_MODEL = new IntegrationObjectModel(code: IO_CODE)
    private static final def ITEM = new ItemModel()
    private static final def DESTINATION_MODEL = new ConsumedDestinationModel(id: DESTINATION_ID)
    private static final def PARAMS = defaultsBuilder().build()

    @Test
    @Unroll
    def "two SyncParameters instances are equal when #condition"() {
        expect:
        PARAMS == otherBuilder.build()

        where:
        otherBuilder                                      | condition
        defaultsBuilder()                                 | 'all fields are equal'
        defaultsBuilder().withIntegrationObject(null)     | 'integration object model is not set'
        defaultsBuilder().withIntegrationObjectCode(null) | 'integration object code is not set'
        defaultsBuilder().withDestination(null)           | 'destination model is not set'
        defaultsBuilder().withDestinationId(null)         | 'destination ID is not set'
    }

    @Test
    @Unroll
    def "two SyncParameters instances are not equal when #condition"() {
        expect:
        PARAMS != (otherBuilder ? otherBuilder.build() : null)

        where:
        otherBuilder                                                                         | condition
        defaultsBuilder().withIntegrationObject(null).withIntegrationObjectCode('different') | 'integration object code is different'
        defaultsBuilder().withDestination(null).withDestinationId('different')               | 'destination ID is different'
        defaultsBuilder().withItem(null)                                                     | 'item is different'
        defaultsBuilder().withEventType(null)                                                | 'event type is different'
        defaultsBuilder().withSource(OutboundSource.WEBHOOKSERVICES)                         | 'source is different'
        defaultsBuilder().withIntegrationKey('different')                                    | 'integration key is different'
        null                                                                                 | 'the other instance is null'
    }

    @Test
    @Unroll
    def "two SyncParameters instances have same hash code when #condition"() {
        expect:
        PARAMS.hashCode() == otherBuilder.build().hashCode()

        where:
        otherBuilder                                      | condition
        defaultsBuilder()                                 | 'all fields are equal'
        defaultsBuilder().withIntegrationObject(null)     | 'integration object model is not set'
        defaultsBuilder().withIntegrationObjectCode(null) | 'integration object code is not set'
        defaultsBuilder().withDestination(null)           | 'destination model is not set'
        defaultsBuilder().withDestinationId(null)         | 'destination ID is not set'
    }

    @Test
    @Unroll
    def "two SyncParameters instances have different hash code when #condition"() {
        expect:
        PARAMS.hashCode() != otherBuilder.build().hashCode()

        where:
        otherBuilder                                                                         | condition
        defaultsBuilder().withIntegrationObject(null).withIntegrationObjectCode('different') | 'integration object code is different'
        defaultsBuilder().withDestination(null).withDestinationId('different')               | 'destination ID is different'
        defaultsBuilder().withItem(null)                                                     | 'item is different'
        defaultsBuilder().withEventType(null)                                                | 'event type is different'
        defaultsBuilder().withSource(OutboundSource.WEBHOOKSERVICES)                         | 'source is different'
        defaultsBuilder().withIntegrationKey('different')                                    | 'integration key is different'
    }

    @Test
    def 'parameters correctly built when all fields are provided to the builder'() {
        given:
        def context = SyncParameters.syncParametersBuilder()
                .withIntegrationObjectCode(IO_CODE)
                .withItem(ITEM)
                .withDestinationId(DESTINATION_ID)
                .withDestination(DESTINATION_MODEL)
                .withIntegrationObject(INTEGRATION_MODEL)
                .withSource(OutboundSource.OUTBOUNDSYNC)
                .withEventType(CREATED_EVENT_TYPE)
                .withIntegrationKey(INTEGRATION_KEY)
                .build()

        expect:
        with(context) {
            integrationObjectCode == IO_CODE
            integrationObject == INTEGRATION_MODEL
            item == ITEM
            destinationId == DESTINATION_ID
            destination == DESTINATION_MODEL
            source == OutboundSource.OUTBOUNDSYNC
            eventType == CREATED_EVENT_TYPE
            integrationKey == INTEGRATION_KEY
        }
    }

    @Test
    def 'toString() contain information about all essential attributes'() {
        given:
        def params = defaultsBuilder().build()

        expect:
        with(params.toString()) {
            contains "'${ITEM.toString()}'"
            contains "'$INTEGRATION_KEY'"
            contains "'$IO_CODE'"
            contains "'$DESTINATION_ID'"
            contains "'$OutboundSource.OUTBOUNDSYNC'"
            contains "'$CREATED_EVENT_TYPE.type'"
        }
    }

    @Test
    @Unroll
    def '#field is populated when #model is provided'() {
        expect:
        with(context) {
            integrationObjectCode == IO_CODE
            item == ITEM
            destinationId == DESTINATION_ID
            source == OutboundSource.WEBHOOKSERVICES
        }

        where:
        field                   | model                    | context
        'integrationObjectCode' | 'integrationObjectModel' | params(ITEM, null, INTEGRATION_MODEL, DESTINATION_ID, DESTINATION_MODEL, OutboundSource.WEBHOOKSERVICES)
        'destinationId'         | 'destinationModel'       | params(ITEM, IO_CODE, INTEGRATION_MODEL, null, DESTINATION_MODEL, OutboundSource.WEBHOOKSERVICES)
    }

    @Test
    def 'when both integrationObjectCode and integrationObjectModel are provided, getIntegrationObjectCode returns the code of the integrationObjectModel'() {
        given:
        def parameters = params(ITEM, "alternativeID", INTEGRATION_MODEL, DESTINATION_ID, DESTINATION_MODEL, OutboundSource.WEBHOOKSERVICES)

        expect:
        parameters.getIntegrationObjectCode() == IO_CODE
    }

    @Test
    def 'when both destinationId and destinationModel are provided, getDestinationId returns the id of the destinationModel'() {
        given:
        def parameters = params(ITEM, IO_CODE, INTEGRATION_MODEL, "alternative_destination_id", DESTINATION_MODEL, OutboundSource.WEBHOOKSERVICES)

        expect:
        parameters.getDestinationId() == DESTINATION_ID
    }

    @Test
    def 'default to UNKNOWN source when null source is not provided'() {
        given:
        def context = SyncParameters.syncParametersBuilder()
                .withIntegrationObjectCode(IO_CODE)
                .withItem(ITEM)
                .withDestinationId(DESTINATION_ID)
                .build()

        expect:
        context.source == OutboundSource.UNKNOWN
    }

    @Test
    @Unroll
    def "no exception is thrown when request is built with null #attr"() {
        expect:
        SyncParameters.syncParametersBuilder()
                .withItem(ITEM)
                .withDestination(destinationModel)
                .withDestinationId(destination)
                .withIntegrationObject(integrationModel)
                .withIntegrationObjectCode(io)
                .build()

        where:
        attr               | destination    | io      | destinationModel  | integrationModel
        'destination'      | null           | IO_CODE | DESTINATION_MODEL | INTEGRATION_MODEL
        'destinationModel' | DESTINATION_ID | IO_CODE | null              | INTEGRATION_MODEL
        'io'               | DESTINATION_ID | null    | DESTINATION_MODEL | INTEGRATION_MODEL
        'integrationModel' | DESTINATION_ID | IO_CODE | DESTINATION_MODEL | null
    }

    @Test
    def 'IllegalArgumentException is thrown when both item and integration key are null'() {
        when:
        defaultsBuilder()
                .withItem(null)
                .withIntegrationKey(null)
                .build()

        then:
        def e = thrown IllegalArgumentException
        e.message == 'At least one of item or integrationKey must be provided'
    }

    @Test
    @Unroll
    def "parameters can be built with null #attr"() {
        expect:
        defaultsBuilder()
                .withItem(item)
                .withIntegrationKey(key)
                .build()

        where:
        attr             | item | key
        'item'           | null | INTEGRATION_KEY
        'integrationKey' | ITEM | null
    }

    @Test
    def "can build a copy from another instance of parameters"() {
        given: 'pre-existing SyncParameters'
        def preExistingParameters = SyncParameters.syncParametersBuilder()
                .withItem(ITEM)
                .withDestination(DESTINATION_MODEL)
                .withDestinationId(DESTINATION_ID)
                .withIntegrationObject(INTEGRATION_MODEL)
                .withIntegrationObjectCode(IO_CODE)
                .build()

        when:
        def parameters = SyncParametersBuilder.from(preExistingParameters).build()

        then:
        parameters == preExistingParameters
        !parameters.is(preExistingParameters)
    }

    @Test
    @Issue("https://cxjira.sap.com/browse/IAPI-5212")
    def 'default to Unknown when event type is not provided'() {
        given:
        def context = SyncParameters.syncParametersBuilder()
                .withIntegrationObjectCode(IO_CODE)
                .withItem(ITEM)
                .withDestinationId(DESTINATION_ID)
                .build()

        expect:
        context.eventType == DefaultEventType.UNKNOWN
    }

    @Test
    @Issue("https://cxjira.sap.com/browse/IAPI-5212")
    def "test build with specific event type"() {
        given:
        def context = SyncParameters.syncParametersBuilder()
                .withIntegrationObjectCode(IO_CODE)
                .withItem(ITEM)
                .withDestinationId(DESTINATION_ID)
                .withEventType(CREATED_EVENT_TYPE)
                .build()

        expect:
        context.eventType == CREATED_EVENT_TYPE
    }

    private static SyncParameters params(ItemModel item, String integrationObjCode, IntegrationObjectModel integrationObjectModel, String destinationId, ConsumedDestinationModel destinationModel, OutboundSource source, EventType event = DefaultEventType.UNKNOWN) {
        return SyncParameters.syncParametersBuilder()
                .withItem(item)
                .withIntegrationObjectCode(integrationObjCode)
                .withIntegrationObject(integrationObjectModel)
                .withDestinationId(destinationId)
                .withDestination(destinationModel)
                .withSource(source)
                .withEventType(event)
                .build()
    }

    private static SyncParametersBuilder defaultsBuilder() {
        SyncParameters.syncParametersBuilder()
                .withIntegrationObjectCode(IO_CODE)
                .withItem(ITEM)
                .withDestinationId(DESTINATION_ID)
                .withDestination(DESTINATION_MODEL)
                .withIntegrationObject(INTEGRATION_MODEL)
                .withSource(OutboundSource.OUTBOUNDSYNC)
                .withEventType(CREATED_EVENT_TYPE)
                .withIntegrationKey(INTEGRATION_KEY)
    }
}