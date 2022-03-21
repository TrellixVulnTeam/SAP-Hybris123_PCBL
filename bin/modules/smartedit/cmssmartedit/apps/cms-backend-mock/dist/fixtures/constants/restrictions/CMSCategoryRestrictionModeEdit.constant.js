"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMSCategoryRestrictionModeEdit = void 0;
exports.CMSCategoryRestrictionModeEdit = {
    attributes: [
        {
            cmsStructureType: 'ShortString',
            collection: false,
            editable: true,
            i18nKey: 'type.cmscategoryrestriction.name.name',
            localized: false,
            paged: false,
            qualifier: 'name',
            required: true
        },
        {
            cmsStructureType: 'Boolean',
            collection: false,
            editable: true,
            i18nKey: 'type.cmscategoryrestriction.recursive.name',
            localized: false,
            paged: false,
            qualifier: 'recursive',
            required: false
        },
        {
            cmsStructureType: 'MultiCategorySelector',
            collection: false,
            editable: true,
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
//# sourceMappingURL=CMSCategoryRestrictionModeEdit.constant.js.map