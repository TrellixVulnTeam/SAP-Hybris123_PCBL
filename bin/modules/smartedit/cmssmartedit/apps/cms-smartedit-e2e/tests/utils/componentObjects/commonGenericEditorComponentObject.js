/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function () {
    var componentObject = {};

    componentObject.constants = {};

    componentObject.locators = {
        getFieldStructure: (qualifier) =>
            by.css(`.ySEGenericEditorFieldStructure[data-cms-field-qualifier="${qualifier}"]`)
    };

    componentObject.elements = {
        getOpenedEditorModals: function () {
            return element.all(by.xpath('//fd-modal-container[.//se-generic-editor]'));
        },
        getTopEditorModal: function () {
            return this.getOpenedEditorModals().last();
        },
        getFieldByQualifier: function (fieldQualifier) {
            var modalElement = this.getTopEditorModal();
            browser.waitForPresence(modalElement);

            var field = modalElement.element(
                componentObject.locators.getFieldStructure(fieldQualifier)
            );
            browser.waitForPresence(field);

            return field;
        },
        getFieldStructure: (fieldQualifier) => {
            return element(componentObject.locators.getFieldStructure(fieldQualifier));
        },
        getFieldStructureInput: (qualifier) => {
            return componentObject.elements.getFieldStructure(qualifier).element(by.css('input'));
        }
    };

    componentObject.actions = {
        setFieldStructureInput: async (qualifier, value) => {
            await browser.sendKeys(
                componentObject.elements.getFieldStructureInput(qualifier),
                value
            );
        }
    };

    componentObject.assertions = {};

    componentObject.utils = {};

    return componentObject;
})();
