export interface SynchronizationJob {
    creationDate: string;
    syncStatus: string;
    endDate: string;
    lastModifiedDate: string;
    syncResult: string;
    startDate: string;
    sourceCatalogVersion: string;
    targetCatalogVersion: string;
    code?: string;
}
