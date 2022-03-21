/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
const path = require('path');

const getFeatures = (htmlPath, done) => {
    return browser.get(htmlPath).then(() => {
        if (done) {
            done();
        }
    });
};

const bootstrapTests = (testsConfig) => {
    if (!testsConfig.storefrontPath) {
        throw new Error('Test Bootstrapper: Missing default storefront path.');
    }
    if (!testsConfig.htmlPath) {
        throw new Error('Test Bootstrapper: Missing default html path.');
    }

    browser.loadFakeAngularPage = () => {
        return browser.get(testsConfig.storefrontPath);
    };

    browser.bootstrap = (specDir, done) => {
        let config = null;
        if (specDir) {
            try {
                config = require(path.join(specDir, 'config.json'));
            } catch (e) {
                console.error(e);
            }
        }

        browser.executeScript('window.sessionStorage.removeItem("additionalTestJSFiles")');

        if (config) {
            return browser.loadFakeAngularPage().then(() => {
                if (config.jsFiles) {
                    browser.executeScript(
                        'window.sessionStorage.setItem("additionalTestJSFiles", arguments[0])',
                        JSON.stringify(config.jsFiles)
                    );
                }

                return getFeatures(testsConfig.htmlPath, done);
            });
        } else {
            return getFeatures(testsConfig.htmlPath, done);
        }
    };
};

module.exports = {
    bootstrapTests
};
