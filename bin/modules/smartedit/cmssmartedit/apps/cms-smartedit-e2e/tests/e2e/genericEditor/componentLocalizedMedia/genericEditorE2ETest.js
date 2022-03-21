/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
describe('GenericEditor form save', function () {
    var select = e2e.componentObjects.Select;

    beforeEach(function () {
        browser.bootstrap(__dirname);
    });

    beforeEach(function () {
        require('../commonFunctions.js');
        browser.driver.manage().timeouts().implicitlyWait(0);
    });

    it('will display validation error when submit is clicked without image being uploaded (image is removed)', function () {
        browser.click(by.css('[tab-id="en"] .se-media-remove-btn')).then(function () {
            expect(getValidationErrorElementByLanguage('media', 'en').isDisplayed()).toBe(true);
            browser.waitForAbsence(getValidationErrorElementByLanguage('media', 'fr'));
            browser.waitForAbsence(getValidationErrorElementByLanguage('media', 'it'));
            browser.waitForAbsence(getValidationErrorElementByLanguage('media', 'pl'));
            browser.waitForAbsence(getValidationErrorElementByLanguage('media', 'hi'));
        });
    });

    it("will show the selected media selected for only 'fr' language when a media is selected for 'fr' language and submit is clicked", function () {
        addMedia('fr', 'contextualmenu_delete_on').then(function () {
            clickSubmit().then(function () {
                assertOnMediaInTab('fr', 'contextualmenu_delete_on');
                assertOnMediaInTab('en', 'contextualmenu_delete_off');
            });
        });
    });

    it("will set Media attribute of 'en' and 'hi' tabs to display 'contextualmenu_delete_off.png' and 'contextualmenu_delete_on.png' respectively and no media is selected for the rest of the tabs", function () {
        expectAttributeToContain(
            getMediaElement('en'),
            'src',
            '/apps/cms-smartedit-e2e/generated/images/contextualmenu_delete_off.png'
        );

        selectLocalizedTab('fr', 'media');
        browser.waitForAbsence(getMediaElement('fr'));

        selectLocalizedTab('it', 'media');
        browser.waitForAbsence(getMediaElement('it'));

        selectLocalizedTab('pl', 'media');
        browser.waitForAbsence(getMediaElement('pl'));

        selectLocalizedTab('hi', 'media');
        expectAttributeToContain(
            getMediaElement('hi'),
            'src',
            '/apps/cms-smartedit-e2e/generated/images/contextualmenu_delete_on.png'
        );
    });

    it('will set the description of the selected media', function () {
        assertOnMediaInTab('en', 'contextualmenu_delete_off');
    });

    it('will allow to search for media and auto filter contents', function () {
        browser.click(getMediaElementWrapper('en'), 'could not find selected media for English');
        const searchInput = getMediaTabByTabId('en').element(
            select.locators.getSearchInput('media')
        );
        browser.sendKeys(searchInput, 'contextualmenu');
        assertOnCount(6);

        browser.clearAndSendKeys(searchInput, 'delete');
        assertOnCount(2);
    });

    it('will set the description of the search result media', function () {
        browser.click(getMediaElementWrapper('en'), 'could not find selected media for English');

        const searchInput = getMediaTabByTabId('en').element(
            select.locators.getSearchInput('media')
        );
        browser.sendKeys(searchInput, 'delete_off');
        assertOnCount(1);

        browser.waitForPresence(
            getMediaTabByTabId('en').element(
                select.locators.getOptionByText('media', 'contextualmenu_delete_off')
            )
        );
    });

    function assertOnCount(count) {
        browser.waitUntil(function () {
            return getMediaTabByTabId('en')
                .all(select.locators.getOptionItem('media'))
                .count()
                .then(
                    function (value) {
                        return value === count;
                    },
                    function () {
                        return false;
                    }
                );
        }, 'media dropdown failed to return expected number of options');
    }

    function expectAttributeToContain(element, attr, expectedValue) {
        browser.waitUntil(function () {
            return element.getAttribute(attr).then(
                function (value) {
                    return (value || '').indexOf(expectedValue) >= 0;
                },
                function () {
                    return false;
                }
            );
        }, 'Expected element ' +
            element.locator() +
            ' to have attribute ' +
            attr +
            ' containing ' +
            expectedValue);
    }
});
