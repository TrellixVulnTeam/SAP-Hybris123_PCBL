"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apparelContentCatalogDE = void 0;
const catalogs_1 = require("../../entities/catalogs");
const apparelContentCatalogGlobal_constant_1 = require("./apparelContentCatalogGlobal.constant");
exports.apparelContentCatalogDE = {
    catalogId: 'apparel-deContentCatalog',
    name: {
        en: 'Apparel DE Content Catalog'
    },
    parents: [apparelContentCatalogGlobal_constant_1.apparelContentCatalogGlobal],
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
//# sourceMappingURL=apparelContentCatalogDE.constant.js.map