"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMSUserGroupRestrictionModeAdd = void 0;
exports.CMSUserGroupRestrictionModeAdd = {
    attributes: [
        {
            cmsStructureType: 'ShortString',
            collection: false,
            editable: false,
            i18nKey: 'type.cmsusergrouprestriction.name.name',
            localized: false,
            paged: false,
            qualifier: 'name',
            required: true
        },
        {
            cmsStructureType: 'Boolean',
            collection: false,
            editable: false,
            i18nKey: 'type.cmsusergrouprestriction.includesubgroups.name',
            localized: false,
            paged: false,
            qualifier: 'includeSubgroups',
            required: false
        },
        {
            cmsStructureType: 'EditableDropdown',
            collection: true,
            editable: false,
            i18nKey: 'type.cmsusergrouprestriction.usergroups.name',
            idAttribute: 'uid',
            labelAttributes: ['name', 'uid'],
            localized: false,
            paged: true,
            qualifier: 'userGroups',
            required: true,
            uri: '/cmswebservices/v1/usergroups'
        }
    ],
    category: 'RESTRICTION',
    code: 'CMSUserGroupRestriction',
    i18nKey: 'type.cmsusergrouprestriction.name',
    name: 'Usergroup Restriction',
    type: 'userGroupRestrictionData'
};
//# sourceMappingURL=CMSUserGroupRestrictionModeAdd.constant.js.map