/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as angular from 'angular';

import {
    commonNgZone,
    BootstrapPayload,
    SeModule,
    SMARTEDITCONTAINER_COMPONENT_NAME,
    SMARTEDITLOADER_COMPONENT_NAME,
    SSOAuthenticationHelper,
    TemplateCacheDecoratorModule
} from 'smarteditcommons';

import {
    BootstrapService,
    ConfigurationObject,
    LegacySmarteditServicesModule,
    LoadConfigManagerService,
    SmarteditContainerFactory
} from 'smarteditcontainer';

@SeModule({
    imports: [
        LegacySmarteditServicesModule,
        TemplateCacheDecoratorModule,
        'coretemplates',
        'translationServiceModule'
    ],
    config: ($logProvider: angular.ILogProvider) => {
        'ngInject';
        $logProvider.debugEnabled(false);
    },
    providers: [BootstrapService],
    initialize: (
        ssoAuthenticationHelper: SSOAuthenticationHelper,
        loadConfigManagerService: LoadConfigManagerService,
        bootstrapService: BootstrapService
    ) => {
        'ngInject';

        if (ssoAuthenticationHelper.isSSODialog()) {
            ssoAuthenticationHelper.completeDialog();
        } else {
            loadConfigManagerService.loadAsObject().then((configurations: ConfigurationObject) => {
                bootstrapService
                    .bootstrapContainerModules(configurations)
                    .then((bootstrapPayload: BootstrapPayload) => {
                        const smarteditloaderNode = document.querySelector(
                            SMARTEDITLOADER_COMPONENT_NAME
                        );
                        smarteditloaderNode.parentNode.insertBefore(
                            document.createElement(SMARTEDITCONTAINER_COMPONENT_NAME),
                            smarteditloaderNode
                        );

                        platformBrowserDynamic()
                            .bootstrapModule(SmarteditContainerFactory(bootstrapPayload), {
                                ngZone: commonNgZone
                            })
                            .then((ref: any) => {
                                //
                            })
                            .catch((err) => console.log(err));
                    });
            });
        }
    }
})
export class Smarteditloader {}
