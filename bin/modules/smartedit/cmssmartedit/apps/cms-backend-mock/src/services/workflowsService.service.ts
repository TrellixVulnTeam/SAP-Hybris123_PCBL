/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { WorkflowActionStatus, WorkflowActionType } from 'fixtures/constants/workflows';
import { IWorkflowAction } from 'fixtures/entities/workflows';

@Injectable()
export class WorkflowsService implements OnModuleInit {
    private workflowActions: IWorkflowAction[] = [];

    onModuleInit() {
        this.workflowActions.push(
            this.createAction(
                'Action1',
                WorkflowActionType.NORMAL,
                WorkflowActionStatus.COMPLETED,
                true
            )
        );
        this.workflowActions.push(
            this.createAction(
                'Action2',
                WorkflowActionType.NORMAL,
                WorkflowActionStatus.IN_PROGRESS,
                true
            )
        );
        this.workflowActions.push(
            this.createAction(
                'Action3',
                WorkflowActionType.NORMAL,
                WorkflowActionStatus.IN_PROGRESS,
                false
            )
        );
        this.workflowActions.push(
            this.createAction('Action4', WorkflowActionType.END, WorkflowActionStatus.PENDING, true)
        );
    }

    getWorkflowActionByCode(actionCode: string) {
        return this.workflowActions.find((action: IWorkflowAction) => action.code === actionCode);
    }

    updateWorkflowActionStatusByCode(
        actionCode: string,
        updateCode: string,
        updateType: string,
        updateStatus: string,
        updateIsCurrentUserParticipant: boolean
    ) {
        const index: number | undefined = this.workflowActions.findIndex(
            (action: IWorkflowAction) => action.code === actionCode
        );

        if (index) {
            this.workflowActions.splice(
                index,
                1,
                this.createAction(
                    updateCode,
                    updateType,
                    updateStatus,
                    updateIsCurrentUserParticipant
                )
            );
        }
    }

    getWorkflowActions() {
        return [...this.workflowActions];
    }

    createDecisionComment(origActionCode: string, actionCode: string, description?: string) {
        const decisionComment = {
            authorName: 'CMS Manager',
            code: actionCode,
            createdAgoInMillis: 75752260,
            creationtime: '2019-01-23T19:37:03.567z',
            decisionCode: 'Reject',
            decisionName: 'Reject',
            originalActionCode: origActionCode
        };

        if (description) {
            Object.assign(decisionComment, { text: description });
        }

        return decisionComment;
    }

    createRegularComment(actionCode: string, description: string) {
        return {
            authorName: 'CMS Translator',
            code: actionCode,
            createdAgoInMillis: 521011030,
            text: description
        };
    }

    createAction(
        code: string,
        type: string,
        actionStatus: string,
        isCurrentActionUserParticipant: boolean
    ) {
        return {
            actionType: type,
            code,
            decisions: [
                {
                    code: code + 'Approve',
                    description: { en: 'Approve For ' + code },
                    name: { en: 'Approve' }
                },
                {
                    code: code + 'Reject',
                    description: { en: 'Reject For ' + code },
                    name: { en: 'Reject' }
                }
            ],
            description: { en: 'This is ' + code },
            isCurrentUserParticipant: isCurrentActionUserParticipant,
            startedAgoInMillis: 86841180,
            name: { en: code },
            status: actionStatus
        };
    }
}
