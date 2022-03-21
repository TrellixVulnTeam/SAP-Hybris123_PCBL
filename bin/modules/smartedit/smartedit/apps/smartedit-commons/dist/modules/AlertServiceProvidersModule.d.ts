import { ModuleWithProviders } from '@angular/core';
/**
 * Temporary module providing AlertService for legacy token, until AlertService migration to Angular is completed.
 * Used by Outer / Inner modules to import.
 * It uses "useFactory" to return the same service but for different token.
 *
 * When it is in "web/app/smartedit/smartedit.ts" it results in the following error.
 * "ERROR: File web/app/smartedit/smartedit.ts contains forbidden namespace 'useFactory', consider using 'useFactory is part of DI and hence should only be used in Modules"
 */
export declare class AlertServiceProvidersModule {
    static forRoot<T>(token: any, AlertServiceClass: any): ModuleWithProviders;
}
