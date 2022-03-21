import { NgModule } from '@angular/core';
import { LogService, ModuleUtils as ParentModuleUtils } from '@smart/utils';
/**
 * Internal utility service to handle ES6 modules
 *
 * @internal
 * @ignore
 */
export declare class ModuleUtils extends ParentModuleUtils {
    private logService;
    constructor(logService: LogService);
    getNgModule(appName: string): NgModule;
    addModuleToAngularJSApp(legacyAngularModuleName: string, app: string): void;
}
export declare const moduleUtils: ModuleUtils;
