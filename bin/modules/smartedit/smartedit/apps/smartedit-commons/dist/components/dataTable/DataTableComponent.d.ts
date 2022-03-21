import { EventEmitter, InjectionToken, OnInit } from '@angular/core';
import { TypedMap } from '@smart/utils';
import { SortDirections } from '../../utils';
import { DynamicPagedListColumnKey, SortStatus } from '../dynamicPagedList/interfaces';
export interface DataTableConfig {
    sortBy: string;
    reversed: boolean;
    injectedContext: any;
}
export interface DataTableComponentData {
    item: TypedMap<any>;
    column: DynamicPagedListColumnKey;
}
export declare const DATA_TABLE_COMPONENT_DATA: InjectionToken<unknown>;
export declare class DataTableComponent implements OnInit {
    columns: DynamicPagedListColumnKey[];
    config: DataTableConfig;
    items: TypedMap<any>[];
    sortStatus: SortStatus;
    onSortColumn: EventEmitter<{
        $columnKey: DynamicPagedListColumnKey;
        $columnSortMode: SortDirections;
    }>;
    internalSortBy: string;
    currentPage: number;
    columnWidth: number;
    columnToggleReversed: boolean;
    columnSortMode: SortDirections;
    headersSortingState: TypedMap<boolean>;
    visibleSortingHeader: string;
    ngOnInit(): void;
    sortColumn(columnKey: DynamicPagedListColumnKey): void;
    private _configure;
    private _validateInput;
}
