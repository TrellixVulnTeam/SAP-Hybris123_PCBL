/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

import {
    moduleUtils,
    AngularJSBootstrapIndicatorService,
    HttpBackendService,
    IRenderService,
    IToolbarServiceFactory,
    SeEntryModule,
    ToolbarItemType
} from 'smarteditcommons';
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
        OuterOtherMocks,
        E2eOnLoadingSetupModule,
        OuterPermissionMocks
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
            (
                httpBackendService: HttpBackendService,
                indicator: AngularJSBootstrapIndicatorService,
                upgrade: UpgradeModule
            ) => {
                httpBackendService.matchLatestDefinitionEnabled(true);

                const map = [
                    {
                        value: '"thepreviewTicketURI"',
                        key: 'previewTicketURI'
                    },
                    {
                        key: 'applications.InnerRenderDecorators',
                        value:
                            '{"smartEditLocation":"/apps/smartedit-e2e/generated/e2e/renderService/inner-app.js"}'
                    },
                    {
                        value: '"somepath"',
                        key: 'i18nAPIRoot'
                    }
                ];

                httpBackendService.whenGET(/smartedit\/configuration/).respond(function () {
                    return [200, map];
                });

                indicator.onSmarteditContainerReady().subscribe(() => {
                    const toolbarService = upgrade.injector
                        .get(IToolbarServiceFactory)
                        .getToolbarService('smartEditPerspectiveToolbar');
                    toolbarService.addItems([
                        {
                            key: 'toolbar.action.render.component',
                            type: ToolbarItemType.ACTION,
                            nameI18nKey: 'toolbar.action.render.component',
                            priority: 1,
                            callback() {
                                upgrade.injector
                                    .get(IRenderService)
                                    .renderComponent('component1', 'componentType1');
                            },
                            icons: ['render.png']
                        },
                        {
                            key: 'toolbar.action.render.slot',
                            type: ToolbarItemType.ACTION,
                            nameI18nKey: 'toolbar.action.render.slot',
                            priority: 2,
                            callback() {
                                upgrade.injector.get(IRenderService).renderSlots(['topHeaderSlot']);
                            },
                            icons: ['render.png']
                        }
                    ]);
                });
            },
            [HttpBackendService, AngularJSBootstrapIndicatorService, UpgradeModule]
        )
    ]
})
export class OuterMocksModule {}

window.pushModules(OuterMocksModule);
