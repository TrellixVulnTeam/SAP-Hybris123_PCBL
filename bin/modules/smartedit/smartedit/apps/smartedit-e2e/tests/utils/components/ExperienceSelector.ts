/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

import { SelectComponentObject as Select } from './SelectComponentObject';

export namespace ExperienceSelectorObject {
    const Constants = {
        CATALOG_SELECTOR_ID: 'previewCatalog',
        CATALOG_SELECTOR_LABEL_ID: 'previewCatalog-label',
        LANGUAGE_SELECTOR_ID: 'language'
    };

    export const Actions = {
        async clickInIframe(): Promise<void> {
            await browser.switchToIFrame();
            await browser.click(element(by.css('.noOffset1')));
            await browser.switchToParent();
        },
        async clickInApplication(): Promise<void> {
            await browser.click(element(by.css('.se-app-logo')));
        },
        async selectExpectedDate(): Promise<void> {
            await browser.click(
                element(by.css("div[class*='datepicker-days'] th[class*='picker-switch']"))
            );
            await browser.click(
                element(by.css("div[class*='datepicker-months'] th[class*='picker-switch']"))
            );
            await browser.click(element(by.cssContainingText("span[class*='year']", '2016')));
            await browser.click(element(by.css("span[class*='month']:first-child")));
            await browser.click(
                element(
                    by.xpath(
                        ".//*[.=\"1\" and contains(@class,'day') and not(contains(@class, 'old')) and not(contains(@class, 'new'))]"
                    )
                )
            );
            await browser.click(element(by.css("span[class*='glyphicon-time']")));
            await browser.click(element(by.css("div[class='timepicker-picker'] .timepicker-hour")));
            await browser.click(element(by.cssContainingText("td[class*='hour']", '01')));
            await browser.click(
                element(by.css("div[class='timepicker-picker'] .timepicker-minute"))
            );
            await browser.click(element(by.cssContainingText("td[class*='minute']", '00')));

            const periodToggleElement = element(
                by.cssContainingText("div[class*='timepicker'] button[class*='btn']", 'AM')
            );
            const isPresent = await periodToggleElement.isPresent();

            if (isPresent) {
                await browser.click(periodToggleElement);
            }
        },

        catalog: {
            async selectDropdown(): Promise<void> {
                await Select.Actions.toggleSingleSelector(Constants.CATALOG_SELECTOR_ID);
            },
            async selectOption(option: string): Promise<void> {
                await Select.Actions.selectOptionByText(Constants.CATALOG_SELECTOR_ID, option);
            }
        },

        calendar: {
            async setDate(date: string): Promise<void> {
                const timeField = element(by.css("input[name='time']"));
                await browser.waitForVisibility(timeField);
                await browser.click(timeField, 'Experience Selector Date and Time Field not found');
                await timeField.sendKeys(date);
                const timeLabel = element(by.id('time-label'));

                await browser.click(timeLabel);
            }
        },

        language: {
            async selectDropdown(): Promise<void> {
                await Select.Actions.toggleSingleSelector(Constants.LANGUAGE_SELECTOR_ID);
            },
            async selectOption(option: string): Promise<void> {
                await Select.Actions.selectOptionByText(Constants.LANGUAGE_SELECTOR_ID, option);
            }
        },

        widget: {
            async openExperienceSelector(): Promise<void> {
                await browser.waitUntilNoModal();
                await browser.click(
                    by.id('experience-selector-btn'),
                    'Experience Selector button not found'
                );

                await browser.waitForPresence(
                    element(by.css(`se-item-printer#${Constants.LANGUAGE_SELECTOR_ID}-selected`)),
                    'cannot load catalog item'
                );
            },
            async submit(): Promise<void> {
                await browser.click(by.id('submit'), 'Experience Selector Apply Button not found');
            },
            async cancel(): Promise<void> {
                await browser.click(by.id('cancel'), 'Experience Selector Apply Button not found');
            }
        },

        productCatalogs: {
            async openMultiProductCatalogVersionsSelectorWidget(): Promise<void> {
                await browser.click(
                    element(by.css("[id='multi-product-catalog-versions-selector']"))
                );
                await browser.waitForVisibility(
                    element(by.css('.se-multi-product-catalog-version-selector'))
                );
            },

            async selectOptionFromMultiProductCatalogVersionsSelectorWidget(
                catalogId: string,
                catalogVersion: string
            ): Promise<void> {
                await Select.Actions.toggleSingleSelector(catalogId);
                await Select.Actions.selectOptionByText(catalogId, catalogVersion);
            },

            async clickModalWindowDone(): Promise<void> {
                await browser.click(by.id('done'));
            }
        },

        async switchToCatalogVersion(catalogVersion: string): Promise<void> {
            await ExperienceSelectorObject.Actions.widget.openExperienceSelector();

            await ExperienceSelectorObject.Actions.catalog.selectDropdown();
            await ExperienceSelectorObject.Actions.catalog.selectOption(catalogVersion);

            await ExperienceSelectorObject.Actions.widget.submit();
            await browser.waitForWholeAppToBeReady();

            await ExperienceSelectorObject.Actions.widget.openExperienceSelector();
        }
    };

    export const Assertions = {
        catalog: {
            async assertOptionText(index: number, expectedText: string): Promise<void> {
                await Select.Assertions.optionContainsTextByIndex(
                    Constants.CATALOG_SELECTOR_ID,
                    expectedText,
                    index
                );
            },

            async assertNumberOfOptions(length: number): Promise<void> {
                await browser.waitUntil(async () => {
                    const count = await ExperienceSelectorObject.Elements.catalog.options().count();

                    return count === length;
                }, `Dropdown failed to contain ${length} elements`);
            }
        },

        language: {
            async assertOptionText(index: number, expectedText: string): Promise<void> {
                await Select.Assertions.optionContainsTextByIndex(
                    Constants.LANGUAGE_SELECTOR_ID,
                    expectedText,
                    index
                );
            },

            async assertNumberOfOptions(length: number): Promise<void> {
                await browser.waitUntil(async () => {
                    const count = await ExperienceSelectorObject.Elements.language
                        .options()
                        .count();
                    return count === length;
                }, `Dropdown failed to contain ${length} elements`);
            }
        }
    };

    export const Elements = {
        widget: {
            button(): ElementFinder {
                return element(by.id('experience-selector-btn'));
            },
            async text(): Promise<string> {
                const text = await element(
                    by.css("[class*='se-experience-selector__btn-text ']")
                ).getText();

                return text;
            },
            getExperienceMenu(): ElementFinder {
                return element(
                    by.css('se-experience-selector-button .se-experience-selector__dropdown')
                );
            }
        },

        activeSite: {
            label(): ElementFinder {
                return element(by.id('activeSite-label'));
            },
            text(): ElementFinder {
                return element(by.id('activeSite-text'));
            }
        },

        catalog: {
            label(): ElementFinder {
                return element(by.id('previewCatalog-label'));
            },
            selectedOption(): ElementFinder {
                return Select.Elements.getSelectedOptionByIndex(Constants.CATALOG_SELECTOR_ID, 0);
            },
            options(): ElementArrayFinder {
                return Select.Elements.getAllOptions(Constants.CATALOG_SELECTOR_ID);
            }
        },

        dateAndTime: {
            label(): ElementFinder {
                return element(by.id('time-label'));
            },
            async field(): Promise<ElementFinder> {
                const timeField = element(by.css("input[name='time']"));
                await browser.waitForVisibility(
                    timeField,
                    'Experience Selector Date and Time Field not found'
                );
                return timeField;
            },
            button(): ElementFinder {
                return element(
                    by.css("[id='time'] div[class*='date'] span[class*='input-group-addon']")
                );
            }
        },

        language: {
            async label(): Promise<ElementFinder> {
                const languageLabel = element(by.id('language-label'));
                await browser.waitForVisibility(
                    languageLabel,
                    'Experience Selector Language Field Label not found'
                );
                return languageLabel;
            },
            async selectedOption(): Promise<ElementFinder> {
                const languageField = Select.Elements.getSelectedOptionByIndex(
                    Constants.LANGUAGE_SELECTOR_ID,
                    0
                );

                await browser.waitForVisibility(
                    languageField,
                    'Experience Selector Language Field not found'
                );
                return languageField;
            },
            options(): ElementArrayFinder {
                return Select.Elements.getAllOptions(Constants.LANGUAGE_SELECTOR_ID);
            }
        },

        productCatalogs: {
            label(): ElementFinder {
                return element(by.id('productCatalogVersions-label'));
            }
        },

        singleProductCatalogVersionSelector: {
            selectedOption(): ElementFinder {
                return element(by.css("[id='productCatalogVersions-selected']"));
            }
        },

        multiProductCatalogVersionsSelector: {
            async selectedOptions(): Promise<string> {
                const value = await element(
                    by.css("input[name='productCatalogVersions']")
                ).getAttribute('value');

                return value;
            },

            getSelectedOptionFromMultiProductCatalogVersionsSelectorWidget(
                catalogId: string
            ): ElementFinder {
                return Select.Elements.getSelectedOptionByIndex(catalogId, 0);
            }
        },

        otherFields: {
            label(fieldName: string): ElementFinder {
                return element(by.id(fieldName + '-label'));
            },
            field(fieldName: string): ElementFinder {
                return element(by.css("input[name='" + fieldName + "']"));
            }
        },

        buttons: {
            ok(): ElementFinder {
                return element(by.id('submit'));
            },
            cancel(): ElementFinder {
                return element(by.id('cancel'));
            }
        },

        page: {
            iframe(): ElementFinder {
                return element(by.css('#js_iFrameWrapper iframe'));
            }
        }
    };
}
