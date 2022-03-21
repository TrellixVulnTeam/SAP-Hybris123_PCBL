/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { browser, by, element } from 'protractor';
import { Page } from '../../utils/components/Page';
import { Perspectives } from '../../utils/components/Perspectives';
import { ToolbarItemComponentObject } from '../../utils/components/ToolbarItemComponentObject';

describe('E2E Test for bootstrap resilience', () => {
    beforeEach(async () => {
        await Page.Actions.getAndWaitForWholeApp(
            'smartedit-e2e/generated/e2e/bootstrapResilience/#!/ng/storefront'
        );
        await browser.waitForWholeAppToBeReady();

        await Perspectives.Actions.selectPerspective(
            Perspectives.Constants.DEFAULT_PERSPECTIVES.ALL
        );
        await browser.waitForWholeAppToBeReady();
    });

    it('GIVEN a SmartEdit container module is not reachable (404) WHEN I load SmartEdit THEN the SmartEdit container still loads successfully', async () => {
        expect(
            await element(
                by.css('[data-item-key="headerToolbar.userAccountTemplate"] button')
            ).isPresent()
        ).toBe(true);
        expect(
            await element(
                by.css('[data-item-key="headerToolbar.userAccountTemplate"] button')
            ).isDisplayed()
        ).toBe(true);
    });

    it('GIVEN a SmartEdit module is not reachable (404) WHEN I load SmartEdit THEN the SmartEdit application still loads successfully', async () => {
        await browser.switchToIFrame();
    });

    it('GIVEN an application overrides dummyCmsDecorators module (inner), decorator is effectively overriden', async () => {
        await browser.switchToIFrame();
        expect(
            await Perspectives.Elements.deprecated_getElementInOverlay(
                'component1',
                'componentType1'
            ).getText()
        ).toContain('_Text_from_overriden_dummy_decorator');
        await browser.waitToBeDisplayed('.redBackground');
    });

    it('GIVEN an application overrides dummyToolbar module (outer), toolbar item is effectively overriden', async () => {
        await ToolbarItemComponentObject.Assertions.hasToolbarItemByName('OVVERIDEN_DUMMYTOOLBAR');
    });
});
