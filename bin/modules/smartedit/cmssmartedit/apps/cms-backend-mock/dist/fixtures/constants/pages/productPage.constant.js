"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPage = void 0;
exports.productPage = {
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
            qualifier: 'name'
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
            qualifier: 'title'
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
//# sourceMappingURL=productPage.constant.js.map