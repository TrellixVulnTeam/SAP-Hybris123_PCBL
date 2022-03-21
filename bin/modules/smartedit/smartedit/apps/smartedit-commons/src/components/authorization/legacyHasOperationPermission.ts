/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SimpleChange } from '@angular/core';
import { LogService } from '@smart/utils';
import * as angular from 'angular';

import { SeDirective } from '../../di';
import {
    HasOperationPermissionBaseDirective,
    IsPermissionGrantedHandler
} from '../../directives/hasOperationPermission';
import { IPermissionService, SystemEventService } from '../../services';

/**
 * **Deprecated, since 2005, use {@link HasOperationPermissionDirective}.**
 *
 * Use this directive for AngularJS templates.
 */
@SeDirective({
    transclude: true,
    templateUrl: 'legacyHasOperationPermissionTemplate.html',
    controllerAs: 'ctrl',
    selector: '[has-operation-permission]',
    inputs: ['hasOperationPermission']
})
export class LegacyHasOperationPermissionDirective
    extends HasOperationPermissionBaseDirective
    implements angular.IOnInit, angular.IOnChanges, angular.IOnDestroy {
    public isPermissionGrantedFlag: boolean;

    constructor(
        systemEventService: SystemEventService,
        permissionService: IPermissionService,
        logService: LogService
    ) {
        super(systemEventService, permissionService, logService);
        this.isPermissionGrantedHandler = this.getIsPermissionGrantedHandler();
    }

    $onInit(): void {
        super.ngOnInit();
    }

    $onChanges(changes: angular.IOnChangesObject): void {
        if (changes.hasOperationPermission && changes.hasOperationPermission.currentValue) {
            this.isPermissionGrantedFlag = false;
            super.ngOnChanges({
                hasOperationPermission: new SimpleChange(
                    changes.hasOperationPermission.previousValue,
                    changes.hasOperationPermission.currentValue,
                    changes.hasOperationPermission.isFirstChange()
                )
            });
        }
    }

    $onDestroy(): void {
        super.ngOnDestroy();
    }

    private getIsPermissionGrantedHandler(): IsPermissionGrantedHandler {
        return (isPermissionGranted: boolean): void => {
            this.isPermissionGrantedFlag = isPermissionGranted;
        };
    }
}
