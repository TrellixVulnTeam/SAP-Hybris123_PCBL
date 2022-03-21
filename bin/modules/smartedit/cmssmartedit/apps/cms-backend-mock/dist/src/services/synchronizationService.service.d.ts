import { ISyncStatus } from '../../fixtures/entities/synchronization';
export declare class SynchronizationService {
    private syncStatus;
    private trashedCategoryPageSyncStatus;
    private trashedContentPageSyncStatus;
    private newlyCreatedPageSyncStatus;
    private counter;
    makeStatusInSync(status: ISyncStatus): void;
    refreshState(): void;
    getNewlyCreatedPageSyncStatus(): ISyncStatus;
    getTrashedCategorySyncStatus(): ISyncStatus;
    getTrashedContentSyncStatus(): ISyncStatus;
    getSyncStatus(): ISyncStatus;
    getCounter(): number;
    setTrashedCategorySyncStatus(pageSyncStatus: ISyncStatus): void;
    setTrashedContentSyncStatus(pageSyncStatus: ISyncStatus): void;
    setSyncStatus(pageSyncStatus: ISyncStatus): void;
    setCounter(val: number): void;
}
