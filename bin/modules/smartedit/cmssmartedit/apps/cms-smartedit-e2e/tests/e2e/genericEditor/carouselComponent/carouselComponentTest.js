/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
describe('Product Carousel Component - ', () => {
    var page = e2e.pageObjects.GenericEditor;
    var genericEditor = e2e.componentObjects.genericEditor;
    var productCarousel = e2e.componentObjects.productCarousel;
    var backendClient = e2e.mockBackendClient;

    beforeEach(async () => {
        await browser.bootstrap(__dirname);
        await browser.get('/apps/cms-smartedit-e2e/generated/pages/smartedit.html#!/ng/carousel');
    });

    var componentData = {
        title: {
            EN: 'some title',
            IT: 'some title in italian'
        },
        products: {
            Staged: ['Asterisk SS youth black M'],
            Online: ['Avionics Shades Black']
        },
        categories: {
            Staged: ['Pants'],
            Online: ['Shirts']
        }
    };

    describe('New component with change permissions for attributes products and categories - ', () => {
        beforeEach(async () => {
            await productCarousel.actions.prepareApp(true, true);
            await browser.waitForAngularEnabled(false);
        });

        it(
            'GIVEN a new product carousel component is added ' +
                'WHEN the editor is opened ' +
                'THEN the editor cannot be saved as it is not dirty ',
            async () => {
                // GIVEN
                await page.actions.openGenericEditor();

                // THEN
                await genericEditor.assertions.saveIsDisabled();
            }
        );

        it(
            'GIVEN a new product carousel component is added ' +
                'WHEN the editor is opened ' +
                'THEN all fields in the editor are displayed correctly',
            async () => {
                // GIVEN
                await page.actions.openGenericEditor();

                // THEN
                await productCarousel.assertions.componentIsEmpty();
            }
        );

        it('GIVEN a new product carousel component is added THEN the editor can be saved', async () => {
            // GIVEN
            await page.actions.openGenericEditor();

            // WHEN
            await productCarousel.actions.setProductCarouselData(componentData);
            await genericEditor.actions.save();
            // THEN
            await page.actions.openGenericEditor();
            await productCarousel.assertions.hasRightData(componentData);
        });
    });

    describe('New component with read-only permissions for attributes products and categories - ', function () {
        beforeEach(async () => {
            await productCarousel.actions.prepareApp(false, false);
            await browser.waitForAngularEnabled(false);
        });

        it(
            'GIVEN a new product carousel component is added ' +
                'WHEN the editor is opened ' +
                'THEN the Add Items buttons are not displayed for product and categories attributes',
            async () => {
                // GIVEN
                await page.actions.openGenericEditor();

                // THEN
                await productCarousel.assertions.productsAddButtonIsNotDisplayed();
                await productCarousel.assertions.categoriesAddButtonIsNotDisplayed();
            }
        );
    });

    describe('Existing component - ', function () {
        let fixtureID0;

        beforeAll(async function () {
            fixtureID0 = await backendClient.modifyFixture(
                [
                    'cmssmarteditwebservices\\/v1\\/catalogs\\/apparel-ukContentCatalog\\/versions\\/Staged\\/workfloweditableitems'
                ],
                {
                    'editableItems.0.editableByUser': true
                }
            );
        });

        beforeEach(async () => {
            await productCarousel.actions.prepareApp(true, true);
            await page.actions.openGenericEditor();
            await productCarousel.actions.setProductCarouselData(componentData);
            await genericEditor.actions.save();
            await browser.waitForAngularEnabled(false);
        });

        it(
            'GIVEN the component already exists ' +
                'WHEN the editor is opened ' +
                'THEN the editor cannot be saved as it is not dirty ',
            async () => {
                // GIVEN
                await page.actions.openGenericEditor();

                // THEN
                await genericEditor.assertions.saveIsDisabled();
            }
        );

        it(
            'GIVEN the component already contains products ' +
                'WHEN I reorder products and save ' +
                'THEN their order is persisted',
            async () => {
                // GIVEN
                const originalOrder = ['Asterisk SS youth black M', 'Avionics Shades Black'];
                const newOrder = ['Avionics Shades Black', 'Asterisk SS youth black M'];
                await page.actions.openGenericEditor();
                await productCarousel.assertions.productsAreInRightOrder(originalOrder);

                // WHEN
                await productCarousel.actions.moveProductToPosition(0, 1);
                await genericEditor.actions.save();
                await page.actions.openGenericEditor();

                // THEN
                await productCarousel.assertions.productsAreInRightOrder(newOrder);
            }
        );

        it(
            'GIVEN the component already contains products ' +
                'WHEN I move products up and save ' +
                'THEN the new list is persisted',
            async () => {
                // GIVEN
                const originalOrder = ['Asterisk SS youth black M', 'Avionics Shades Black'];
                const newExpectedOrder = ['Avionics Shades Black', 'Asterisk SS youth black M'];
                await page.actions.openGenericEditor();
                await productCarousel.assertions.productsAreInRightOrder(originalOrder);

                // WHEN
                await productCarousel.actions.moveProductUp(1);
                await genericEditor.actions.save();

                await page.actions.openGenericEditor();

                // THEN
                await productCarousel.assertions.productsAreInRightOrder(newExpectedOrder);
            }
        );

        it(
            'GIVEN the component already contains products ' +
                'WHEN I move products down and save ' +
                'THEN the new list is persisted',
            async () => {
                // GIVEN
                const originalOrder = ['Asterisk SS youth black M', 'Avionics Shades Black'];
                const newExpectedOrder = ['Avionics Shades Black', 'Asterisk SS youth black M'];
                await page.actions.openGenericEditor();
                await productCarousel.assertions.productsAreInRightOrder(originalOrder);

                // WHEN
                await productCarousel.actions.moveProductDown(0);
                await genericEditor.actions.save();

                await page.actions.openGenericEditor();
                // THEN
                await productCarousel.assertions.productsAreInRightOrder(newExpectedOrder);
            }
        );

        it(
            'GIVEN the component already contains products ' +
                'WHEN I remove products and save ' +
                'THEN the new list is persisted',
            async () => {
                // GIVEN
                const originalList = ['Asterisk SS youth black M', 'Avionics Shades Black'];
                const newList = ['Asterisk SS youth black M'];
                await page.actions.openGenericEditor();
                await productCarousel.assertions.productsAreInRightOrder(originalList);

                // WHEN
                await productCarousel.actions.deleteProduct(1);
                await genericEditor.actions.save();

                await page.actions.openGenericEditor();
                // THEN
                await productCarousel.assertions.productsAreInRightOrder(newList);
            }
        );

        it(
            'GIVEN the component already contains categories ' +
                'WHEN I remove categories and save ' +
                'THEN the new list is persisted',
            async () => {
                // GIVEN
                const originalList = ['Pants', 'Shirts'];
                const newList = ['Pants'];

                await page.actions.openGenericEditor();

                await productCarousel.assertions.categoriesAreInRightOrder(originalList);

                // WHEN
                await productCarousel.actions.deleteCategory(1);
                await genericEditor.actions.save();

                // THEN
                await page.actions.openGenericEditor();
                await productCarousel.assertions.categoriesAreInRightOrder(newList);
            }
        );

        afterAll(function () {
            backendClient.removeFixture(fixtureID0);
        });

        // NOTE: We are only testing that products are given in the right order, as that can affect
        // how the carousel is displayed. The order of categories though doesn't have any noticeable effect.
    });
});
