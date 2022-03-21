import { ChangeDetectorRef, OnInit } from '@angular/core';
import { ISyncStatusItem } from 'cmscommons';
import { FundamentalModalManagerService } from 'smarteditcommons';
import { PageSynchronizationPanelModalData } from '../../types';
import { PageSynchronizationPanelComponent } from '../pageSynchronizationPanel/PageSynchronizationPanelComponent';
export declare class PageSynchronizationPanelModalComponent implements OnInit {
    private modalManager;
    private cdr;
    pageSynchronizationPanelComponent: PageSynchronizationPanelComponent;
    data: PageSynchronizationPanelModalData;
    isReady: boolean;
    private syncBtnId;
    constructor(modalManager: FundamentalModalManagerService<PageSynchronizationPanelModalData>, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    onSelectedItemsUpdate(selectedItems: ISyncStatusItem[]): void;
}
