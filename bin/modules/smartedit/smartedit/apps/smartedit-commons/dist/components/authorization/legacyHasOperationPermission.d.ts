import { LogService } from '@smart/utils';
import * as angular from 'angular';
import { HasOperationPermissionBaseDirective } from '../../directives/hasOperationPermission';
import { IPermissionService, SystemEventService } from '../../services';
/**
 * **Deprecated, since 2005, use {@link HasOperationPermissionDirective}.**
 *
 * Use this directive for AngularJS templates.
 */
export declare class LegacyHasOperationPermissionDirective extends HasOperationPermissionBaseDirective implements angular.IOnInit, angular.IOnChanges, angular.IOnDestroy {
    isPermissionGrantedFlag: boolean;
    constructor(systemEventService: SystemEventService, permissionService: IPermissionService, logService: LogService);
    $onInit(): void;
    $onChanges(changes: angular.IOnChangesObject): void;
    $onDestroy(): void;
    private getIsPermissionGrantedHandler;
}
