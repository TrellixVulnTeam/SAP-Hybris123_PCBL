import { EventEmitter, OnChanges, SimpleChanges, Type } from '@angular/core';
import { ISelectItem } from '@smart/utils';
import { Observable } from 'rxjs';
export interface Tab {
    id: string;
    hasErrors: boolean;
    active?: boolean;
    message?: string;
    title: string;
    templateUrl?: string;
    component?: Type<any>;
}
export declare class TabsComponent<T> implements OnChanges {
    model: T;
    tabsList: Tab[];
    numTabsDisplayed: number;
    onTabSelected: EventEmitter<string>;
    selectedTab: Tab;
    selectItems: ISelectItem<Tab>[];
    dropdownTabs: ISelectItem<Tab>[];
    private tabChangedStream;
    get isInitialized(): boolean;
    isActiveInMoreTab(): boolean;
    ngOnChanges(changes: SimpleChanges): void;
    selectTab(tabToSelect: Tab): void;
    dropDownHasErrors(): boolean;
    findSelectedTab(): void;
    getDropdownTabs(): Observable<ISelectItem<Tab>[]>;
    getVisibleTabs(): Observable<Tab[]>;
    trackTabById(index: number): number;
}
