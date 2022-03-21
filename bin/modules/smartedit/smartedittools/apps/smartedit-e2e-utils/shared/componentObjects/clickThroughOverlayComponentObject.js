/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function() {
    function ClickThroughOverlayComponentObject() {
        // ================== ELEMENTS ==================

        var elements = {};
        elements.allowClickThroughButton = function() {
            return browser.findElement(
                by.id('smartEditPerspectiveToolbar_option_se.CLICK_THROUGH_OVERLAY_btn')
            );
        };
        elements.preventClickThroughButton = function() {
            browser.waitUntilNoModal();
            return browser.findElement(
                by.id('smartEditPerspectiveToolbar_option_se.PREVENT_OVERLAY_CLICKTHROUGH_btn')
            );
        };

        var page = {};

        // ================== ACTIONS ==================

        page.actions = {};
        page.actions.allowClickThroughOverlay = function() {
            return browser.switchToParent().then(function() {
                return browser.click(elements.allowClickThroughButton());
            });
        };
        page.actions.preventClickThroughOverlay = function() {
            return browser.switchToParent().then(function() {
                return browser.click(elements.preventClickThroughButton());
            });
        };

        // =================== UTILS ==================

        page.utils = {};
        page.utils.clickThroughOverlay = function(element) {
            return page.actions.allowClickThroughOverlay().then(function() {
                return browser.switchToIFrame().then(function() {
                    return browser.click(element).then(function() {
                        return page.actions.preventClickThroughOverlay();
                    });
                });
            });
        };

        return page;
    }

    return new ClickThroughOverlayComponentObject();
})();
