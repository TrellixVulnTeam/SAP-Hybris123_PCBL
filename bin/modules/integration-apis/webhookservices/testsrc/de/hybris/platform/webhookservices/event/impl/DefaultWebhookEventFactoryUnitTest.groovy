/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
package de.hybris.platform.webhookservices.event.impl

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.tx.AfterSaveEvent
import de.hybris.platform.webhookservices.event.ItemCreatedEvent
import de.hybris.platform.webhookservices.event.ItemSavedEvent
import de.hybris.platform.webhookservices.event.ItemUpdatedEvent
import org.junit.Test
import spock.lang.Issue
import spock.lang.Specification
import spock.lang.Unroll
import de.hybris.platform.core.PK

@UnitTest
@Issue('https://cxjira.sap.com/browse/IAPI-5120')
class DefaultWebhookEventFactoryUnitTest extends Specification {

    private static final def DEFAULT_PK = PK.fromLong(4321)

    @Test
    @Unroll
    def 'expect to convert AfterSaveEvent to webhook events'(){
        given:
        def factory = new DefaultWebhookEventFactory()

        expect:
        factory.create(afterSaveEvent).containsAll(list)

        where:
        afterSaveEvent                                                                  | list
        Stub(AfterSaveEvent){ getPk()>> DEFAULT_PK; getType() >> AfterSaveEvent.CREATE} | [new ItemSavedEvent(afterSaveEvent), new ItemCreatedEvent(afterSaveEvent)]
        Stub(AfterSaveEvent){ getPk()>> DEFAULT_PK; getType() >> AfterSaveEvent.UPDATE} | [new ItemSavedEvent(afterSaveEvent), new ItemUpdatedEvent(afterSaveEvent)]
        Stub(AfterSaveEvent){ getPk()>> DEFAULT_PK; getType() >> AfterSaveEvent.REMOVE} | []
        null                                                                            | []
    }
}
