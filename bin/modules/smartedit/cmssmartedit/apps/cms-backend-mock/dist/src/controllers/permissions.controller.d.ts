import { ICatalogPermission } from 'fixtures/entities/permissions';
export declare class PermissionsController {
    getGlobalPermissions(): import("../../fixtures/entities/permissions").IGlobalPermission;
    getCatalogPermissions(catalogVersion: string): {
        permissionsList: ICatalogPermission[];
    };
    getAttributesPermissions(): {
        permissionsList: never[];
    };
    getTypePermissions(): {
        permissionsList: import("../../fixtures/entities/permissions").IGlobalPermission[];
    };
}
