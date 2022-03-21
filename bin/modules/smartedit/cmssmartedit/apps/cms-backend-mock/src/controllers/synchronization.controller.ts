/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { cloneDeep } from 'lodash';
import {
    currentSyncJob,
    otherPageSyncStatus,
    syncStatus,
    trashedCategoryPageSyncStatus
} from '../../fixtures/constants/synchronization';
import { ISynchronizationWsDTO, ISyncStatus } from '../../fixtures/entities/synchronization';
import { SynchronizationService } from '../services';

@Controller()
export class SynchronizationController {
    constructor(private readonly synchronizationService: SynchronizationService) {}

    @Post(
        'cmssmarteditwebservices/v1/sites/:baseSiteId/catalogs/:catalogId/versions/:versionId/synchronizations/versions/:targetCatalogVersion*'
    )
    createSynchronizationStatus(@Body() syncList: ISynchronizationWsDTO) {
        const items = syncList.items.map((item) => item.itemId);
        const newlyCreatedPageSyncStatus: ISyncStatus = this.synchronizationService.getNewlyCreatedPageSyncStatus();

        const currentSyncStatus: ISyncStatus =
            items.indexOf('trashedCategoryPage') > -1 ? trashedCategoryPageSyncStatus : syncStatus;

        const status: ISyncStatus =
            items.indexOf('trashedCategoryPage') > -1
                ? this.synchronizationService.getTrashedCategorySyncStatus()
                : this.synchronizationService.getSyncStatus();

        if (
            items.indexOf(currentSyncStatus.itemId) > -1 &&
            currentSyncStatus.status !== 'IN_SYNC'
        ) {
            this.synchronizationService.makeStatusInSync(status);
        } else if (
            items.indexOf(newlyCreatedPageSyncStatus.itemId) > -1 &&
            newlyCreatedPageSyncStatus.status !== 'IN_SYNC'
        ) {
            newlyCreatedPageSyncStatus.lastSyncStatus = new Date(2016, 10, 10, 13, 10, 0).getTime();
            this.synchronizationService.makeStatusInSync(newlyCreatedPageSyncStatus);
        } else {
            status.selectedDependencies.forEach((item) => {
                if (items.indexOf(item.itemId) > -1) {
                    if (item.itemId === 'footerSlot') {
                        item.status = 'SYNC_FAILED';
                        item.dependentItemTypesOutOfSync = [
                            {
                                type: 'Component',
                                i18nKey: 'component 5'
                            }
                        ];

                        item.selectedDependencies.forEach((subItem) => {
                            if (items.indexOf(subItem.itemId) > -1) {
                                if (subItem.itemId === 'component5') {
                                    subItem.status = 'SYNC_FAILED';
                                    subItem.dependentItemTypesOutOfSync = [
                                        {
                                            type: 'Other',
                                            i18nKey: 'other'
                                        }
                                    ];
                                }
                            }
                        });
                    } else if (item.itemId === 'bottomHeaderSlot') {
                        item.status = 'IN_PROGRESS';
                    } else {
                        item.status = 'IN_SYNC';
                        item.dependentItemTypesOutOfSync = [];

                        item.selectedDependencies.forEach((subItem) => {
                            subItem.status = 'IN_SYNC';
                            subItem.dependentItemTypesOutOfSync = [];
                        });
                    }
                }
            });
        }

        if (items.indexOf('trashedCategoryPage') > -1) {
            this.synchronizationService.setTrashedCategorySyncStatus(status);
        } else {
            this.synchronizationService.setSyncStatus(status);
        }

        status.lastModifiedDate = new Date();
        return [200, status];
    }

    @Get(
        'cmssmarteditwebservices/v1/sites/:baseSiteId/catalogs/:catalogId/versions/:versionId/synchronizations/versions/:targetCatalogVersion/pages/:pageId'
    )
    getSynchronizationStatus(@Param('pageId') pageId: string) {
        const counter = this.synchronizationService.getCounter();
        const status: ISyncStatus = this.synchronizationService.getSyncStatus();

        if (counter === 3) {
            if (status.selectedDependencies[1].status === 'IN_PROGRESS') {
                status.selectedDependencies[1].status = 'IN_SYNC';
                status.selectedDependencies[1].dependentItemTypesOutOfSync = [];
                this.synchronizationService.setCounter(1);
            }
        }

        // set in_sync status for one page and all its dependencies
        if (pageId === 'syncedpageuid' || pageId === 'synchedPage') {
            const syncedPageStatus: ISyncStatus = cloneDeep(status);
            syncedPageStatus.status = 'IN_SYNC';
            syncedPageStatus.dependentItemTypesOutOfSync = [];
            syncedPageStatus.selectedDependencies.forEach((selectedDependency) => {
                selectedDependency.status = 'IN_SYNC';
            });
            return syncedPageStatus;
        } else if (pageId === 'secondpage' || pageId === 'trashedProductPage') {
            return cloneDeep(this.synchronizationService.getNewlyCreatedPageSyncStatus());
        } else if (pageId === 'otherpage') {
            return cloneDeep(otherPageSyncStatus);
        } else if (pageId === 'trashedCategoryPage') {
            return cloneDeep(this.synchronizationService.getTrashedCategorySyncStatus());
        } else if (pageId === 'trashedContentPage') {
            return cloneDeep(this.synchronizationService.getTrashedContentSyncStatus());
        } else {
            return status;
        }
    }

    @Get(
        'cmswebservices/v1/catalogs/:catalogId/versions/:sourceVersionId/synchronizations/versions/:targetVersionId'
    )
    getSynchronizationStatusByCatalog() {
        return currentSyncJob;
    }

    @Post(
        'cmswebservices/v1/catalogs/:catalogId/versions/:sourceVersionId/synchronizations/versions/:targetVersionId'
    )
    createSynchronizationStatusForCatalog() {
        currentSyncJob.syncStatus = 'RUNNING';
        currentSyncJob.syncResult = 'UNKNOWN';
        return currentSyncJob;
    }

    @Post('api/refresh/synchronization')
    refreshFixtureState() {
        this.synchronizationService.refreshState();
    }
}
