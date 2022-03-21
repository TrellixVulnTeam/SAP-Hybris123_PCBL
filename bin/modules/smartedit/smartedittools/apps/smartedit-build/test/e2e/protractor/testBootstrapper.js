/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = function(bundlePaths) {
    function getFeatures(done) {
        return browser.get(bundlePaths.test.e2e.applicationPath).then(function() {
            if (done) {
                done();
            }
        });
    }

    browser.loadFakeAngularPage = function() {
        return browser.get(bundlePaths.test.e2e.fakeAngularPage);
    };

    browser.bootstrap = function(specDir, done) {
        var config = null;
        if (specDir) {
            try {
                config = require(specDir + '/config.json');
            } catch (e) {
                console.error(e);
            }
        }

        browser.executeScript('window.sessionStorage.removeItem("additionalTestJSFiles")');

        if (config) {
            return browser.loadFakeAngularPage().then(function() {
                if (config.jsFiles) {
                    browser.executeScript(
                        'window.sessionStorage.setItem("additionalTestJSFiles", arguments[0])',
                        JSON.stringify(config.jsFiles)
                    );
                }
                return getFeatures(done);
            });
        } else {
            return getFeatures(done);
        }
    };
};
