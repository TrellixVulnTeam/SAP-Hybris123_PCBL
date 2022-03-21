"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesAndNavigationsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const allSites_constant_1 = require("../../fixtures/constants/allSites.constant");
const catalogs_1 = require("../../fixtures/constants/catalogs");
const targetContentCatalogVersions_constant_1 = require("../../fixtures/constants/targetContentCatalogVersions.constant");
const catalogIds_entity_1 = require("../../fixtures/entities/catalogIds.entity");
const site_entity_1 = require("../../fixtures/entities/sites/site.entity");
let PagesAndNavigationsController = (() => {
    let PagesAndNavigationsController = class PagesAndNavigationsController {
        getCatalogItems(siteId, catalogId, versionId, currentPage, pageSize, sort) {
            if (siteId === 'apparel-uk' &&
                catalogId === 'apparel-ukContentCatalog' &&
                versionId === 'Staged' &&
                currentPage === '0' &&
                pageSize === '10' &&
                sort === 'name') {
                return {
                    componentItems: [
                        {
                            creationtime: '2016-08-17T16:05:47+0000',
                            modifiedtime: '2016-08-17T16:05:47+0000',
                            name: 'Component 1',
                            pk: '1',
                            typeCode: 'CMSParagraphComponent',
                            uid: 'component1',
                            visible: true
                        },
                        {
                            creationtime: '2016-08-17T16:05:47+0000',
                            modifiedtime: '2016-08-17T16:05:47+0000',
                            name: 'Component 2',
                            pk: '2',
                            typeCode: 'componentType2',
                            uid: 'component2',
                            visible: true
                        },
                        {
                            creationtime: '2016-08-17T16:05:47+0000',
                            modifiedtime: '2016-08-17T16:05:47+0000',
                            name: 'Component 3',
                            pk: '3',
                            typeCode: 'componentType3',
                            uid: 'component3',
                            visible: true
                        },
                        {
                            creationtime: '2016-08-17T16:05:47+0000',
                            modifiedtime: '2016-08-17T16:05:47+0000',
                            name: 'Component 4',
                            pk: '4',
                            typeCode: 'componentType4',
                            uid: 'component4',
                            visible: true
                        },
                        {
                            creationtime: '2016-08-17T16:05:47+0000',
                            modifiedtime: '2016-08-17T16:05:47+0000',
                            name: 'Component 5',
                            pk: '5',
                            typeCode: 'componentType5',
                            uid: 'component5',
                            visible: true
                        }
                    ]
                };
            }
            return {};
        }
        getTargetContentCatalogVersions(params) {
            let res = targetContentCatalogVersions_constant_1.versions;
            if (params.siteId === 'apparel-uk') {
                res =
                    params.versionId === 'Staged'
                        ? targetContentCatalogVersions_constant_1.versions.filter((version) => version.uuid === 'apparel-ukContentCatalog/Staged' &&
                            version.version === 'Staged')
                        : [];
            }
            else if (params.siteId === 'apparel' && params.versionId === 'Staged') {
                res = targetContentCatalogVersions_constant_1.versions.filter((version) => version.uuid === 'apparelContentCatalog/Staged' && version.version === 'Staged');
            }
            return { versions: res };
        }
        getCatalogVersions() {
            return {
                name: {
                    en: 'Apparel UK Content Catalog'
                },
                pageDisplayConditions: [
                    {
                        options: [
                            {
                                label: 'page.displaycondition.variation',
                                id: 'VARIATION'
                            }
                        ],
                        typecode: 'ProductPage'
                    },
                    {
                        options: [
                            {
                                label: 'page.displaycondition.variation',
                                id: 'VARIATION'
                            }
                        ],
                        typecode: 'CategoryPage'
                    },
                    {
                        options: [
                            {
                                label: 'page.displaycondition.primary',
                                id: 'PRIMARY'
                            },
                            {
                                label: 'page.displaycondition.variation',
                                id: 'VARIATION'
                            }
                        ],
                        typecode: 'ContentPage'
                    }
                ],
                uid: 'apparel-ukContentCatalog',
                version: 'Online'
            };
        }
        getContentCatalog(baseSiteId) {
            if (baseSiteId === 'apparel-de') {
                return {
                    catalogs: [catalogs_1.apparelContentCatalogDE]
                };
            }
            else if (baseSiteId === 'apparel-uk') {
                return {
                    catalogs: [catalogs_1.apparelContentCatalogUK]
                };
            }
            return {
                catalogs: [catalogs_1.apparelContentCatalogGlobal]
            };
        }
        getProductCatalog() {
            return {
                catalogs: [catalogs_1.productCatalogGlobal]
            };
        }
        searchCatalogs(catalogIdsDTO) {
            const sites = allSites_constant_1.allSites.filter((site) => site.contentCatalogs.filter((catalog) => catalogIdsDTO.catalogIds && catalogIdsDTO.catalogIds.indexOf(catalog) !== -1).length > 0);
            return { sites };
        }
        getSites() {
            return { sites: allSites_constant_1.allSites };
        }
    };
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/sites/:siteId/catalogs/:catalogId/versions/:versionId/items*'),
        tslib_1.__param(0, common_1.Param('siteId')),
        tslib_1.__param(1, common_1.Param('catalogId')),
        tslib_1.__param(2, common_1.Param('versionId')),
        tslib_1.__param(3, common_1.Query('currentPage')),
        tslib_1.__param(4, common_1.Query('pageSize')),
        tslib_1.__param(5, common_1.Query('sort')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesAndNavigationsController.prototype, "getCatalogItems", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/sites/:siteId/catalogs/:catalogId/versions/:versionId/targets*'),
        tslib_1.__param(0, common_1.Param()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesAndNavigationsController.prototype, "getTargetContentCatalogVersions", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/sites/:siteId/catalogs/:catalogId/versions/:versionId'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesAndNavigationsController.prototype, "getCatalogVersions", null);
    tslib_1.__decorate([
        common_1.Get('cmssmarteditwebservices/v1/sites/:baseSiteId/contentcatalogs'),
        tslib_1.__param(0, common_1.Param('baseSiteId')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesAndNavigationsController.prototype, "getContentCatalog", null);
    tslib_1.__decorate([
        common_1.Get('cmssmarteditwebservices/v1/sites/:baseSiteId/productcatalogs'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesAndNavigationsController.prototype, "getProductCatalog", null);
    tslib_1.__decorate([
        common_1.Post('cmswebservices/v1/sites/catalogs'),
        common_1.HttpCode(200),
        tslib_1.__param(0, common_1.Body()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesAndNavigationsController.prototype, "searchCatalogs", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/sites'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PagesAndNavigationsController.prototype, "getSites", null);
    PagesAndNavigationsController = tslib_1.__decorate([
        common_1.Controller()
    ], PagesAndNavigationsController);
    return PagesAndNavigationsController;
})();
exports.PagesAndNavigationsController = PagesAndNavigationsController;
//# sourceMappingURL=sitesAndCatalogs.controller.js.map