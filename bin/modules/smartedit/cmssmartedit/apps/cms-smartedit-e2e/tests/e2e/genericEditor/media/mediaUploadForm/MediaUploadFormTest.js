/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('MediaUploadForm', () => {
    const dragAndDrop = e2e.pageObjects.DragAndDrop;
    const perspective = e2e.componentObjects.modeSelector;
    const mediaUploadForm = e2e.componentObjects.MediaUploadForm;

    const fileNameToUpload = 'more_bckg.png';

    beforeEach(async () => {
        await browser.bootstrap(__dirname);
    });

    beforeEach(async () => {
        await browser.waitUntilNoModal();
        await browser.driver.manage().window().maximize(); // for Drag and Drop calculations
        await browser.waitForWholeAppToBeReady();
    });

    beforeEach(async () => {
        await perspective.selectBasicPerspective();

        await dragAndDrop.actions.grabComponentInComponentMenu('SimpleBannerComponent');

        await dragAndDrop.actions.addFromComponentMenuToSlotInPosition(
            dragAndDrop.structure.slots.BOTTOM_HEADER_SLOT,
            5,
            dragAndDrop.structure.bottomHeaderTotalComponents
        );

        await browser.switchToParent();
        await browser.waitForPresence(by.css('#media-label'));
    });

    beforeEach(async () => {
        await mediaUploadForm.actions.selectFileToUpload(fileNameToUpload);

        await mediaUploadForm.assertions.isPresent();
    });

    it('GIVEN file is selected THEN it shows the file name in header', async () => {
        expect(await element(by.css('.se-media-upload-form__file-name')).getText()).toBe(
            fileNameToUpload
        );
    });

    it('GIVEN code is not provided WHEN Upload Button is clicked THEN validation error is displayed', async () => {
        await browser.clearInput(mediaUploadForm.elements.getField('code'));

        await mediaUploadForm.actions.clickUploadBtn();

        await mediaUploadForm.assertions.fieldErrorIsPresent('code');
    });

    it('WHEN Cancel Button is clicked THEN Media Upload Form is not displayed', async () => {
        await mediaUploadForm.actions.clickCancelBtn();

        await mediaUploadForm.assertions.isAbsent();
    });

    it('WHEN Upload Button is clicked THEN media is uploaded successfully AND form is not displayed', async () => {
        await mediaUploadForm.actions.clickUploadBtn();

        await mediaUploadForm.assertions.isAbsent();
    });
});
