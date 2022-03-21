"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const products_1 = require("../../fixtures/constants/products");
const products_2 = require("../../fixtures/entities/products");
let ProductsController = (() => {
    let ProductsController = class ProductsController {
        getProductCategoriesByFreeTextSearch(versionId) {
            const filteredCategories = products_1.productCategories.filter((cateogry) => cateogry.catalogVersion === versionId);
            return {
                pagination: {
                    count: 10,
                    page: 1,
                    totalCount: 10,
                    totalPages: 1
                },
                productCategories: filteredCategories
            };
        }
        getProductsByFreeTextSearch(catalogId, versionId) {
            if (catalogId === 'apparelProductCatalog_2' && versionId === 'Online') {
                return {
                    pagination: {
                        count: 2,
                        page: 1,
                        totalCount: 2,
                        totalPages: 1
                    },
                    products: products_1.apparelOnlineProducts2
                };
            }
            const resultProducts = versionId === 'Online' ? products_1.apparelOnlineProducts : products_1.apparelStagedProducts;
            return {
                pagination: {
                    count: 10,
                    page: 1,
                    totalCount: 10,
                    totalPages: 1
                },
                products: resultProducts
            };
        }
        getCategoryByCode(code) {
            const resultCategory = products_1.productCategories.find((category) => category.uid === code);
            return resultCategory ? resultCategory : products_1.productCategories[0];
        }
        getProductByCode(code) {
            const resultProduct = products_1.products[code];
            return resultProduct ? resultProduct : products_1.products;
        }
    };
    tslib_1.__decorate([
        common_1.Get('cmssmarteditwebservices/v1/productcatalogs/:catalogId/versions/:versionId/categories*'),
        tslib_1.__param(0, common_1.Param('versionId')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ProductsController.prototype, "getProductCategoriesByFreeTextSearch", null);
    tslib_1.__decorate([
        common_1.Get('cmssmarteditwebservices/v1/productcatalogs/:catalogId/versions/:versionId/products*'),
        tslib_1.__param(0, common_1.Param('catalogId')),
        tslib_1.__param(1, common_1.Param('versionId')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ProductsController.prototype, "getProductsByFreeTextSearch", null);
    tslib_1.__decorate([
        common_1.Get('cmssmarteditwebservices/v1/sites/:baseSiteId/categories/:code'),
        tslib_1.__param(0, common_1.Param('code')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ProductsController.prototype, "getCategoryByCode", null);
    tslib_1.__decorate([
        common_1.Get('cmssmarteditwebservices/v1/sites/:baseSiteId/products/:code'),
        tslib_1.__param(0, common_1.Param('code')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ProductsController.prototype, "getProductByCode", null);
    ProductsController = tslib_1.__decorate([
        common_1.Controller()
    ], ProductsController);
    return ProductsController;
})();
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map