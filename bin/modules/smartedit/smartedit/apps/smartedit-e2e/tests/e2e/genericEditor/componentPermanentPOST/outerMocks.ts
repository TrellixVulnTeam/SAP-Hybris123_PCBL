/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';

import { moduleUtils, HttpBackendService, SeEntryModule } from 'smarteditcommons';
import { i18nMocks } from '../../../utils/commonMockedModules/outerI18nMock';
import { OuterPermissionMocks } from '../../../utils/commonMockedModules/outerPermissionMocks';
import { OuterSitesMocks } from '../../../utils/commonMockedModules/outerSitesMock';
import { OuterWhoAmIMocks } from '../../../utils/commonMockedModules/outerWhoAmIMocks';
import { languages } from '../common/outerCommonConstants';
import '../../../utils/commonMockedModules/outerGlobalBasePathFetchMock';

@SeEntryModule('ConfigurationMocksModule')
@NgModule({
    imports: [OuterWhoAmIMocks, i18nMocks, OuterSitesMocks, OuterPermissionMocks],
    providers: [
        moduleUtils.bootstrap(
            (httpBackendService: HttpBackendService) => {
                httpBackendService.matchLatestDefinitionEnabled(true);

                httpBackendService
                    .whenGET(/cmswebservices\/v1\/types\/thesmarteditComponentType/)
                    .respond(function () {
                        const structure = {
                            attributes: [
                                {
                                    cmsStructureType: 'ShortString',
                                    qualifier: 'description',
                                    i18nKey: 'type.thesmarteditComponentType.description.name',
                                    localized: false
                                }
                            ]
                        };

                        return [200, structure];
                    });

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                let component = {};
                let ticketId = 0;

                httpBackendService.whenPOST(/previewApi/).respond((method, url, data) => {
                    component = JSON.parse(data);
                    ticketId++;
                    return [
                        200,
                        {
                            ticketId
                        }
                    ];
                });

                httpBackendService
                    .whenGET(/cmswebservices\/v1\/sites\/.*\/languages/)
                    .respond(languages);

                httpBackendService.whenGET(/i18n/).passThrough();
                httpBackendService.whenGET(/view/).passThrough(); // calls to storefront render API
                httpBackendService.whenPUT(/contentslots/).passThrough();
                httpBackendService.whenGET(/\.html/).passThrough();

                const map = [
                    {
                        value: '"previewwebservices/v1/preview"',
                        key: 'previewTicketURI'
                    },
                    {
                        value:
                            '{"smartEditContainerLocation":"/apps/smartedit-e2e/generated/e2e/genericEditor/componentPermanentPOST/outerGenericEditorApp.js"}',
                        key: 'applications.GenericEditorApp'
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
