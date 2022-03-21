/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function () {
    var SYNC_PANEL = 'se-synchronization-panel';
    var PAGE_SYNCHRONIZATION_HEADER = 'se-page-synchronization-header';
    var SYNC_STATUS = {
        IN_SYNC: 'IN_SYNC',
        SYNC_FAILED: 'SYNC_FAILED',
        NOT_SYNC: 'NOT_SYNC'
    };
    var Constants = {
        SYNC_PANEL,
        SYNC_PANEL_HEADER: `${PAGE_SYNCHRONIZATION_HEADER} .se-sync-panel-header__sub-header`,
        SYNC_BUTTON: '.se-sync-panel__sync-btn',
        SYNC_ICON: '.se-sync-panel-item-info-icon__icon',
        SYNC_PANEL_LAST_SYNC: `${PAGE_SYNCHRONIZATION_HEADER} .se-sync-panel-header__timestamp-text`,
        SYNC_PANEL_HEADER_HELPER: `${PAGE_SYNCHRONIZATION_HEADER} se-help`,
        SYNC_ITEMS_SELECTOR: `${SYNC_PANEL} .se-sync-panel__row`,
        SYNC_ITEMS_CHECKBOX: `${SYNC_PANEL} .se-sync-panel-item-checkbox__field`,
        SYNC_ITEMS_CHECKBOX_SELECTOR: `${SYNC_PANEL} .se-sync-panel-item-checkbox__label`,
        SYNC_TOOLTIP_BODY: '.popover .se-popover__content'
    };

    var co = {
        ignoreSynchronization: function () {
            browser.waitForAngularEnabled(false);
        },
        syncButtonElement: function () {
            return element(by.css(Constants.SYNC_BUTTON));
        },
        setupTest: function () {
            this.ignoreSynchronization();
            browser.manage().window().setSize(1700, 1000);
        },
        getSyncPanelHeaderText: function () {
            return element(by.css(Constants.SYNC_PANEL_HEADER)).getText();
        },
        getSyncPanelLastSyncTime: function () {
            return element(by.css(Constants.SYNC_PANEL_LAST_SYNC)).getText();
        },
        getSyncButton: function () {
            return element(by.css(Constants.SYNC_BUTTON));
        },
        getPopoverAnchor: function () {
            return by.css(Constants.SYNC_ICON);
        },
        getTooltipContents: function () {
            return element.all(by.css(Constants.SYNC_TOOLTIP_BODY));
        },
        hoverStatus: function (index) {
            return browser
                .actions()
                .mouseMove(element.all(this.getPopoverAnchor()).get(index))
                .perform();
        },

        hoverHelp: function () {
            return browser
                .actions()
                .mouseMove(element(by.css(Constants.SYNC_PANEL_HEADER_HELPER)))
                .perform();
        },
        getSyncItemDependenciesContent: function () {
            browser.waitUntil(function () {
                return co.getTooltipContents().then(function (popovers) {
                    return popovers.length === 1;
                });
            }, 'no popovers are available');

            return this.getPopoverBodyText();
        },
        getSyncItems: function () {
            return element
                .all(by.css(Constants.SYNC_ITEMS_CHECKBOX_SELECTOR))
                .map(function (element) {
                    return element.getText();
                });
        },
        getSyncItemsStatus: function () {
            return element.all(by.css(Constants.SYNC_ICON)).map(function (element) {
                return element.getAttribute('status');
            });
        },
        getSyncItemDependenciesAvailable: function () {
            return this.getSyncItemsStatus().then(function (allStatus) {
                return allStatus.map(function (status) {
                    return status !== 'IN_SYNC';
                });
            });
        },
        checkItem: function (item) {
            return browser
                .actions()
                .mouseMove(
                    element(by.cssContainingText(Constants.SYNC_ITEMS_CHECKBOX_SELECTOR, item))
                )
                .click()
                .perform();
        },
        getItemsCheckedStatus: function () {
            return element.all(by.css(Constants.SYNC_ITEMS_CHECKBOX)).map(function (element) {
                return element.isSelected();
            });
        },
        getItemsCheckboxEnabled: function () {
            return element.all(by.css(Constants.SYNC_ITEMS_CHECKBOX)).map(function (element) {
                return element.isEnabled();
            });
        },
        isSyncButtonEnabled: function () {
            return this.syncButtonElement().isEnabled();
        },
        assertPanelIsReady: function () {
            return browser.waitForPresence(
                by.css(Constants.SYNC_BUTTON),
                'expected sync panel to show'
            );
        },
        clickSync: function () {
            return browser
                .actions()
                .mouseMove(co.getSyncButton())
                .click()
                .perform()
                .then(
                    function () {
                        return this.ignoreSynchronization();
                    }.bind(this)
                );
        },
        switchToIFrame: function () {
            return browser.waitForContainerToBeReady().then(
                function () {
                    return browser.switchToIFrame(true).then(
                        function () {
                            return this.ignoreSynchronization();
                        }.bind(this)
                    );
                }.bind(this)
            );
        },
        getPopoverBodyText: function () {
            return co.utils
                .getPopoverElement()
                .getText()
                .then(function (text) {
                    return text.replace(/\n|\r/g, ' ');
                });
        },
        getItemList: function () {
            return element(by.css('.se-sync-panel__sync-info'));
        }
    };

    co.elements = {
        syncStatusIconBySlotName: function (slotName, status) {
            var label = element(
                by.css(`${Constants.SYNC_ITEMS_CHECKBOX_SELECTOR}[title="${slotName}"]`)
            );
            var synchronizationPanel = label.element(by.xpath('..')).element(by.xpath('..'));

            return synchronizationPanel.element(
                by.css(`${Constants.SYNC_ICON}[status="${status}"]`)
            );
        },
        syncCheckboxBySlotName: function (slotName) {
            return element(by.xpath("//*[*[contains(text(), '" + slotName + "')]]//input"));
        },
        syncCheckboxLabelBySlotName: function (slotName) {
            return element(by.cssContainingText(Constants.SYNC_ITEMS_CHECKBOX_SELECTOR, slotName));
        },
        firstPopover: function () {
            return co.getTooltipContents().get(0);
        },
        syncNotAllowedWarningMessage: function () {
            var expectedMessage = 'To sync, update page status to Ready to Sync.';
            return element(
                by.cssContainingText(
                    `${Constants.SYNC_PANEL} se-message .y-message-info-description`,
                    expectedMessage
                )
            );
        }
    };

    co.assertions = {
        assertSlotNotSynced: function (slotName) {
            return browser.waitForPresence(
                co.elements.syncStatusIconBySlotName(slotName, SYNC_STATUS.NOT_SYNC)
            );
        },
        assertSlotSynced: function (slotName) {
            return browser.waitForPresence(
                co.elements.syncStatusIconBySlotName(slotName, SYNC_STATUS.IN_SYNC)
            );
        },
        assertSlotSyncFailed: function (slotName) {
            return browser.waitForPresence(
                co.elements.syncStatusIconBySlotName(slotName, SYNC_STATUS.SYNC_FAILED)
            );
        },
        assertSyncCheckboxDisabledForSlot: function (slotName) {
            return expect(co.elements.syncCheckboxBySlotName(slotName).isEnabled()).toBe(false);
        },
        assertSyncCheckboxCheckedForSlot: function (slotName) {
            return expect(co.elements.syncCheckboxBySlotName(slotName).isSelected()).toBe(true);
        },
        assertItemListIsHidden: function () {
            return expect(browser.isAbsent(co.getItemList())).toBe(true);
        },
        assertItemListIsVisible: function () {
            return expect(browser.isPresent(co.getItemList())).toBe(true);
        },
        assertSyncButtonIsEnabled: function () {
            return expect(co.isSyncButtonEnabled()).toBe(true);
        },
        assertSyncButtonIsDisabled: function () {
            return expect(co.isSyncButtonEnabled()).toBe(false);
        },

        // yMessage
        assertSyncNotAllowedMessageIsPresent: function () {
            expect(co.elements.syncNotAllowedWarningMessage()).toBeDisplayed();
        },
        assertSyncNotAllowedMessageIsAbsent: function () {
            expect(co.elements.syncNotAllowedWarningMessage()).toBeAbsent();
        }
    };

    co.actions = {
        checkSyncCheckbox: function (slotName) {
            var checkbox = co.elements.syncCheckboxBySlotName(slotName);
            return checkbox.isSelected().then(function (selected) {
                if (!selected) {
                    return browser
                        .actions()
                        .mouseMove(co.elements.syncCheckboxLabelBySlotName(slotName))
                        .click()
                        .perform();
                }
                return true;
            });
        },
        closeAllPopovers: function () {
            // arbitrarily move to the synch button so we can move the mouse somewhere (coordinates don't seem to be working)
            return browser
                .actions()
                .mouseMove(co.syncButtonElement())
                .click()
                .perform()
                .then(function () {
                    return browser.waitForAbsence(co.elements.firstPopover());
                });
        }
    };

    co.utils = {
        getPopoverElement: function () {
            return browser.findElement(by.css('.popover .se-popover__content'));
        }
    };

    return co;
})();
