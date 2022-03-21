import { OnInit } from '@angular/core';
import { CMSTimeService } from 'cmscommons';
import { IAnnouncementService, Nullable, AnnouncementData } from 'smarteditcommons';
import { WorkflowTask } from '../../dtos';
import { WorkflowService } from '../../services/WorkflowService';
interface WorkflowAnnouncementData {
    task: WorkflowTask;
}
export declare class WorkflowInboxSingleTaskAnnouncementComponent implements OnInit {
    private workflowService;
    private cmsTimeService;
    private announcementService;
    task: WorkflowTask;
    startedAgo: Nullable<string>;
    private announcementId;
    constructor(workflowService: WorkflowService, cmsTimeService: CMSTimeService, announcementService: IAnnouncementService, data: AnnouncementData<WorkflowAnnouncementData>);
    ngOnInit(): void;
    onClick(event: Event): void;
    private getStartedAgo;
}
export {};
