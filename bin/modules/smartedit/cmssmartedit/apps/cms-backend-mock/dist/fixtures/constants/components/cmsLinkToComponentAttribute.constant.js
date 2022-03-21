"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmsLinkToComponentAttribute = void 0;
exports.cmsLinkToComponentAttribute = {
    cmsStructureType: 'CMSLinkToSelect',
    collection: false,
    editable: true,
    i18nKey: 'type.cmslinkcomponent.linkto.name',
    mode: 'DEFAULT',
    idAttribute: 'id',
    labelAttributes: ['label'],
    options: [
        {
            label: 'se.cms.linkto.option.content',
            id: 'content'
        },
        {
            label: 'se.cms.linkto.option.product',
            id: 'product'
        },
        {
            label: 'se.cms.linkto.option.category',
            id: 'category'
        },
        {
            label: 'se.cms.linkto.option.external',
            id: 'external'
        }
    ],
    paged: false,
    qualifier: 'linkTo',
    required: true
};
//# sourceMappingURL=cmsLinkToComponentAttribute.constant.js.map