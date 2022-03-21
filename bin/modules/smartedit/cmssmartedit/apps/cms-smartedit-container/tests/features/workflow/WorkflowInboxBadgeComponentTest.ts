/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { WorkflowInboxBadgeComponent } from 'cmssmarteditcontainer/components/workflow/components/workflowInboxBadge/WorkflowInboxBadgeComponent';
import { WorkflowService } from 'cmssmarteditcontainer/components/workflow/services';
import { of } from 'rxjs';

describe('WorkflowInboxBadgeComponent', () => {
    let workflowService: jasmine.SpyObj<WorkflowService>;

    let component: WorkflowInboxBadgeComponent;
    beforeEach(() => {
        workflowService = jasmine.createSpyObj<WorkflowService>('workflowService', [
            'getTotalNumberOfActiveWorkflowTasks'
        ]);

        component = new WorkflowInboxBadgeComponent(workflowService);
    });

    it('WHEN component is initialized THEN it should get the count of workflow tasks', async () => {
        workflowService.getTotalNumberOfActiveWorkflowTasks.and.returnValue(of(3));

        component.ngOnInit();

        expect(await component.inboxCount$.toPromise()).toEqual(3);
    });

    it('should return count that is diplayed in the template', () => {
        expect(component.stringifyCount(1)).toEqual('1');

        expect(component.stringifyCount(100)).toEqual('99+');
    });
});
