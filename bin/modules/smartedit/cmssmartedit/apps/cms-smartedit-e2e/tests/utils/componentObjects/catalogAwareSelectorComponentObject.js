/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var select;
if (typeof require !== 'undefined') {
    select = require('./SelectComponentObject');
}
module.exports = (function () {
    var catalogAwareSelector = {};

    catalogAwareSelector.constants = {
        DRAG_AND_DROP_OFFSET_FIX: {
            x: 1,
            y: 10
        },
        DRAG_DELAY: 200
    };

    var selectors = {
        catalogVersionSelectorHostId: 'se-catalog-version-selector-dropdown',
        itemsSelectorHostId: 'se-items-selector-dropdown'
    };

    catalogAwareSelector.elements = {
        getCatalogAwareSelectorRoot: function (selectorId) {
            return element(by.css('se-catalog-aware-selector[data-id="' + selectorId + '"]'));
        },
        getAddItemsButton: function (selectorId) {
            return catalogAwareSelector.elements
                .getCatalogAwareSelectorRoot(selectorId)
                .element(by.css('#catalog-aware-selector-add-item'));
        },
        getAddMoreItemsButton: function (selectorId) {
            return catalogAwareSelector.elements
                .getCatalogAwareSelectorRoot(selectorId)
                .element(by.cssContainingText('button', 'Add More'));
        },
        getItemSearchBox: function () {
            return select.elements.getSearchInput(selectors.itemsSelectorHostId);
        },
        getItemSearchBoxOption: (itemName) => {
            return element
                .all(
                    by.cssContainingText(
                        `#${selectors.itemsSelectorHostId} .se-product-row .se-product-row__product`,
                        itemName
                    )
                )
                .first();
        },
        getAddButton: function () {
            return element(by.cssContainingText('button', 'se.cms.catalogaware.panel.button.add'));
        },

        // -- List --
        getListItems: function (selectorId) {
            return element.all(
                by.css(
                    'se-catalog-aware-selector[data-id="' +
                        selectorId +
                        '"] se-editable-list .se-tree-node__li.angular-ui-tree-node'
                )
            );
        },
        getItemInList: function (selectorId, itemName, catalogVersion) {
            return catalogAwareSelector.elements
                .getCatalogAwareSelectorRoot(selectorId)
                .element(
                    by.xpath(
                        '//*[*[normalize-space(text())="' +
                            itemName +
                            '"] and *[contains(normalize-space(text()),"' +
                            catalogVersion +
                            '")]]'
                    )
                );
        },
        getItemMoreMenuButton: function (selectorId, itemIndex) {
            return catalogAwareSelector.elements
                .getListItems(selectorId)
                .get(itemIndex)
                .element(by.css('.se-dropdown-more-menu .se-dropdown-more-menu__toggle'));
        },
        getExpandedDropdownMenu: function () {
            return element(by.css('.se-dropdown-more-menu .se-dropdown-menu__list'));
        },
        getMoveUpButton: function () {
            return catalogAwareSelector.elements
                .getExpandedDropdownMenu()
                .element(by.cssContainingText('li a', 'Move Up'));
        },
        getMoveDownButton: function () {
            return catalogAwareSelector.elements
                .getExpandedDropdownMenu()
                .element(by.cssContainingText('li a', 'Move Down'));
        },
        getDeleteItemButton: function () {
            return catalogAwareSelector.elements
                .getExpandedDropdownMenu()
                .element(by.cssContainingText('li a', 'Delete'));
        }
    };

    catalogAwareSelector.actions = {
        openSelector: function (selectorId) {
            var addItemsButton = catalogAwareSelector.elements.getAddItemsButton(selectorId);
            return addItemsButton.isDisplayed().then(function (isDisplayed) {
                if (isDisplayed) {
                    return browser.click(addItemsButton);
                } else {
                    return browser.click(
                        catalogAwareSelector.elements.getAddMoreItemsButton(selectorId)
                    );
                }
            });
        },
        openCatalogVersionDropdown: async () => {
            await select.assertions.isPresent(selectors.catalogVersionSelectorHostId);
            await select.actions.toggleSelector(selectors.catalogVersionSelectorHostId);
        },
        selectCatalogVersionInDropdown: async (catalogVersion) => {
            await select.actions.selectOptionByText(
                selectors.catalogVersionSelectorHostId,
                catalogVersion
            );
        },
        openItemSearchBox: async () => {
            await browser.click(catalogAwareSelector.elements.getItemSearchBox());
            await select.assertions.dropdownIsOpened(selectors.itemsSelectorHostId);
        },
        selectItemInSearchBox: async (itemName) => {
            await browser.click(catalogAwareSelector.elements.getItemSearchBoxOption(itemName));
        },
        selectItem: async (itemName) => {
            await catalogAwareSelector.actions.openItemSearchBox();

            await catalogAwareSelector.actions.selectItemInSearchBox(itemName);
        },
        selectCatalogVersion: async (catalogVersion) => {
            await catalogAwareSelector.actions.openCatalogVersionDropdown();
            await catalogAwareSelector.actions.selectCatalogVersionInDropdown(catalogVersion);
        },
        selectItemsByCatalogVersion: async function (items, catalogVersion) {
            await catalogAwareSelector.actions.selectCatalogVersion(catalogVersion);

            items.forEach(async (item) => {
                await catalogAwareSelector.actions.selectItem(item);
            });
        },
        selectItems: async function (selectorId, itemsByCategory) {
            await catalogAwareSelector.actions.openSelector(selectorId);

            for (const category in itemsByCategory) {
                if (itemsByCategory.hasOwnProperty(category)) {
                    await catalogAwareSelector.actions.selectItemsByCatalogVersion(
                        itemsByCategory[category],
                        category
                    );
                    // FIXME: Before it chooses 1st option it tries to select the 2nd one.
                    // This ensurses that after selecting 1st option it will wait before selecting 2nd one.
                    await browser.sleep(1000);
                }
            }
        },
        clickAddItemsButton: async () => {
            await browser.click(catalogAwareSelector.elements.getAddButton());
        },

        // -- List --
        moveItemUp: function (selectorId, itemIndex) {
            return browser
                .click(catalogAwareSelector.elements.getItemMoreMenuButton(selectorId, itemIndex))
                .then(function () {
                    return browser.click(catalogAwareSelector.elements.getMoveUpButton());
                });
        },
        moveItemDown: function (selectorId, itemIndex) {
            return browser
                .click(catalogAwareSelector.elements.getItemMoreMenuButton(selectorId, itemIndex))
                .then(function () {
                    return browser.click(catalogAwareSelector.elements.getMoveDownButton());
                });
        },
        deleteItem: async (selectorId, itemIndex) => {
            await browser.click(
                catalogAwareSelector.elements.getItemMoreMenuButton(selectorId, itemIndex)
            );
            await browser.click(catalogAwareSelector.elements.getDeleteItemButton());
        },
        grabItemAtPosition: function (selectorId, itemPosition) {
            return browser
                .actions()
                .mouseMove(catalogAwareSelector.elements.getListItems(selectorId).get(itemPosition))
                .mouseDown()
                .perform()
                .then(function () {
                    return browser.sleep(catalogAwareSelector.constants.DRAG_DELAY);
                });
        },
        moveToItemAtPosition: function (selectorId, itemPosition) {
            var itemToMove = catalogAwareSelector.elements
                .getListItems(selectorId)
                .get(itemPosition);
            return browser
                .actions()
                .mouseMove(itemToMove)
                .mouseMove(catalogAwareSelector.constants.DRAG_AND_DROP_OFFSET_FIX)
                .perform();
        },
        dropItem: function () {
            return browser.actions().mouseUp().perform();
        },
        dragAndDropItemToPosition: function (selectorId, originalIndex, newIndex) {
            return catalogAwareSelector.actions
                .grabItemAtPosition(selectorId, originalIndex)
                .then(function () {
                    return catalogAwareSelector.actions
                        .moveToItemAtPosition(selectorId, newIndex)
                        .then(function () {
                            return browser.sleep(catalogAwareSelector.constants.DRAG_DELAY);
                        })
                        .then(function () {
                            return catalogAwareSelector.actions.dropItem();
                        });
                });
        }
    };

    catalogAwareSelector.assertions = {
        isEmpty: function (selectorId) {
            expect(catalogAwareSelector.elements.getAddItemsButton(selectorId).isDisplayed()).toBe(
                true,
                'Expected catalog aware selector to be empty.'
            );
        },
        isItemSelected: function (selectorId, itemName, catalogVersion) {
            browser.waitForPresence(
                catalogAwareSelector.elements.getItemInList(selectorId, itemName, catalogVersion)
            );
        },
        itemsAreSelected: function (selectorId, itemsList) {
            for (var catalogVersion in itemsList) {
                if (itemsList.hasOwnProperty(catalogVersion)) {
                    catalogAwareSelector.assertions.isItemSelected(
                        selectorId,
                        itemsList[catalogVersion],
                        catalogVersion
                    );
                }
            }
        },
        itemsAreInRightOrder: async (selectorId, expectedItems) => {
            const itemList = catalogAwareSelector.elements.getListItems(selectorId);
            const assertions = expectedItems.map((_item, i) =>
                catalogAwareSelector.assertions.itemInListContainsText(
                    itemList,
                    i,
                    expectedItems[i]
                )
            );
            return Promise.all(assertions);
        },
        itemInListContainsText: async (itemList, itemIndex, expectedText) => {
            const item = await itemList.get(itemIndex);
            expect(await item.getText()).toContain(
                expectedText,
                'Expected ' + expectedText + ' to be in right order.'
            );
        },
        addItemsButtonIsNotDisplayed: async (selectorId) => {
            expect(
                await browser.isAbsent(catalogAwareSelector.elements.getAddItemsButton(selectorId))
            ).toBe(true);
        }
    };

    catalogAwareSelector.utils = {
        getElementSize: function (element) {
            return element.getSize();
        }
    };

    return catalogAwareSelector;
})();
