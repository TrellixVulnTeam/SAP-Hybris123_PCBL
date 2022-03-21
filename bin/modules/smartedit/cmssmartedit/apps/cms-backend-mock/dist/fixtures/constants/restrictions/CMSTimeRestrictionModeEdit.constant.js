"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMSTimeRestrictionModeEdit = void 0;
exports.CMSTimeRestrictionModeEdit = {
    attributes: [
        {
            cmsStructureType: 'ShortString',
            collection: false,
            editable: true,
            i18nKey: 'type.cmstimerestriction.name.name',
            localized: false,
            paged: false,
            qualifier: 'name',
            required: true
        },
        {
            cmsStructureType: 'DateTime',
            collection: false,
            editable: true,
            i18nKey: 'type.cmstimerestriction.activefrom.name',
            localized: false,
            paged: false,
            qualifier: 'activeFrom',
            required: true
        },
        {
            cmsStructureType: 'DateTime',
            collection: false,
            editable: true,
            i18nKey: 'type.cmstimerestriction.activeuntil.name',
            localized: false,
            paged: false,
            qualifier: 'activeUntil',
            required: true
        }
    ],
    category: 'RESTRICTION',
    code: 'CMSTimeRestriction',
    i18nKey: 'type.cmstimerestriction.name',
    name: 'Time Restriction',
    type: 'timeRestrictionData'
};
//# sourceMappingURL=CMSTimeRestrictionModeEdit.constant.js.map