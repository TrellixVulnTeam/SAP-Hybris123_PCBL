/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { browser, by } from 'protractor';

describe('Integration of toolbar directives into the framework', () => {
    beforeEach(async () => {
        await browser.get(
            'smartedit-e2e/generated/e2e/toolbars/frameworkIntegration/#!/ng/storefront'
        );
        await browser.waitForContainerToBeReady();
    });

    /*seems to break with new double bootstrapping of smarteditcontainer*/
    describe('availability of SmartEdit title toolbar and experience selector toolbar', () => {
        it('SmartEdit title toolbar and experience selector toolbar exists and are correctly bootstrapped', async () => {
            await browser.waitForVisibility(by.css('div.se-toolbar--shell'));
            await browser.waitForVisibility(by.css('div.se-toolbar--experience'));
            await browser.waitForVisibility(by.css('div.se-toolbar--perspective'));
        });
    });
});
