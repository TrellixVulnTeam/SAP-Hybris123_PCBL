/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundsync.activator.impl

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.apiregistryservices.model.ConsumedDestinationModel
import de.hybris.platform.core.PK
import de.hybris.platform.cronjob.model.CronJobModel
import de.hybris.platform.integrationservices.model.IntegrationObjectModel
import de.hybris.platform.integrationservices.service.ItemModelSearchService
import de.hybris.platform.outboundservices.enums.OutboundSource
import de.hybris.platform.outboundservices.event.impl.DefaultEventType
import de.hybris.platform.outboundservices.facade.SyncParameters
import de.hybris.platform.outboundservices.service.DeleteRequestSender
import de.hybris.platform.outboundsync.activator.OutboundItemConsumer
import de.hybris.platform.outboundsync.dto.*
import de.hybris.platform.outboundsync.events.CompletedOutboundSyncEvent
import de.hybris.platform.outboundsync.job.OutboundItemFactory
import de.hybris.platform.outboundsync.model.OutboundChannelConfigurationModel
import de.hybris.platform.servicelayer.event.EventService
import org.junit.Test
import spock.lang.Issue
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Unroll

@Issue('https://cxjira.sap.com/browse/IAPI-3466')
@UnitTest
class DefaultDeleteOutboundSyncServiceUnitTest extends Specification {

    private static final def DEL_INTEGRATION_KEY = 'deleted|item|key'
    private static final def ITEM_TYPE = 'Product'
    private static final def OUTBOUND_CHANNEL_CONFIG_PK = PK.fromLong 1L
    private static final def CRONJOB_PK = PK.fromLong 3L

    @Shared
    def outboundChannelConfig = Stub(OutboundChannelConfigurationModel) {
        getPk() >> OUTBOUND_CHANNEL_CONFIG_PK
    }

    def deleteRequestSender = Mock DeleteRequestSender
    def itemModelSearchService = Stub ItemModelSearchService
    def outboundItemConsumer = Mock OutboundItemConsumer
    def eventService = Mock EventService

    def deleteSyncService = new DefaultDeleteOutboundSyncService(
            deleteRequestSender,
            itemModelSearchService,
            eventService,
            outboundItemConsumer
    )

    def setup() {
        deleteSyncService.outboundItemFactory = Stub(OutboundItemFactory) {
            createItem({ it.type == ITEM_TYPE }) >> Stub(OutboundItem)
        }
    }

    @Test
    @Unroll
    def "delete service cannot instantiate when #param is null"() {
        when:
        new DefaultDeleteOutboundSyncService(deleteReqSender, searchSvc, eventSvc, itemConsumer)

        then:
        def e = thrown IllegalArgumentException
        e.message.contains "$param cannot be null"

        where:
        param                    | deleteReqSender           | searchSvc                    | eventSvc           | itemConsumer
        'DeleteRequestSender'    | null                      | Stub(ItemModelSearchService) | Stub(EventService) | Stub(OutboundItemConsumer)
        'ItemModelSearchService' | Stub(DeleteRequestSender) | null                         | Stub(EventService) | Stub(OutboundItemConsumer)
        'EventService'           | Stub(DeleteRequestSender) | Stub(ItemModelSearchService) | null               | Stub(OutboundItemConsumer)
        'OutboundItemConsumer'   | Stub(DeleteRequestSender) | Stub(ItemModelSearchService) | Stub(EventService) | null
    }

    @Test
    def 'delete item is not sent and is consumed when cronjob model is not found'() {
        given:
        def item = item()

        and: 'cron job is not found'
        itemModelSearchService.nonCachingFindByPk(CRONJOB_PK) >> Optional.empty()

        when:
        deleteSyncService.sync item

        then:
        0 * deleteRequestSender.send(_ as SyncParameters)
        1 * outboundItemConsumer.consume(item)
    }

    @Test
    def 'delete item is consumed after delete request is sent'() {
        given: 'deleted item'
        def deletedItem = item()

        and:
        foundCronJob()

        and: 'found outbound channel configuration'
        foundOutboundChannelConfig()

        when:
        deleteSyncService.sync deletedItem

        then:
        1 * deleteRequestSender.send(_ as SyncParameters)
        1 * outboundItemConsumer.consume(deletedItem)
    }

    @Test
    def 'delete request is sent with fully populated sync parameters'() {
        given: 'deleted item'
        def deletedItem = item()

        and:
        foundCronJob()

        and: 'found outbound channel configuration'
        def integrationObjCode = "ioCode"
        def integrationObj = Stub(IntegrationObjectModel) {
            getCode() >> integrationObjCode
        }
        def destId = "destinationId"
        def dest = Stub(ConsumedDestinationModel) {
            getId() >> destId
        }
        def outboundChannelConfig = Stub(OutboundChannelConfigurationModel) {
            getPk() >> OUTBOUND_CHANNEL_CONFIG_PK
            getIntegrationObject() >> integrationObj
            getDestination() >> dest
            getItemtype() >> ITEM_TYPE
        }
        foundOutboundChannelConfig(outboundChannelConfig)

        when:
        deleteSyncService.sync deletedItem

        then:
        1 * deleteRequestSender.send(_ as SyncParameters) >> { List args ->
            with(args[0] as SyncParameters) {
                item == null
                source == OutboundSource.OUTBOUNDSYNC
                eventType == DefaultEventType.UNKNOWN
                integrationKey == DEL_INTEGRATION_KEY
                integrationObjectCode == integrationObjCode
                destination == dest
                destinationId == destId
                integrationObject == integrationObj
            }
        }
    }

    @Test
    def 'delete item is not sent and consumed when outbound channel config is not found'() {
        given: 'deleted item'
        def deletedItem = item()

        and:
        foundCronJob()

        and: 'outbound channel config is not found'
        itemModelSearchService.nonCachingFindByPk(OUTBOUND_CHANNEL_CONFIG_PK) >> Optional.empty()

        when:
        deleteSyncService.sync deletedItem

        then:
        0 * deleteRequestSender._
        1 * outboundItemConsumer.consume(deletedItem)
    }

    @Test
    def 'successful completed event is published when delete request is sent successfully'() {
        given:
        def deletedItem = item()

        and:
        foundCronJob()
        foundOutboundChannelConfig()

        when:
        deleteSyncService.sync deletedItem

        then:
        1 * deleteRequestSender.send(_ as SyncParameters)
        1 * eventService.publishEvent(_ as CompletedOutboundSyncEvent) >> { List args ->
            with(args[0] as CompletedOutboundSyncEvent) {
                success
                changesCompleted == 1
                cronJobPk == deletedItem.cronJobPK
            }
        }
    }

    @Test
    def 'unsuccessful completed event is published when delete request encounters exception'() {
        given:
        def deletedItem = item()

        and:
        foundCronJob()
        foundOutboundChannelConfig()

        and: 'delete request sender throws exception'
        deleteRequestSender.send(_ as SyncParameters) >> { throw new RuntimeException("TEST IGNORE - delete request send failed") }

        when:
        deleteSyncService.sync deletedItem

        then:
        1 * eventService.publishEvent(_ as CompletedOutboundSyncEvent) >> { List args ->
            with(args[0] as CompletedOutboundSyncEvent) {
                !success
                changesCompleted == 1
                cronJobPk == deletedItem.cronJobPK
            }
        }
    }

    private OutboundItemDTO item(String deleteItemIntegrationKey = DEL_INTEGRATION_KEY,
                                        PK outboundChannelConfigPk = OUTBOUND_CHANNEL_CONFIG_PK,
                                        PK cronjobPk = CRONJOB_PK,
                                        String itemType = ITEM_TYPE,
                                        String rootItemType = ITEM_TYPE) {
        OutboundItemDTO.Builder.item()
                .withChannelConfigurationPK(outboundChannelConfigPk.getLong())
                .withCronJobPK(cronjobPk)
                .withSynchronizeDelete(true)
                .withItem(itemChange())
                .withInfo(new ChangeInfo(deleteItemIntegrationKey, itemType, rootItemType))
                .build()
    }

    private void foundCronJob(def cronJobPk = CRONJOB_PK) {
        def cronJob = Stub(CronJobModel) {
            getPk() >> cronJobPk
        }
        itemModelSearchService.nonCachingFindByPk(CRONJOB_PK) >> Optional.of(cronJob)
    }

    private void foundOutboundChannelConfig(def config = outboundChannelConfig) {
        itemModelSearchService.nonCachingFindByPk(config.getPk()) >> Optional.of(config)
    }

    private OutboundItemChange itemChange() {
        Stub(OutboundItemChange) {
            getChangeType() >> OutboundChangeType.DELETED
        }
    }
}
