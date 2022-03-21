/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, ElementRef, Injector } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { TranslateService } from '@ngx-translate/core';
import {
    registerCustomComponents,
    AngularJSBootstrapIndicatorService,
    SeModuleConstructor,
    SMARTEDITCONTAINER_COMPONENT_NAME,
    SMARTEDITLOADER_COMPONENT_NAME
} from 'smarteditcommons';
import { Smarteditcontainer } from 'smarteditcontainer/legacySmarteditcontainer';

const LEGACY_APP_NAME = 'legacyApp';
@Component({
    selector: SMARTEDITCONTAINER_COMPONENT_NAME,
    template: `
        <router-outlet></router-outlet>
        <div ng-attr-id="${LEGACY_APP_NAME}">
            <se-announcement-board></se-announcement-board>
            <se-notification-panel></se-notification-panel>
            <div ng-view></div>
        </div>
    `
})
export class SmarteditcontainerComponent {
    legacyAppName = LEGACY_APP_NAME;

    constructor(
        private translateService: TranslateService,
        injector: Injector,
        public upgrade: UpgradeModule,
        private elementRef: ElementRef,
        private bootstrapIndicator: AngularJSBootstrapIndicatorService
    ) {
        this.legacyAppName = LEGACY_APP_NAME;

        this.setApplicationTitle();
        registerCustomComponents(injector);
    }

    ngOnInit(): void {
        /*
         * for e2e purposes:
         * in e2e, we sometimes add some test code in the parent frame to be added to the runtime
         * since we only bootstrap within smarteditcontainer-component node,
         * this code will be ignored unless added into the component before legacy AnguylarJS bootstrapping
         */
        Array.prototype.slice
            .call(document.body.childNodes)
            .filter(
                (childNode: ChildNode) =>
                    !this.isAppComponent(childNode) && !this.isSmarteditLoader(childNode)
            )
            .forEach((childNode: ChildNode) => {
                this.legacyAppNode.appendChild(childNode);
            });
    }

    ngAfterViewInit(): void {
        this.upgrade.bootstrap(
            this.legacyAppNode,
            [(Smarteditcontainer as SeModuleConstructor).moduleName],
            { strictDi: false }
        );

        this.bootstrapIndicator.setSmarteditContainerReady();
    }

    private setApplicationTitle(): void {
        this.translateService.get('se.application.name').subscribe((pageTitle: string) => {
            document.title = pageTitle;
        });
    }

    private get legacyAppNode(): any {
        // return this.elementRef.nativeElement.querySelector(`#${this.legacyAppName}`);
        return this.elementRef.nativeElement.querySelector(
            `div[ng-attr-id="${this.legacyAppName}"]`
        );
    }

    private isAppComponent(childNode: ChildNode): boolean {
        return (
            childNode.nodeType === Node.ELEMENT_NODE &&
            (childNode as HTMLElement).tagName === SMARTEDITCONTAINER_COMPONENT_NAME.toUpperCase()
        );
    }

    private isSmarteditLoader(childNode: ChildNode): boolean {
        return (
            childNode.nodeType === Node.ELEMENT_NODE &&
            ((childNode as HTMLElement).id === 'smarteditloader' ||
                (childNode as HTMLElement).tagName === SMARTEDITLOADER_COMPONENT_NAME.toUpperCase())
        );
    }
}
