"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trashedCategoryPageSyncStatus = void 0;
const bottomHeaderSlotSyncStatus_constant_1 = require("../slotSync/bottomHeaderSlotSyncStatus.constant");
const footerSlotSyncStatus_constant_1 = require("../slotSync/footerSlotSyncStatus.constant");
const otherSlotSyncStatus_constant_1 = require("../slotSync/otherSlotSyncStatus.constant");
const topHeaderSlotSyncStatus_constant_1 = require("../slotSync/topHeaderSlotSyncStatus.constant");
exports.trashedCategoryPageSyncStatus = {
    itemId: 'trashedCategoryPage',
    itemType: 'AbstractPage',
    name: 'trashedCategoryPage',
    catalogVersionUuid: 'apparel-ukContentCatalog/Staged',
    lastSyncStatus: new Date(2016, 10, 10, 13, 10, 0).getTime(),
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
        topHeaderSlotSyncStatus_constant_1.topHeaderSlotSyncStatus,
        bottomHeaderSlotSyncStatus_constant_1.bottomHeaderSlotSyncStatus,
        footerSlotSyncStatus_constant_1.footerSlotSyncStatus
    ],
    sharedDependencies: [otherSlotSyncStatus_constant_1.otherSlotSyncStatus],
    unavailableDependencies: []
};
//# sourceMappingURL=trashedCategoryPageSyncStatus.constant.js.map