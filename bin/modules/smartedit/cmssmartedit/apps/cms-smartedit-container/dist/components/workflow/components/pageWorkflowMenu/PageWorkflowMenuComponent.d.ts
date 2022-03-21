import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { IPageService } from 'cmscommons';
import { SmarteditRoutingService, SystemEventService, Tab, ToolbarItemInternal } from 'smarteditcommons';
import { Workflow, WorkflowAction } from '../../dtos';
import { WorkflowFacade } from '../../services/WorkflowFacade';
import { WorkflowService } from '../../services/WorkflowService';
export interface PageWorkflowMenuTabsData {
    workflow: Workflow;
    actions: WorkflowAction[];
}
export declare class PageWorkflowMenuComponent implements OnInit, OnDestroy {
    private workflowService;
    private workflowFacade;
    private systemEventService;
    private routingService;
    private pageService;
    private cdr;
    actionItem: ToolbarItemInternal;
    isReady: boolean;
    isWorkflowEnabled: boolean;
    areTabsReady: boolean;
    pageHasWorkflow: boolean;
    tabsList: Tab[];
    tabsData: PageWorkflowMenuTabsData;
    private _workflow;
    private unRegOpenMenuEvent;
    private unRegPerspectiveChangedEvent;
    private unRegWorkflowFinishedEvent;
    private unRegDecisionSelectedEvent;
    private unRegWorkflowRefreshEvent;
    constructor(workflowService: WorkflowService, workflowFacade: WorkflowFacade, systemEventService: SystemEventService, routingService: SmarteditRoutingService, pageService: IPageService, cdr: ChangeDetectorRef, actionItem: ToolbarItemInternal);
    ngOnInit(): Promise<void>;
    ngOnDestroy(): void;
    set workflow(value: Workflow);
    get workflow(): Workflow;
    onDropdownToggle(open: boolean): Promise<void>;
    startWorkflow(): Promise<void>;
    private loadWorkflowAndActions;
    private loadWorkflow;
    private loadActions;
    private setActions;
    private closeDropdown;
    private actionComparator;
    private getActionPriority;
}
