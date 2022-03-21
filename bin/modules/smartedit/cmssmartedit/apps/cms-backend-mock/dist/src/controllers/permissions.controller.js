"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const permissions_1 = require("../../fixtures/constants/permissions");
const permissions_2 = require("../../fixtures/entities/permissions");
let PermissionsController = (() => {
    let PermissionsController = class PermissionsController {
        getGlobalPermissions() {
            return permissions_1.globalPermissions;
        }
        getCatalogPermissions(catalogVersion) {
            const permissionsList = catalogVersion === 'Online' ? permissions_1.onlineCatalogPermissions : permissions_1.stagedCatalogPermissions;
            return {
                permissionsList
            };
        }
        getAttributesPermissions() {
            return {
                permissionsList: []
            };
        }
        getTypePermissions() {
            return {
                permissionsList: permissions_1.typePermissions
            };
        }
    };
    tslib_1.__decorate([
        common_1.Post('permissionswebservices/v1/permissions/global*'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PermissionsController.prototype, "getGlobalPermissions", null);
    tslib_1.__decorate([
        common_1.Post('permissionswebservices/v1/permissions/catalogs*'),
        tslib_1.__param(0, common_1.Query('catalogVersion')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], PermissionsController.prototype, "getCatalogPermissions", null);
    tslib_1.__decorate([
        common_1.Post('permissionswebservices/v1/permissions/attributes*'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PermissionsController.prototype, "getAttributesPermissions", null);
    tslib_1.__decorate([
        common_1.Post('permissionswebservices/v1/permissions/types*'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PermissionsController.prototype, "getTypePermissions", null);
    PermissionsController = tslib_1.__decorate([
        common_1.Controller()
    ], PermissionsController);
    return PermissionsController;
})();
exports.PermissionsController = PermissionsController;
//# sourceMappingURL=permissions.controller.js.map