"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apparelContentCatalogUK = void 0;
const versions_1 = require("../versions");
const catalogs_1 = require("../../entities/catalogs");
const apparelContentCatalogGlobal_constant_1 = require("./apparelContentCatalogGlobal.constant");
exports.apparelContentCatalogUK = {
    catalogId: 'apparel-ukContentCatalog',
    name: {
        en: 'Apparel UK Content Catalog'
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
        versions_1.apparelUkContentCatalogOnlineVersion
    ]
};
//# sourceMappingURL=apparelContentCatalogUK.constant.js.map