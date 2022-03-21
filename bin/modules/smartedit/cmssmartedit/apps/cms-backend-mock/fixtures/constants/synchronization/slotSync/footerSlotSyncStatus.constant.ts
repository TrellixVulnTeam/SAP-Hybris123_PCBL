/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ISlotSyncStatus } from '../../../entities/synchronization';

export const footerSlotSyncStatus: ISlotSyncStatus = {
    itemId: 'footerSlot',
    itemType: 'footerSlotContentSlot',
    name: 'footerSlot',
    lastSyncStatus: new Date().getTime(),
    status: 'NOT_SYNC',
    catalogVersionUuid: 'apparel-ukContentCatalog/Staged',
    selectedDependencies: [
        {
            itemId: 'component5',
            itemType: 'ContentSlot',
            name: 'component5',
            lastSyncStatus: new Date().getTime(),
            status: 'IN_SYNC',
            catalogVersionUuid: 'apparel-ukContentCatalog/Staged'
        }
    ],
    dependentItemTypesOutOfSync: [
        {
            type: 'Restrictions',
            i18nKey: 'some.key.for.Restrictions'
        }
    ],
    unavailableDependencies: []
};
