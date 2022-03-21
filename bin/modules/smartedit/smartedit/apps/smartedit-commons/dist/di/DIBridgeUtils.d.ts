import { Component, Provider } from '@angular/core';
import { SeConstructor } from './types';
/** @internal */
export declare class DIBridgeUtils {
    downgradeComponent(definition: Component, componentConstructor: SeConstructor): void;
    downgradeService(name: string, serviceConstructor: SeConstructor, token?: any): void;
    upgradeProvider(angularJSInjectionKey: string, angularInjectionToken?: any): Provider;
    private _getBridgeModule;
}
export declare const diBridgeUtils: DIBridgeUtils;
