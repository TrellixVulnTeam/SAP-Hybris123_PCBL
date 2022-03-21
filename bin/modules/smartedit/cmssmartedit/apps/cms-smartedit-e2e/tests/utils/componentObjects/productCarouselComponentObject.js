/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var genericEditor;
var catalogAwareSelector;
if (typeof require !== 'undefined') {
    genericEditor = require('./genericEditorComponentObject.js');
    catalogAwareSelector = require('./catalogAwareSelectorComponentObject.js');
}

module.exports = (function () {
    var componentObject = {};

    componentObject.constants = {
        TITLE_FIELD_ID: 'title',
        CATEGORY_SELECTOR_ID: 'categories',
        PRODUCT_SELECTOR_ID: 'products'
    };

    componentObject.elements = {};

    componentObject.actions = {
        prepareApp: async function (isProductsEditable, isCategoriesEditable) {
            await browser.executeScript(
                'window.sessionStorage.setItem("productsEditable", arguments[0])',
                isProductsEditable
            );
            await browser.executeScript(
                'window.sessionStorage.setItem("categoriesEditable", arguments[0])',
                isCategoriesEditable
            );
        },
        setTitle: function (titleValues) {
            return genericEditor.actions.setTextValueInLocalizedField(
                componentObject.constants.TITLE_FIELD_ID,
                titleValues
            );
        },
        setProducts: async (productsList) => {
            await catalogAwareSelector.actions.selectItems(
                componentObject.constants.PRODUCT_SELECTOR_ID,
                productsList
            );
            return catalogAwareSelector.actions.clickAddItemsButton();
        },
        setCategories: async (categoriesList) => {
            await catalogAwareSelector.actions.selectItems(
                componentObject.constants.CATEGORY_SELECTOR_ID,
                categoriesList
            );
            return catalogAwareSelector.actions.clickAddItemsButton();
        },
        setProductCarouselData: async (productCarouselData) => {
            await componentObject.actions.setTitle(productCarouselData.title);
            await componentObject.actions.setProducts(productCarouselData.products);
            await componentObject.actions.setCategories(productCarouselData.categories);
        },
        moveProductUp: async (itemIndex) => {
            await catalogAwareSelector.actions.moveItemUp(
                componentObject.constants.PRODUCT_SELECTOR_ID,
                itemIndex
            );
        },
        moveProductDown: async (itemIndex) => {
            await catalogAwareSelector.actions.moveItemDown(
                componentObject.constants.PRODUCT_SELECTOR_ID,
                itemIndex
            );
        },
        deleteProduct: async (itemIndex) => {
            await catalogAwareSelector.actions.deleteItem(
                componentObject.constants.PRODUCT_SELECTOR_ID,
                itemIndex
            );
        },
        moveProductToPosition: async (originalIndex, newIndex) => {
            await catalogAwareSelector.actions.dragAndDropItemToPosition(
                componentObject.constants.PRODUCT_SELECTOR_ID,
                originalIndex,
                newIndex
            );
        },
        deleteCategory: async (itemIndex) => {
            await catalogAwareSelector.actions.deleteItem(
                componentObject.constants.CATEGORY_SELECTOR_ID,
                itemIndex
            );
        }
    };

    componentObject.assertions = {
        titleIsEmpty: function () {
            genericEditor.assertions.localizedFieldIsEmpty(
                componentObject.constants.TITLE_FIELD_ID
            );
        },
        productsListIsEmpty: function () {
            return catalogAwareSelector.assertions.isEmpty(
                componentObject.constants.PRODUCT_SELECTOR_ID
            );
        },
        categoriesListIsEmpty: function () {
            return catalogAwareSelector.assertions.isEmpty(
                componentObject.constants.CATEGORY_SELECTOR_ID
            );
        },
        componentIsEmpty: function () {
            componentObject.assertions.titleIsEmpty();
            componentObject.assertions.productsListIsEmpty();
            componentObject.assertions.categoriesListIsEmpty();
        },
        hasTitle: async (expectedTitle) => {
            await genericEditor.assertions.localizedFieldHasExpectedValues(
                componentObject.constants.TITLE_FIELD_ID,
                expectedTitle
            );
        },
        hasProducts: async (expectedProductsList) => {
            await catalogAwareSelector.assertions.itemsAreSelected(
                componentObject.constants.PRODUCT_SELECTOR_ID,
                expectedProductsList
            );
        },
        hasCategories: async (expectedCategoriesList) => {
            await catalogAwareSelector.assertions.itemsAreSelected(
                componentObject.constants.CATEGORY_SELECTOR_ID,
                expectedCategoriesList
            );
        },
        hasRightData: async (expectedComponentData) => {
            await componentObject.assertions.hasTitle(expectedComponentData.title);
            await componentObject.assertions.hasProducts(expectedComponentData.products);
            await componentObject.assertions.hasCategories(expectedComponentData.categories);
        },
        productsAreInRightOrder: async (expectedProductsList) => {
            await catalogAwareSelector.assertions.itemsAreInRightOrder(
                componentObject.constants.PRODUCT_SELECTOR_ID,
                expectedProductsList
            );
        },
        categoriesAreInRightOrder: async (expectedCategoriesList) => {
            await catalogAwareSelector.assertions.itemsAreInRightOrder(
                componentObject.constants.CATEGORY_SELECTOR_ID,
                expectedCategoriesList
            );
        },
        productsAddButtonIsNotDisplayed: function () {
            return catalogAwareSelector.assertions.addItemsButtonIsNotDisplayed(
                componentObject.constants.PRODUCT_SELECTOR_ID
            );
        },
        categoriesAddButtonIsNotDisplayed: function () {
            return catalogAwareSelector.assertions.addItemsButtonIsNotDisplayed(
                componentObject.constants.CATEGORY_SELECTOR_ID
            );
        }
    };

    componentObject.utils = {};

    return componentObject;
})();
