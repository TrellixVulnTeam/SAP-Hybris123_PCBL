/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ISlotSyncStatus } from '../../../entities/synchronization';

export const topHeaderSlotSyncStatus: ISlotSyncStatus = {
    itemId: 'topHeaderSlot',
    itemType: 'topHeaderSlotContentSlot',
    name: 'topHeaderSlot',
    lastSyncStatus: new Date().getTime(),
    status: 'NOT_SYNC',
    catalogVersionUuid: 'apparel-ukContentCatalog/Staged',
    selectedDependencies: [
        {
            itemId: 'component1',
            itemType: 'ContentSlot',
            name: 'component1',
            lastSyncStatus: new Date().getTime(),
            status: 'NOT_SYNC',
            catalogVersionUuid: 'apparel-ukContentCatalog/Staged',
            dependentItemTypesOutOfSync: [
                {
                    type: 'Navigation',
                    i18nKey: 'some.key.for.Navigation'
                },
                {
                    type: 'Customization',
                    i18nKey: 'some.key.for.Customization'
                }
            ]
        },
        {
            itemId: 'component2',
            itemType: 'SimpleBannerComponent',
            name: 'component2',
            lastSyncStatus: new Date().getTime(),
            status: 'IN_SYNC',
            catalogVersionUuid: 'apparel-ukContentCatalog/Staged'
        }
    ],
    dependentItemTypesOutOfSync: [
        {
            type: 'ContentSlot',
            i18nKey: 'some.key.for.component1'
        }
    ],
    unavailableDependencies: []
};
