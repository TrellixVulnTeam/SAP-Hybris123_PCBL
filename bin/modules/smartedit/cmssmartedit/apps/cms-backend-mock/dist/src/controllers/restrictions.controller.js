"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestrictionsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const contentSlots_1 = require("../../fixtures/constants/contentSlots");
const restrictions_1 = require("../../fixtures/constants/restrictions");
let RestrictionsController = (() => {
    let RestrictionsController = class RestrictionsController {
        getTypeRestrictions(pageId, slotId) {
            if (pageId === 'secondpage') {
                return {
                    contentSlotName: '',
                    validComponentTypes: []
                };
            }
            else if (pageId === 'homepage') {
                switch (slotId) {
                    case 'topHeaderSlot':
                        return contentSlots_1.topHeaderSlot;
                    case 'bottomHeaderSlot':
                        return contentSlots_1.bottomHeaderSlot;
                    case 'footerSlot':
                        return contentSlots_1.footerSlot;
                    case 'otherSlot':
                        return contentSlots_1.otherSlot;
                    case 'staticDummySlot':
                        return contentSlots_1.staticDummySlot;
                    case 'emptyDummySlot':
                        return contentSlots_1.emptyDummySlot;
                    case 'searchBoxSlot':
                        return contentSlots_1.searchBoxSlot;
                }
            }
            return {};
        }
        getTypeRestrictionsBySlotIds(pageId, payload) {
            if (pageId === 'homepage' && payload.pageUid === 'homepage') {
                return [
                    contentSlots_1.topHeaderSlot,
                    contentSlots_1.bottomHeaderSlot,
                    contentSlots_1.footerSlot,
                    contentSlots_1.otherSlot,
                    contentSlots_1.staticDummySlot,
                    contentSlots_1.emptyDummySlot,
                    contentSlots_1.searchBoxSlot
                ];
            }
            return [];
        }
        getPageTypeRestrictionTypes() {
            return { pageTypeRestrictionTypeList: restrictions_1.pageTypeRestrictionTypeList };
        }
        getRestrictionTypes() {
            return { restrictionTypes: restrictions_1.restrictionTypes };
        }
        getPageRestrictions() {
            return { pageRestrictionList: restrictions_1.pageRestrictionList };
        }
    };
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/catalogs/:catalogId/versions/:versionId/pages/:pageId/contentslots/:slotId/typerestrictions'),
        tslib_1.__param(0, common_1.Param('pageId')), tslib_1.__param(1, common_1.Param('slotId')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], RestrictionsController.prototype, "getTypeRestrictions", null);
    tslib_1.__decorate([
        common_1.Post('cmswebservices/v1/catalogs/:catalogId/versions/:versionId/pages/:pageId/typerestrictions'),
        common_1.HttpCode(200),
        tslib_1.__param(0, common_1.Param('pageId')), tslib_1.__param(1, common_1.Body()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], RestrictionsController.prototype, "getTypeRestrictionsBySlotIds", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/pagetypesrestrictiontypes'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], RestrictionsController.prototype, "getPageTypeRestrictionTypes", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/restrictiontypes'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], RestrictionsController.prototype, "getRestrictionTypes", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/pagesrestrictions'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], RestrictionsController.prototype, "getPageRestrictions", null);
    RestrictionsController = tslib_1.__decorate([
        common_1.Controller()
    ], RestrictionsController);
    return RestrictionsController;
})();
exports.RestrictionsController = RestrictionsController;
//# sourceMappingURL=restrictions.controller.js.map