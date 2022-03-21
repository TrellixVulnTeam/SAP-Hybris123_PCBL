import { IWorkflowAction, IWorkflowOperation } from 'fixtures/entities/workflows';
import { WorkflowsService } from '../services';
export declare class WorkflowsController {
    private readonly workflowsService;
    constructor(workflowsService: WorkflowsService);
    getWorklowActionComments(actionCode: string, currentPage: string): {
        pagination: {
            count: number;
            page: string;
            totalCount: number;
            totalPages: number;
        };
        comments: ({
            authorName: string;
            code: string;
            createdAgoInMillis: number;
            text: string;
        } | {
            authorName: string;
            code: string;
            createdAgoInMillis: number;
            creationtime: string;
            decisionCode: string;
            decisionName: string;
            originalActionCode: string;
        })[];
    };
    getWorkflowActions(workflowCode: string): {
        actions: IWorkflowAction[];
        workflowCode: string;
    };
    createWorkflowOperation(res: any, payload: IWorkflowOperation): any;
    getWorkflowTemplates(): {
        templates: import("../../fixtures/entities/workflows").IWorkflowTemplate[];
    };
    getWorkflowEditableItems(itemUids: string): {
        editableItems: {
            uid: string;
            uuid: string;
            editableByUser: boolean;
        }[];
    };
    getWorkflowInstances(workflowCode: string): {
        createVersion: boolean;
        description: string;
        isAvailableForCurrentPrincipal: boolean;
        status: string;
        workflowCode: string;
    };
    getWorkflows(): {
        pagination: {
            count: number;
            page: number;
            totalCount: number;
            totalPages: number;
        };
        workflows: never[];
    };
}
