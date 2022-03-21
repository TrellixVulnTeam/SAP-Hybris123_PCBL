/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IPermission, ISyncPermission } from './index';

export interface ICatalogPermission {
    catalogId: string;
    catalogVersion: string;
    permissions: IPermission[];
    syncPermissions: ISyncPermission[] | [{}];
}
