/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopoverModule } from '@fundamental-ngx/core';
import {
    CrossFrameEventService,
    IPageInfoService,
    moduleUtils,
    TranslationModule,
    EVENTS,
    INotificationService,
    SmarteditRoutingService,
    NG_ROUTE_PREFIX,
    STORE_FRONT_CONTEXT,
    InfiniteScrollingModule,
    MoreTextModule,
    CollapsibleContainerModule,
    PopupOverlayModule,
    TooltipModule,
    DropdownMenuModule,
    HasOperationPermissionDirectiveModule,
    SpinnerModule,
    TabsModule,
    L10nPipeModule,
    L10nPipe
} from 'smarteditcommons';
import { PageApprovalSelectorComponent } from './components/pageApprovalSelector/PageApprovalSelectorComponent';
import { PageDisplayStatusComponent } from './components/pageDisplayStatus/PageDisplayStatusComponent';
import { PageDisplayStatusWrapperComponent } from './components/pageDisplayStatus/PageDisplayStatusWrapperComponent';
import { PageStatusComponent } from './components/pageDisplayStatus/pageStatus/PageStatusComponent';
import { PageWorkflowMenuComponent } from './components/pageWorkflowMenu/PageWorkflowMenuComponent';
import { PageWorkflowMenuAllTasksTabComponent } from './components/pageWorkflowMenu/tabs/PageWorkflowMenuAllTasksTabComponent';
import { PageWorkflowMenuCurrentTasksTabComponent } from './components/pageWorkflowMenu/tabs/PageWorkflowMenuCurrentTasksTabComponent';
import { PageWorkflowMenuTasksTabComponent } from './components/pageWorkflowMenu/tabs/PageWorkflowMenuTasksTabComponent';
import { WorkflowInboxComponent } from './components/workflowInbox/WorkflowInboxComponent';
import { WorkflowInboxBadgeComponent } from './components/workflowInboxBadge/WorkflowInboxBadgeComponent';
import { WorkflowInboxMultipleTasksAnnouncementComponent } from './components/workflowInboxMultipleTasksAnnouncement/WorkflowInboxMultipleTasksAnnouncementComponent';
import { WorkflowInboxSingleTaskAnnouncementComponent } from './components/workflowInboxSingleTaskAnnouncement/WorkflowInboxSingleTaskAnnouncementComponent';
import { WorkflowInboxTaskComponent } from './components/workflowInboxTask/WorkflowInboxTaskComponent';
import { WorkflowItemMenuComponent } from './components/workflowItemMenu/WorkflowItemMenuComponent';
import { WorkflowActionCommentComponent } from './components/workflowMenu/workflowActionComment/WorkflowActionCommentComponent';
import { WorkflowActionItemComponent } from './components/workflowMenu/workflowActionItem/WorkflowActionItemComponent';
import { Workflow } from './dtos';
import {
    WorkflowFacade,
    WorkflowService,
    WorkflowTasksPollingService,
    WorkflowInboxAnnouncementService
} from './services';
@NgModule({
    imports: [
        TranslationModule.forChild(),
        CommonModule,
        PopoverModule,
        InfiniteScrollingModule,
        MoreTextModule,
        CollapsibleContainerModule,
        PopupOverlayModule,
        TooltipModule,
        DropdownMenuModule,
        HasOperationPermissionDirectiveModule,
        SpinnerModule,
        TabsModule,
        L10nPipeModule
    ],
    declarations: [
        WorkflowInboxSingleTaskAnnouncementComponent,
        WorkflowInboxMultipleTasksAnnouncementComponent,
        WorkflowInboxTaskComponent,
        WorkflowInboxBadgeComponent,
        WorkflowInboxComponent,
        WorkflowActionCommentComponent,
        WorkflowActionItemComponent,
        PageDisplayStatusComponent,
        PageDisplayStatusWrapperComponent,
        PageStatusComponent,
        PageApprovalSelectorComponent,
        WorkflowItemMenuComponent,
        PageWorkflowMenuComponent,
        PageWorkflowMenuCurrentTasksTabComponent,
        PageWorkflowMenuAllTasksTabComponent,
        PageWorkflowMenuTasksTabComponent
    ],
    entryComponents: [
        WorkflowInboxSingleTaskAnnouncementComponent,
        WorkflowInboxMultipleTasksAnnouncementComponent,
        WorkflowInboxTaskComponent,
        WorkflowInboxBadgeComponent,
        WorkflowInboxComponent,
        WorkflowActionCommentComponent,
        WorkflowActionItemComponent,
        PageDisplayStatusComponent,
        PageDisplayStatusWrapperComponent,
        PageStatusComponent,
        PageApprovalSelectorComponent,
        WorkflowItemMenuComponent,
        PageWorkflowMenuComponent,
        PageWorkflowMenuCurrentTasksTabComponent,
        PageWorkflowMenuAllTasksTabComponent,
        PageWorkflowMenuTasksTabComponent
    ],
    exports: [PageDisplayStatusComponent],
    providers: [
        WorkflowTasksPollingService,
        WorkflowService,
        WorkflowInboxAnnouncementService,
        WorkflowFacade,
        L10nPipe,
        moduleUtils.bootstrap(
            (
                crossFrameEventService: CrossFrameEventService,
                pageInfoService: IPageInfoService,
                workflowService: WorkflowService,
                notificationService: INotificationService,
                smarteditRoutingService: SmarteditRoutingService,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                workflowInboxAnnouncementService: WorkflowInboxAnnouncementService // initializes subscriber for tasks pooling service
            ) => {
                const NOTIFICATION_ID = 'PAGE_IN_WORKFLOW_NOTIFICATION_ID';
                const NOTIFICATION_TEMPLATE = 'pageInWorkflowNotificationTemplate.html';

                crossFrameEventService.subscribe(EVENTS.PAGE_CHANGE, () => {
                    // Using pageInfoService.getPageUUID instead of pageService.getCurrentPageInfo because pageInfoService uses information from the DOM
                    // instead of fetching from the backend and hence preventing any race condition while clearing the cache.
                    pageInfoService.getPageUUID().then((pageUuid: string) => {
                        workflowService
                            .getActiveWorkflowForPageUuid(pageUuid)
                            .then((workflow: Workflow) => {
                                if (workflow !== null && !workflow.isAvailableForCurrentPrincipal) {
                                    notificationService.pushNotification({
                                        id: NOTIFICATION_ID,
                                        templateUrl: NOTIFICATION_TEMPLATE
                                    });
                                } else {
                                    notificationService.removeNotification(NOTIFICATION_ID);
                                }
                            });
                    });
                });

                smarteditRoutingService.routeChangeSuccess().subscribe((event) => {
                    const url = smarteditRoutingService.getCurrentUrlFromEvent(event);

                    if (url !== `/${NG_ROUTE_PREFIX}${STORE_FRONT_CONTEXT}`) {
                        notificationService.removeNotification(NOTIFICATION_ID);
                    }
                });
            },
            [
                CrossFrameEventService,
                IPageInfoService,
                WorkflowService,
                INotificationService,
                SmarteditRoutingService,
                WorkflowInboxAnnouncementService
            ]
        )
    ]
})
export class WorkflowModule {}
