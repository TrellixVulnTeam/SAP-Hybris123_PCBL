"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGroupsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const userGroups_1 = require("../../fixtures/constants/userGroups");
const userGroups_2 = require("../../fixtures/entities/userGroups");
let UserGroupsController = (() => {
    let UserGroupsController = class UserGroupsController {
        getUserGroupByID(userGroupId) {
            const resultUserGroup = userGroups_1.userGroupsList.find((userGroup) => userGroup.uid === userGroupId);
            return resultUserGroup ? resultUserGroup : userGroups_1.userGroupsList[0];
        }
        getUserGroups() {
            return {
                pagination: {
                    count: userGroups_1.userGroupsList.length,
                    page: 1,
                    totalCount: userGroups_1.userGroupsList.length,
                    totalPages: 1
                },
                userGroups: userGroups_1.userGroupsList
            };
        }
    };
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/usergroups/:userGroupId'),
        tslib_1.__param(0, common_1.Param('userGroupId')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], UserGroupsController.prototype, "getUserGroupByID", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/usergroups*'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], UserGroupsController.prototype, "getUserGroups", null);
    UserGroupsController = tslib_1.__decorate([
        common_1.Controller()
    ], UserGroupsController);
    return UserGroupsController;
})();
exports.UserGroupsController = UserGroupsController;
//# sourceMappingURL=usergroups.controller.js.map