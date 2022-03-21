"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let InboxController = (() => {
    let InboxController = class InboxController {
        getWorkflowTasks() {
            return {
                pagination: {
                    count: 0,
                    page: 0,
                    totalCount: 0,
                    totalPages: 0
                },
                tasks: []
            };
        }
    };
    tslib_1.__decorate([
        common_1.Get('cmssmarteditwebservices/v1/inbox/workflowtasks*'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], InboxController.prototype, "getWorkflowTasks", null);
    InboxController = tslib_1.__decorate([
        common_1.Controller()
    ], InboxController);
    return InboxController;
})();
exports.InboxController = InboxController;
//# sourceMappingURL=inbox.controller.js.map