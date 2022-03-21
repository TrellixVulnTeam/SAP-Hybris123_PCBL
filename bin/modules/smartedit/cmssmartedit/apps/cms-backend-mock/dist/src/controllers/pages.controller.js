"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const pageContents_1 = require("../../fixtures/constants/pageContents");
const pages_1 = require("../../fixtures/constants/pages");
let PagesController = (() => {
    let PagesController = class PagesController {
        getFallbackPages() {
            return {
                uids: ['secondpage']
            };
        }
        getPageContentSlotComponents() {
            return { pageContentSlotComponentList: pageContents_1.pageContentSlotComponentList };
        }
        getPageContentSlotContainers() {
            return { pageContentSlotContainerList: [] };
        }
        getPageContentSlots(versionId, slotId) {
            switch (slotId) {
                case 'topHeaderSlot':
                    return { pageContentSlotList: [pageContents_1.topHeaderSlot] };
                case 'bottomHeaderSlot':
                    return { pageContentSlotList: [pageContents_1.bottomHeaderSlot] };
                case 'otherSlot':
                    return { pageContentSlotList: [pageContents_1.otherSlot] };
                case 'footerSlot':
                    return { pageContentSlotList: [pageContents_1.footerSlot] };
            }
            if (versionId === 'Online') {
                return { pageContentSlotList: [] };
            }
            return { pageContentSlotList: pageContents_1.pageContentSlotList };
        }
        getPageTemplateData() {
            return {
                templates: [
                    {
                        frontEndName: 'pageTemplate1',
                        name: 'Page Template 1',
                        previewIcon: 'previewIcon 1',
                        uid: 'pageTemplate1',
                        uuid: 'pageTemplate1'
                    },
                    {
                        frontEndName: 'pageTemplate2',
                        name: 'Page Template 2',
                        previewIcon: 'previewIcon 2',
                        uid: 'pageTemplate2',
                        uuid: 'pageTemplate2'
                    }
                ]
            };
        }
        getVariationPages(pageId) {
            if (pageId && pageId === 'homepage') {
                return {
                    uids: ['MOCKED_VARIATION_PAGE_ID']
                };
            }
            else {
                return {
                    uids: []
                };
            }
        }
        getPageByID(pageId) {
            if (pageId === 'thirdpage') {
                return {
                    uids: []
                };
            }
            const resultPage = pages_1.pages.find((page) => page.uid === pageId);
            return resultPage ? resultPage : pages_1.pages[0];
        }
        createPage(payload) {
            if (payload.uid && payload.uid === 'bla') {
                return [
                    400,
                    {
                        errors: [
                            {
                                message: 'Some error msg.',
                                reason: 'invalid',
                                subject: 'uid',
                                subjectType: 'parameter',
                                type: 'ValidationError'
                            }
                        ]
                    }
                ];
            }
            return {
                uid: 'valid'
            };
        }
        getDefaultPages(typeCode) {
            if (typeCode) {
                switch (typeCode) {
                    case 'ContentPage':
                        return {
                            pages: [
                                {
                                    creationtime: '2016-04-08T21:16:41+0000',
                                    modifiedtime: '2016-04-08T21:16:41+0000',
                                    pk: '8796387968048',
                                    masterTemplate: 'PageTemplate',
                                    name: 'page1TitleSuffix',
                                    label: 'page1TitleSuffix',
                                    typeCode: 'ContentPage',
                                    uid: 'auid1'
                                }
                            ]
                        };
                    case 'CategoryPage':
                        return {
                            pages: [
                                {
                                    creationtime: '2016-04-08T21:16:41+0000',
                                    modifiedtime: '2016-04-08T21:16:41+0000',
                                    pk: '8796387968048',
                                    masterTemplate: 'PageTemplate',
                                    name: 'page1TitleSuffix',
                                    label: 'page1TitleSuffix',
                                    typeCode: 'ContentPage',
                                    uid: 'auid1'
                                }
                            ]
                        };
                    case 'ProductPage':
                        return {
                            pages: [
                                {
                                    creationtime: '2016-04-08T21:16:41+0000',
                                    modifiedtime: '2016-04-08T21:16:41+0000',
                                    pk: '8796387968058',
                                    masterTemplate: 'PageTemplate',
                                    name: 'productPage1',
                                    label: 'productPage1',
                                    typeCode: 'CategoryPage',
                                    uid: 'auid2'
                                }
                            ]
                        };
                    default:
                        return {
                            pagination: {
                                count: 10,
                                page: 1,
                                totalCount: pages_1.pages.length,
                                totalPages: 3
                            },
                            pages: pages_1.pages
                        };
                }
            }
            else {
                return { pages: pages_1.pages };
            }
        }
    };
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/sites/:siteId/catalogs/:catalogId/versions/:versionId/pages/:pageId/fallbacks'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesController.prototype, "getFallbackPages", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/sites/:siteId/catalogs/:catalogId/versions/:versionId/pagescontentslotscomponents*'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesController.prototype, "getPageContentSlotComponents", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/sites/:siteId/catalogs/:catalogId/versions/:versionId/pagescontentslotscontainers*'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesController.prototype, "getPageContentSlotContainers", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/sites/:siteId/catalogs/:catalogId/versions/:versionId/pagescontentslots*'),
        tslib_1.__param(0, common_1.Param('versionId')), tslib_1.__param(1, common_1.Query('slotId')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesController.prototype, "getPageContentSlots", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/sites/:siteId/catalogs/:catalogId/versions/:versionId/pagetemplates*'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesController.prototype, "getPageTemplateData", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/sites/:siteId/catalogs/:catalogId/versions/:versionId/pages/:pageId/variations'),
        tslib_1.__param(0, common_1.Query('pageId')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesController.prototype, "getVariationPages", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/sites/:siteId/catalogs/:catalogId/versions/:versionId/pages/:pageId'),
        tslib_1.__param(0, common_1.Param('pageId')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesController.prototype, "getPageByID", null);
    tslib_1.__decorate([
        common_1.Post('cmswebservices/v1/sites/:siteId/catalogs/:catalogId/versions/:versionId/pages'),
        tslib_1.__param(0, common_1.Body()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesController.prototype, "createPage", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/sites/:siteId/catalogs/:catalogId/versions/:versionId/pages*'),
        tslib_1.__param(0, common_1.Query('typeCode')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesController.prototype, "getDefaultPages", null);
    PagesController = tslib_1.__decorate([
        common_1.Controller()
    ], PagesController);
    return PagesController;
})();
exports.PagesController = PagesController;
//# sourceMappingURL=pages.controller.js.map