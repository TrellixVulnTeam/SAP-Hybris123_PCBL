/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { by, element, ElementFinder } from 'protractor';
import { Page } from '../../utils/components/Page';

export namespace InflectionPointObject {
    export const Constants = {
        firstDeviceWidth: '480px'
    };

    export const Elements = {
        inflectionMenu(): ElementFinder {
            return element(by.id('inflectionPtDropdown'));
        },

        firstInflectionDevice(): ElementFinder {
            return element(by.id('se-device-phone'));
        },

        async iframeWidth(): Promise<string> {
            return await element(by.tagName('iframe')).getCssValue('width');
        }
    };

    export const Actions = {
        async navigate(): Promise<void> {
            await Page.Actions.getAndWaitForWholeApp(
                'smartedit-e2e/generated/e2e/inflectionPoint/#!/ng/storefront'
            );
        }
    };
}
