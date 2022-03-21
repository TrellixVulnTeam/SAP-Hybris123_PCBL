import { ISynchronizationWsDTO, ISyncStatus } from '../../fixtures/entities/synchronization';
import { SynchronizationService } from '../services';
export declare class SynchronizationController {
    private readonly synchronizationService;
    constructor(synchronizationService: SynchronizationService);
    createSynchronizationStatus(syncList: ISynchronizationWsDTO): (number | ISyncStatus)[];
    getSynchronizationStatus(pageId: string): ISyncStatus;
    getSynchronizationStatusByCatalog(): import("../../fixtures/entities/synchronization").SynchronizationJob;
    createSynchronizationStatusForCatalog(): import("../../fixtures/entities/synchronization").SynchronizationJob;
    refreshFixtureState(): void;
}
