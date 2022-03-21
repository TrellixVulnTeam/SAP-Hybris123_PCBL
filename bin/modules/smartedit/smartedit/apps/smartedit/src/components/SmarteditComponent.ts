/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, ElementRef, Injector } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { LegacySmartedit } from 'smartedit/legacySmartedit';
import {
    nodeUtils,
    registerCustomComponents,
    AngularJSBootstrapIndicatorService,
    SeModuleConstructor,
    SMARTEDIT_COMPONENT_NAME
} from 'smarteditcommons';

@Component({
    selector: SMARTEDIT_COMPONENT_NAME,
    template: ``
})
export class SmarteditComponent {
    constructor(
        private elementRef: ElementRef,
        public upgrade: UpgradeModule,
        injector: Injector,
        private angularJSBootstrapIndicatorService: AngularJSBootstrapIndicatorService
    ) {
        registerCustomComponents(injector);
    }

    ngAfterViewInit(): void {
        if (!nodeUtils.hasLegacyAngularJSBootsrap()) {
            const e2ePlaceHolderTagName = 'e2e-placeholder';
            if (document.querySelector(e2ePlaceHolderTagName)) {
                document.querySelector(e2ePlaceHolderTagName).childNodes.forEach((childNode) => {
                    if (childNode.nodeType === Node.ELEMENT_NODE) {
                        this.elementRef.nativeElement.appendChild(childNode);
                    }
                });
            }

            this.upgrade.bootstrap(
                this.elementRef.nativeElement,
                [(LegacySmartedit as SeModuleConstructor).moduleName],
                { strictDi: false }
            );

            this.angularJSBootstrapIndicatorService.setSmarteditReady();
        }
    }
}
