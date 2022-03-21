/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var select;
if (typeof require !== 'undefined') {
    select = require('./SelectComponentObject');
}
module.exports = (function () {
    var experienceSelectorObject = {};

    experienceSelectorObject.constants = {
        PREVIEW_CATALOG_SELECTOR_ID: 'previewCatalog'
    };

    experienceSelectorObject.assertions = {
        contentCatalogDropdownIsEditable: function () {
            select.actions.toggleSelector(
                experienceSelectorObject.constants.PREVIEW_CATALOG_SELECTOR_ID
            );
            select.assertions.dropdownIsOpened(
                experienceSelectorObject.constants.PREVIEW_CATALOG_SELECTOR_ID
            );
        },
        contentCatalogDropdownIsNotEditable: function () {
            expect(
                select.elements
                    .getDropdownToggle(
                        experienceSelectorObject.constants.PREVIEW_CATALOG_SELECTOR_ID
                    )
                    .getAttribute('disabled')
            ).toBeTruthy();
        },
        experienceSelectorButtonHasText: function (text) {
            expect(experienceSelectorObject.elements.experienceSelectorButtonText()).toContain(
                text
            );
        }
    };

    experienceSelectorObject.actions = {
        openExperienceSelector: function () {
            return browser.waitUntilNoModal().then(function () {
                return browser
                    .click(experienceSelectorObject.elements.experienceSelectorButtonSelector())
                    .then(function () {
                        browser.waitUntil(
                            EC.presenceOf(
                                experienceSelectorObject.elements.contentCatalogDropdown()
                            ),
                            'Expected modal to be opened'
                        );
                    });
            });
        }
    };

    experienceSelectorObject.elements = {
        experienceSelectorButtonSelector: function () {
            return by.id('experience-selector-btn', 'Experience Selector button not found');
        },
        submitButtonSelector: function () {
            return by.id('submit', 'Experience Selector Submit Button not found');
        },
        cancelButtonSelector: function () {
            return by.id('cancel', 'Experience Selector Cancel Button not found');
        },
        contentCatalogDropdown: function () {
            return element(by.css('div[id="previewCatalog"] .se-generic-editor-dropdown'));
        },
        experienceSelectorButtonText: function () {
            return element(
                by.css("[class*='se-experience-selector__btn-text ']", 'Selector widget not found')
            ).getText();
        }
    };

    return experienceSelectorObject;
})();
