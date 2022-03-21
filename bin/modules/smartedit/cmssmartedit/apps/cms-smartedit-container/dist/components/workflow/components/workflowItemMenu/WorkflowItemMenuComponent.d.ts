import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { IPermissionService, PopupOverlayConfig, SmarteditRoutingService, SystemEventService } from 'smarteditcommons';
import { Workflow } from '../../dtos';
import { WorkflowFacade } from '../../services/WorkflowFacade';
interface ButtonConfig {
    i18nKey: string;
    permissions?: string[];
}
export interface WorkflowItemMenuOpenedEventData {
    uid?: string;
    code?: string;
}
export declare class WorkflowItemMenuComponent implements OnInit, OnDestroy {
    private systemEventService;
    private workflowFacade;
    private routingService;
    private permissionService;
    private cdr;
    workflowInfo: Workflow;
    isMenuOpen: boolean;
    popupConfig: PopupOverlayConfig;
    menuItems: ButtonConfig[];
    private unRegWorkflowMenuOpenedEvent;
    constructor(systemEventService: SystemEventService, workflowFacade: WorkflowFacade, routingService: SmarteditRoutingService, permissionService: IPermissionService, cdr: ChangeDetectorRef);
    ngOnInit(): Promise<void>;
    ngOnDestroy(): void;
    toggleMenu(): void;
    hideMenu(): void;
    editDescription(): Promise<void>;
    cancelWorkflow(): Promise<void>;
    private onWorkflowItemMenuOpen;
    private getPermittedButtons;
}
export {};
