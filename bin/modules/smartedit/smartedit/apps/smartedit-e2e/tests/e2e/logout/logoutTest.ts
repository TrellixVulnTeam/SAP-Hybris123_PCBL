/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { browser, by, element } from 'protractor';

import { Login } from '../../utils/components/Login';
import { Page } from '../../utils/components/Page';
import { Storefront } from '../../utils/components/Storefront';
import { LandingPagePageObject } from '../../utils/pageObjects/LandingPagePageObject';

describe('Logout Redirection', () => {
    beforeEach(async () => {
        await Page.Actions.getAndWaitForLogin(
            'smartedit-e2e/generated/e2e/logout/#!/ng/storefront'
        );
        await Login.Actions.loginAsCmsManager();
        await Page.Actions.getAndWaitForWholeApp(
            'smartedit-e2e/generated/e2e/logout/#!/ng/storefront'
        );
    });

    afterEach(async () => {
        await Login.Actions.logoutUser();
        await browser.waitForAngularEnabled(true);
    });

    it('when the user goes back to the landing page, he will be re-directed to the home page of the storefront after selecting the same catalog', async () => {
        await Storefront.Actions.deepLink();
        await LandingPagePageObject.Actions.navigateToLandingPage();
        await LandingPagePageObject.Actions.selectSite(
            LandingPagePageObject.Constants.APPAREL_SITE
        );
        await LandingPagePageObject.Actions.navigateToStorefrontViaThumbnail(
            LandingPagePageObject.Constants.APPAREL_UK_CATALOG
        );

        const src = await element(by.css('#js_iFrameWrapper iframe')).getAttribute('src');

        expect(src.indexOf(Login.Constants.STORE_FRONT_HOME_PAGE) > 0).toBe(true);
    });
});
