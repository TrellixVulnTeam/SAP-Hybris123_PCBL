"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const components_1 = require("../../fixtures/constants/components");
const pages_1 = require("../../fixtures/constants/pages");
const restrictions_1 = require("../../fixtures/constants/restrictions");
let TypesController = (() => {
    let TypesController = class TypesController {
        getComponentTypeByCode(code) {
            switch (code) {
                case 'CategoryPage':
                    return pages_1.categoryPage;
                case 'ContentPage':
                    return pages_1.contentPage;
                case 'ProductPage':
                    return pages_1.productPage;
            }
            const result = components_1.componentTypes.find((type) => type.code === code);
            return result === undefined ? components_1.generalComponentType : result;
        }
        getComponentType(code, mode, category) {
            if (code === 'PreviewData' && (mode === 'DEFAULT' || mode === 'PREVIEWVERSION')) {
                const res = components_1.generalComponentType.attributes.filter((attr) => attr.cmsStructureType === 'EditableDropdown' ||
                    attr.cmsStructureType === 'DateTime' ||
                    attr.cmsStructureType === 'ProductCatalogVersionsSelector');
                const editableDropdown = res.find((attr) => attr.cmsStructureType === 'EditableDropdown' &&
                    attr.qualifier === 'previewCatalog');
                if (editableDropdown) {
                    editableDropdown.editable = mode === 'DEFAULT' ? true : false;
                }
                return { attributes: res };
            }
            else if (mode === 'DEFAULT') {
                const resultComponent = components_1.componentTypes.find((type) => type.code === code);
                return { componentTypes: [resultComponent] };
            }
            else if (code === 'CMSLinkComponent') {
                switch (mode) {
                    case 'CATEGORY':
                        return components_1.CMSLinkComponentCategory;
                    case 'PRODUCT':
                        return components_1.CMSLinkComponentProduct;
                    case 'CONTENT':
                        return components_1.CMSLinkComponentContent;
                    case 'EXTERNAL':
                        return components_1.CMSLinkComponentExternal;
                }
            }
            else if (code === 'CMSTimeRestriction') {
                switch (mode) {
                    case 'ADD':
                        return restrictions_1.CMSTimeRestrictionModeAdd;
                    case 'CREATE':
                        return restrictions_1.CMSTimeRestrictionModeCreate;
                    case 'EDIT':
                        return restrictions_1.CMSTimeRestrictionModeEdit;
                }
            }
            else if (code === 'CMSCategoryRestriction') {
                switch (mode) {
                    case 'ADD':
                        return restrictions_1.CMSCategoryRestrictionModeAdd;
                    case 'CREATE':
                        return restrictions_1.CMSCategoryRestrictionModeCreate;
                    case 'EDIT':
                        return restrictions_1.CMSCategoryRestrictionModeEdit;
                }
            }
            else if (code === 'CMSUserGroupRestriction') {
                switch (mode) {
                    case 'ADD':
                        return restrictions_1.CMSUserGroupRestrictionModeAdd;
                    case 'CREATE':
                        return restrictions_1.CMSUserGroupRestrictionModeCreate;
                    case 'EDIT':
                        return restrictions_1.CMSUserGroupRestrictionModeEdit;
                }
            }
            else if (category === 'COMPONENT') {
                const filteredTypes = components_1.componentTypes.filter((type) => type.category === 'COMPONENT');
                return { componentTypes: filteredTypes };
            }
            else if (category === 'RESTRICTION') {
                return { componentTypes: restrictions_1.generalRestrictions };
            }
            const result = components_1.componentTypes.find((type) => type.code === code);
            return result === undefined ? components_1.generalComponentType : result;
        }
        getPageTypes() {
            return {
                pageTypes: [
                    {
                        code: 'ContentPage',
                        name: {
                            en: 'Content Page',
                            fr: 'Content Page in French'
                        },
                        description: {
                            en: 'Description for content page',
                            fr: 'Description for content page in French'
                        }
                    },
                    {
                        code: 'ProductPage',
                        name: {
                            en: 'Product Page',
                            fr: 'Product Page in French'
                        },
                        description: {
                            en: 'Description for product page',
                            fr: 'Description for product page in French'
                        }
                    },
                    {
                        code: 'CategoryPage',
                        name: {
                            en: 'Category Page',
                            fr: 'Category Page in French'
                        },
                        description: {
                            en: 'Description for category page',
                            fr: 'Description for category page in French'
                        }
                    }
                ]
            };
        }
    };
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/types/:code'),
        tslib_1.__param(0, common_1.Param('code')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TypesController.prototype, "getComponentTypeByCode", null);
    tslib_1.__decorate([
        common_1.Get('cmswebservices/v1/types*'),
        tslib_1.__param(0, common_1.Query('code')),
        tslib_1.__param(1, common_1.Query('mode')),
        tslib_1.__param(2, common_1.Query('category')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, String, String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TypesController.prototype, "getComponentType", null);
    tslib_1.__decorate([
        common_1.Get('/cmswebservices/v1/pagetypes'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TypesController.prototype, "getPageTypes", null);
    TypesController = tslib_1.__decorate([
        common_1.Controller()
    ], TypesController);
    return TypesController;
})();
exports.TypesController = TypesController;
//# sourceMappingURL=types.controller.js.map