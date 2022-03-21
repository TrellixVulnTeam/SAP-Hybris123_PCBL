/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, Inject } from '@angular/core';
import { TabData, TAB_DATA } from 'smarteditcommons';
import { Workflow, WorkflowAction } from '../../../dtos';
import { PageWorkflowMenuTabsData } from '../PageWorkflowMenuComponent';

@Component({
    selector: 'se-page-workflow-menu-all-tasks-tab',
    template: `
        <se-page-workflow-menu-tasks-tab
            [actions]="actions"
            [workflow]="workflow"
            [canMakeDecisions]="false"
        >
        </se-page-workflow-menu-tasks-tab>
    `
})
export class PageWorkflowMenuAllTasksTabComponent {
    public actions: WorkflowAction[];
    public workflow: Workflow;

    constructor(@Inject(TAB_DATA) tabData: TabData<PageWorkflowMenuTabsData>) {
        ({ actions: this.actions, workflow: this.workflow } = tabData.model);
    }
}
