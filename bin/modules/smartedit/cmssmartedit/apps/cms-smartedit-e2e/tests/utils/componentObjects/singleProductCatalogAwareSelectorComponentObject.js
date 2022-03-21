/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var select;
if (typeof require !== 'undefined') {
    select = require('./SelectComponentObject');
}

module.exports = (function () {
    var componentObject = {};

    componentObject.constants = {
        PRODUCT_CATALOG_SELECTOR_ID: 'productCatalog',
        CATEGORY_SELECTOR_ID: 'category',
        PRODUCT_SELECTOR_ID: 'product'
    };

    componentObject.assertions = {
        productCatalogSelectorIsPresent: function () {
            expect(componentObject.elements.getProductCatalogField().isPresent()).toBe(
                true,
                'Expected product catalog selector to be visible'
            );
        },
        productCatalogLabelHasText: function (expectedText) {
            expect(componentObject.elements.getProductCatalogLabel().getText()).toBe(
                expectedText,
                'Expected product catalog text to be ' + expectedText
            );
        },
        productCatalogIsNotSelected: function () {
            expect(
                select.assertions.isNotSelected(
                    componentObject.constants.PRODUCT_CATALOG_SELECTOR_ID
                )
            ).toBe(true);
        },
        productCatalogHasSelectedItem: function (expectedItemText) {
            expect(componentObject.elements.getProductCatalogSelectedItem().getText()).toBe(
                expectedItemText,
                'Expected product catalog selected item item to be ' + expectedItemText
            );
        },
        productIsPopulated: function () {
            return select.assertions.dropdownIsPopulated(
                componentObject.constants.PRODUCT_SELECTOR_ID
            );
        },
        productHasSelectedItem: function (expectedItemText) {
            expect(componentObject.elements.getProductSelectedItem().getText()).toBe(
                expectedItemText,
                'Expected product selected item item to be ' + expectedItemText
            );
        },
        productIsPresent: function () {
            expect(componentObject.elements.getProductField().isPresent()).toBe(
                true,
                'Expected product to be visible'
            );
        },
        productIsNotPopulated: function () {
            return select.assertions.dropdownIsEmpty(componentObject.constants.PRODUCT_SELECTOR_ID);
        },
        categoryIsPopulated: function () {
            return select.assertions.dropdownIsPopulated(
                componentObject.constants.CATEGORY_SELECTOR_ID
            );
        },
        categoryIsPresent: function () {
            expect(componentObject.elements.getCategoryField().isPresent()).toBe(
                true,
                'Expected category to be visible'
            );
        },
        categoryIsNotPopulated: function () {
            return select.assertions.dropdownIsEmpty(
                componentObject.constants.CATEGORY_SELECTOR_ID
            );
        }
    };

    componentObject.actions = {
        selectProductCatalog: function () {
            return select.actions
                .toggleSelector(componentObject.constants.PRODUCT_CATALOG_SELECTOR_ID)
                .then(function () {
                    return select.actions.selectOptionByText(
                        componentObject.constants.PRODUCT_CATALOG_SELECTOR_ID,
                        'Apparel Product Catalog'
                    );
                });
        }
    };

    componentObject.elements = {
        getProductCatalogField: function () {
            return select.elements.getComponent(
                componentObject.constants.PRODUCT_CATALOG_SELECTOR_ID
            );
        },
        getProductCatalogLabel: function () {
            return browser.findElement(by.css('#product-catalog label'));
        },
        getProductField: function () {
            return browser.findElement(
                by.css('se-generic-editor-dropdown#se-items-selector-dropdown se-select')
            );
        },
        getCategoryField: function () {
            return browser.findElement(
                by.css('se-generic-editor-dropdown#se-items-selector-dropdown se-select')
            );
        },
        getProductCatalogSelectedItem: function () {
            return select.elements.getSelectedOption(
                componentObject.constants.PRODUCT_CATALOG_SELECTOR_ID
            );
        },
        getProductSelectedItem: function () {
            var el = this.getProductField();
            return el.element(by.css('.se-item-printer .se-single-catalog-item__label'));
        }
    };

    return componentObject;
})();
