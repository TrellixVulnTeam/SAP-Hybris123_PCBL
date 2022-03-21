"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCatalogGlobal = void 0;
const catalogs_1 = require("../../entities/catalogs");
exports.productCatalogGlobal = {
    catalogId: 'apparelProductCatalog',
    name: {
        en: 'Apparel Product Catalog',
        de: 'Produktkatalog Kleidung'
    },
    versions: [
        {
            active: false,
            version: 'Staged'
        },
        {
            active: true,
            version: 'Online'
        }
    ]
};
//# sourceMappingURL=productCatalogGlobal.constant.js.map