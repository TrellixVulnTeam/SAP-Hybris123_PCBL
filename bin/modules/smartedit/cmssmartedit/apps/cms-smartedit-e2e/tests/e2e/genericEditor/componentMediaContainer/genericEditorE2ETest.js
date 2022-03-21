/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('GenericEditor Media Upload Container', function () {
    var path = require('path');
    require('../commonFunctions.js');
    const mediaUploadForm = e2e.componentObjects.MediaUploadForm;
    const mediaContainer = e2e.componentObjects.mediaContainer;
    const commonGenericEditor = e2e.componentObjects.commonGenericEditor;

    describe('Basic Media Container', function () {
        beforeEach(function () {
            browser.bootstrap(__dirname);
        });

        it(
            'WHEN I select an inflection point and select a file to upload ' +
                'THEN I expect to see the media upload form populated',
            () => {
                const fileNameToUpload = 'more_bckg.png';
                selectFileToUpload(fileNameToUpload, '.widescreen');

                browser.waitForPresence(element(by.css('se-media-upload-form')));

                expect(mediaUploadForm.elements.getField('description').getAttribute('value')).toBe(
                    fileNameToUpload
                );
                expect(mediaUploadForm.elements.getField('code').getAttribute('value')).toBe(
                    fileNameToUpload
                );
                expect(mediaUploadForm.elements.getField('alt-text').getAttribute('value')).toBe(
                    fileNameToUpload
                );
            }
        );

        it(
            'WHEN I select an inflection point with an existing image and upload  ' +
                'THEN I expect to see that inflection point updated with the newly uploaded image',
            function () {
                selectFileToUpload('more_bckg.png', '.widescreen');
                clickUpload();

                browser.waitForAbsence(by.css('se-media-upload-form'));
                expect(
                    element(
                        by.css('.widescreen .se-media--present .se-media-preview__image-thumbnail')
                    ).getAttribute('src')
                ).toContain('more_bckg.png');
                expect(
                    element(
                        by.css('.widescreen .se-media--present .se-media-preview__image-thumbnail')
                    ).getAttribute('src')
                ).toContain('more_bckg.png');
            }
        );

        it(
            'WHEN I select an inflection point and attempt to upload an invalid file   ' +
                'THEN I expect to see the errors populated',
            function () {
                selectFileToUpload('invalid.doc', '.mobile');

                browser.waitForAbsence(by.css('se-media-upload-form'));
                browser.waitForPresence(by.css('.field-errors div'));

                expect(element.all(by.css('.field-errors div')).first().getText()).toContain(
                    'se.upload.file.type.invalid'
                );
            }
        );

        it('WHEN I post invalid media data THEN I expect to see the errors populated', function () {
            commonGenericEditor.actions.setFieldStructureInput('afield', 'trump');
            save();

            expect(element.all(by.css('.se-help-block--has-error')).first().getText()).toContain(
                'No Trump jokes plz.'
            );
        });

        it(
            'WHEN I select an inflection point with no image selected and upload  ' +
                'THEN I expect to see that inflection point updated with the newly uploaded image',
            function () {
                selectFileToUpload('more_bckg.png', '.mobile');
                clickUpload();

                browser.waitForAbsence(by.css('se-media-upload-form'));
                expect(
                    element(
                        by.css('.mobile .se-media--present .se-media-preview__image-thumbnail')
                    ).getAttribute('src')
                ).toContain('more_bckg.png');
                expect(
                    element(
                        by.css('.mobile .se-media--present .se-media-preview__image-thumbnail')
                    ).getAttribute('src')
                ).toContain('more_bckg.png');
            }
        );
    });

    describe('Advanced Media Container', function () {
        beforeEach(function () {
            browser.bootstrap(__dirname);
            mediaContainer.utils.switchToAdvancedMediaContainer();
        });

        it('WHEN switched to Advanced Media Container THEN should display a list of media containers', function () {
            // THEN
            mediaContainer.assertions.mediaContainerListIsDispalyed();
        });

        it('WHEN open the list of media containers THEN should display the list', function () {
            // WHEN
            mediaContainer.actions.openMediaContainerList();

            // THEN
            mediaContainer.assertions.mediaContainerListHasData(2);
        });

        it('WHEN select the media container from list THEN should display responsive media name field && should display media format fields', function () {
            // WHEN
            mediaContainer.actions.openMediaContainerList();
            mediaContainer.actions.selectMediaContainerFromList(
                'apparel-de-errorpage-pagenotfound'
            );

            // THEN
            mediaContainer.assertions.mediaContainerQualifierFieldDisplayed(
                'media-container-qualifier-mediaContainer_media_en'
            );
            mediaContainer.assertions.mediaFormatIsDisplayed('widescreen');
            mediaContainer.assertions.mediaFormatIsDisplayed('desktop');
            mediaContainer.assertions.mediaFormatIsDisplayed('tablet');
            mediaContainer.assertions.mediaFormatIsDisplayed('mobile');
        });

        it('GIVEN selected media container WHEN clear button is clicked THEN only media container list must be displayed', async () => {
            // GIVEN
            await mediaContainer.actions.openMediaContainerList();
            await mediaContainer.actions.selectMediaContainerFromList(
                'apparel-de-errorpage-pagenotfound'
            );

            // WHEN
            await mediaContainer.actions.clearSelectedMediaContainer();

            // THEN
            await mediaContainer.assertions.mediaContainerQualifierFieldNotDisplayed(
                'media-container-qualifier-mediaContainer_media_en'
            );
            await mediaContainer.assertions.mediaFormatIsNotDisplayed('widescreen');
            await mediaContainer.assertions.mediaFormatIsNotDisplayed('desktop');
            await mediaContainer.assertions.mediaFormatIsNotDisplayed('tablet');
            await mediaContainer.assertions.mediaFormatIsNotDisplayed('mobile');
        });

        it('WHEN new media container is being created THEN should display populated responsive media name field AND should display media format fields', async () => {
            // WHEN
            await mediaContainer.actions.openMediaContainerList();
            await mediaContainer.actions.inputTextToSearchFieldOfMediaContainerList(
                'NonExistantMediaContainer'
            );
            await mediaContainer.actions.clickCreateNewMediaContainer();

            // THEN
            await mediaContainer.assertions.mediaContainerQualifierFieldDisplayed(
                'media-container-qualifier-mediaContainer_media_en'
            );
            await mediaContainer.assertions.mediaContainerQualifierFieldContainsValue(
                'media-container-qualifier-mediaContainer_media_en',
                'NonExistantMediaContainer'
            );
            await mediaContainer.assertions.mediaFormatIsDisplayed('widescreen');
            await mediaContainer.assertions.mediaFormatIsDisplayed('desktop');
            await mediaContainer.assertions.mediaFormatIsDisplayed('tablet');
            await mediaContainer.assertions.mediaFormatIsDisplayed('mobile');
        });

        it('WHEN existing media container is selected THEN media container qualifier field is readonly', function () {
            // WHEN
            mediaContainer.actions.openMediaContainerList();
            mediaContainer.actions.selectMediaContainerFromList(
                'apparel-de-errorpage-pagenotfound'
            );

            // THEN
            mediaContainer.assertions.mediaContainerQualifierFieldIsReadOnly(
                'media-container-qualifier-mediaContainer_media_en'
            );
        });

        it('WHEN new media container is being created THEN media container qualifier field is editable', async () => {
            // WHEN
            await mediaContainer.actions.openMediaContainerList();
            await mediaContainer.actions.inputTextToSearchFieldOfMediaContainerList(
                'NonExistantMediaContainer'
            );
            await mediaContainer.actions.clickCreateNewMediaContainer();

            // THEN
            await mediaContainer.assertions.mediaContainerQualifierFieldIsEditable(
                'media-container-qualifier-mediaContainer_media_en'
            );
        });
    });

    function clickUpload() {
        return browser.click(by.css('.se-media-upload-btn__submit'));
    }

    function selectFileToUpload(fileName, containerSelector) {
        const input = element(by.css(containerSelector)).element(
            mediaUploadForm.locators.getFileSelectorInput()
        );
        browser.waitForPresence(input);

        const absolutePath = path.resolve(__dirname, fileName);
        return browser.sendKeys(input, absolutePath);
    }

    function save() {
        return browser.click(by.id('submit'));
    }
});
