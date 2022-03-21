/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Controller, Query, Post } from '@nestjs/common';
import {
    globalPermissions,
    onlineCatalogPermissions,
    stagedCatalogPermissions,
    typePermissions
} from 'fixtures/constants/permissions';
import { ICatalogPermission } from 'fixtures/entities/permissions';

@Controller()
export class PermissionsController {
    @Post('permissionswebservices/v1/permissions/global*')
    getGlobalPermissions() {
        return globalPermissions;
    }

    @Post('permissionswebservices/v1/permissions/catalogs*')
    getCatalogPermissions(@Query('catalogVersion') catalogVersion: string) {
        const permissionsList: ICatalogPermission[] =
            catalogVersion === 'Online' ? onlineCatalogPermissions : stagedCatalogPermissions;
        return {
            permissionsList
        };
    }

    @Post('permissionswebservices/v1/permissions/attributes*')
    getAttributesPermissions() {
        return {
            permissionsList: []
        };
    }

    @Post('permissionswebservices/v1/permissions/types*')
    getTypePermissions() {
        return {
            permissionsList: typePermissions
        };
    }
}
