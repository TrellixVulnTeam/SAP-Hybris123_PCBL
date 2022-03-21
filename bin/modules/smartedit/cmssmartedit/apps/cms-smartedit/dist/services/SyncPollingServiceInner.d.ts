import { ISyncPollingService } from 'cmscommons';
import { SystemEventService } from 'smarteditcommons';
export declare class SyncPollingService extends ISyncPollingService {
    private systemEventService;
    constructor(systemEventService: SystemEventService);
    registerSyncPollingEvents(): void;
}
