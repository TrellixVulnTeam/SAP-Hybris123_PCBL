import { OnInit } from '@angular/core';
import { CMSTimeService } from 'cmscommons';
import { Nullable } from 'smarteditcommons';
import { WorkflowAction, WorkflowActionComment } from '../../../dtos';
export declare class WorkflowActionCommentComponent implements OnInit {
    private cMSTimeService;
    actionComment: WorkflowActionComment;
    workflowAction: WorkflowAction;
    isDecisionComment: boolean;
    constructor(cMSTimeService: CMSTimeService);
    ngOnInit(): void;
    get createdAgo(): Nullable<string>;
    isIncomingDecision(): boolean;
}
