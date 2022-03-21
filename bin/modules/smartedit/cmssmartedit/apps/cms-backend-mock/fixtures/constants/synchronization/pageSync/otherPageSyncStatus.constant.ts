/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ISyncStatus } from '../../../entities/synchronization';
import { bottomHeaderSlotSyncStatus } from '../slotSync/bottomHeaderSlotSyncStatus.constant';
import { footerSlotSyncStatus } from '../slotSync/footerSlotSyncStatus.constant';
import { otherSlotSyncStatus } from '../slotSync/otherSlotSyncStatus.constant';
import { topHeaderSlotSyncStatus } from '../slotSync/topHeaderSlotSyncStatus.constant';

export const otherPageSyncStatus: ISyncStatus = {
    itemId: 'secondpage',
    itemType: 'AbstractPage',
    name: 'secondpage',
    catalogVersionUuid: 'apparel-ukContentCatalog/Staged',
    status: 'NOT_SYNC',
    dependentItemTypesOutOfSync: [
        {
            type: 'MetaData',
            i18nKey: 'some.key.for.MetaData'
        },
        {
            type: 'Restrictions',
            i18nKey: 'some.key.for.Restrictions'
        },
        {
            type: 'Slot',
            i18nKey: 'some.key.for.Slot'
        },
        {
            type: 'Component',
            i18nKey: 'some.key.for.Component'
        },
        {
            type: 'Navigation',
            i18nKey: 'some.key.for.Navigation'
        },
        {
            type: 'Customization',
            i18nKey: 'some.key.for.Customization'
        }
    ],
    selectedDependencies: [
        topHeaderSlotSyncStatus,
        bottomHeaderSlotSyncStatus,
        footerSlotSyncStatus
    ],
    sharedDependencies: [otherSlotSyncStatus],
    unavailableDependencies: [
        {
            itemId: 'secondPage',
            itemType: 'ContentPage',
            name: 'secondPage',
            status: 'NOT_SYNC',
            catalogVersionUuid: 'apparel-ukContentCatalog/Staged'
        }
    ]
};
