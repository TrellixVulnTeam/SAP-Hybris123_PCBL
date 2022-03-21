/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

import { SelectComponentObject as Select } from '../components/SelectComponentObject';

export namespace LandingPagePageObject {
    export const Constants = {
        LANDING_PAGE_PATH: 'smartedit-e2e/generated/e2e/landingPage/#!/ng/',

        SELECTOR_ID: 'site',

        // SITES
        APPAREL_SITE: 'Apparels',
        ELECTRONICS_SITE: 'Electronics',
        TOYS_SITE: 'Toys',
        ACTION_FIGURES_SITE: 'Action Figures',

        // Catalogs
        APPAREL_UK_CATALOG: 'Apparel UK Content Catalog',
        ELECTRONICS_CATALOG: 'Electronics Content Catalog',
        TOYS_CATALOG: 'Toys Content Catalog',
        ACTION_FIGURES_CATALOG: 'Action Figures Content Catalog',

        // Catalog Versions
        ACTIVE_CATALOG_VERSION: 'Online',
        STAGED_CATALOG_VERSION: 'Staged',

        // IDs
        TOYS_SITE_ID: 'toys',
        TOYS_CATALOG_ID: 'toysContentCatalog',
        ACTION_FIGURES_SITE_ID: 'action',
        ACTION_FIGURES_CATALOG_ID: 'actionFiguresContentCatalog'
    };

    export const Elements = {
        getSiteSelectorInput(): ElementFinder {
            return Select.Elements.getSelectedOptionByIndex(Constants.SELECTOR_ID, 0);
        },
        // Catalogs
        getCatalogsDisplayed(): ElementArrayFinder {
            return element.all(by.css('se-catalog-details'));
        },
        async getNumberOfCatalogsDisplayed(): Promise<number> {
            const count = await Elements.getCatalogsDisplayed().count();

            return count;
        },
        getCatalogByIndex(index: number): ElementFinder {
            return Elements.getCatalogsDisplayed().get(index);
        },
        getCatalogByName(catalogName: string): ElementFinder {
            return element(by.css('[data-catalog="' + catalogName + '"]'));
        },
        getCatalogVersion(catalogName: string, catalogVersion: string): ElementFinder {
            return element(
                by.css(
                    '[data-catalog="' +
                        catalogName +
                        '"] [data-catalog-version="' +
                        catalogVersion +
                        '"]'
                )
            );
        },
        getCatalogContainerByName(catalogName: string): ElementFinder {
            return Elements.getCatalogByName(catalogName).element(
                by.css('.se-landing-page-catalog')
            );
        },
        getCatalogTitle(catalogName: string): ElementFinder {
            return Elements.getCatalogByName(catalogName).element(
                by.css('.se-catalog-details__header')
            );
        },
        getCatalogThumbnail(catalogName: string): ElementFinder {
            return Elements.getCatalogByName(catalogName).element(
                by.css(
                    'se-catalog-versions-thumbnail-carousel .se-active-catalog-version-container__thumbnail'
                )
            );
        },
        getHomePageLink(catalogName: string, catalogVersion: string): ElementFinder {
            return Elements.getCatalogByName(catalogName)
                .element(by.cssContainingText('.se-catalog-version-container', catalogVersion))
                .element(by.css('se-home-page-link a'));
        },
        getCatalogVersionTemplateByName(
            catalogName: string,
            catalogVersion: string,
            item: string
        ): ElementFinder {
            return Elements.getCatalogVersion(catalogName, catalogVersion).element(
                by.cssContainingText('div', item)
            );
        },

        // Others
        async getBrowserUrl(): Promise<string> {
            const url = await browser.getCurrentUrl();

            return url;
        }
    };

    export const Actions = {
        // Navigation
        async openAndBeReady(): Promise<void> {
            await browser.get(Constants.LANDING_PAGE_PATH);
            await browser.waitForContainerToBeReady();
        },

        // Sites Selector
        async openSiteSelector(): Promise<void> {
            await Select.Actions.toggleSingleSelector(Constants.SELECTOR_ID);
        },
        async selectSite(siteName: string): Promise<void> {
            await Select.Actions.toggleSingleSelector(Constants.SELECTOR_ID);
            await Select.Actions.selectOptionByText(Constants.SELECTOR_ID, siteName);
        },

        // Catalogs
        async navigateToStorefrontViaThumbnail(catalogName: string): Promise<void> {
            await browser.click(Elements.getCatalogThumbnail(catalogName));

            await browser.waitForWholeAppToBeReady();
            await browser.waitForUrlToMatch(/\/storefront/);
        },
        async navigateToStorefrontViaHomePageLink(
            catalogName: string,
            catalogVersion: string
        ): Promise<void> {
            await browser.click(Elements.getHomePageLink(catalogName, catalogVersion));
            await browser.waitForWholeAppToBeReady();
            await browser.waitForUrlToMatch(/\/storefront/);
        },

        // Note: This is only meant to be used when clicking on a homePage link that don't redirect to another storefront.
        // (our tests only care about the URL being changed appropriately). Thus, it is not necessary to wait for the whole app to be ready.
        async clickOnHomePageLink(catalogName: string, catalogVersion: string): Promise<void> {
            await browser.click(Elements.getHomePageLink(catalogName, catalogVersion));
            await browser.waitForUrlToMatch(/\/storefront/);
        },
        async clickOnParentCatalogHomePageLink(
            catalogName: string,
            catalogVersion: string
        ): Promise<void> {
            await Actions.clickOnHomePageLink(catalogName, catalogVersion);
        },

        // Left Menu
        async navigateToLandingPage(): Promise<void> {
            await browser.click(element(by.css('sites-link a')));
            await browser.waitForContainerToBeReady();
            await browser.waitForUrlToMatch(/^(?!.*storefront)/);
        },

        async goToLandingPageWithSiteId(siteId: string): Promise<void> {
            await browser.get('smartedit-e2e/generated/e2e/landingPage/#!/ng/sites/' + siteId);
            await browser.waitForContainerToBeReady();
        },

        async navigateBack(): Promise<void> {
            await browser.navigate().back();
            await browser.waitForContainerToBeReady();
        },

        async refreshOnLandingPage(): Promise<void> {
            await browser.refresh();
            await browser.waitForContainerToBeReady();
        }
    };

    export const Assertions = {
        // Site
        async expectedSiteIsSelected(siteName: string): Promise<void> {
            await Select.Assertions.selectedOptionContainsTextByIndex(
                Constants.SELECTOR_ID,
                siteName,
                0
            );
        },
        async selectedSiteHasRightNumberOfCatalogs(
            expectedNumberOfCatalogs: number
        ): Promise<void> {
            await browser.waitUntil(async () => {
                const actualNumberOfCatalogs = await Elements.getNumberOfCatalogsDisplayed();

                return actualNumberOfCatalogs === expectedNumberOfCatalogs;
            }, 'Expected ' + expectedNumberOfCatalogs + ' catalogs for selected site., got ');
        },

        // Catalog
        async catalogVersionContainsItem(
            catalogName: string,
            catalogVersion: string,
            item: string
        ): Promise<void> {
            expect(
                await Elements.getCatalogVersionTemplateByName(
                    catalogName,
                    catalogVersion,
                    item
                ).isPresent()
            ).toBe(true, 'Expected template to be displayed in catalog version.');
        },

        // Other
        async assertLandingPageIsDisplayed(): Promise<void> {
            expect(await Elements.getBrowserUrl()).not.toContain('/storefront');
        },
        async assertStorefrontIsLoaded(): Promise<void> {
            expect(await Elements.getBrowserUrl()).toContain('/storefront');
        },
        async assertLandingPageDoesNotHaveSiteInUrl(routeParam: string): Promise<void> {
            expect(await Elements.getBrowserUrl()).not.toContain('/sites' + routeParam);
        },
        async searchAndAssertInDropdown(
            searchTerm: string,
            expectedOptions: string[]
        ): Promise<void> {
            await Select.Actions.clearAndsetSearchInputValue(Constants.SELECTOR_ID, searchTerm);
            await Select.Assertions.selectorContainsListOfOptions(
                Constants.SELECTOR_ID,
                expectedOptions
            );
        }
    };
}
