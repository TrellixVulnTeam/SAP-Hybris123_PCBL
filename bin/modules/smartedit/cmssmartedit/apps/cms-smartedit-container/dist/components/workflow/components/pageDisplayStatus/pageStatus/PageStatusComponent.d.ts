import { ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Nullable } from 'smarteditcommons';
import { WorkflowService } from '../../../services/WorkflowService';
export declare class PageStatusComponent implements OnChanges {
    private workflowService;
    private cdr;
    uuid: Nullable<string>;
    displayStatus: Nullable<string>;
    statusLabel: string;
    statusIconCssClass: string;
    private LOCALIZATION_PREFIX;
    private isPageLocked;
    constructor(workflowService: WorkflowService, cdr: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): Promise<void>;
    private isPageLockedToCurrentUser;
    private getStatusIconCssClass;
}
