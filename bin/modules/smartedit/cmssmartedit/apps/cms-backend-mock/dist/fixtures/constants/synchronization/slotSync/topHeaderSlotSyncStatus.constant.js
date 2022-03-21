"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topHeaderSlotSyncStatus = void 0;
exports.topHeaderSlotSyncStatus = {
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
//# sourceMappingURL=topHeaderSlotSyncStatus.constant.js.map