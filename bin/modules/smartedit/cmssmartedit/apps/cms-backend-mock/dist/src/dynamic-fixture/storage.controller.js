"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const baseURL_gruard_1 = require("./guards/baseURL.gruard");
const storage_service_1 = require("./services/storage.service");
let StorageController = (() => {
    let StorageController = class StorageController {
        constructor(storageService) {
            this.storageService = storageService;
        }
        storeModificationFixture(body) {
            return this.storageService.storeModificationFixture(body);
        }
        storeReplacementFixture(body) {
            return this.storageService.storeReplacementFixture(body);
        }
        removeFixture(fixtureID) {
            this.storageService.removeFixture(fixtureID);
        }
        removeAllFixtures() {
            this.storageService.removeAllFixtures();
        }
    };
    tslib_1.__decorate([
        common_1.Post('*/modify'),
        tslib_1.__param(0, common_1.Body()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], StorageController.prototype, "storeModificationFixture", null);
    tslib_1.__decorate([
        common_1.Post('*/replace'),
        tslib_1.__param(0, common_1.Body()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], StorageController.prototype, "storeReplacementFixture", null);
    tslib_1.__decorate([
        common_1.Delete('*/fixture/:fixtureID'),
        tslib_1.__param(0, common_1.Param('fixtureID')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], StorageController.prototype, "removeFixture", null);
    tslib_1.__decorate([
        common_1.Delete('*/fixture'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], StorageController.prototype, "removeAllFixtures", null);
    StorageController = tslib_1.__decorate([
        common_1.Controller(),
        common_1.UseGuards(baseURL_gruard_1.BaseURLGuard),
        tslib_1.__metadata("design:paramtypes", [storage_service_1.StorageService])
    ], StorageController);
    return StorageController;
})();
exports.StorageController = StorageController;
//# sourceMappingURL=storage.controller.js.map