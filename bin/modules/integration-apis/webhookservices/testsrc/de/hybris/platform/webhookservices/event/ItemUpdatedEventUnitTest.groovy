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
class ItemUpdatedEventUnitTest extends Specification {

    private static final def DEFAULT_PK = PK.fromLong(4321)
    private static final def DEFAULT_PK_COMPARISON = PK.fromLong(1234)
    private static final def UPDATED_EVENT_TYPE = new DefaultEventType('Updated')

    @Shared
    def updateAfterSaveEvent = Stub(AfterSaveEvent) {
        getPk() >> DEFAULT_PK
        getType() >> AfterSaveEvent.UPDATE
    }

    @Shared
    def updateAfterSaveEvent_comparison = Stub(AfterSaveEvent) {
        getPk() >> DEFAULT_PK_COMPARISON
        getType() >> AfterSaveEvent.UPDATE
    }

    @Shared
    def event = new ItemUpdatedEvent(updateAfterSaveEvent)

    @Test
    def "converts AfterSaveEvent Update type to Updated EventType"() {
        given:
        def event = new ItemUpdatedEvent(updateAfterSaveEvent);

        expect:
        UPDATED_EVENT_TYPE == event.getEventType()
        DEFAULT_PK == event.getPk()
    }

    @Test
    @Unroll
    def "hashcode() equal is #result when second event #description"() {
        expect:
        (event.hashCode() == event2.hashCode()) == result

        where:
        description                             | event2                                     | result
        'same object'                           | event                                      | true
        'different object with same event type' | new ItemUpdatedEvent(updateAfterSaveEvent) | true
        'different object'                      | new Integer(1)                             | false
    }

    @Test
    @Unroll
    def "equals() is #result when compared to #description"() {
        expect:
        (event == event2) == result

        where:
        description                             | event2                                     | result
        'same object'                           | event                                      | true
        'different object with same event type' | new ItemUpdatedEvent(updateAfterSaveEvent) | true
        'different object'                      | new Integer(1)                             | false
        'null'                                  | null                                       | false
    }
}

