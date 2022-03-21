/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function () {
    var componentObject = {};

    var selectors = {
        component: (hostId) => `se-select#${hostId}`,
        dropdown: (hostId) => `${selectors.component(hostId)} .fd-menu`,
        dropdownToggle: (hostId) => `${selectors.component(hostId)} .toggle-button`,
        searchInput: (hostId) => `${selectors.component(hostId)} .search__input`,
        option: (hostId) => `${selectors.component(hostId)} .menu-option`,
        optionItem: (hostId) => `${selectors.component(hostId)} .se-select-list__item`,
        selectedOption: (hostId) => `${selectors.component(hostId)} .selected-item`,
        removeButton: (hostId) => `${selectors.component(hostId)} .selected-item__remove-button`,
        actionableSearchItemActionButton: (hostId) =>
            `${selectors.component(hostId)} .se-actionable-search-item__action-btn`
    };

    componentObject.locators = {
        getComponent: (hostId) => by.css(selectors.component(hostId)),
        getDropdown: (hostId) => by.css(selectors.dropdown(hostId)),
        getDropdownToggle: (hostId) => by.css(selectors.dropdownToggle(hostId)),
        getSearchInput: (hostId) => by.css(selectors.searchInput(hostId)),
        getOptionByText: (hostId, text) => by.cssContainingText(selectors.option(hostId), text),
        getOptionItem: (hostId) => by.css(selectors.optionItem(hostId)),
        getSelectedItem: (hostId) => by.css(selectors.selectedOption(hostId)),
        getRemoveButton: (hostId) => by.css(selectors.removeButton(hostId)),
        getActionableSearchItemActionButton: (hostId) => {
            return by.css(selectors.actionableSearchItemActionButton(hostId));
        }
    };

    componentObject.elements = {
        getComponent: function (hostId) {
            return element(componentObject.locators.getComponent(hostId));
        },
        getAllOptions: function (hostId) {
            return element.all(componentObject.locators.getOptionItem(hostId));
        },
        getOptionByIndex: function (hostId, index) {
            return componentObject.elements.getAllOptions(hostId).get(index);
        },
        getDropdown: function (hostId) {
            return element(componentObject.locators.getDropdown(hostId));
        },
        getDropdownToggle: function (hostId) {
            return element(componentObject.locators.getDropdownToggle(hostId));
        },
        getSearchInput: function (hostId) {
            return element(componentObject.locators.getSearchInput(hostId));
        },
        getSelectedOption: function (hostId) {
            return element(componentObject.locators.getSelectedItem(hostId));
        },
        getSelectedPlaceholder: function (hostId) {
            return componentObject.elements
                .getComponent(hostId)
                .element(by.css('.selected-placeholder'));
        },
        getOptionByText: function (hostId, text) {
            return element(componentObject.locators.getOptionByText(hostId, text));
        },
        getSingleDropdownToggle: function (hostId) {
            return element(componentObject.locators.getDropdownToggle(hostId));
        },
        getRemoveButton: (hostId) => {
            return element(componentObject.locators.getRemoveButton(hostId));
        },
        getActionableSearchItemActionButton: (hostId) => {
            return element(componentObject.locators.getActionableSearchItemActionButton(hostId));
        }
    };

    componentObject.actions = {
        toggleSelector: function (hostId) {
            return browser
                .click(componentObject.elements.getDropdownToggle(hostId))
                .then(function () {
                    return componentObject.assertions.dropdownIsOpened(hostId);
                });
        },
        selectOptionByText: function (hostId, text) {
            return browser.click(
                componentObject.elements.getOptionByText(hostId, text),
                'Could not click on dropdown option with text=' + text
            );
        },
        selectOptionByIndex: function (hostId, index) {
            return browser.click(
                componentObject.elements.getAllOptions(hostId).get(index),
                'Could not click on dropdown option with index=' + index
            );
        },
        removeSelectedOption: async (hostId) => {
            await browser.click(componentObject.elements.getRemoveButton(hostId));
        }
    };

    componentObject.assertions = {
        isPresent: async (hostId) => {
            await browser.waitForPresence(componentObject.elements.getComponent(hostId));
        },
        selectedOptionContainsText: function (hostId, expectedText) {
            var whenOption = componentObject.elements.getSelectedOption(hostId);
            browser.waitForPresence(whenOption);

            var actual = whenOption.getText();

            expect(actual).toContain(expectedText);
        },
        selectedPlaceholderIsDisplayed: function (hostId) {
            return browser.waitForPresence(componentObject.elements.getSelectedPlaceholder(hostId));
        },
        dropdownIsEmpty: function (hostId) {
            return componentObject.actions.toggleSelector(hostId).then(function () {
                expect(componentObject.elements.getAllOptions(hostId).count()).toBe(0);
            });
        },
        dropdownIsPopulated: function (hostId) {
            return componentObject.actions.toggleSelector(hostId).then(function () {
                expect(componentObject.elements.getAllOptions(hostId).count()).not.toBe(0);
            });
        },
        dropdownIsOpened: function (hostId) {
            return browser.waitForPresence(componentObject.elements.getDropdown(hostId));
        },
        dropdownNotClickable: function (hostId) {
            browser.elementNotClickable(componentObject.elements.getSingleDropdownToggle(hostId));
        },
        optionContainsTextByIndex: function (hostId, expectedText, index) {
            var whenOption = componentObject.elements.getOptionByIndex(hostId, index);
            browser.waitForPresence(whenOption);

            var actual = whenOption.getText();

            expect(actual).toContain(expectedText);
        },
        isNotSelected: function (hostId) {
            return componentObject.assertions
                .selectedPlaceholderIsDisplayed(hostId)
                .then(function (isDisplayed) {
                    return isDisplayed;
                });
        }
    };

    return componentObject;
})();
