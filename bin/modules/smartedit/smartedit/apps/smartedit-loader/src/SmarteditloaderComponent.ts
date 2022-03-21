/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, ElementRef, Injector } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { SeModuleConstructor, SMARTEDITLOADER_COMPONENT_NAME } from 'smarteditcommons';
import { Smarteditloader } from './legacySmarteditloader';

const legacyLoaderTagName = 'legacy-loader';

@Component({
    selector: SMARTEDITLOADER_COMPONENT_NAME,
    template: `<${legacyLoaderTagName}></${legacyLoaderTagName}>`
})
export class SmarteditloaderComponent {
    constructor(public elementRef: ElementRef, public upgrade: UpgradeModule, injector: Injector) {}

    ngAfterViewInit(): void {
        this.upgrade.bootstrap(
            this.elementRef.nativeElement.querySelector(legacyLoaderTagName),
            [(Smarteditloader as SeModuleConstructor).moduleName],
            { strictDi: false }
        );
    }
}
