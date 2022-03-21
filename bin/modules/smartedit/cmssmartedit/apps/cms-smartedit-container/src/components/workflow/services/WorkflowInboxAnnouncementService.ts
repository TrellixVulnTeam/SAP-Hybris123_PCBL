/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { OnDestroy, Type } from '@angular/core';
import { IAnnouncementService, Pagination, SeDowngradeService } from 'smarteditcommons';

import { WorkflowTasksPollingService } from '../../workflow/services/WorkflowTasksPollingService';
import { WorkflowInboxMultipleTasksAnnouncementComponent } from '../components/workflowInboxMultipleTasksAnnouncement/WorkflowInboxMultipleTasksAnnouncementComponent';
import { WorkflowInboxSingleTaskAnnouncementComponent } from '../components/workflowInboxSingleTaskAnnouncement/WorkflowInboxSingleTaskAnnouncementComponent';
import { WorkflowTask } from '../dtos/WorkflowTask';

/**
 * This service is used to show announcements for workflow inbox tasks.
 */
@SeDowngradeService()
export class WorkflowInboxAnnouncementService implements OnDestroy {
    private unsubscribePollingService: () => void;

    constructor(
        private workflowTasksPollingService: WorkflowTasksPollingService,
        private announcementService: IAnnouncementService
    ) {
        this.unsubscribePollingService = this.workflowTasksPollingService.addSubscriber(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (tasks: WorkflowTask[], pagination: Pagination) => {
                if (tasks) {
                    this.displayAnnouncement(tasks);
                }
            },
            false
        );
    }

    ngOnDestroy(): void {
        this.unsubscribePollingService();
    }

    private displayAnnouncement(tasks: WorkflowTask[]): void {
        if (tasks.length === 1) {
            this.showSingleTaskAnnouncement(tasks[0]);
        } else if (tasks.length > 1) {
            this.showMultipleTasksAnnouncement(tasks);
        }
    }

    private async showSingleTaskAnnouncement(task: WorkflowTask): Promise<void> {
        await this.showAnnouncement(WorkflowInboxSingleTaskAnnouncementComponent, {
            task
        });
    }

    private async showMultipleTasksAnnouncement(tasks: WorkflowTask[]): Promise<void> {
        await this.showAnnouncement(WorkflowInboxMultipleTasksAnnouncementComponent, {
            tasks
        });
    }

    private showAnnouncement(component: Type<any>, data: any): PromiseLike<string> {
        return this.announcementService.showAnnouncement({
            component,
            data
        });
    }
}
