import { ISyncItem } from './syncItem.entity';
import { ISlotSyncStatus } from './slotSyncStatus.entity';
import { ISyncDependency } from './syncDependency.entity';
export interface ISyncStatus {
    itemId: string;
    itemType: string;
    name: string;
    catalogVersionUuid: string;
    lastSyncStatus?: number;
    status: string;
    lastModifiedDate?: Date;
    dependentItemTypesOutOfSync: ISyncItem[];
    selectedDependencies: ISlotSyncStatus[];
    sharedDependencies: ISlotSyncStatus[];
    unavailableDependencies: ISyncDependency[];
}
