import { TabData } from 'smarteditcommons';
import { Workflow, WorkflowAction } from '../../../dtos';
import { PageWorkflowMenuTabsData } from '../PageWorkflowMenuComponent';
export declare class PageWorkflowMenuAllTasksTabComponent {
    actions: WorkflowAction[];
    workflow: Workflow;
    constructor(tabData: TabData<PageWorkflowMenuTabsData>);
}
