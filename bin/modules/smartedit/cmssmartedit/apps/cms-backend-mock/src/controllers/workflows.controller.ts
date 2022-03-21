/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import {
    workflowTemplates,
    WorkflowActionStatus,
    WorkflowActionType,
    WorkflowStatus
} from 'fixtures/constants/workflows';
import { IWorkflowAction, IWorkflowOperation } from 'fixtures/entities/workflows';
import { WorkflowsService } from '../services';

@Controller()
export class WorkflowsController {
    constructor(private readonly workflowsService: WorkflowsService) {}

    @Get(
        'cmswebservices/v1/catalogs/:catalogId/versions/:versionId/workflows/:workflowCode/actions/:actionCode/comments*'
    )
    getWorklowActionComments(
        @Param('actionCode') actionCode: string,
        @Query('currentPage') currentPage: string
    ) {
        const comments = [];

        if (actionCode === 'Action1') {
            comments.push(
                this.workflowsService.createRegularComment(
                    'Comment1',
                    'This is the 1st workflow comment'
                ),
                this.workflowsService.createDecisionComment('Action1', 'DecisionComment1')
            );
        }
        if (actionCode === 'Action2') {
            comments.push(
                this.workflowsService.createRegularComment(
                    'Comment2',
                    'please fix the component names'
                ),
                this.workflowsService.createDecisionComment('Action1', 'DecisionComment1'),
                this.workflowsService.createRegularComment('Comment3', 'please fix the changes'),
                this.workflowsService.createRegularComment(
                    'Comment4',
                    'please review translations'
                ),
                this.workflowsService.createRegularComment(
                    'Comment5',
                    'please review translations'
                ),
                this.workflowsService.createRegularComment(
                    'Comment6',
                    'please review translations'
                ),
                this.workflowsService.createDecisionComment(
                    'Action2',
                    'DecisionComment2',
                    'some description'
                ),
                this.workflowsService.createRegularComment(
                    'Comment7',
                    'please review translations'
                ),
                this.workflowsService.createRegularComment('Comment8', 'please review translations')
            );
        }
        if (actionCode === 'Action3') {
            comments.push(
                this.workflowsService.createRegularComment('Comment9', 'Good work'),
                this.workflowsService.createRegularComment('Comment10', 'missing translations')
            );
        }

        return {
            pagination: {
                count: comments.length,
                page: currentPage,
                totalCount: comments.length,
                totalPages: 1
            },
            comments
        };
    }

    @Get(
        'cmswebservices/v1/catalogs/:catalogId/versions/:versionId/workflows/:workflowCode/actions'
    )
    getWorkflowActions(@Param('workflowCode') workflowCode: string) {
        const actions: IWorkflowAction[] = this.workflowsService.getWorkflowActions();

        return {
            actions,
            workflowCode
        };
    }

    @Post(
        'cmswebservices/v1/catalogs/:catalogId/versions/:versionId/workflows/:workflowId/operations'
    )
    createWorkflowOperation(@Res() res: any, @Body() payload: IWorkflowOperation) {
        const action: IWorkflowAction | undefined = this.workflowsService.getWorkflowActionByCode(
            payload.actionCode
        );

        if (!action) {
            return res
                .status(HttpStatus.NOT_FOUND)
                .json({
                    errors: [
                        {
                            message: 'No workflow action item found for code',
                            type: 'UnknownIdentifierError'
                        }
                    ]
                })
                .send();
        }

        this.workflowsService.updateWorkflowActionStatusByCode(
            payload.actionCode,
            'Action2',
            WorkflowActionType.NORMAL,
            WorkflowActionStatus.COMPLETED,
            true
        );

        this.workflowsService.updateWorkflowActionStatusByCode(
            'Action4',
            'Action4',
            WorkflowActionType.END,
            WorkflowActionStatus.IN_PROGRESS,
            true
        );

        const updatedWorkflowStatus =
            action.actionType === WorkflowActionType.END
                ? WorkflowStatus.FINISHED
                : WorkflowStatus.RUNNING;

        return res
            .json({
                type: 'cmsWorkflowWsDTO',
                isAvailableForCurrentPrincipal: true,
                status: updatedWorkflowStatus,
                workflowCode: '000001J'
            })
            .send();
    }

    @Get('cmswebservices/v1/catalogs/:catalogId/versions/:versionId/workflowtemplates')
    getWorkflowTemplates() {
        return {
            templates: workflowTemplates
        };
    }

    @Get(
        'cmssmarteditwebservices/v1/catalogs/:catalogId/versions/:versionId/workfloweditableitems*'
    )
    getWorkflowEditableItems(@Query('itemUids') itemUids: string) {
        const uids: string[] = itemUids.split(',');

        const data = uids.map((uid: string) => ({
            uid,
            uuid: uid,
            editableByUser: false
        }));

        return {
            editableItems: data
        };
    }

    @Get('cmswebservices/v1/catalogs/:catalogId/versions/:versionId/workflows/:workflowCode')
    getWorkflowInstances(@Param('workflowCode') workflowCode: string) {
        return {
            createVersion: false,
            description: '',
            isAvailableForCurrentPrincipal: true,
            status: 'RUNNING',
            workflowCode
        };
    }

    @Get('cmswebservices/v1/catalogs/:catalogId/versions/:versionId/workflows*')
    getWorkflows() {
        return {
            pagination: {
                count: 1,
                page: 0,
                totalCount: 0,
                totalPages: 0
            },
            workflows: []
        };
    }
}
