/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';

import { moduleUtils, HttpBackendService, SeEntryModule } from 'smarteditcommons';
import { OuterAuthorizationMocks } from '../../../utils/commonMockedModules/outerAuthorizationMock';
import { i18nMocks } from '../../../utils/commonMockedModules/outerI18nMock';
import { OuterLanguagesMocks } from '../../../utils/commonMockedModules/outerLanguagesMock';
import { OuterPermissionMocks } from '../../../utils/commonMockedModules/outerPermissionMocks';
import { OuterPreviewMocks } from '../../../utils/commonMockedModules/outerPreviewMock';
import { OuterSitesMocks } from '../../../utils/commonMockedModules/outerSitesMock';
import { OuterWhoAmIMocks } from '../../../utils/commonMockedModules/outerWhoAmIMocks';
import { ComponentMocks } from './mocks/outerComponentMocks';
import { LanguageMocks } from './mocks/outerLanguageMocks';
import { TempMocks } from './mocks/outerTempMocks';
import { UserMocks } from './mocks/outerUserMocks';
import '../../../utils/commonMockedModules/outerGlobalBasePathFetchMock';

@SeEntryModule('ConfigurationMocksModule')
@NgModule({
    imports: [
        ComponentMocks,
        LanguageMocks,
        TempMocks,
        UserMocks,
        i18nMocks,
        OuterLanguagesMocks,
        OuterAuthorizationMocks,
        OuterSitesMocks,
        OuterWhoAmIMocks,
        OuterPermissionMocks,
        OuterPreviewMocks
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
                        value: '"somepath"',
                        key: 'i18nAPIRoot'
                    },
                    {
                        value:
                            '{"smartEditContainerLocation":"/apps/smartedit-e2e/generated/e2e/genericEditor_3/commons/outerGenericEditorApp.js"}',
                        key: 'applications.GenericEditorApp'
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
