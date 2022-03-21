import { OnDestroy } from '@angular/core';
import { IAnnouncementService } from 'smarteditcommons';
import { WorkflowTasksPollingService } from '../../workflow/services/WorkflowTasksPollingService';
/**
 * This service is used to show announcements for workflow inbox tasks.
 */
export declare class WorkflowInboxAnnouncementService implements OnDestroy {
    private workflowTasksPollingService;
    private announcementService;
    private unsubscribePollingService;
    constructor(workflowTasksPollingService: WorkflowTasksPollingService, announcementService: IAnnouncementService);
    ngOnDestroy(): void;
    private displayAnnouncement;
    private showSingleTaskAnnouncement;
    private showMultipleTasksAnnouncement;
    private showAnnouncement;
}
