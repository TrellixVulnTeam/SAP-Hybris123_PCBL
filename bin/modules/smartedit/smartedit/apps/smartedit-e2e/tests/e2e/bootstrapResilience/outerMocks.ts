/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { InjectionToken, NgModule } from '@angular/core';

import { moduleUtils, HttpBackendService, SeEntryModule } from 'smarteditcommons';

import { OuterAuthorizationMocks } from '../../utils/commonMockedModules/outerAuthorizationMock';
import { i18nMocks } from '../../utils/commonMockedModules/outerI18nMock';
import { OuterLanguagesMocks } from '../../utils/commonMockedModules/outerLanguagesMock';
import { OuterPermissionMocks } from '../../utils/commonMockedModules/outerPermissionMocks';
import { OuterPreviewMocks } from '../../utils/commonMockedModules/outerPreviewMock';
import { OuterSitesMocks } from '../../utils/commonMockedModules/outerSitesMock';
import { OuterWhoAmIMocks } from '../../utils/commonMockedModules/outerWhoAmIMocks';
import { E2eOnLoadingSetupModule } from '../../utils/outerE2eOnLoadingSetup';
import '../../utils/commonMockedModules/outerGlobalBasePathFetchMock';

export const DUMMY_SERVICE_CLASS_TOKEN = new InjectionToken('DUMMY_SERVICE_CLASS_TOKEN');

@SeEntryModule('OuterMocksModule')
@NgModule({
    imports: [
        OuterAuthorizationMocks,
        OuterWhoAmIMocks,
        i18nMocks,
        OuterLanguagesMocks,
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
                '/apps/smartedit-e2e/generated/e2e/base/smartedit/base-inner-app.js'
            ],
            SMARTEDIT_INNER_FILES_POST: [
                '/apps/smartedit-e2e/generated/e2e/base/smartedit/inner-app.js'
            ]
        }),
        moduleUtils.bootstrap(
            (httpBackendService: HttpBackendService) => {
                httpBackendService.matchLatestDefinitionEnabled(true);

                const map = [
                    {
                        value: '"thepreviewTicketURI"',
                        key: 'previewTicketURI'
                    },
                    {
                        value: '"somepath"',
                        key: 'i18nAPIRoot'
                    },

                    {
                        value:
                            '{"smartEditContainerLocation":"/apps/smartedit-e2e/generated/e2e/bootstrapResilience/outerExtendingModule.js", "extends":"OuterDummyToolbars"}',
                        key: 'applications.OuterExtendingModule'
                    },
                    {
                        value:
                            '{"smartEditContainerLocation":"/path/to/some/non/existent/container/script.js"}',
                        key: 'applications.nonExistentSmartEditContainerModule'
                    },
                    {
                        value:
                            '{"smartEditLocation":"/path/to/some/non/existent/application/script.js"}',
                        key: 'applications.nonExistentSmartEditModule'
                    },
                    {
                        value:
                            '{"smartEditLocation":"/apps/smartedit-e2e/generated/e2e/bootstrapResilience/innerDummyCmsDecorators.js"}',
                        key: 'applications.InnerDummyCmsDecoratorsModule'
                    },

                    {
                        value:
                            '{"smartEditContainerLocation":"/apps/smartedit-e2e/generated/e2e/bootstrapResilience/outerDummyToolbars.js"}',
                        key: 'applications.OuterDummyToolbars'
                    },
                    {
                        value:
                            '{"smartEditLocation":"/apps/smartedit-e2e/generated/e2e/bootstrapResilience/innerExtendingModule.js" , "extends":"InnerDummyCmsDecoratorsModule"}',
                        key: 'applications.InnerExtendingModule'
                    }
                ];

                httpBackendService.whenGET(/smartedit\/configuration/).respond(function () {
                    return [200, map];
                });

                httpBackendService.whenGET(/cmswebservices\/v1\/sites\/.*\/languages/).respond({
                    languages: [
                        {
                            nativeName: 'English',
                            isocode: 'en',
                            name: 'English',
                            required: true
                        }
                    ]
                });

                httpBackendService.whenGET(/^\w+.*/).passThrough();
            },
            [HttpBackendService]
        )
    ]
})
export class OuterMocksModule {}

window.pushModules(OuterMocksModule);
