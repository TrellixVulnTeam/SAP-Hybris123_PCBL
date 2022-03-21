"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apparelUkContentCatalogOnlineVersion = void 0;
const versions_1 = require("../../entities/versions");
exports.apparelUkContentCatalogOnlineVersion = {
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
    uuid: 'apparel-ukContentCatalog/Online',
    version: 'Online'
};
//# sourceMappingURL=apparelUkContentCatalogOnlineVersion.constant.js.map