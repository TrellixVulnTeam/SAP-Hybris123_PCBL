/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces angular.module:false */
import { Injectable, NgModule } from '@angular/core';
import { LogService, ModuleUtils as ParentModuleUtils } from '@smart/utils';
import * as angular from 'angular';

/**
 * Internal utility service to handle ES6 modules
 *
 * @internal
 * @ignore
 */
@Injectable({ providedIn: 'root' })
export class ModuleUtils extends ParentModuleUtils {
    constructor(private logService: LogService) {
        super();
    }

    public getNgModule(appName: string): NgModule {
        if (window.__smartedit__.modules) {
            const moduleKey: string = Object.keys(window.__smartedit__.modules).find(
                (key) =>
                    key.toLowerCase().endsWith(appName.toLowerCase()) ||
                    key.toLowerCase().endsWith(appName.toLowerCase() + 'module')
            );

            if (!moduleKey) {
                return null;
            }
            return window.__smartedit__.modules[moduleKey];
        }
        return null;
    }

    public addModuleToAngularJSApp(legacyAngularModuleName: string, app: string): void {
        try {
            angular.module(app);
            angular.module(legacyAngularModuleName).requires.push(app);
        } catch (ex) {
            this.logService.warn(
                `Failed to load legacy AngularJS module ${app} into ${legacyAngularModuleName}; SmartEdit functionality may be compromised.`
            );
        }
    }
}

export const moduleUtils = new ModuleUtils(new LogService());
