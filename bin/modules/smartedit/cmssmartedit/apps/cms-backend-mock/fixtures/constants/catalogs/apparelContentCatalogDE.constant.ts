/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IContentCatalog } from 'fixtures/entities/catalogs';
import { apparelContentCatalogGlobal } from './apparelContentCatalogGlobal.constant';

export const apparelContentCatalogDE: IContentCatalog = {
    catalogId: 'apparel-deContentCatalog',
    name: {
        en: 'Apparel DE Content Catalog'
    },
    parents: [apparelContentCatalogGlobal],
    versions: [
        {
            active: false,
            pageDisplayConditions: [
                {
                    options: [
                        {
                            label: 'page.displaycondition.variation',
                            id: 'VARIATION'
                        }
                    ],
                    typecode: 'ProductPage'
                },
                {
                    options: [
                        {
                            label: 'page.displaycondition.variation',
                            id: 'VARIATION'
                        }
                    ],
                    typecode: 'CategoryPage'
                },
                {
                    options: [
                        {
                            label: 'page.displaycondition.primary',
                            id: 'PRIMARY'
                        },
                        {
                            label: 'page.displaycondition.variation',
                            id: 'VARIATION'
                        }
                    ],
                    typecode: 'ContentPage'
                }
            ],
            uuid: 'apparel-deContentCatalog/Staged',
            version: 'Staged'
        },
        {
            active: true,
            pageDisplayConditions: [
                {
                    options: [
                        {
                            label: 'page.displaycondition.variation',
                            id: 'VARIATION'
                        }
                    ],
                    typecode: 'ProductPage'
                },
                {
                    options: [
                        {
                            label: 'page.displaycondition.variation',
                            id: 'VARIATION'
                        }
                    ],
                    typecode: 'CategoryPage'
                },
                {
                    options: [
                        {
                            label: 'page.displaycondition.primary',
                            id: 'PRIMARY'
                        },
                        {
                            label: 'page.displaycondition.variation',
                            id: 'VARIATION'
                        }
                    ],
                    typecode: 'ContentPage'
                }
            ],
            uuid: 'apparel-deContentCatalog/Online',
            version: 'Online'
        }
    ]
};
