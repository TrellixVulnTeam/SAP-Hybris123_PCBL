/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectorRef } from '@angular/core';
import { WorkflowItemMenuComponent } from 'cmssmarteditcontainer/components/workflow/components/workflowItemMenu/WorkflowItemMenuComponent';
import { WORKFLOW_ITEM_MENU_OPENED_EVENT } from 'cmssmarteditcontainer/components/workflow/constants';
import { Workflow } from 'cmssmarteditcontainer/components/workflow/dtos';
import { WorkflowFacade } from 'cmssmarteditcontainer/components/workflow/services/WorkflowFacade';
import { IPermissionService, SmarteditRoutingService, SystemEventService } from 'smarteditcommons';

describe('WorkflowItemMenuComponentTest', () => {
    let systemEventService: jasmine.SpyObj<SystemEventService>;
    let workflowFacade: jasmine.SpyObj<WorkflowFacade>;
    let routingService: jasmine.SpyObj<SmarteditRoutingService>;
    let permissionService: jasmine.SpyObj<IPermissionService>;
    const cdr = jasmine.createSpyObj<ChangeDetectorRef>('changeDetectorRef', ['detectChanges']);

    let component: WorkflowItemMenuComponent;
    beforeEach(() => {
        systemEventService = jasmine.createSpyObj<SystemEventService>('systemEventService', [
            'subscribe',
            'publishAsync'
        ]);

        workflowFacade = jasmine.createSpyObj<WorkflowFacade>('workflowFacade', [
            'editWorkflow',
            'cancelWorflow'
        ]);

        routingService = jasmine.createSpyObj<SmarteditRoutingService>('routingService', [
            'reload'
        ]);

        permissionService = jasmine.createSpyObj<IPermissionService>('permissionService', [
            'isPermitted'
        ]);
        permissionService.isPermitted.and.returnValues(true, true);

        component = new WorkflowItemMenuComponent(
            systemEventService,
            workflowFacade,
            routingService,
            permissionService,
            cdr
        );
    });

    describe('initialize', () => {
        it('THEN it should subscribe to Workflow Item Menu Opened event', async () => {
            await component.ngOnInit();

            expect(systemEventService.subscribe).toHaveBeenCalledWith(
                WORKFLOW_ITEM_MENU_OPENED_EVENT,
                jasmine.any(Function)
            );
        });

        it('THEN it should set Menu Items', async () => {
            await component.ngOnInit();

            expect(component.menuItems.length).toEqual(2);
        });

        it('THEN it should set only permitted Menu Items', async () => {
            permissionService.isPermitted.and.returnValues([true, false]);
            await component.ngOnInit();

            expect(component.menuItems.length).toEqual(1);
        });
    });

    describe('destroy', () => {
        it('THEN it should unregister from Workflow Item Menu Opened event', async () => {
            const unRegWorkflowMenuOpenedEventMock = jasmine.createSpy();
            systemEventService.subscribe.and.returnValue(unRegWorkflowMenuOpenedEventMock);
            await component.ngOnInit();

            component.ngOnDestroy();

            expect(unRegWorkflowMenuOpenedEventMock).toHaveBeenCalled();
        });
    });

    it('WHEN some other Workflow Item Menu has been opened THEN it should close the menu', async () => {
        component.workflowInfo = {
            workflowCode: 'AAA'
        } as Workflow;
        await component.ngOnInit();

        const onWorkflowItemMenuOpen = systemEventService.subscribe.calls.argsFor(0)[1];
        onWorkflowItemMenuOpen(undefined, { uid: 'BBB' });

        expect(component.isMenuOpen).toBe(false);
    });

    describe('on toggle menu', () => {
        it('GIVEN Workflow Info WHEN menu is open THEN it should publish Workflow Item Menu Opened event', () => {
            component.workflowInfo = {} as Workflow;

            component.toggleMenu();

            expect(systemEventService.publishAsync).toHaveBeenCalled();
        });

        it('GIVEN Workflow Info WHEN menu is closed THEN it should NOT publish Workflow Item Menu Opened event', () => {
            component.workflowInfo = {} as Workflow;
            component.isMenuOpen = true;

            component.toggleMenu();

            expect(systemEventService.publishAsync).not.toHaveBeenCalled();
        });
    });

    it('WHEN description has been edited THEN it should update description properly', async () => {
        component.workflowInfo = {
            description: 'initial description'
        } as Workflow;
        const expectedDescription = 'updated description';
        workflowFacade.editWorkflow.and.returnValue(
            Promise.resolve({
                description: expectedDescription
            })
        );

        await component.editDescription();

        expect(component.workflowInfo.description).toEqual(expectedDescription);
    });

    it('WHEN workflow cancellation has been confirmed THEN it should cancel workflow AND reload the page', async () => {
        workflowFacade.cancelWorflow.and.returnValue(Promise.resolve());

        await component.cancelWorkflow();

        expect(workflowFacade.cancelWorflow).toHaveBeenCalled();
        expect(routingService.reload).toHaveBeenCalled();
    });
});
