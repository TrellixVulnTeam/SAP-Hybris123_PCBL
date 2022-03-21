/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import {
    IPermissionService,
    PopupOverlayConfig,
    SeDowngradeComponent,
    SmarteditRoutingService,
    SystemEventService
} from 'smarteditcommons';
import { WORKFLOW_ITEM_MENU_OPENED_EVENT } from '../../constants';
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

@SeDowngradeComponent()
@Component({
    selector: 'se-workflow-item-menu',
    templateUrl: './WorkflowItemMenuComponent.html',
    styleUrls: ['./WorkflowItemMenuComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowItemMenuComponent implements OnInit, OnDestroy {
    @Input() workflowInfo: Workflow;

    public isMenuOpen = false;
    public popupConfig: PopupOverlayConfig = {
        halign: 'left',
        valign: 'bottom'
    };
    public menuItems: ButtonConfig[] = [];
    private unRegWorkflowMenuOpenedEvent: () => void;

    constructor(
        private systemEventService: SystemEventService,
        private workflowFacade: WorkflowFacade,
        private routingService: SmarteditRoutingService,
        private permissionService: IPermissionService,
        private cdr: ChangeDetectorRef
    ) {}

    async ngOnInit(): Promise<void> {
        this.unRegWorkflowMenuOpenedEvent = this.systemEventService.subscribe(
            WORKFLOW_ITEM_MENU_OPENED_EVENT,
            (_eventId: string, eventData: WorkflowItemMenuOpenedEventData) =>
                this.onWorkflowItemMenuOpen(eventData)
        );

        this.menuItems = await this.getPermittedButtons([
            {
                i18nKey: 'se.cms.actionitem.page.workflow.description',
                permissions: ['se.view.page.workflowMenu']
            },
            {
                i18nKey: 'se.cms.actionitem.page.workflow.cancel',
                permissions: ['se.cancel.page.workflowMenu']
            }
        ]);
        this.cdr.detectChanges();
    }

    ngOnDestroy(): void {
        this.unRegWorkflowMenuOpenedEvent();
    }

    public toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
        if (this.isMenuOpen && this.workflowInfo) {
            this.systemEventService.publishAsync(WORKFLOW_ITEM_MENU_OPENED_EVENT, {
                uid: this.workflowInfo.workflowCode
            });
        }
    }

    public hideMenu(): void {
        this.isMenuOpen = false;
    }

    /**
     * Callback for the edit button in the description item menu.
     */
    public async editDescription(): Promise<void> {
        this.hideMenu();

        const updatedWorkflow = await this.workflowFacade.editWorkflow(this.workflowInfo);

        this.workflowInfo.description = updatedWorkflow.description;
    }

    /**
     * Callback for the cancel button in the cancel item menu.
     */
    public async cancelWorkflow(): Promise<void> {
        this.hideMenu();

        await this.workflowFacade.cancelWorflow(this.workflowInfo);

        this.routingService.reload();
    }

    /** Close when other menu has been opened. */
    private onWorkflowItemMenuOpen(eventData: WorkflowItemMenuOpenedEventData): void {
        if (this.workflowInfo.workflowCode !== eventData.uid) {
            this.hideMenu();
            this.cdr.detectChanges();
        }
    }

    private async getPermittedButtons(menuItemsConfig: ButtonConfig[]): Promise<ButtonConfig[]> {
        const buttonsPermissions = menuItemsConfig.map((menuItem: ButtonConfig) =>
            Promise.resolve(
                this.permissionService.isPermitted([
                    {
                        names: menuItem.permissions
                    }
                ])
            )
        );
        const permissions = await Promise.all(buttonsPermissions);

        return menuItemsConfig.filter(
            (_menuItem: ButtonConfig, index: number) => permissions[index]
        );
    }
}
