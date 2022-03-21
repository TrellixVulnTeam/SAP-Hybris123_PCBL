/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';

import { moduleUtils, HttpBackendService, LanguageService, SeEntryModule } from 'smarteditcommons';

import { i18nMocks } from '../../utils/commonMockedModules/outerI18nMock';
import '../../utils/commonMockedModules/outerGlobalBasePathFetchMock';

@SeEntryModule('OuterMocksModule')
@NgModule({
    imports: [i18nMocks],
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
            (httpBackendService: HttpBackendService, languageService: LanguageService) => {
                httpBackendService.whenGET(/test\/e2e/).passThrough();
                httpBackendService.whenGET(/static-resources/).passThrough();

                const map = [
                    {
                        value: '"thepreviewTicketURI"',
                        key: 'previewTicketURI'
                    },
                    {
                        value:
                            '{"smartEditContainerLocation":"/apps/smartedit-e2e/generated/e2e/catalogDetails/outerapp.js"}',
                        key: 'applications.Outerapp'
                    }
                ];

                httpBackendService.whenGET(/smartedit\/configuration/).respond(() => {
                    return [200, map];
                });

                httpBackendService.whenPUT(/smartedit\/configuration/).respond(() => [404, null]);

                httpBackendService.whenPOST(/thepreviewTicketURI/).respond({
                    ticketId: 'dasdfasdfasdfa',
                    resourcePath:
                        document.location.origin +
                        '/apps/smartedit-e2e/generated/pages/storefront.html'
                });

                httpBackendService.whenGET(/fragments/).passThrough();

                httpBackendService.whenGET(/cmswebservices\/v1\/languages/).respond({
                    languages: [
                        {
                            language: 'en',
                            required: true
                        }
                    ]
                });

                httpBackendService
                    .whenGET(
                        '/smarteditwebservices/v1/i18n/languages/' +
                            languageService.getBrowserLocale()
                    )
                    .respond({});

                httpBackendService
                    .whenGET(/cmswebservices\/v1\/sites\/electronics\/languages/)
                    .respond({
                        languages: [
                            {
                                nativeName: 'English',
                                isocode: 'en',
                                required: true
                            },
                            {
                                nativeName: 'Polish',
                                isocode: 'pl',
                                required: true
                            },
                            {
                                nativeName: 'Italian',
                                isocode: 'it'
                            }
                        ]
                    });

                httpBackendService
                    .whenGET(/cmswebservices\/v1\/sites\/apparel-uk\/languages/)
                    .respond({
                        languages: [
                            {
                                nativeName: 'English',
                                isocode: 'en',
                                required: true
                            },
                            {
                                nativeName: 'French',
                                isocode: 'fr'
                            }
                        ]
                    });

                httpBackendService
                    .whenGET(
                        /cmswebservices\/v1\/catalogs\/apparel-ukContentCatalog\/synchronization\/versions\/Staged\/Online/
                    )
                    .respond({
                        date: '2016-01-29T16:25:28+0000',
                        status: 'RUNNING'
                    });

                httpBackendService
                    .whenGET(
                        /cmswebservices\/v1\/catalogs\/apparel-deContentCatalog\/synchronization\/versions\/Staged\/Online/
                    )
                    .respond({
                        date: '2015-01-29T16:25:44+0000',
                        status: 'ABORTED'
                    });

                httpBackendService
                    .whenGET(
                        /cmswebservices\/v1\/catalogs\/electronicsContentCatalog\/synchronization\/versions\/Staged\/Online/
                    )
                    .respond({
                        date: '2014-01-28T17:05:29+0000',
                        status: 'FINISHED'
                    });

                httpBackendService
                    .whenGET(
                        /cmswebservices\/v1\/catalogs\/actionFiguresContentCatalog\/synchronization\/versions\/Staged\/Online/
                    )
                    .respond({
                        date: '2013-01-28T17:05:29+0000',
                        status: 'FINISHED'
                    });

                httpBackendService
                    .whenPUT(
                        /cmswebservices\/v1\/catalogs\/apparel-ukContentCatalog\/synchronization\/versions\/Staged\/Online/
                    )
                    .respond({
                        date: '2016-01-29T16:25:28+0000',
                        status: 'RUNNING'
                    });

                httpBackendService
                    .whenPUT(
                        /cmswebservices\/v1\/catalogs\/apparel-deContentCatalog\/synchronization\/versions\/Staged\/Online/
                    )
                    .respond({
                        date: '2016-01-29T16:25:44+0000',
                        status: 'ABORTED'
                    });

                httpBackendService
                    .whenPUT(
                        /cmswebservices\/v1\/catalogs\/electronicsContentCatalog\/synchronization\/versions\/Staged\/Online/
                    )
                    .respond({
                        date: '2014-01-28T17:05:29+0000',
                        status: 'FINISHED'
                    });

                httpBackendService
                    .whenPUT(
                        /cmswebservices\/v1\/catalogs\/actionFiguresContentCatalog\/synchronization\/versions\/Staged\/Online/
                    )
                    .respond({
                        date: '2013-01-28T17:05:29+0000',
                        status: 'FINISHED'
                    });

                const allSites = [
                    {
                        previewUrl: '/apps/smartedit-e2e/generated/pages/storefront.html',
                        name: {
                            en: 'Electronics'
                        },
                        redirectUrl: 'redirecturlElectronics',
                        uid: 'electronics',
                        contentCatalogs: ['electronicsContentCatalog']
                    },
                    {
                        previewUrl: '/apps/smartedit-e2e/generated/pages/storefront.html',
                        name: {
                            en: 'Apparels'
                        },
                        redirectUrl: 'redirecturlApparels',
                        uid: 'apparel-uk',
                        contentCatalogs: ['apparel-ukContentCatalog']
                    },
                    {
                        previewUrl: '/apps/smartedit-e2e/generated/pages/storefront.html',
                        name: {
                            en: 'Apparels'
                        },
                        redirectUrl: 'redirecturlApparels',
                        uid: 'apparel-de',
                        contentCatalogs: ['apparel-deContentCatalog']
                    },
                    {
                        previewUrl: '/apps/smartedit-e2e/generated/pages/storefront.html',
                        name: {
                            en: 'Toys'
                        },
                        redirectUrl: 'redirectSomeOtherSite',
                        uid: 'toys',
                        contentCatalogs: ['toysContentCatalog']
                    },
                    {
                        previewUrl: '/apps/smartedit-e2e/generated/pages/storefront.html',
                        name: {
                            en: 'Action Figures'
                        },
                        redirectUrl: 'redirectSomeOtherSite',
                        uid: 'action',
                        contentCatalogs: ['toysContentCatalog', 'actionFiguresContentCatalog']
                    }
                ];

                httpBackendService.whenGET(/cmswebservices\/v1\/sites$/).respond({
                    sites: allSites
                });
                httpBackendService
                    .whenPOST(/cmswebservices\/v1\/sites\/catalogs/)
                    .respond(function (method, url, data) {
                        const params = JSON.parse(data);
                        if (params.catalogIds) {
                            const filteredItems = allSites.filter(function (site) {
                                return (
                                    params.catalogIds.indexOf(
                                        site.contentCatalogs[site.contentCatalogs.length - 1]
                                    ) > -1
                                );
                            });
                            return [
                                200,
                                {
                                    sites: filteredItems
                                }
                            ];
                        }
                        return [
                            200,
                            {
                                sites: []
                            }
                        ];
                    });

                httpBackendService
                    .whenGET(/cmssmarteditwebservices\/v1\/sites\/electronics\/contentcatalogs/)
                    .respond({
                        catalogs: [
                            {
                                catalogId: 'electronicsContentCatalog',
                                name: {
                                    en: 'Electronics Content Catalog'
                                },
                                versions: [
                                    {
                                        version: 'Online',
                                        active: true,
                                        uuid: 'electronicsContentCatalog/Online'
                                    },
                                    {
                                        version: 'Staged',
                                        active: false,
                                        uuid: 'electronicsContentCatalog/Staged'
                                    }
                                ],
                                parents: []
                            }
                        ]
                    });

                httpBackendService
                    .whenGET(/cmssmarteditwebservices\/v1\/sites\/apparel-uk\/contentcatalogs/)
                    .respond({
                        catalogs: [
                            {
                                catalogId: 'apparel-ukContentCatalog',
                                name: {
                                    en: 'Apparel UK Content Catalog'
                                },
                                versions: [
                                    {
                                        version: 'Online',
                                        active: true,
                                        uuid: 'apparel-ukContentCatalog/Online'
                                    },
                                    {
                                        version: 'Staged',
                                        active: false,
                                        uuid: 'apparel-ukContentCatalog/Staged'
                                    }
                                ],
                                parents: []
                            }
                        ]
                    });

                httpBackendService
                    .whenGET(/cmssmarteditwebservices\/v1\/sites\/apparel-de\/contentcatalogs/)
                    .respond({
                        catalogs: [
                            {
                                catalogId: 'apparel-deContentCatalog',
                                name: {
                                    en: 'Apparel DE Content Catalog'
                                },
                                versions: [
                                    {
                                        version: 'Online',
                                        active: true
                                    },
                                    {
                                        version: 'Staged',
                                        active: false
                                    }
                                ],
                                parents: []
                            }
                        ]
                    });

                httpBackendService
                    .whenGET(/cmssmarteditwebservices\/v1\/sites\/toys\/contentcatalogs/)
                    .respond({
                        catalogs: [
                            {
                                catalogId: 'toysContentCatalog',
                                name: {
                                    en: 'Toys Content Catalog'
                                },
                                versions: [
                                    {
                                        version: 'Online',
                                        active: true
                                    },
                                    {
                                        version: 'Staged',
                                        active: false
                                    }
                                ],
                                parents: []
                            }
                        ]
                    });

                httpBackendService
                    .whenGET(/cmssmarteditwebservices\/v1\/sites\/action\/contentcatalogs/)
                    .respond({
                        catalogs: [
                            {
                                catalogId: 'toysContentCatalog',
                                name: {
                                    en: 'Toys Content Catalog'
                                },
                                versions: [
                                    {
                                        version: 'Online',
                                        active: true
                                    },
                                    {
                                        version: 'Staged',
                                        active: false
                                    }
                                ],
                                parents: []
                            },
                            {
                                catalogId: 'actionFiguresContentCatalog',
                                name: {
                                    en: 'Action Figures Content Catalog'
                                },
                                versions: [
                                    {
                                        version: 'Online',
                                        active: true
                                    },
                                    {
                                        version: 'Staged',
                                        active: false
                                    }
                                ],
                                parents: []
                            }
                        ]
                    });
            },
            [HttpBackendService, LanguageService]
        )
    ]
})
export class OuterMocksModule {}

window.pushModules(OuterMocksModule);
