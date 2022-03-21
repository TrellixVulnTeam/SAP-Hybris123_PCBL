import { ElementRef, Injector } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { AngularJSBootstrapIndicatorService } from 'smarteditcommons';
export declare class SmarteditComponent {
    private elementRef;
    upgrade: UpgradeModule;
    private angularJSBootstrapIndicatorService;
    constructor(elementRef: ElementRef, upgrade: UpgradeModule, injector: Injector, angularJSBootstrapIndicatorService: AngularJSBootstrapIndicatorService);
    ngAfterViewInit(): void;
}
