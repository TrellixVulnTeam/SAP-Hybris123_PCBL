"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const workflows_1 = require("../../fixtures/constants/workflows");
const workflows_2 = require("../../fixtures/entities/workflows");
const services_1 = require("../services");
let WorkflowsController = (() => {
    let WorkflowsController = class WorkflowsController {
        constructor(workflowsService) {
            this.workflowsService = workflowsService;
        }
        getWorklowActionComments(actionCode, currentPage) {
            const comments = [];
            if (actionCode === 'Action1') {
                comments.push(this.workflowsService.createRegularComment('Comment1', 'This is the 1st workflow comment'), this.workflowsService.createDecisionComment('Action1', 'DecisionComment1'));
            }
            if (actionCode === 'Action2') {
                comments.push(this.workflowsService.createRegularComment('Comment2', 'please fix the component names'), this.workflowsService.createDecisionComment('Action1', 'DecisionComment1'), this.workflowsService.createRegularComment('Comment3', 'please fix the changes'), this.workflowsService.createRegularComment('Comment4', 'please review translations'), this.workflowsService.createRegularComment('Comment5', 'please review translations'), this.workflowsService.createRegularComment('Comment6', 'please review translations'), this.workflowsService.createDecisionComment('Action2', 'DecisionComment2', 'some description'), this.workflowsService.createRegularComment('Comment7', 'please review translations'), this.workflowsService.createRegularComment('Comment8', 'please review translations'));
            }
            if (actionCode === 'Action3') {
                comments.push(this.workflowsService.createRegularComment('Comment9', 'Good work'), this.workflowsService.createRegularComment('Comment10', 'missing translations'));
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
        getWorkflowActions(workflowCode) {
            const actions = this.workflowsService.getWorkflowActions();
            return {
                actions,
                workflowCode
            };
        }
        createWorkflowOperation(res, payload) {
            const action = this.workflowsService.getWorkflowActionByCode(payload.actionCode);
            if (!action) {
                return res
                    .status(common_1.HttpStatus.NOT_FOUND)
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
            this.workflowsService.updateWorkflowActionStatusByCode(payload.actionCode, 'Action2', workflows_1.WorkflowActionType.NORMAL, workflows_1.WorkflowActionStatus.COMPLETED, true);
            this.workflowsService.updateWorkflowActionStatusByCode('Action4', 'Action4', workflows_1.WorkflowActionType.END, workflows_1.WorkflowActionStatus.IN_PROGRESS, true);
            const updatedWorkflowStatus = action.actionType === workflows_1.WorkflowActionType.END
                ? workflows_1.WorkflowStatus.FINISHED
                : workflows_1.WorkflowStatus.RUNNING;
            return res
                .json({
                type: 'cmsWorkflowWsDTO',
                isAvailableForCurrentPrincipal: true,
                status: updatedWorkflowStatus,
                workflowCode: '000001J'
            })
                .send();
        }
        getWorkflowTemplates() {
            return {
                templates: workflows_1.workflowTemplates
            };
        }
        getWorkflowEditableItems(itemUids) {
            const uids = itemUids.split(',');
            const data = uids.map((uid) => ({
                uid,
                uuid: uid,
                editableByUser: false
            }));
            return {
                editableItems: data
            };
        }
        getWorkflowInstances(workflowCode) {
            return {
                createVersion: false,
                description: '',
                isAvailableForCurrentPrincipal: true,
                status: 'RUNNING',
                workflowCode
            };
        }
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
    };
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/catalogs/:catalogId/versions/:versionId/workflows/:workflowCode/actions/:actionCode/comments*'),
        tslib_1.__param(0, common_1.Param('actionCode')),
        tslib_1.__param(1, common_1.Query('currentPage')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], WorkflowsController.prototype, "getWorklowActionComments", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/catalogs/:catalogId/versions/:versionId/workflows/:workflowCode/actions'),
        tslib_1.__param(0, common_1.Param('workflowCode')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], WorkflowsController.prototype, "getWorkflowActions", null);
    tslib_1.__decorate([
        common_1.Post('cmswebservices/v1/catalogs/:catalogId/versions/:versionId/workflows/:workflowId/operations'),
        tslib_1.__param(0, common_1.Res()), tslib_1.__param(1, common_1.Body()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], WorkflowsController.prototype, "createWorkflowOperation", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/catalogs/:catalogId/versions/:versionId/workflowtemplates'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], WorkflowsController.prototype, "getWorkflowTemplates", null);
    tslib_1.__decorate([
        common_1.Get('cmssmarteditwebservices/v1/catalogs/:catalogId/versions/:versionId/workfloweditableitems*'),
        tslib_1.__param(0, common_1.Query('itemUids')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], WorkflowsController.prototype, "getWorkflowEditableItems", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/catalogs/:catalogId/versions/:versionId/workflows/:workflowCode'),
        tslib_1.__param(0, common_1.Param('workflowCode')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], WorkflowsController.prototype, "getWorkflowInstances", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/catalogs/:catalogId/versions/:versionId/workflows*'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], WorkflowsController.prototype, "getWorkflows", null);
    WorkflowsController = tslib_1.__decorate([
        common_1.Controller(),
        tslib_1.__metadata("design:paramtypes", [services_1.WorkflowsService])
    ], WorkflowsController);
    return WorkflowsController;
})();
exports.WorkflowsController = WorkflowsController;
//# sourceMappingURL=workflows.controller.js.map