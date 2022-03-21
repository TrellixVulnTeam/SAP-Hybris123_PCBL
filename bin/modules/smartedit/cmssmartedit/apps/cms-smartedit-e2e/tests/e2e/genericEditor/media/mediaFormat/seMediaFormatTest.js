/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('MediaFormat', () => {
    const SeMediaFormat = e2e.componentObjects.seMediaFormat;

    beforeEach(async () => {
        await browser.bootstrap(__dirname);
    });

    it('should display the format', async () => {
        await SeMediaFormat.Assertions.mediaScreenTypeContainsText('Desktop');
    });

    describe('GIVEN media uuid is present', () => {
        it('should show the media present view', async () => {
            await SeMediaFormat.Assertions.mediaPresentIsDisplayed();
            await SeMediaFormat.Assertions.mediaAbsentIsNotDisplayed();
            await SeMediaFormat.Assertions.mediaEditIsNotDisplayed();
        });

        it('should show the image', async () => {
            await SeMediaFormat.Assertions.mediaThumbnailIsDisplayed(
                '/apps/cms-smartedit-e2e/generated/images/contextualmenu_edit_on.png'
            );
        });

        it('should show Remove Button', async () => {
            await SeMediaFormat.Assertions.mediaRemoveBtnLabelIsDisplayed();
        });
    });

    describe('GIVEN media uuid is absent', () => {
        beforeEach(async () => {
            await SeMediaFormat.Actions.setMediaUuid(null);
            await SeMediaFormat.Actions.toggleFieldEditable(true);
        });

        it('THEN the media absent view is shown', async () => {
            await SeMediaFormat.Assertions.mediaPresentIsNotDisplayed();
            await SeMediaFormat.Assertions.mediaAbsentIsDisplayed();
            await SeMediaFormat.Assertions.mediaEditIsNotDisplayed();
        });

        it('THEN Upload Button is shown', async () => {
            const mediaFileSelectorLabel = await SeMediaFormat.Elements.mediaFileSelectorLabel().getText();
            expect(mediaFileSelectorLabel).toContain('upload');
        });

        describe('AND field.editable is false', () => {
            beforeEach(async () => {
                await SeMediaFormat.Actions.toggleFieldEditable(false);
            });

            it('THEN File Selector should be disabled by css class', async () => {
                await SeMediaFormat.Assertions.mediaFileSelectorIsDisabledByClass();
            });
        });
    });

    describe('GIVEN the file is under edit', () => {
        beforeEach(async () => {
            await SeMediaFormat.Actions.toggleIsUnderEdit(true);
        });

        it('THEN the media uploading view is shown', async () => {
            await SeMediaFormat.Assertions.mediaPresentIsNotDisplayed();
            await SeMediaFormat.Assertions.mediaAbsentIsNotDisplayed();
            await SeMediaFormat.Assertions.mediaEditIsDisplayed();
        });

        it('THEN Editing Text is shown', async () => {
            await SeMediaFormat.Assertions.mediaUnderEditLabelIsDisplayed();
        });
    });

    describe('GIVEN media uuid is present AND field is disabled', () => {
        beforeEach(async () => {
            await SeMediaFormat.Actions.toggleIsFieldDisabled(true);
        });

        it('THEN Media File Selector is disabled by class', async () => {
            await SeMediaFormat.Assertions.mediaFileSelectorIsDisabledByClass();
        });

        it('THEN Remove Button is disabled', async () => {
            await SeMediaFormat.Assertions.mediaRemoveBtnIsDisabled();
        });
    });
});
