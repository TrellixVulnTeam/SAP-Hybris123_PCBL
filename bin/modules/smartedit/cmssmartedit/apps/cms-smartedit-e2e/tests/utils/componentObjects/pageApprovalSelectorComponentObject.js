/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
var alerts;
if (typeof require !== 'undefined') {
    alerts = require('./alertsComponentObject');
}

module.exports = (function () {
    var componentObject = {};

    // --------------------------------------------------------------------------------------------------
    // Variables
    // --------------------------------------------------------------------------------------------------

    // --------------------------------------------------------------------------------------------------
    // Constants
    // --------------------------------------------------------------------------------------------------
    componentObject.constants = {
        DRAFT: 'Draft',
        READY_TO_SYNC: 'Ready To Sync'
    };

    // --------------------------------------------------------------------------------------------------
    // Elements
    // --------------------------------------------------------------------------------------------------
    componentObject.elements = {
        getPageApprovalSelectorComponent: function () {
            return browser.element(by.css('se-page-approval-selector'));
        },
        getPageApprovalDropdown: function () {
            return this.getPageApprovalSelectorComponent().element(
                by.css('.se-page-approval-selector__toggle-btn')
            );
        },
        getPageApprovalDropdownList: function () {
            return this.getPageApprovalSelectorComponent().element(
                by.css('.se-page-approval-selector-list')
            );
        },
        getPageApprovalStatusOption: function (optionTxt) {
            return this.getPageApprovalDropdownList().element(
                by.cssContainingText('.se-dropdown-item', optionTxt)
            );
        }
    };

    // --------------------------------------------------------------------------------------------------
    // Actions
    // --------------------------------------------------------------------------------------------------
    componentObject.actions = {
        openPageApprovalDropdown: function () {
            return browser.click(componentObject.elements.getPageApprovalDropdown());
        },
        clickOnOption: function (optionToChoose) {
            return browser.click(
                componentObject.elements.getPageApprovalStatusOption(optionToChoose)
            );
        },
        forceDraftPageApprovalStatus: function () {
            this.openPageApprovalDropdown().then(
                function () {
                    return this.clickOnOption(componentObject.constants.DRAFT);
                }.bind(this)
            );
        },
        forceReadyToSyncPageApprovalStatus: function () {
            this.openPageApprovalDropdown().then(
                function () {
                    this.clickOnOption(componentObject.constants.READY_TO_SYNC);
                    return browser.waitForWholeAppToBeReady();
                }.bind(this)
            );
        }
    };

    // --------------------------------------------------------------------------------------------------
    // Assertions
    // --------------------------------------------------------------------------------------------------
    componentObject.assertions = {
        pageApprovalSelectorIsDisplayed: function () {
            expect(componentObject.elements.getPageApprovalDropdown()).toBeDisplayed();
        },
        pageApprovalSelectorIsNotDisplayed: function () {
            expect(componentObject.elements.getPageApprovalDropdown()).toBeAbsent();
        },
        hasDraftOption: function () {
            expect(
                componentObject.elements
                    .getPageApprovalStatusOption(componentObject.constants.DRAFT)
                    .isPresent()
            ).toBeTruthy();
        },
        assertInfoAlertIsDisplayed: function () {
            var alertType = 'info';
            alerts.assertions.assertTotalNumberOfAlerts(1);
            alerts.assertions.assertAlertIsOfTypeByIndex(0, alertType);
        }
    };

    return componentObject;
})();
