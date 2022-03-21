/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { APP_INITIALIZER, Injector, ModuleWithProviders, NgModule, Provider } from '@angular/core';

import {
    HttpBackendService,
    IExperienceService,
    SeEntryModule,
    TestModeService
} from 'smarteditcommons';
import { STOREFRONT_URI, STOREFRONT_URI_TOKEN } from './outerConstants';

export function mocksInitFactory(
    injector: Injector,
    httpBackendService: HttpBackendService,
    storefrontUri: string
) {
    return () => {
        return new Promise((resolve) => {
            httpBackendService.matchLatestDefinitionEnabled(true);

            httpBackendService.whenGET(/static-resources/).passThrough();

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
                        },
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
                .whenGET(/cmssmarteditwebservices\/v1\/sites\/electronics\/productcatalogs/)
                .respond({
                    catalogs: [
                        {
                            catalogId: 'electronicsProductCatalog',
                            name: {
                                en: 'Electronics Product Catalog',
                                de: 'Produktkatalog Handys'
                            },
                            versions: [
                                {
                                    active: true,
                                    uuid: 'electronicsProductCatalog/Online',
                                    version: 'Online'
                                },
                                {
                                    active: false,
                                    uuid: 'electronicsProductCatalog/Staged',
                                    version: 'Staged'
                                }
                            ]
                        }
                    ]
                });

            httpBackendService
                .whenGET(/cmssmarteditwebservices\/v1\/sites\/apparel-uk\/productcatalogs/)
                .respond({
                    catalogs: [
                        {
                            catalogId: 'apparel-ukProductCatalog-clothing',
                            name: {
                                en: 'Clothing Product Catalog'
                            },
                            versions: [
                                {
                                    active: true,
                                    uuid: 'apparel-ukProductCatalog-clothing/Online',
                                    version: 'Online'
                                },
                                {
                                    active: false,
                                    uuid: 'apparel-ukProductCatalog-clothing/Staged',
                                    version: 'Staged'
                                }
                            ]
                        },
                        {
                            catalogId: 'apparel-ukProductCatalog-shoes',
                            name: {
                                en: 'Shoes Product Catalog'
                            },
                            versions: [
                                {
                                    active: true,
                                    uuid: 'apparel-ukProductCatalog-shoes/Online',
                                    version: 'Online'
                                },
                                {
                                    active: false,
                                    uuid: 'apparel-ukProductCatalog-shoes/Staged-1',
                                    version: 'Staged-1'
                                },
                                {
                                    active: false,
                                    uuid: 'apparel-ukProductCatalog-shoes/Staged-2',
                                    version: 'Staged-2'
                                }
                            ]
                        }
                    ]
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
                .whenGET(/cmswebservices\/v1\/sites\/electronics\/languages/)
                .respond({
                    languages: [
                        {
                            nativeName: 'English',
                            isocode: 'en',
                            required: true
                        }
                    ]
                });

            httpBackendService.whenGET(/cmswebservices\/v1\/sites\/apparel-uk\/languages/).respond({
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
                .whenGET(/cmswebservices\/v1\/types\?code=PreviewData\&mode=DEFAULT/)
                .respond({
                    attributes: [
                        {
                            cmsStructureType: 'Text',
                            qualifier: 'activeSite',
                            i18nKey: 'experience.selector.activesite'
                        },
                        {
                            cmsStructureType: 'EditableDropdown',
                            qualifier: 'previewCatalog',
                            i18nKey: 'experience.selector.catalog'
                        },
                        {
                            cmsStructureType: 'EditableDropdown',
                            qualifier: 'language',
                            i18nKey: 'experience.selector.language',
                            dependsOn: 'previewCatalog'
                        },
                        {
                            cmsStructureType: 'DateTime',
                            qualifier: 'time',
                            i18nKey: 'experience.selector.date.and.time'
                        },
                        {
                            cmsStructureType: 'ProductCatalogVersionsSelector',
                            qualifier: 'productCatalogVersions',
                            i18nKey: 'experience.selector.catalogversions'
                        },
                        {
                            cmsStructureType: 'ShortString',
                            qualifier: 'newField',
                            i18nKey: 'experience.selector.newfield'
                        }
                    ]
                });

            httpBackendService
                .whenPOST(/thepreviewTicketURI/)
                .respond(function (method, url, data) {
                    const returnedPayload = {
                        ...data,
                        ticketId: 'dasdfasdfasdfa',
                        resourcePath: storefrontUri
                    };

                    return [200, returnedPayload];
                });

            // Pushed modules are delivered both to smarteditloader and smarteditcontainer.
            // IExperienceService is not provided in smarteditloader so the injector will throw an error.
            try {
                injector
                    .get(IExperienceService)
                    .buildAndSetExperience({
                        siteId: 'apparel-uk',
                        catalogId: 'apparel-ukContentCatalog',
                        catalogVersion: 'Staged'
                    })
                    .then(() => {
                        resolve();
                    });
            } catch (e) {
                // Resolve, even though IExperienceService is not provided in smarteditloader.
                resolve();
            }
        });
    };
}

@SeEntryModule('E2eOnLoadingSetupModule')
@NgModule({
    providers: [
        {
            provide: TestModeService.TEST_TOKEN,
            useValue: true
        },
        { provide: STOREFRONT_URI_TOKEN, useValue: STOREFRONT_URI },
        {
            provide: APP_INITIALIZER,
            useFactory: mocksInitFactory,
            deps: [Injector, HttpBackendService, STOREFRONT_URI_TOKEN],
            multi: true
        }
    ]
})
export class E2eOnLoadingSetupModule {
    public static provide(providers: Provider[]): ModuleWithProviders {
        return {
            ngModule: E2eOnLoadingSetupModule,
            providers: [...providers]
        };
    }
}
