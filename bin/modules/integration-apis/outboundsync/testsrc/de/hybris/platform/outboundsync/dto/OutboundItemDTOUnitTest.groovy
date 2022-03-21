/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

package de.hybris.platform.outboundsync.dto

import de.hybris.bootstrap.annotations.UnitTest
import de.hybris.platform.core.PK
import de.hybris.platform.integrationservices.model.IntegrationObjectModel
import de.hybris.platform.outboundsync.model.OutboundChannelConfigurationModel
import org.junit.Test
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Unroll

@UnitTest
class OutboundItemDTOUnitTest extends Specification {

    private static final def ANOTHER_CRONJOB_PK = PK.fromLong 5L
    private static final def CHANNEL_CONFIG_PK = 2L
    private static final def INTEGRATION_OBJ_PK = 1L
    private static final def ROOT_ITEM_PK = 3L
    private static final def ROOT_ITEM_TYPE = 'Parent'
    private static final def CRONJOB_PK = PK.fromLong 4L
    private static final def INTEGRATION_KEY = 'catalog|code'
    private static final def ITEM_TYPE = 'Child'
    private static final def SYNCHRONIZE_DELETE = true

    @Shared
    def outboundItem = Stub(OutboundItemChange)

    @Unroll
    @Test
    def "create outbound item DTO with null #part throws exception"() {
        when:
        OutboundItemDTO.Builder.item()
                .withItem(item)
                .withChannelConfigurationPK(channelConfig)
                .withCronJobPK(cronjobPk)
                .build()

        then:
        thrown(IllegalArgumentException)

        where:
        part                | item         | channelConfig     | cronjobPk
        'item'              | null         | CHANNEL_CONFIG_PK | CRONJOB_PK
        'CHANNEL_CONFIG_PK' | outboundItem | null              | CRONJOB_PK
        'CRONJOB_PK'        | outboundItem | CHANNEL_CONFIG_PK | null
    }

    @Test
    def "create an outbound item"() {
        given:
        def values = defaultItemAttributes()
        def itemDTO = item defaultItemAttributes()

        expect:
        with(itemDTO) {
            getItem() == values.item
            getChannelConfigurationPK() == values.channelPk
            getIntegrationObjectPK() == values.ioPk
            getRootItemPK() == values.rootItemPk
            getCronJobPK() == values.jobPk
            getRootItemType() == values.rootItemType
            getItemType() == values.itemType
            getIntegrationKey() == values.integrationKey
            isSynchronizeDelete() == values.syncDelete
        }
    }

    @Test
    def 'creating an outbound item fails when a change item is not provided'() {
        when:
        def nullChangedItem = null
        item(item: nullChangedItem)

        then:
        def e = thrown IllegalArgumentException
        e.message.contains 'item cannot be null'
    }

    @Test
    def "create an outbound item from another outbound item"() {
        given:
        def originalItem = defaultItem()

        when:
        def createdItem = OutboundItemDTO.Builder.from(originalItem).build()

        then:
        with(createdItem) {
            getItem() == outboundItem
            getChannelConfigurationPK() == originalItem.channelConfigurationPK
            getIntegrationObjectPK() == originalItem.integrationObjectPK
            getRootItemPK() == originalItem.rootItemPK
            getRootItemType() == originalItem.rootItemType
            getCronJobPK() == originalItem.cronJobPK
            getIntegrationKey() == originalItem.integrationKey
            getItemType() == originalItem.itemType
            isSynchronizeDelete() == originalItem.synchronizeDelete
        }
    }

    @Test
    def 'populates integration object PK when created with an integration object model'() {
        given: 'an integration object model'
        def io = Stub(IntegrationObjectModel) {
            getPk() >> PK.fromLong(INTEGRATION_OBJ_PK)
        }

        when: 'the DTO is built using the integration object model'
        def itemDTO = OutboundItemDTO.Builder.item()
                .withItem(outboundItem)
                .withChannelConfigurationPK(CHANNEL_CONFIG_PK)
                .withCronJobPK(CRONJOB_PK)
                .withIntegrationObject(io)
                .build()

        then: 'the integration object PK is populated in the DTO'
        itemDTO?.integrationObjectPK == INTEGRATION_OBJ_PK
    }

    @Test
    def 'populates integration object PK, channel PK and synchronizeDelete flag when created with an outbound channel configuration model'() {
        given: 'an outbound channel configuration model'
        def channel = Stub(OutboundChannelConfigurationModel) {
            getPk() >> PK.fromLong(CHANNEL_CONFIG_PK)
            getIntegrationObject() >> Stub(IntegrationObjectModel) {
                getPk() >> PK.fromLong(INTEGRATION_OBJ_PK)
            }
            getSynchronizeDelete() >> SYNCHRONIZE_DELETE
        }

        when: 'the DTO is built using the outbound channel model'
        def itemDTO = OutboundItemDTO.Builder.item()
                .withChannelConfiguration(channel)
                .withCronJobPK(CRONJOB_PK)
                .withItem(outboundItem)
                .build()

        then: 'the channel configuration PK is populated in the DTO'
        itemDTO?.channelConfigurationPK == CHANNEL_CONFIG_PK
        and: 'integration object PK is populated'
        itemDTO?.integrationObjectPK == INTEGRATION_OBJ_PK
        and: 'synchronizeDelete is populated'
        itemDTO?.synchronizeDelete == SYNCHRONIZE_DELETE
    }

    @Test
    @Unroll
    def "overwrites integration key, item type and root item type from the provided info: '#info'"() {
        given: 'item is created with the info'
        def item = defaultItem(info: info)

        expect: 'created item contains expected values'
        item.integrationKey == key
        item.itemType == type
        item.rootItemType == rootType

        where:
        info                             | key   | type | rootType
        new ChangeInfo(null, null, null) | null  | null | null
        new ChangeInfo('A|B', 'C', 'D')  | 'A|B' | 'C'  | 'D'
        new ChangeInfo('', '', '')       | ''    | ''   | ''
    }

    @Test
    def "two outbound items are equal"() {
        given:
        def item1 = defaultItem()
        def item2 = defaultItem()

        expect:
        item1 == item1
        item1 == item2
    }

    @Test
    @Unroll
    def "two outbound items are not equal when #condition"() {
        given:
        def item1 = defaultItem()

        expect:
        item1 != item2

        where:
        condition                        | item2
        "item is different"              | defaultItem(item: Stub(OutboundItemChange))
        "channel pk is different"        | defaultItem(channelPk: -CHANNEL_CONFIG_PK)
        "intObj pk is different"         | defaultItem(ioPk: -INTEGRATION_OBJ_PK)
        "root pk is different"           | defaultItem(rootItemPk: -ROOT_ITEM_PK)
        "root type is different"         | defaultItem(rootItemType: ROOT_ITEM_TYPE.reverse())
        "cronJob pk is different"        | defaultItem(jobPk: ANOTHER_CRONJOB_PK)
        "integrationKey is different"    | defaultItem(integrationKey: 'anotherIntegrationKey')
        "item type is different"         | defaultItem(itemType: ITEM_TYPE.reverse())
        "synchronizeDelete is different" | defaultItem(syncDelete: !SYNCHRONIZE_DELETE)
        "type is different"              | 1
        "item2 is null"                  | null
    }

    @Test
    def "two outbound items have the same hashcode"() {
        given:
        def item1 = defaultItem()
        def item2 = defaultItem()

        expect:
        item1.hashCode() == item2.hashCode()
    }

    @Test
    @Unroll
    def "two outbound items have different hashcode when #condition is different"() {
        given:
        def item1 = defaultItem()

        expect:
        item1.hashCode() != item2.hashCode()

        where:
        condition           | item2
        "item"              | defaultItem(item: Stub(OutboundItemChange))
        "channel pk"        | defaultItem(channelPk: -1 * CHANNEL_CONFIG_PK)
        "intObj pk"         | defaultItem(ioPk: -INTEGRATION_OBJ_PK)
        "root pk"           | defaultItem(rootItemPk: -ROOT_ITEM_PK)
        "root type"         | defaultItem(rootItemType: ROOT_ITEM_TYPE.reverse())
        "cronJob pk"        | defaultItem(jobPk: ANOTHER_CRONJOB_PK)
        "integration key"   | defaultItem(integrationKey: 'anotherIntegrationKey')
        "item type"         | defaultItem(itemType: ITEM_TYPE.reverse())
        "synchronizeDelete" | defaultItem(syncDelete: !SYNCHRONIZE_DELETE)
        "type"              | 1
    }

    @Test
    @Unroll
    def "isDelete() is #res when change is #changeType"() {
        given:
        def change = Stub(OutboundItemChange) {
            getChangeType() >> changeType
        }

        expect:
        defaultItem(item: change).deleted == res

        where:
        changeType                  | res
        OutboundChangeType.CREATED  | false
        OutboundChangeType.DELETED  | true
        OutboundChangeType.MODIFIED | false
    }

    OutboundItemDTO defaultItem(Map customValues = [:]) {
        def itemProperties = defaultItemAttributes()
        itemProperties.putAll customValues
        item itemProperties
    }

    OutboundItemDTO item(Map attrs) {
        OutboundItemDTO.Builder.item()
                .withItem(attrs.item as OutboundItemChange)
                .withChannelConfigurationPK(attrs.channelPk as Long)
                .withIntegrationObjectPK(attrs.ioPk as Long)
                .withRootItemPK(attrs.rootItemPk as Long)
                .withCronJobPK(attrs.jobPk as PK)
                .withSynchronizeDelete(attrs.syncDelete as boolean)
                .withInfo(attrs.info as ChangeInfo ?: changeInfo(attrs))
                .build()
    }

    Map defaultItemAttributes() {
        [
                integrationKey: INTEGRATION_KEY,
                syncDelete    : SYNCHRONIZE_DELETE,
                jobPk         : CRONJOB_PK,
                rootItemPk    : ROOT_ITEM_PK,
                rootItemType  : ROOT_ITEM_TYPE,
                ioPk          : INTEGRATION_OBJ_PK,
                channelPk     : CHANNEL_CONFIG_PK,
                itemType      : ITEM_TYPE,
                item          : outboundItem
        ]
    }

    ChangeInfo changeInfo(Map attrs) {
        new ChangeInfo(attrs.integrationKey as String, attrs.itemType as String, attrs.rootItemType as String)
    }
}
