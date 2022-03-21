import { WorkflowAction } from './WorkflowAction';
import { WorkflowTaskPage } from './WorkflowTaskPage';
/**
 * Represents a workflow task.
 */
export interface WorkflowTask {
    action: WorkflowAction;
    attachments: WorkflowTaskPage[];
}
