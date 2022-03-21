/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint undef:false */
var select;
if (typeof require !== 'undefined') {
    select = require('./SelectComponentObject');
}

module.exports = (function () {
    var cmsLinkObject = {};

    cmsLinkObject.constants = {
        CONTENT_PAGE_SELECTOR_ID: 'contentPage',
        LINK_TO_SELECTOR_ID: 'linkTo'
    };

    cmsLinkObject.assertions = {
        // Product Catalog field
        productCatalogSelectorIsPresent: function () {
            expect(cmsLinkObject.elements.getProductCatalogField().isPresent()).toBe(
                true,
                'Expected product catalog selector to be visible'
            );
        },

        // Category field
        categoryIsPresent: function () {
            expect(cmsLinkObject.elements.getItemsSelectorDropdownField().isPresent()).toBe(
                true,
                'Expected category to be visible'
            );
        },

        // Product field
        productIsPresent: function () {
            expect(cmsLinkObject.elements.getItemsSelectorDropdownField().isPresent()).toBe(
                true,
                'Expected product to be visible'
            );
        },

        // External Link field
        externalLinkIsPresent: function () {
            expect(getShortString('url').isPresent()).toBe(
                true,
                'Expected external link to be visible'
            );
        },
        externalLinkIsEmpty: function () {
            expect(getShortString('url').getAttribute('value')).toBe(
                '',
                'Expect external url link to be empty'
            );
        },

        // Content Page field
        contentPageIsPresent: function () {
            expect(element(by.id('contentPage')).isPresent()).toBe(
                true,
                'Expected content page to be visible'
            );
        },
        contentPageIsPopulated: function () {
            return select.actions
                .toggleSelector(cmsLinkObject.constants.CONTENT_PAGE_SELECTOR_ID)
                .then(function () {
                    expect(cmsLinkObject.elements.getContentPageItems().count()).not.toBe(
                        0,
                        'Expected content page to be populated'
                    );
                });
        },

        // Component name field
        componentNameContainsText: function (text) {
            expect(getLocalizedShortString('linkName').getAttribute('value')).toContain(
                text,
                'Expect url link name to contain text "' + text + '"'
            );
        }
    };

    cmsLinkObject.actions = {
        chooseMode: function (mode) {
            return select.actions
                .toggleSelector(cmsLinkObject.constants.LINK_TO_SELECTOR_ID)
                .then(function () {
                    return select.actions.selectOptionByText(
                        cmsLinkObject.constants.LINK_TO_SELECTOR_ID,
                        mode
                    );
                });
        },

        // UrlLinkName field
        enterComponentName: function (text) {
            return enterLocalizedShortStringText('linkName', text);
        },

        enterExternalLinkUrlField: function (text) {
            return enterShortStringText('url', text);
        },

        setExternalLinkData: function (linkName, url) {
            return this.chooseMode('External').then(
                function () {
                    return this.enterComponentName(linkName).then(
                        function () {
                            return this.enterExternalLinkUrlField(url);
                        }.bind(this)
                    );
                }.bind(this)
            );
        }
    };

    cmsLinkObject.elements = {
        getProductCatalogField: function () {
            return select.elements.getComponent('productCatalog');
        },
        getItemsSelectorDropdownField: function () {
            return browser.findElement(
                by.css('se-generic-editor-dropdown#se-items-selector-dropdown se-select')
            );
        },
        getCmsLinkToField: function () {
            return element(by.css('#linkTo-selector'));
        },
        getContentPageItems: function () {
            return select.elements.getAllOptions(cmsLinkObject.constants.CONTENT_PAGE_SELECTOR_ID);
        }
    };

    return cmsLinkObject;
})();
