/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var cmsItemDropdown;
var select;
if (typeof require !== 'undefined') {
    cmsItemDropdown = require('./cmsItemDropdownComponentObject');
    select = require('./SelectComponentObject');
}

module.exports = (function () {
    var componentObject = {};

    const selectorHostId = 'mediaContainer';

    const selectors = {
        mediaFormat: (format) => `.se-media-container-cell--${format}`,
        mediaContainerSelector: () => `#${selectorHostId}-selector`,
        mediaContainerSelectorItemLabel: () => '.media-container-selector-item__label'
    };

    componentObject.elements = {
        getMediaContainerListSelector: function () {
            return element(by.css(selectors.mediaContainerSelector()));
        },
        getMediaContainerListElements: function () {
            return element.all(by.css(selectors.mediaContainerSelectorItemLabel()));
        },
        getMediaContainerListElementByQUalifier: function (mediaContainerQualifier) {
            return element(
                by.cssContainingText(
                    selectors.mediaContainerSelectorItemLabel(),
                    mediaContainerQualifier
                )
            );
        },
        getElementById: function (elementId) {
            return element(by.id(elementId));
        },
        getElementByClass: function (className) {
            return element(by.css(className));
        },
        getMediaContainerSearchField: function () {
            return componentObject.elements
                .getMediaContainerListSelector()
                .element(select.locators.getSearchInput('mediaContainer'));
        },
        getMediaContainerSearchCreateButton: function () {
            return select.elements.getActionableSearchItemActionButton(selectorHostId);
        }
    };

    componentObject.actions = {
        openMediaContainerList: async () => {
            await browser.click(componentObject.elements.getMediaContainerListSelector());
        },
        selectMediaContainerFromList: async (mediaContainerQualifier) => {
            await browser.click(
                componentObject.elements.getMediaContainerListElementByQUalifier(
                    mediaContainerQualifier
                )
            );
            await cmsItemDropdown.actions.waitForDebounceToPass(6000);
        },
        clearSelectedMediaContainer: () => {
            return select.actions.removeSelectedOption('mediaContainer');
        },
        inputTextToSearchFieldOfMediaContainerList: async (searchText) => {
            await browser.sendKeys(
                componentObject.elements.getMediaContainerSearchField(),
                searchText
            );
        },
        clickCreateNewMediaContainer: async () => {
            const elem = componentObject.elements.getMediaContainerSearchCreateButton();
            await browser.waitForPresence(elem);
            await browser.click(elem);
        }
    };

    componentObject.assertions = {
        mediaContainerListIsDispalyed: function () {
            expect(componentObject.elements.getMediaContainerListSelector()).toBeDisplayed();
        },
        mediaContainerListHasData: function (expectedNumberOfElements) {
            componentObject.elements.getMediaContainerListElements().then(function (elements) {
                expect(elements.length).toBe(expectedNumberOfElements);
            });
        },
        mediaContainerQualifierFieldDisplayed: async (fieldId) => {
            await browser.waitForPresence(componentObject.elements.getElementById(fieldId));
        },
        mediaContainerQualifierFieldIsReadOnly: function (fieldId) {
            expect(componentObject.elements.getElementById(fieldId).getAttribute('readonly')).toBe(
                'true'
            );
        },
        mediaContainerQualifierFieldIsEditable: async (fieldId) => {
            expect(
                await componentObject.elements.getElementById(fieldId).getAttribute('readonly')
            ).toBe(null);
        },
        mediaContainerQualifierFieldContainsValue: async (fieldId, value) => {
            expect(
                await componentObject.elements.getElementById(fieldId).getAttribute('value')
            ).toContain(value);
        },
        mediaContainerQualifierFieldNotDisplayed: async (fieldId) => {
            await browser.waitForAbsence(componentObject.elements.getElementById(fieldId));
        },
        mediaFormatIsDisplayed: async (format) => {
            await browser.waitForPresence(
                componentObject.elements.getElementByClass(selectors.mediaFormat(format))
            );
        },
        mediaFormatIsNotDisplayed: async (format) => {
            await browser.waitForAbsence(
                componentObject.elements.getElementByClass(selectors.mediaFormat(format))
            );
        }
    };

    componentObject.utils = {
        switchToAdvancedMediaContainer: function () {
            browser.executeScript(
                'window.sessionStorage.setItem("advancedMediaContainerManagementEnabled", arguments[0])',
                JSON.stringify(true)
            );
        }
    };

    return componentObject;
})();
