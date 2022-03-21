/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ISlotSyncStatus } from '../../../entities/synchronization';

export const otherSlotSyncStatus: ISlotSyncStatus = {
    itemId: 'otherSlot',
    itemType: 'otherSlotContentSlot',
    name: 'otherSlot',
    lastSyncStatus: new Date().getTime(),
    status: 'IN_SYNC',
    catalogVersionUuid: 'apparel-ukContentCatalog/Staged',
    selectedDependencies: [
        {
            itemId: 'component6',
            itemType: 'ContentSlot',
            name: 'component6',
            lastSyncStatus: new Date().getTime(),
            status: 'IN_SYNC',
            catalogVersionUuid: 'apparel-ukContentCatalog/Staged'
        }
    ],
    unavailableDependencies: []
};
