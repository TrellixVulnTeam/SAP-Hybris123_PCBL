import { OnModuleInit } from '@nestjs/common';
import { IWorkflowAction } from 'fixtures/entities/workflows';
export declare class WorkflowsService implements OnModuleInit {
    private workflowActions;
    onModuleInit(): void;
    getWorkflowActionByCode(actionCode: string): IWorkflowAction | undefined;
    updateWorkflowActionStatusByCode(actionCode: string, updateCode: string, updateType: string, updateStatus: string, updateIsCurrentUserParticipant: boolean): void;
    getWorkflowActions(): IWorkflowAction[];
    createDecisionComment(origActionCode: string, actionCode: string, description?: string): {
        authorName: string;
        code: string;
        createdAgoInMillis: number;
        creationtime: string;
        decisionCode: string;
        decisionName: string;
        originalActionCode: string;
    };
    createRegularComment(actionCode: string, description: string): {
        authorName: string;
        code: string;
        createdAgoInMillis: number;
        text: string;
    };
    createAction(code: string, type: string, actionStatus: string, isCurrentActionUserParticipant: boolean): {
        actionType: string;
        code: string;
        decisions: {
            code: string;
            description: {
                en: string;
            };
            name: {
                en: string;
            };
        }[];
        description: {
            en: string;
        };
        isCurrentUserParticipant: boolean;
        startedAgoInMillis: number;
        name: {
            en: string;
        };
        status: string;
    };
}
