/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';

import {
    moduleUtils,
    urlUtils,
    HttpBackendService,
    SeEntryModule,
    TypedMap
} from 'smarteditcommons';

import { i18nMocks } from '../../utils/commonMockedModules/outerI18nMock';
import { OuterLanguagesMocks } from '../../utils/commonMockedModules/outerLanguagesMock';
import { OuterPermissionMocks } from '../../utils/commonMockedModules/outerPermissionMocks';
import { OuterWhoAmIMocks } from '../../utils/commonMockedModules/outerWhoAmIMocks';
import { E2eOnLoadingSetupModule } from '../../utils/outerE2eOnLoadingSetup';
import '../../utils/commonMockedModules/outerGlobalBasePathFetchMock';

@SeEntryModule('InnerMocksModule')
@NgModule({
    imports: [
        OuterPermissionMocks,
        OuterWhoAmIMocks,
        OuterLanguagesMocks,
        i18nMocks,
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
            ],
            SSO_AUTHENTICATION_ENTRY_POINT: ''
        }),
        moduleUtils.bootstrap(
            (httpBackendService: HttpBackendService) => {
                httpBackendService.matchLatestDefinitionEnabled(true);

                httpBackendService.whenGET(/test\/e2e/).passThrough();
                httpBackendService.whenGET(/smartedit\/settings/).respond({
                    'smartedit.sso.enabled': 'true'
                });

                httpBackendService.whenGET(/cmswebservices\/sites\/.*\/languages/).respond({
                    languages: [
                        {
                            nativeName: 'English',
                            isocode: 'en',
                            name: 'English',
                            required: true
                        }
                    ]
                });

                const oauthToken0 = {
                    access_token: 'access-token0',
                    token_type: 'bearer'
                };

                const oauthToken1 = {
                    access_token: 'access-token1',
                    token_type: 'bearer'
                };

                const oauthToken2 = {
                    access_token: 'access-token2',
                    token_type: 'bearer'
                };

                // through SSO
                httpBackendService
                    .whenPOST(/smartedit\/authenticate/)
                    .respond((method: string, url: string, data: any) => {
                        const query = JSON.parse(data);
                        if (
                            query.client_id === 'smartedit' &&
                            sessionStorage.getItem('sso.authenticate.failure') !== 'true'
                        ) {
                            return [200, oauthToken0];
                        } else {
                            return [
                                401,
                                {
                                    error_description: 'SSO authentication issue'
                                }
                            ];
                        }
                    });

                // through form
                httpBackendService
                    .whenPOST(/authorizationserver\/oauth\/token/)
                    .respond((method: string, url: string, data: any) => {
                        const query = urlUtils.parseQuery(data) as any;
                        if (
                            query.client_id === 'smartedit' &&
                            query.client_secret === undefined &&
                            query.grant_type === 'password' &&
                            query.username === 'cmsmanager' &&
                            query.password === '1234'
                        ) {
                            return [200, oauthToken0];
                        } else {
                            return [
                                401,
                                {
                                    error_description: 'Invalid username or password'
                                }
                            ];
                        }
                    });
                httpBackendService
                    .whenPOST(/authEntryPoint1/)
                    .respond((method: string, url: string, data: any) => {
                        const query = urlUtils.parseQuery(data) as any;
                        if (
                            query.client_id === 'client_id_1' &&
                            query.client_secret === 'client_secret_1' &&
                            query.grant_type === 'password' &&
                            query.username === 'fake1' &&
                            query.password === '1234'
                        ) {
                            return [200, oauthToken1];
                        } else {
                            return [401, null];
                        }
                    });

                httpBackendService
                    .whenPOST(/authEntryPoint2/)
                    .respond((method: string, url: string, data: any) => {
                        const query = urlUtils.parseQuery(data) as any;
                        if (
                            query.client_id === 'client_id_2' &&
                            query.client_secret === 'client_secret_2' &&
                            query.grant_type === 'password' &&
                            query.username === 'fake2' &&
                            query.password === '1234'
                        ) {
                            return [200, oauthToken2];
                        } else {
                            return [401, null];
                        }
                    });

                httpBackendService
                    .whenGET(/smartedit\/configuration/)
                    .respond(
                        (method: string, url: string, data: any, headers: TypedMap<string>) => {
                            if (headers.Authorization === 'bearer ' + oauthToken0.access_token) {
                                return [
                                    200,
                                    [
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
                                            value:
                                                '{"smartEditLocation":"/apps/smartedit-e2e/generated/e2e/apiAuthentication/innerDummyCmsDecorators.js", "authenticationMap":{"api1":"/authEntryPoint1"}}',
                                            key: 'applications.DummyCmsDecoratorsModule'
                                        },
                                        // {
                                        //     value:
                                        //         '{"authenticationMap":{"api1":"/authEntryPoint1"}}',
                                        //     key: 'applications.DummyCmsDecoratorsModule'
                                        // },
                                        {
                                            value: '{ "api2":"/authEntryPoint2"}',
                                            key: 'authenticationMap'
                                        }
                                    ]
                                ];
                            } else {
                                return [401, null];
                            }
                        }
                    );

                httpBackendService
                    .whenGET(/api1\/somepath/)
                    .respond(
                        (method: string, url: string, data: any, headers: TypedMap<string>) => {
                            if (headers.Authorization === 'bearer ' + oauthToken1.access_token) {
                                return [
                                    200,
                                    {
                                        status: 'OK'
                                    }
                                ];
                            } else {
                                return [401, null];
                            }
                        }
                    );

                httpBackendService
                    .whenGET(/api2\/someotherpath/)
                    .respond(
                        (method: string, url: string, data: any, headers: TypedMap<string>) => {
                            if (headers.Authorization === 'bearer ' + oauthToken2.access_token) {
                                return [
                                    200,
                                    {
                                        status: 'OK'
                                    }
                                ];
                            } else {
                                return [401, null];
                            }
                        }
                    );

                httpBackendService.whenGET(/fragments/).passThrough();
                httpBackendService.whenGET(/apiAuthentication/).passThrough();
            },
            [HttpBackendService]
        )
    ]
})
export class InnerMocksModule {}

window.__smartedit__.smartEditContainerAngularApps = [];
window.__smartedit__.smartEditInnerAngularApps = [];
window.pushModules(InnerMocksModule);
