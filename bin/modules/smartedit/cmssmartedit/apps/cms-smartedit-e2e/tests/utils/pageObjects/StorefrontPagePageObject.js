/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
module.exports = (function () {
    var storefrontPage = {};

    storefrontPage.elements = {};

    storefrontPage.actions = {
        navigateToPages: function () {
            return browser.waitUntilNoModal().then(function () {
                return browser.click(by.cssContainingText('.se-shortcut-link__item', 'Pages'));
            });
        },
        setSelectedSiteId: function (siteId) {
            return browser.executeScript(
                'window.localStorage.setItem("seselectedsite", JSON.stringify(arguments[0]), false)',
                siteId
            );
        }
    };

    storefrontPage.assertions = {};

    return storefrontPage;
})();
