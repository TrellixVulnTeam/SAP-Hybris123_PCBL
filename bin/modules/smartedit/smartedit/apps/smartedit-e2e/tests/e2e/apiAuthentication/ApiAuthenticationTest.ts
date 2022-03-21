/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { browser, by } from 'protractor';

import { Login } from '../../utils/components/Login';
import { Page } from '../../utils/components/Page';
import { Perspectives } from '../../utils/components/Perspectives';

async function ssoWillFail(willSsoFail: boolean): Promise<void> {
    await browser.executeScript(
        'window.sessionStorage.setItem("sso.authenticate.failure", arguments[0])',
        willSsoFail
    );
}
const API_AUTHENTICATION_ROUTE = 'smartedit-e2e/generated/e2e/apiAuthentication/#!/ng/storefront';

describe('Authentication', () => {
    describe('with credentials', () => {
        beforeEach(async () => {
            await ssoWillFail(false);
            await Page.Actions.getAndWaitForLogin(API_AUTHENTICATION_ROUTE);
        });
        afterEach(async () => {
            await browser.waitForAngularEnabled(true);
        });

        it('WHEN the user is not logged in THEN the user is presented with a login dialog', async () => {
            expect(await Login.Elements.mainLoginUsernameInput().isPresent()).toBe(true);
            expect(await Login.Elements.mainLoginPasswordInput().isPresent()).toBe(true);
            expect(await Login.Elements.mainLoginSubmitButton().isPresent()).toBe(true);
        });

        it('WHEN the user submits an empty auth form THEN an error is displayed', async () => {
            await Login.Elements.mainLoginSubmitButton().click();
            await browser.waitForSelectorToContainText(
                Login.Elements.authenticationError(),
                'Username and password required'
            );
        });

        it('WHEN the user submits incorrect credentials THEN an error is displayed', async () => {
            await Login.Actions.loginAsInvalidUser();
            await browser.waitForSelectorToContainText(
                Login.Elements.authenticationError(),
                'Invalid username or password'
            );
        });

        describe('After Login', () => {
            beforeEach(async () => {
                await Login.Actions.loginAsCmsManager();
                await Page.Actions.getAndWaitForWholeApp(API_AUTHENTICATION_ROUTE);
                await Perspectives.Actions.selectPerspective(
                    Perspectives.Constants.DEFAULT_PERSPECTIVES.ALL
                );
            });

            afterEach(async () => {
                await Login.Actions.logoutUser();
            });

            it('WHEN the user is not authenticated to fake1 or fake2 API THEN fake 1 nor fake 2 are visible', async () => {
                await browser.switchToIFrame();
                expect(await browser.isAbsent(by.id('fake1'))).toBe(true);
                expect(await browser.isAbsent(by.id('fake2'))).toBe(true);

                await browser.switchToParent();
                await Login.Actions.loginToAuthForFake2();
                await browser.switchToIFrame();
                expect(await browser.isAbsent(by.id('fake1'))).toBe(true);
                expect(await browser.isPresent(by.id('fake2'))).toBe(true);

                await browser.switchToParent();
                await Login.Actions.loginToAuthForFake1();
                await browser.switchToIFrame();
                expect(await browser.isPresent(by.id('fake1'))).toBe(true);
                expect(await browser.isPresent(by.id('fake2'))).toBe(true);
            });
        });
    });

    describe('Manual Login with SSO', () => {
        beforeEach(async () => {
            await ssoWillFail(false);
            await Page.Actions.getAndWaitForLogin(API_AUTHENTICATION_ROUTE);
            await Login.Actions.loginWithSSO();
            await browser.waitForWholeAppToBeReady();
        });

        it('login is successful', async () => {
            // verified by beforeEach that waits until no modal
            await Login.Actions.logoutUser();
        });

        it('after expiry, auto-reauth with SSO', async () => {
            await browser.clearLocalStorage();
            await browser.waitUntilModalAppears();
            await browser.waitForWholeAppToBeReady();
            await Login.Actions.logoutUser();
        });

        it("logout doesn't auto-reauth", async () => {
            await Login.Actions.logoutUser();
            await browser.waitUntilModalAppears();

            expect(await Login.Elements.mainLoginSubmitSSOButton().isPresent()).toBe(true);
        });
    });

    describe('Failure of Manual Login with SSO', () => {
        beforeEach(async () => {
            await Page.Actions.getAndWaitForLogin(API_AUTHENTICATION_ROUTE);
            await ssoWillFail(true);
            await Login.Actions.loginWithSSO();
        });

        it('SSO failure will show in the standard form', async () => {
            expect(await Login.Elements.authenticationError().getText()).toBe(
                'SSO authentication issue'
            );
        });

        afterEach(async () => {
            await ssoWillFail(false);
        });
    });

    describe('Auto Login with SSO (ex: from cloud portal)', () => {
        beforeEach(async () => {
            await ssoWillFail(false);
            await Page.Actions.getAndWaitForContainer(
                `smartedit-e2e/generated/e2e/apiAuthentication/index.html?sso`
            );
            await browser.waitUntilNoModal();
        });

        it('login is successful', async () => {
            // verified by beforeEach that waits until no modal
            await Login.Actions.logoutUser();
        });

        it('after expiry, auto-reauth with SSO', async () => {
            await browser.clearLocalStorage();
            await browser.waitForContainerToBeReady();
            await Login.Actions.logoutUser();
        });

        it("logout doesn't auto-reauth", async () => {
            await Login.Actions.logoutUser();
            await browser.waitUntilModalAppears();
            expect(await Login.Elements.mainLoginSubmitSSOButton().isPresent()).toBe(true);
        });
    });
});
