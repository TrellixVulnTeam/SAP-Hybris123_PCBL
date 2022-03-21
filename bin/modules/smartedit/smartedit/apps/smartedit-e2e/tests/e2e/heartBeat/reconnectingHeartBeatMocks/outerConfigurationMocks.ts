/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';

import { moduleUtils, HttpBackendService, SeEntryModule } from 'smarteditcommons';

import { OuterAuthorizationMocks } from '../../../utils/commonMockedModules/outerAuthorizationMock';
import { OuterConfigurationMocks } from '../../../utils/commonMockedModules/outerConfigurationMock';
import { i18nMocks } from '../../../utils/commonMockedModules/outerI18nMock';
import { OuterLanguagesMocks } from '../../../utils/commonMockedModules/outerLanguagesMock';
import { OuterPermissionMocks } from '../../../utils/commonMockedModules/outerPermissionMocks';
import { OuterPreviewMocks } from '../../../utils/commonMockedModules/outerPreviewMock';
import { OuterWhoAmIMocks } from '../../../utils/commonMockedModules/outerWhoAmIMocks';
import { CONFIGURATION_MOCK_TOKEN, STOREFRONT_URI_TOKEN } from '../../../utils/outerConstants';
import { E2eOnLoadingSetupModule } from '../../../utils/outerE2eOnLoadingSetup';

import '../../../utils/commonMockedModules/outerGlobalBasePathFetchMock';

@SeEntryModule('OuterMocksModule')
@NgModule({
    imports: [
        OuterAuthorizationMocks,
        OuterWhoAmIMocks,
        OuterConfigurationMocks.provide([
            {
                provide: CONFIGURATION_MOCK_TOKEN,
                useValue: [
                    {
                        value: '"/thepreviewTicketURI"',
                        key: 'previewTicketURI'
                    },
                    {
                        value:
                            '{"/authEntryPoint1":{"client_id":"client_id_1","client_secret":"client_secret_1"},"/authEntryPoint2":{"client_id":"client_id_2","client_secret":"client_secret_2"}}',
                        key: 'authentication.credentials'
                    },
                    {
                        value: '{ "api2":"/authEntryPoint2"}',
                        key: 'authenticationMap'
                    }
                ]
            }
        ]),
        OuterPermissionMocks,
        OuterLanguagesMocks,
        E2eOnLoadingSetupModule.provide([
            {
                provide: STOREFRONT_URI_TOKEN,
                useValue:
                    'http://127.0.0.1:9000/generated/e2e/heartBeat/reconnectingHeartBeatMocks/storefront.html'
            }
        ]),
        OuterPreviewMocks,
        i18nMocks
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
            },
            [HttpBackendService]
        )
    ]
})
export class OuterMocksModule {}

window.pushModules(OuterMocksModule);
