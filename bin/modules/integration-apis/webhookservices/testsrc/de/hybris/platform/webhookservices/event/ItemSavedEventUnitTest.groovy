/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.webhookservices.event

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.outboundservices.event.impl.DefaultEventType
import de.hybris.platform.tx.AfterSaveEvent
import org.junit.Test
import spock.lang.Issue
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Unroll
import de.hybris.platform.core.PK

@UnitTest
@Issue('https://cxjira.sap.com/browse/IAPI-5224')
class ItemSavedEventUnitTest extends Specification {

    private static final def DEFAULT_PK = PK.fromLong(4321)
    private static final def CREATED_EVENT_TYPE = new DefaultEventType('Created')
    private static final def UPDATED_EVENT_TYPE = new DefaultEventType('Updated')
    private static final def UNKNOWN_EVENT_TYPE = DefaultEventType.UNKNOWN

    @Shared
    def updateAfterSaveEvent = Stub(AfterSaveEvent) {
        getPk() >> DEFAULT_PK
        getType() >> AfterSaveEvent.UPDATE
    }

    @Shared
    def createAfterSaveEvent = Stub(AfterSaveEvent) {
        getPk() >> DEFAULT_PK
        getType() >> AfterSaveEvent.CREATE
    }

    @Shared
    def removeAfterSaveEvent = Stub(AfterSaveEvent) {
        getPk() >> DEFAULT_PK
        getType() >> AfterSaveEvent.REMOVE
    }

    @Shared
    def event = new ItemSavedEvent(createAfterSaveEvent)

    @Test
    @Unroll
    def "converts AfterSaveEvent type #afterSaveEventType.getType() to EventType #eventType.getType() type"() {
        given:
        def event = new ItemSavedEvent(afterSaveEventType);

        expect:
        eventType == event.getEventType()
        DEFAULT_PK == event.getPk()
        where:
        afterSaveEventType   | eventType
        createAfterSaveEvent | CREATED_EVENT_TYPE
        updateAfterSaveEvent | UPDATED_EVENT_TYPE
        removeAfterSaveEvent | UNKNOWN_EVENT_TYPE
    }

    @Test
    @Unroll
    def "hashcode() equal is #result when second event #description"() {
        expect:
        (event.hashCode() == event2.hashCode()) == result

        where:
        description                                  | event2                                   | result
        'same object'                                | event                                    | true
        'different object with same event type'      | new ItemSavedEvent(createAfterSaveEvent) | true
        'different object with different event type' | new ItemSavedEvent(updateAfterSaveEvent) | false
        'different object'                           | new Integer(1)                           | false
    }

    @Test
    @Unroll
    def "equals() is #result when compared to #description"() {

        expect:
        (event == event2) == result

        where:
        description                                  | event2                                   | result
        'same object'                                | event                                    | true
        'different object with same event type'      | new ItemSavedEvent(createAfterSaveEvent) | true
        'different object with different event type' | new ItemSavedEvent(updateAfterSaveEvent) | false
        'different object'                           | new Integer(1)                           | false
        'null'                                       | null                                     | false
    }
}
