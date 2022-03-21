/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Injectable } from '@nestjs/common';
import { cloneDeep } from 'lodash';
import {
    newlyCreatedPageSyncStatus,
    syncStatus,
    trashedCategoryPageSyncStatus,
    trashedContentPageSyncStatus
} from '../../fixtures/constants/synchronization';
import { ISyncStatus } from '../../fixtures/entities/synchronization';

@Injectable()
export class SynchronizationService {
    private syncStatus: ISyncStatus = cloneDeep(syncStatus);
    private trashedCategoryPageSyncStatus: ISyncStatus = cloneDeep(trashedCategoryPageSyncStatus);
    private trashedContentPageSyncStatus: ISyncStatus = cloneDeep(trashedContentPageSyncStatus);
    private newlyCreatedPageSyncStatus: ISyncStatus = cloneDeep(newlyCreatedPageSyncStatus);
    private counter = 0;

    makeStatusInSync(status: ISyncStatus) {
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
        this.syncStatus = cloneDeep(syncStatus);
        this.trashedCategoryPageSyncStatus = cloneDeep(trashedCategoryPageSyncStatus);
        this.trashedContentPageSyncStatus = cloneDeep(trashedContentPageSyncStatus);
        this.newlyCreatedPageSyncStatus = cloneDeep(newlyCreatedPageSyncStatus);
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

    setTrashedCategorySyncStatus(pageSyncStatus: ISyncStatus) {
        this.trashedCategoryPageSyncStatus = cloneDeep(pageSyncStatus);
    }

    setTrashedContentSyncStatus(pageSyncStatus: ISyncStatus) {
        this.trashedContentPageSyncStatus = cloneDeep(pageSyncStatus);
    }

    setSyncStatus(pageSyncStatus: ISyncStatus) {
        this.syncStatus = cloneDeep(pageSyncStatus);
    }

    setCounter(val: number) {
        this.counter = val;
    }
}
