/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';

import { moduleUtils, SeEntryModule } from 'smarteditcommons';

import { OuterAuthorizationMocks } from '../../utils/commonMockedModules/outerAuthorizationMock';
import { OuterConfigurationMocks } from '../../utils/commonMockedModules/outerConfigurationMock';
import { i18nMocks } from '../../utils/commonMockedModules/outerI18nMock';
import { OuterLanguagesMocks } from '../../utils/commonMockedModules/outerLanguagesMock';
import { OuterOtherMocks } from '../../utils/commonMockedModules/outerOtherMock';
import { OuterPermissionMocks } from '../../utils/commonMockedModules/outerPermissionMocks';
import { OuterPreviewMocks } from '../../utils/commonMockedModules/outerPreviewMock';
import { OuterWhoAmIMocks } from '../../utils/commonMockedModules/outerWhoAmIMocks';
import {
    CONFIGURATION_AUTHORIZED_TOKEN,
    CONFIGURATION_MOCK_TOKEN
} from '../../utils/outerConstants';
import { E2eOnLoadingSetupModule } from '../../utils/outerE2eOnLoadingSetup';

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
                        value: '"thepreviewTicketURI"',
                        key: 'previewTicketURI'
                    },
                    {
                        value: '{malformed}',
                        key: 'i18nAPIRoot'
                    }
                ]
            },
            {
                provide: CONFIGURATION_AUTHORIZED_TOKEN,
                useValue: true
            }
        ]),
        i18nMocks,
        OuterLanguagesMocks,
        OuterPermissionMocks,
        OuterOtherMocks,
        OuterPreviewMocks,
        E2eOnLoadingSetupModule
    ],
    providers: [
        moduleUtils.provideValues({
            SMARTEDIT_ROOT: 'web/webroot',
            SMARTEDIT_INNER_FILES: [
                '/apps/smartedit-e2e/node_modules/ckeditor4/ckeditor.js',
                '/apps/smartedit-e2e/generated/e2e/base/smartedit/vendor.js',
                '/apps/smartedit-e2e/generated/e2e/base/smartedit/base-inner-app.js',
                '/apps/smartedit-e2e/generated/e2e/base/smartedit/inner-app.js'
            ],
            SMARTEDIT_RESOURCE_URI_REGEXP: /^(.*)\/apps\/smartedit-e2e\/generated\/e2e/
        })
    ]
})
export class OuterMocksModule {}

window.pushModules(OuterMocksModule);
