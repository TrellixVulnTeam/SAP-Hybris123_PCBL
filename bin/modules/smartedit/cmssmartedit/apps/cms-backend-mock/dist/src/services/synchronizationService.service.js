"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynchronizationService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const synchronization_1 = require("../../fixtures/constants/synchronization");
let SynchronizationService = (() => {
    let SynchronizationService = class SynchronizationService {
        constructor() {
            this.syncStatus = lodash_1.cloneDeep(synchronization_1.syncStatus);
            this.trashedCategoryPageSyncStatus = lodash_1.cloneDeep(synchronization_1.trashedCategoryPageSyncStatus);
            this.trashedContentPageSyncStatus = lodash_1.cloneDeep(synchronization_1.trashedContentPageSyncStatus);
            this.newlyCreatedPageSyncStatus = lodash_1.cloneDeep(synchronization_1.newlyCreatedPageSyncStatus);
            this.counter = 0;
        }
        makeStatusInSync(status) {
            status.status = 'IN_SYNC';
            status.dependentItemTypesOutOfSync = [];
            status.selectedDependencies.forEach((item) => {
                item.status = 'IN_SYNC';
                item.dependentItemTypesOutOfSync = [];
                item.selectedDependencies.forEach((subItem) => {
                    subItem.status = 'IN_SYNC';
                    subItem.dependentItemTypesOutOfSync = [];
                });
            });
        }
        refreshState() {
            this.syncStatus = lodash_1.cloneDeep(synchronization_1.syncStatus);
            this.trashedCategoryPageSyncStatus = lodash_1.cloneDeep(synchronization_1.trashedCategoryPageSyncStatus);
            this.trashedContentPageSyncStatus = lodash_1.cloneDeep(synchronization_1.trashedContentPageSyncStatus);
            this.newlyCreatedPageSyncStatus = lodash_1.cloneDeep(synchronization_1.newlyCreatedPageSyncStatus);
            this.counter = 0;
        }
        getNewlyCreatedPageSyncStatus() {
            return this.newlyCreatedPageSyncStatus;
        }
        getTrashedCategorySyncStatus() {
            return this.trashedCategoryPageSyncStatus;
        }
        getTrashedContentSyncStatus() {
            return this.trashedContentPageSyncStatus;
        }
        getSyncStatus() {
            return this.syncStatus;
        }
        getCounter() {
            return ++this.counter;
        }
        setTrashedCategorySyncStatus(pageSyncStatus) {
            this.trashedCategoryPageSyncStatus = lodash_1.cloneDeep(pageSyncStatus);
        }
        setTrashedContentSyncStatus(pageSyncStatus) {
            this.trashedContentPageSyncStatus = lodash_1.cloneDeep(pageSyncStatus);
        }
        setSyncStatus(pageSyncStatus) {
            this.syncStatus = lodash_1.cloneDeep(pageSyncStatus);
        }
        setCounter(val) {
            this.counter = val;
        }
    };
    SynchronizationService = tslib_1.__decorate([
        common_1.Injectable()
    ], SynchronizationService);
    return SynchronizationService;
})();
exports.SynchronizationService = SynchronizationService;
//# sourceMappingURL=synchronizationService.service.js.map