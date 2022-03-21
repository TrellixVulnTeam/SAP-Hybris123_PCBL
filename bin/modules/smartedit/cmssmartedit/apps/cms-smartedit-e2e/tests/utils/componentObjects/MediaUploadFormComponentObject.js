/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function () {
    const path = require('path');

    const componentObject = {};

    const selectors = {
        component: () => 'se-media-upload-form',
        field: (fieldSuffix) => `${selectors.fieldLabel(fieldSuffix)} input`,
        fieldError: (fieldSuffix) => `.upload-field-error--${fieldSuffix}`,
        fieldLabel: (fieldSuffix) => `.se-media-upload__file-info-field--${fieldSuffix}`,
        fileSelectorInput: () => '.se-file-selector__input',
        cancelBtn: () => '.se-media-upload-btn__cancel',
        uploadBtn: () => '.se-media-upload-btn__submit'
    };

    componentObject.locators = {
        getComponent: () => by.css(selectors.component()),
        getField: (fieldSuffix) => by.css(selectors.field(fieldSuffix)),
        getFieldError: (fieldSuffix) => by.css(selectors.fieldError(fieldSuffix)),
        getFieldLabel: (fieldSuffix) => by.css(selectors.fieldLabel(fieldSuffix)),
        getFileSelectorInput: () => by.css(selectors.fileSelectorInput()),
        getCancelBtn: () => by.css(selectors.cancelBtn()),
        getUploadBtn: () => by.css(selectors.uploadBtn())
    };

    componentObject.elements = {
        getComponent: () => element(componentObject.locators.getComponent()),
        getField: (fieldSuffix) => element(componentObject.locators.getField(fieldSuffix)),
        getFieldLabel: (fieldSuffix) =>
            element(componentObject.locators.getFieldLabel(fieldSuffix)),
        getFieldError: (fieldSuffix) =>
            element(componentObject.locators.getFieldError(fieldSuffix)),
        getFileSelectorInput: () => element(componentObject.locators.getFileSelectorInput()),
        getCancelBtn: () => element(componentObject.locators.getCancelBtn()),
        getUploadBtn: () => element(componentObject.locators.getUploadBtn())
    };

    componentObject.actions = {
        selectFileToUpload: (fileName) => {
            const absolutePath = path.resolve(__dirname, '../../images', fileName);

            return browser.sendKeys(
                componentObject.elements.getFileSelectorInput(),
                absolutePath,
                'File input is not present'
            );
        },
        clickCancelBtn: async () => {
            await browser.click(componentObject.elements.getCancelBtn());
        },
        clickUploadBtn: async () => {
            await browser.click(componentObject.elements.getUploadBtn());
        }
    };

    componentObject.assertions = {
        isPresent: async () => {
            await browser.waitForPresence(componentObject.locators.getComponent());
        },
        isAbsent: async () => {
            await browser.waitForAbsence(componentObject.locators.getComponent());
        },
        fieldErrorIsPresent: async (fieldSuffix) => {
            await browser.waitForPresence(componentObject.elements.getFieldError(fieldSuffix));
        }
    };

    return componentObject;
})();
