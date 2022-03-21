/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
module.exports = (function () {
    const Elements = {
        mediaScreenType: () => {
            return element(by.css('.se-media-format__screen-type'));
        },
        mediaPresent: () => {
            return element(by.css('.se-media--present'));
        },
        mediaAbsent: () => {
            return element(by.css('.se-media--absent'));
        },
        mediaEdit: () => {
            return element(by.css('.se-media--edit'));
        },
        mediaRemoveBtn: () => {
            return element(by.css('.se-media-remove-btn'));
        },
        mediaRemoveBtnLabel: () => {
            return element(by.css('.se-media-remove-btn-txt'));
        },
        mediaThumbnailBySrc: (src) => {
            return element(by.css(`.se-media-preview__image-thumbnail[src="${src}"]`));
        },
        mediaUnderEditLabel: () => {
            return element(by.css('.se-media-preview--edit'));
        },
        mediaFileSelectorContainer: () => {
            return element(by.css('.se-file-selector'));
        },
        mediaFileSelectorLabel: () => {
            return element(by.css('.se-file-selector__label'));
        },
        setMediaUuid: () => {
            return element(by.css('#set-media-uuid'));
        },
        setFieldEditable: () => {
            return element(by.css('#set-field-editable'));
        },
        setIsUnderEdit: () => {
            return element(by.css('#set-is-under-edit'));
        },
        setIsFieldDisabled: () => {
            return element(by.css('#is-field-disabled'));
        }
    };

    const Actions = {
        setMediaUuid: async (value) => {
            const input = Elements.setMediaUuid();
            await browser.clearInput(input);
            await input.sendKeys(String(value));

            await element(by.css('#set-media-uuid-btn')).click();
        },
        toggleFieldEditable: (flag) => {
            return toggleCheckbox(Elements.setFieldEditable(), flag);
        },
        toggleIsUnderEdit: (flag) => {
            return toggleCheckbox(Elements.setIsUnderEdit(), flag);
        },
        toggleIsFieldDisabled: (flag) => {
            return toggleCheckbox(Elements.setIsFieldDisabled(), flag);
        }
    };

    const Assertions = {
        mediaScreenTypeContainsText: (expectedText) => {
            return browser.waitForSelectorToContainText(Elements.mediaScreenType(), expectedText);
        },
        mediaPresentIsDisplayed: () => {
            return browser.waitForPresence(Elements.mediaPresent());
        },
        mediaPresentIsNotDisplayed: () => {
            return browser.waitForAbsence(Elements.mediaPresent());
        },
        mediaAbsentIsDisplayed: () => {
            return browser.waitForPresence(Elements.mediaAbsent());
        },
        mediaAbsentIsNotDisplayed: () => {
            return browser.waitForAbsence(Elements.mediaAbsent());
        },
        mediaEditIsDisplayed: () => {
            return browser.waitForPresence(Elements.mediaEdit());
        },
        mediaEditIsNotDisplayed: () => {
            return browser.waitForAbsence(Elements.mediaEdit());
        },
        mediaRemoveBtnIsDisabled: async () => {
            const elem = Elements.mediaRemoveBtn();
            await browser.waitForPresence(elem);

            const disabled = await elem.getAttribute('disabled');
            expect(disabled).toBeTruthy();
        },
        mediaRemoveBtnLabelIsDisplayed: () => {
            return browser.waitForPresence(Elements.mediaRemoveBtnLabel());
        },
        mediaThumbnailIsDisplayed: (expectedSrc) => {
            return browser.waitForPresence(Elements.mediaThumbnailBySrc(expectedSrc));
        },
        mediaUnderEditLabelIsDisplayed: () => {
            return browser.waitForPresence(Elements.mediaUnderEditLabel());
        },
        mediaFileSelectorIsDisabledByClass: async () => {
            const elem = Elements.mediaFileSelectorContainer();
            await browser.waitForPresence(elem);

            const className = await elem.getAttribute('class');
            expect(className).toContain('file-selector-disabled');
        }
    };

    async function toggleCheckbox(element, flag) {
        const isSelected = await element.isSelected();
        if ((!isSelected && flag) || (isSelected && !flag)) {
            await element.click();
        }
    }

    return {
        Elements,
        Actions,
        Assertions
    };
})();
