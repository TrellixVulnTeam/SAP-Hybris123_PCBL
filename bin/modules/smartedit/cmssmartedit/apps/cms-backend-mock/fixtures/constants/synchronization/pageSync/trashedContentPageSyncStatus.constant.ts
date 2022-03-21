/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ISyncStatus } from '../../../entities/synchronization';
import { bottomHeaderSlotSyncStatus } from '../slotSync/bottomHeaderSlotSyncStatus.constant';
import { footerSlotSyncStatus } from '../slotSync/footerSlotSyncStatus.constant';
import { otherSlotSyncStatus } from '../slotSync/otherSlotSyncStatus.constant';
import { topHeaderSlotSyncStatus } from '../slotSync/topHeaderSlotSyncStatus.constant';

export const trashedContentPageSyncStatus: ISyncStatus = {
    itemId: 'trashedContentPage',
    itemType: 'AbstractPage',
    name: 'trashedContentPage',
    catalogVersionUuid: 'apparel-ukContentCatalog/Staged',
    lastSyncStatus: new Date(2016, 10, 10, 13, 10, 0).getTime(),
    status: 'IN_SYNC',
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
    unavailableDependencies: []
};
