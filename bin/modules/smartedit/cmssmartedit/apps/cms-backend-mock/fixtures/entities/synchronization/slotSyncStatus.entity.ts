/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ISyncItem } from './syncItem.entity';
import { ISyncDependency } from './syncDependency.entity';

export interface ISlotSyncStatus {
    itemId: string;
    itemType: string;
    name: string;
    lastSyncStatus?: number;
    status: string;
    catalogVersionUuid: string;
    selectedDependencies: ISyncDependency[];
    dependentItemTypesOutOfSync?: ISyncItem[];
    unavailableDependencies: ISlotSyncStatus[];
}
