"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentPage = void 0;
exports.contentPage = {
    attributes: [
        {
            cmsStructureType: 'ShortString',
            i18nKey: 'type.abstractpage.uid.name',
            localized: false,
            qualifier: 'uid'
        },
        {
            cmsStructureType: 'ShortString',
            i18nKey: 'type.abstractpage.name.name',
            localized: false,
            qualifier: 'name',
            required: true
        },
        {
            cmsStructureType: 'DateTime',
            i18nKey: 'type.abstractpage.creationtime.name',
            localized: false,
            qualifier: 'creationtime'
        },
        {
            cmsStructureType: 'DateTime',
            i18nKey: 'type.abstractpage.modifiedtime.name',
            localized: false,
            qualifier: 'modifiedtime'
        },
        {
            cmsStructureType: 'ShortString',
            i18nKey: 'type.abstractpage.title.name',
            localized: true,
            qualifier: 'title',
            required: true
        },
        {
            cmsStructureType: 'ShortString',
            i18nKey: 'type.contentpage.label.name',
            localized: false,
            qualifier: 'label',
            required: true
        },
        {
            cmsStructureType: 'PageRestrictionsEditor',
            i18nKey: 'type.abstractpage.restrictions.name',
            qualifier: 'restrictions'
        }
    ],
    category: 'PAGE',
    code: 'MockPage',
    i18nKey: 'type.mockpage.name',
    name: 'Mock Page'
};
//# sourceMappingURL=contentPage.constant.js.map