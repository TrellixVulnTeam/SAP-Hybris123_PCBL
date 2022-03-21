/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';

import { moduleUtils, HttpBackendService, SeEntryModule } from 'smarteditcommons';

import { OuterAuthorizationMocks } from '../../utils/commonMockedModules/outerAuthorizationMock';
import { OuterConfigurationMocks } from '../../utils/commonMockedModules/outerConfigurationMock';
import { i18nMocks } from '../../utils/commonMockedModules/outerI18nMock';
import { OuterLanguagesMocks } from '../../utils/commonMockedModules/outerLanguagesMock';
import { OuterOtherMocks } from '../../utils/commonMockedModules/outerOtherMock';
import { OuterPermissionMocks } from '../../utils/commonMockedModules/outerPermissionMocks';
import { OuterPreviewMocks } from '../../utils/commonMockedModules/outerPreviewMock';
import { OuterSitesMocks } from '../../utils/commonMockedModules/outerSitesMock';
import { OuterWhoAmIMocks } from '../../utils/commonMockedModules/outerWhoAmIMocks';
import { E2eOnLoadingSetupModule } from '../../utils/outerE2eOnLoadingSetup';
import '../../utils/commonMockedModules/outerGlobalBasePathFetchMock';

@SeEntryModule('OuterMocksModule')
@NgModule({
    imports: [
        OuterAuthorizationMocks,
        OuterWhoAmIMocks,
        OuterConfigurationMocks,
        i18nMocks,
        OuterLanguagesMocks,
        OuterOtherMocks,
        OuterPreviewMocks,
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
            ]
        }),
        moduleUtils.bootstrap(
            (httpBackendService: HttpBackendService) => {
                httpBackendService.matchLatestDefinitionEnabled(true);

                httpBackendService.whenGET(/test\/e2e/).passThrough();
                httpBackendService.whenGET(/static-resources/).passThrough();

                const map = [
                    {
                        value: '"thepreviewTicketURI"',
                        key: 'previewTicketURI'
                    },
                    {
                        value:
                            '{"smartEditContainerLocation":"/apps/smartedit-e2e/generated/e2e/dataTable/outerapp.js"}',
                        key: 'applications.dataTableApp'
                    },
                    {
                        value: '"/cmswebservices/v1/i18n/languages"',
                        key: 'i18nAPIRoot'
                    }
                ];

                httpBackendService.whenGET(/smartedit\/configuration/).respond(function () {
                    return [200, map];
                });
            },
            [HttpBackendService]
        )
    ]
})
export class OuterMocksModule {}

window.pushModules(OuterMocksModule);
