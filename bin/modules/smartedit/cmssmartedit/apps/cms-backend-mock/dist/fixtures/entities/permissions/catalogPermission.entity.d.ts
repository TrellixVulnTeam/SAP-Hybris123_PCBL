import { IPermission, ISyncPermission } from './index';
export interface ICatalogPermission {
    catalogId: string;
    catalogVersion: string;
    permissions: IPermission[];
    syncPermissions: ISyncPermission[] | [{}];
}
