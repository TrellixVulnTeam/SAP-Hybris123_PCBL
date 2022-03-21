"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apparelContentCatalogGlobal = void 0;
const catalogs_1 = require("../../entities/catalogs");
exports.apparelContentCatalogGlobal = {
    catalogId: 'apparelContentCatalog',
    name: {
        en: 'Apparel Content Catalog'
    },
    catalogName: {
        en: 'Apparel Content Catalog'
    },
    versions: [
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
            thumbnailUrl: '/medias/Homepage.png',
            uuid: 'apparelContentCatalog/Online',
            version: 'Online'
        },
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
            thumbnailUrl: '/medias/Homepage.png',
            uuid: 'apparelContentCatalog/Staged',
            version: 'Staged'
        }
    ]
};
//# sourceMappingURL=apparelContentCatalogGlobal.constant.js.map