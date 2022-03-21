/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Injectable } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

import { stringUtils, IAuthenticationManagerService } from '@smart/utils';
import * as angular from 'angular';
import { NG_ROUTE_PREFIX } from '../utils';
import { SmarteditRoutingService } from './routing';

@Injectable()
export class AuthenticationManager extends IAuthenticationManagerService {
    constructor(private routing: SmarteditRoutingService) {
        super();
    }

    public onLogout(): void {
        const currentLocation = this.routing.path();
        if (stringUtils.isBlank(currentLocation) || currentLocation === `/${NG_ROUTE_PREFIX}`) {
            this.routing.reload();
        } else {
            this.routing.go(NG_ROUTE_PREFIX);
        }
    }

    public onUserHasChanged(): void {
        this.routing.reload();
    }
}
