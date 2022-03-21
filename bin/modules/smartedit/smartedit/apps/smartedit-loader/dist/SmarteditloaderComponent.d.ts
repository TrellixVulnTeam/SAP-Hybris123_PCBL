import { ElementRef, Injector } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
export declare class SmarteditloaderComponent {
    elementRef: ElementRef;
    upgrade: UpgradeModule;
    constructor(elementRef: ElementRef, upgrade: UpgradeModule, injector: Injector);
    ngAfterViewInit(): void;
}
