import { OnInit } from '@angular/core';
import { TabData } from 'smarteditcommons';
import { Workflow, WorkflowAction } from '../../../dtos';
import { PageWorkflowMenuTabsData } from '../PageWorkflowMenuComponent';
export declare class PageWorkflowMenuCurrentTasksTabComponent implements OnInit {
    currentActions: WorkflowAction[];
    workflow: Workflow;
    private actions;
    constructor(tabData: TabData<PageWorkflowMenuTabsData>);
    ngOnInit(): void;
}
