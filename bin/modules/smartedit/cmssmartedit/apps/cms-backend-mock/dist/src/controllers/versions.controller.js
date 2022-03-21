"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const services_1 = require("../services");
let VersionsController = (() => {
    let VersionsController = class VersionsController {
        constructor(versionsService) {
            this.versionsService = versionsService;
        }
        setCMSVersionOnItem(versionId) {
            if (versionId === 'homepage_version4') {
                throw new common_1.NotFoundException();
            }
        }
        deleteVersion(versionId) {
            if (versionId === 'homepage_version4') {
                throw new common_1.NotFoundException();
            }
            this.versionsService.deletePageVersionByID(versionId);
        }
        replacePageVersion(res, siteId, itemUUID, versionId, versionPayload) {
            if (versionId === 'homepage_version4') {
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json({
                    errors: [
                        {
                            message: 'The value provided is already in use.',
                            reason: 'invalid',
                            subject: 'label',
                            subjectType: 'parameter',
                            type: 'ValidationError'
                        }
                    ]
                })
                    .send();
            }
            this.versionsService.updatePageMockVersion(siteId, itemUUID, versionId, versionPayload);
            return res.json(versionPayload).send();
        }
        createCMSVersion(res, versionData, itemUUID) {
            if (versionData.label === 'New Test Version') {
                return res
                    .json({
                    uid: 'homepage_version_new',
                    itemUUID,
                    label: versionData.label,
                    description: versionData.description,
                    creationtime: '2018-01-01T21:59:59+0000'
                })
                    .send();
            }
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({
                errors: [
                    {
                        message: 'The value provided is already in use.',
                        reason: 'invalid',
                        subject: 'label',
                        subjectType: 'parameter',
                        type: 'ValidationError'
                    }
                ]
            })
                .send();
        }
        getCMSVersions(siteId, itemUUID, mask, currentPage, pageSize) {
            const pSize = pageSize && /^\d+$/.test(pageSize) ? +pageSize : 1;
            const currPage = currentPage && /^\d+$/.test(currentPage) ? +currentPage : 0;
            const filteredVersions = this.versionsService.filterVersionsByMask(siteId, itemUUID, mask);
            const slicedVersions = this.versionsService.sliceVersions(currPage, pSize, filteredVersions);
            const pageResult = {
                pagination: {
                    count: pSize,
                    hasNest: true,
                    hasPrevious: true,
                    page: currPage,
                    totalCount: filteredVersions.length,
                    totalPages: Math.floor(filteredVersions.length / pSize)
                },
                results: slicedVersions
            };
            return pageResult;
        }
        refreshFixture() {
            this.versionsService.refreshPageMockVersions();
        }
    };
    tslib_1.__decorate([
        common_1.Post('cmswebservices/v1/sites/:siteId/cmsitems/:itemUUID/versions/:versionId/rollbacks'),
        common_1.HttpCode(204),
        tslib_1.__param(0, common_1.Param('versionId')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], VersionsController.prototype, "setCMSVersionOnItem", null);
    tslib_1.__decorate([
        common_1.Delete('cmswebservices/v1/sites/:siteId/cmsitems/:itemUUID/versions/:versionId'),
        common_1.HttpCode(204),
        tslib_1.__param(0, common_1.Param('versionId')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], VersionsController.prototype, "deleteVersion", null);
    tslib_1.__decorate([
        common_1.Put('cmswebservices/v1/sites/:siteId/cmsitems/:itemUUID/versions/:versionId'),
        tslib_1.__param(0, common_1.Res()),
        tslib_1.__param(1, common_1.Param('siteId')),
        tslib_1.__param(2, common_1.Param('itemUUID')),
        tslib_1.__param(3, common_1.Param('versionId')),
        tslib_1.__param(4, common_1.Body()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, String, String, String, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], VersionsController.prototype, "replacePageVersion", null);
    tslib_1.__decorate([
        common_1.Post('cmswebservices/v1/sites/:siteId/cmsitems/:itemUUID/versions'),
        tslib_1.__param(0, common_1.Res()),
        tslib_1.__param(1, common_1.Body()),
        tslib_1.__param(2, common_1.Param('itemUUID')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], VersionsController.prototype, "createCMSVersion", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/sites/:siteId/cmsitems/:itemUUID/versions*'),
        tslib_1.__param(0, common_1.Param('siteId')),
        tslib_1.__param(1, common_1.Param('itemUUID')),
        tslib_1.__param(2, common_1.Query('mask')),
        tslib_1.__param(3, common_1.Query('currentPage')),
        tslib_1.__param(4, common_1.Query('pageSize')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, String, String, String, String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], VersionsController.prototype, "getCMSVersions", null);
    tslib_1.__decorate([
        common_1.Post('cmswebservices/refresh/versions'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], VersionsController.prototype, "refreshFixture", null);
    VersionsController = tslib_1.__decorate([
        common_1.Controller(),
        tslib_1.__metadata("design:paramtypes", [services_1.VersionsService])
    ], VersionsController);
    return VersionsController;
})();
exports.VersionsController = VersionsController;
//# sourceMappingURL=versions.controller.js.map