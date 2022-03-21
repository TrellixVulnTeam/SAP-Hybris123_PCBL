/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { apparelUkContentCatalogOnlineVersion } from 'fixtures/constants/versions';
import { IContentCatalog } from 'fixtures/entities/catalogs';
import { apparelContentCatalogGlobal } from './apparelContentCatalogGlobal.constant';

export const apparelContentCatalogUK: IContentCatalog = {
    catalogId: 'apparel-ukContentCatalog',
    name: {
        en: 'Apparel UK Content Catalog'
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
            uuid: 'apparel-ukContentCatalog/Staged',
            version: 'Staged',
            homepage: {
                current: {
                    uid: 'homepage',
                    name: 'Homepage',
                    catalogVersionUuid: 'apparel-ukContentCatalog/Staged'
                },
                old: {
                    uid: 'thirdpage',
                    name: 'Some Other Page',
                    catalogVersionUuid: 'apparel-ukContentCatalog/Staged'
                }
            }
        },
        apparelUkContentCatalogOnlineVersion
    ]
};
