import { ISyncItem } from './syncItem.entity';
export interface ISyncDependency {
    itemId: string;
    itemType: string;
    name: string;
    lastSyncStatus?: number;
    status: string;
    dependentItemTypesOutOfSync?: ISyncItem[];
    catalogVersionUuid: string;
}
