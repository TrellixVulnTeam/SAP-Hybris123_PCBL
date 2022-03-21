/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ISlotSyncStatus } from '../../../entities/synchronization';

export const staticDummySlotStatus: ISlotSyncStatus = {
    itemId: 'staticDummySlot',
    itemType: 'ContentSlot',
    name: 'staticDummySlot',
    // lastSyncStatus: never synced
    status: 'NOT_SYNC',
    catalogVersionUuid: 'apparel-ukContentCatalog/Staged',
    selectedDependencies: [
        {
            itemId: 'staticDummyComponent',
            itemType: 'componentType1',
            name: 'staticDummyComponent',
            // lastSyncStatus: never synced
            status: 'NOT_SYNC',
            catalogVersionUuid: 'apparel-ukContentCatalog/Staged'
        }
    ],
    unavailableDependencies: []
};
