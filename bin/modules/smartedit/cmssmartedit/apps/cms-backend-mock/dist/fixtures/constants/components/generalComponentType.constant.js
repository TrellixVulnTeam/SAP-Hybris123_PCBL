"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalComponentType = void 0;
const cmsLinkToComponentAttribute_constant_1 = require("./cmsLinkToComponentAttribute.constant");
exports.generalComponentType = {
    attributes: [
        {
            cmsStructureType: 'ShortString',
            collection: false,
            editable: true,
            i18nKey: 'type.cmslinkcomponent.linkname.name',
            localized: true,
            paged: false,
            qualifier: 'linkName',
            required: true
        },
        cmsLinkToComponentAttribute_constant_1.cmsLinkToComponentAttribute,
        {
            cmsStructureType: 'EditableDropdown',
            collection: false,
            editable: true,
            i18nKey: 'experience.selector.catalog',
            localized: false,
            paged: true,
            qualifier: 'previewCatalog',
            required: true,
            idAttribute: 'uid',
            labelAttributes: ['name']
        },
        {
            cmsStructureType: 'EditableDropdown',
            collection: false,
            editable: true,
            i18nKey: 'experience.selector.language',
            localized: false,
            paged: true,
            qualifier: 'language',
            required: true,
            idAttribute: 'uid',
            dependsOn: 'previewCatalog',
            labelAttributes: ['name']
        },
        {
            cmsStructureType: 'DateTime',
            collection: false,
            editable: true,
            i18nKey: 'experience.selector.date.and.time',
            localized: false,
            paged: false,
            qualifier: 'time',
            required: true
        },
        {
            cmsStructureType: 'ProductCatalogVersionsSelector',
            collection: false,
            editable: true,
            i18nKey: 'experience.selector.catalogversions',
            localized: false,
            paged: false,
            qualifier: 'productCatalogVersions',
            required: true
        }
    ],
    category: 'COMPONENT',
    code: 'CMSLinkComponent',
    i18nKey: 'type.cmslinkcomponent.name',
    name: 'Link',
    type: 'cmsLinkComponentData'
};
//# sourceMappingURL=generalComponentType.constant.js.map