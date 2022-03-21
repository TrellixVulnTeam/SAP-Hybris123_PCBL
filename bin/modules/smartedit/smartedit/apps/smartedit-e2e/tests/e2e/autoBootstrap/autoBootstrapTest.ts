/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { browser } from 'protractor';

import { Page } from '../../utils/components/Page';
import { Perspectives } from '../../utils/components/Perspectives';
import { Storefront } from '../../utils/components/Storefront';

describe('E2E Test for auto-loading of preview and auto-bootstrap of smartEdit ', () => {
    it('GIVEN that default page is loaded, I click on the link to the second page THEN I see that text decorator is wrapped around my component', async () => {
        await Page.Actions.getAndWaitForWholeApp(
            '/apps/smartedit-e2e/generated/e2e/autoBootstrap/#!/ng/storefront'
        );
        await browser.waitForWholeAppToBeReady();

        await browser.switchToIFrame();
        await Storefront.Actions.deepLink();
        await Perspectives.Actions.selectPerspective(
            Perspectives.Constants.DEFAULT_PERSPECTIVES.ALL
        );
        await Storefront.Assertions.assertComponentInOverlayPresent(
            Storefront.Constants.COMPONENT_2_ID,
            Storefront.Constants.COMPONENT_2_TYPE,
            false
        );

        await Storefront.Assertions.assertDecoratorShowsOnComponent(
            Storefront.Constants.COMPONENT_2_ID,
            Storefront.Constants.COMPONENT_1_TYPE,
            'textDisplay'
        );
    });
});
