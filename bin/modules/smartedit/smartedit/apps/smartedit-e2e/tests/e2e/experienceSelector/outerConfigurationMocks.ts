/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';

import { moduleUtils, HttpBackendService, SeEntryModule } from 'smarteditcommons';
import { i18nMocks } from '../../utils/commonMockedModules/outerI18nMock';
import { OuterPermissionMocks } from '../../utils/commonMockedModules/outerPermissionMocks';
import { OuterSitesMocks } from '../../utils/commonMockedModules/outerSitesMock';
import { OuterWhoAmIMocks } from '../../utils/commonMockedModules/outerWhoAmIMocks';
import { STOREFRONT_URI } from '../../utils/outerConstants';
import { E2eOnLoadingSetupModule } from '../../utils/outerE2eOnLoadingSetup';
import '../../utils/commonMockedModules/outerGlobalBasePathFetchMock';

@SeEntryModule('ConfigurationMocksModule')
@NgModule({
    imports: [
        OuterWhoAmIMocks,
        i18nMocks,
        OuterSitesMocks,
        OuterPermissionMocks,
        E2eOnLoadingSetupModule
    ],
    providers: [
        moduleUtils.provideValues({
            SMARTEDIT_ROOT: 'web/webroot',
            SMARTEDIT_RESOURCE_URI_REGEXP: /^(.*)\/apps\/smartedit-e2e\/generated\/e2e/,
            SMARTEDIT_INNER_FILES: [
                '/apps/smartedit-e2e/node_modules/ckeditor4/ckeditor.js',
                '/apps/smartedit-e2e/generated/e2e/base/smartedit/vendor.js',
                '/apps/smartedit-e2e/generated/e2e/base/smartedit/base-inner-app.js',
                '/apps/smartedit-e2e/generated/e2e/base/smartedit/inner-app.js'
            ],
            STOREFRONT_URI
        }),
        moduleUtils.bootstrap(
            (httpBackendService: HttpBackendService) => {
                httpBackendService.whenGET(/test\/e2e/).passThrough();
                httpBackendService.whenGET(/static-resources/).passThrough();

                const map = [
                    {
                        value: '"previewwebservices/v1/preview"',
                        key: 'previewTicketURI'
                    },
                    {
                        value:
                            '{"smartEditContainerLocation":"/apps/smartedit-e2e/generated/e2e/experienceSelector/outerBackendMocks.js"}',
                        key: 'applications.OuterBackendMocks'
                    },

                    {
                        value: '"/cmswebservices/v1/i18n/languages"',
                        key: 'i18nAPIRoot'
                    }
                ];

                httpBackendService.whenGET(/smartedit\/configuration/).respond(() => {
                    return [200, map];
                });
            },
            [HttpBackendService]
        )
    ]
})
export class ConfigurationMocksModule {}

window.pushModules(ConfigurationMocksModule);
