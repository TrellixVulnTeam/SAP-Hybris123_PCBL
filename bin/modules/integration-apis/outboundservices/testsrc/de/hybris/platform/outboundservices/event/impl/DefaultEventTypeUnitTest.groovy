package de.hybris.platform.outboundservices.event.impl

import de.hybris.bootstrap.annotations.UnitTest
import org.junit.Test
import spock.lang.Issue
import spock.lang.Specification
import spock.lang.Unroll

@UnitTest
@Issue("https://cxjira.sap.com/browse/IAPI-5212")
class DefaultEventTypeUnitTest extends Specification {

    private static final CREATED_EVENT_TYPE = new DefaultEventType('Created')

    @Test
    @Unroll
    def "hashcode() equal is #result when second event #description"() {
        expect:
        (CREATED_EVENT_TYPE.hashCode() == event2.hashCode()) == result

        where:
        description            | event2                          | result
        'same event object'    | CREATED_EVENT_TYPE              | true
        'different event type' | new DefaultEventType('Test')    | false
        'different object'     | new Integer(1)                  | false
    }

    @Test
    @Unroll
    def "equals() is #res when compared to #description"() {
        expect:
        (CREATED_EVENT_TYPE == event2) == res

        where:
        description            | event2                          | res
        'same event object'    | CREATED_EVENT_TYPE              | true
        'different event type' | new DefaultEventType('Test')    | false
        'different object'     | new Integer(1)                  | false
        'null'                 | null                            | false
    }

    @Test
    def "to string"()
    {
        expect:
        CREATED_EVENT_TYPE.toString() == "DefaultEventType{type='"+CREATED_EVENT_TYPE.getType()+"'}"
    }

    @Test
    @Unroll
    def "expect #description when creating event type with type value #eventTypeValue"() {
        expect:
        event.getType() == result

        where:
        description          | event                      | eventTypeValue | result
        'Created event type' | CREATED_EVENT_TYPE         | 'Created'      | 'Created'
        'Unknown event type' | new DefaultEventType(null) | null           | 'Unknown'
    }
}
