/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.webhookservices.event

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.core.PK
import de.hybris.platform.outboundservices.event.impl.DefaultEventType
import de.hybris.platform.tx.AfterSaveEvent
import org.junit.Test
import spock.lang.Issue
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Unroll

@UnitTest
@Issue('https://cxjira.sap.com/browse/IAPI-5224')
class ItemCreatedEventUnitTest extends Specification {

    private static final def DEFAULT_PK = PK.fromLong(4321)
    private static final def DEFAULT_PK_COMPARISON = PK.fromLong(1234)
    private static final def CREATED_EVENT_TYPE = new DefaultEventType('Created')

    @Shared
    def createAfterSaveEvent = Stub(AfterSaveEvent) {
        getPk() >> DEFAULT_PK
        getType() >> AfterSaveEvent.CREATE
    }

    @Shared
    def createAfterSaveEvent_comparison = Stub(AfterSaveEvent) {
        getPk() >> DEFAULT_PK_COMPARISON
        getType() >> AfterSaveEvent.CREATE
    }

    @Shared
    def event = new ItemCreatedEvent(createAfterSaveEvent)

    @Test
    def "converts AfterSaveEvent Created type to Created EventType"() {
        given:
        def event = new ItemCreatedEvent(createAfterSaveEvent);

        expect:
        CREATED_EVENT_TYPE == event.getEventType()
        DEFAULT_PK == event.getPk()
    }

    @Test
    @Unroll
    def "hashcode() equal is #result when second event #description"() {
        expect:
        (event.hashCode() == event2.hashCode()) == result

        where:
        description                                  | event2                                                | result
        'same object'                                | event                                                 | true
        'different object with same event type'      | new ItemCreatedEvent(createAfterSaveEvent)            | true
        'different object with different event type' | new ItemCreatedEvent(createAfterSaveEvent_comparison) | false
        'different object'                           | new Integer(1)                                        | false
    }

    @Test
    @Unroll
    def "equals() is #result when compared to #description"() {
        expect:
        (event == event2) == result

        where:
        description                                  | event2                                                | result
        'same object'                                | event                                                 | true
        'different object with same event type'      | new ItemCreatedEvent(createAfterSaveEvent)            | true
        'different object with different event type' | new ItemCreatedEvent(createAfterSaveEvent_comparison) | false
        'different object'                           | new Integer(1)                                        | false
        'null'                                       | null                                                  | false
    }
}
