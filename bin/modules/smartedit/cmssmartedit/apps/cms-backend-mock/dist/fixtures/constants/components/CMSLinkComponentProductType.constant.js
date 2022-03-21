"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMSLinkComponentProduct = void 0;
const cmsLinkToComponentAttribute_constant_1 = require("./cmsLinkToComponentAttribute.constant");
exports.CMSLinkComponentProduct = {
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
            cmsStructureType: 'SingleOnlineProductSelector',
            i18nKey: 'name',
            qualifier: 'product',
            required: true
        },
        {
            cmsStructureType: 'Boolean',
            collection: false,
            editable: true,
            i18nKey: 'type.cmslinkcomponent.target.name',
            localized: false,
            paged: false,
            qualifier: 'target',
            required: true
        }
    ],
    category: 'COMPONENT',
    code: 'CMSLinkComponent',
    i18nKey: 'type.cmslinkcomponent.name',
    name: 'Link',
    type: 'cmsLinkComponentData'
};
//# sourceMappingURL=CMSLinkComponentProductType.constant.js.map