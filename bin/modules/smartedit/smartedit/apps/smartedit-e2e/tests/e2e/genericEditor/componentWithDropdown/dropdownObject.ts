/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { browser, ExpectedConditions as EC } from 'protractor';

import { SelectComponentObject as Select } from '../../../utils/components/SelectComponentObject';

export namespace DropdownObject {
    export const Constants = {
        PAGE_URL: 'smartedit-e2e/generated/e2e/genericEditor/componentWithDropdown/index.html'
    };

    export const Elements = {
        getSingleDropdownsValues: async (hostIds: string[]): Promise<string[]> => {
            const whenValues = hostIds.map(
                async (hostId) =>
                    await Select.Elements.getSelectedOptionByIndex(hostId, 0).getText()
            );
            const values = await Promise.all(whenValues);
            return values;
        },
        getMultiDropdownValue: async (hostId: string): Promise<string[]> => {
            const whenItems = Select.Elements.getAllSelectedOptions(hostId);
            const texts = await whenItems.map<string>(async (item) => await item.getText());
            return texts;
        }
    };

    export const Actions = {
        clickSingleSelector: async (hostId: string): Promise<void> => {
            await Select.Actions.toggleSingleSelector(hostId);
        },
        clickMultiSelector: async (hostId: string): Promise<void> => {
            await Select.Actions.toggleMultiSelector(hostId);
        },
        selectOption: async (hostId: string, optionLabel: string): Promise<void> => {
            await Select.Actions.selectOptionByText(hostId, optionLabel);
        },
        openAndBeReady: async (): Promise<void> => {
            await browser.get(Constants.PAGE_URL);
            await browser.waitForPresence(Select.Elements.getSelectedOptionByIndex('dropdownA', 0));
        }
    };

    export const Assertions = {
        dropdownContainsListOfOptions: async (
            hostId: string,
            expectedOptions: string[]
        ): Promise<void> => {
            await Select.Assertions.selectorContainsListOfOptions(hostId, expectedOptions);
        },

        searchAndAssertInDropdown: async (
            hostId: string,
            searchTerm: string,
            expectedOptions: string[]
        ): Promise<void> => {
            await Select.Actions.clearAndsetSearchInputValue(hostId, searchTerm);

            await Assertions.dropdownContainsListOfOptions(hostId, expectedOptions);
        },

        selectedPlaceholderIsDisplayed: async (hostId: string): Promise<void> => {
            await Select.Assertions.selectedPlaceholderIsDisplayed(hostId);
        }
    };
}
