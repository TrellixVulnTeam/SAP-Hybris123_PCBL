/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { WorkflowInboxMultipleTasksAnnouncementComponent } from 'cmssmarteditcontainer/components/workflow/components/workflowInboxMultipleTasksAnnouncement/WorkflowInboxMultipleTasksAnnouncementComponent';
import { WorkflowInboxSingleTaskAnnouncementComponent } from 'cmssmarteditcontainer/components/workflow/components/workflowInboxSingleTaskAnnouncement/WorkflowInboxSingleTaskAnnouncementComponent';
import { WorkflowTask } from 'cmssmarteditcontainer/components/workflow/dtos';
import { WorkflowInboxAnnouncementService } from 'cmssmarteditcontainer/components/workflow/services/WorkflowInboxAnnouncementService';
import { WorkflowTasksPollingService } from 'cmssmarteditcontainer/components/workflow/services/WorkflowTasksPollingService';
import { IAnnouncementService } from 'smarteditcommons';

describe('Test WorkflowInboxAnnouncementService', () => {
    let workflowInboxAnnouncementService: WorkflowInboxAnnouncementService;
    let announcementService: jasmine.SpyObj<IAnnouncementService>;
    let workflowTasksPollingService: jasmine.SpyObj<WorkflowTasksPollingService>;

    beforeEach(() => {
        workflowTasksPollingService = jasmine.createSpyObj('workflowTasksPollingService', [
            'addSubscriber'
        ]);
        announcementService = jasmine.createSpyObj('announcementService', ['showAnnouncement']);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        workflowInboxAnnouncementService = new WorkflowInboxAnnouncementService(
            workflowTasksPollingService,
            announcementService
        );
    });

    it('Should call addSubscriber when initialized', () => {
        expect(workflowTasksPollingService.addSubscriber).toHaveBeenCalledWith(
            jasmine.any(Function),
            false
        );
    });

    it('Should show single task announcement', () => {
        // GIVEN
        const tasks: WorkflowTask[] = getListOfTasks(1);
        const onAddSubscriber = workflowTasksPollingService.addSubscriber.calls.argsFor(0)[0];

        // WHEN
        onAddSubscriber(tasks, jasmine.any(Object));

        // THEN
        expect(announcementService.showAnnouncement).toHaveBeenCalledWith({
            component: WorkflowInboxSingleTaskAnnouncementComponent,
            data: {
                task: tasks[0]
            }
        });
    });

    it('Should show multiple tasks announcement', () => {
        // GIVEN
        const tasks: WorkflowTask[] = getListOfTasks(2);
        const onAddSubscriber = workflowTasksPollingService.addSubscriber.calls.argsFor(0)[0];

        // WHEN
        onAddSubscriber(tasks, jasmine.any(Object));

        expect(announcementService.showAnnouncement).toHaveBeenCalledWith({
            component: WorkflowInboxMultipleTasksAnnouncementComponent,
            data: {
                tasks
            }
        });
    });

    function getListOfTasks(numberOfTasks: number, startingTaskIndex = 1): WorkflowTask[] {
        const tasks: WorkflowTask[] = [];
        for (let i = 1; i <= numberOfTasks; i++) {
            tasks.push({
                action: null,
                attachments: [
                    {
                        pageName: `page${startingTaskIndex}`,
                        pageUid: `pageUid${startingTaskIndex}`,
                        catalogId: `catalogId${startingTaskIndex}`,
                        catalogVersion: `catalogVersion${startingTaskIndex}`,
                        catalogName: { en: `catalogName${startingTaskIndex}` }
                    }
                ]
            });
            startingTaskIndex++;
        }
        return tasks;
    }
});
