"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const workflows_1 = require("../../fixtures/constants/workflows");
const workflows_2 = require("../../fixtures/entities/workflows");
let WorkflowsService = (() => {
    let WorkflowsService = class WorkflowsService {
        constructor() {
            this.workflowActions = [];
        }
        onModuleInit() {
            this.workflowActions.push(this.createAction('Action1', workflows_1.WorkflowActionType.NORMAL, workflows_1.WorkflowActionStatus.COMPLETED, true));
            this.workflowActions.push(this.createAction('Action2', workflows_1.WorkflowActionType.NORMAL, workflows_1.WorkflowActionStatus.IN_PROGRESS, true));
            this.workflowActions.push(this.createAction('Action3', workflows_1.WorkflowActionType.NORMAL, workflows_1.WorkflowActionStatus.IN_PROGRESS, false));
            this.workflowActions.push(this.createAction('Action4', workflows_1.WorkflowActionType.END, workflows_1.WorkflowActionStatus.PENDING, true));
        }
        getWorkflowActionByCode(actionCode) {
            return this.workflowActions.find((action) => action.code === actionCode);
        }
        updateWorkflowActionStatusByCode(actionCode, updateCode, updateType, updateStatus, updateIsCurrentUserParticipant) {
            const index = this.workflowActions.findIndex((action) => action.code === actionCode);
            if (index) {
                this.workflowActions.splice(index, 1, this.createAction(updateCode, updateType, updateStatus, updateIsCurrentUserParticipant));
            }
        }
        getWorkflowActions() {
            return [...this.workflowActions];
        }
        createDecisionComment(origActionCode, actionCode, description) {
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
        createRegularComment(actionCode, description) {
            return {
                authorName: 'CMS Translator',
                code: actionCode,
                createdAgoInMillis: 521011030,
                text: description
            };
        }
        createAction(code, type, actionStatus, isCurrentActionUserParticipant) {
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
    };
    WorkflowsService = tslib_1.__decorate([
        common_1.Injectable()
    ], WorkflowsService);
    return WorkflowsService;
})();
exports.WorkflowsService = WorkflowsService;
//# sourceMappingURL=workflowsService.service.js.map