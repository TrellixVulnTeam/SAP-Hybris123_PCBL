"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bottomHeaderSlotSyncStatus = void 0;
exports.bottomHeaderSlotSyncStatus = {
    itemId: 'bottomHeaderSlot',
    itemType: 'bottomHeaderSlotContentSlot',
    name: 'bottomHeaderSlot',
    lastSyncStatus: new Date().getTime(),
    status: 'NOT_SYNC',
    catalogVersionUuid: 'apparel-ukContentCatalog/Staged',
    selectedDependencies: [
        {
            itemId: 'component3',
            itemType: 'ContentSlot',
            name: 'component3',
            lastSyncStatus: new Date().getTime(),
            status: 'IN_SYNC',
            catalogVersionUuid: 'apparel-ukContentCatalog/Staged'
        },
        {
            itemId: 'component4',
            itemType: 'ContentSlot',
            name: 'component4',
            lastSyncStatus: new Date().getTime(),
            status: 'NOT_SYNC',
            dependentItemTypesOutOfSync: [
                {
                    type: 'Component',
                    i18nKey: 'some.key.for.Component'
                }
            ],
            catalogVersionUuid: 'apparel-ukContentCatalog/Staged'
        }
    ],
    dependentItemTypesOutOfSync: [
        {
            type: 'ContentSlot',
            i18nKey: 'some.key.for.component4'
        }
    ],
    unavailableDependencies: []
};
//# sourceMappingURL=bottomHeaderSlotSyncStatus.constant.js.map