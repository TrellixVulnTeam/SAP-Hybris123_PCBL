"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMSCategoryRestrictionModeAdd = void 0;
exports.CMSCategoryRestrictionModeAdd = {
    attributes: [
        {
            cmsStructureType: 'ShortString',
            collection: false,
            editable: false,
            i18nKey: 'type.cmscategoryrestriction.name.name',
            localized: false,
            paged: false,
            qualifier: 'name',
            required: true
        },
        {
            cmsStructureType: 'Boolean',
            collection: false,
            editable: false,
            i18nKey: 'type.cmscategoryrestriction.recursive.name',
            localized: false,
            paged: false,
            qualifier: 'recursive',
            required: false
        },
        {
            cmsStructureType: 'MultiCategorySelector',
            collection: false,
            editable: false,
            i18nKey: 'type.cmscategoryrestriction.categories.name',
            localized: false,
            paged: false,
            qualifier: 'categories',
            required: true
        }
    ],
    category: 'RESTRICTION',
    code: 'CMSCategoryRestriction',
    i18nKey: 'type.cmscategoryrestriction.name',
    name: 'Category Restriction',
    type: 'categoryRestrictionData'
};
//# sourceMappingURL=CMSCategoryRestrictionModeAdd.constant.js.map