/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectorRef, SimpleChange } from '@angular/core';
import { ICMSMedia } from 'cmscommons';
import { MediaUploadFormComponent } from 'cmssmarteditcontainer/components/genericEditor/media/components';
import {
    MediaBackendValidationHandler,
    MediaUploaderService
} from 'cmssmarteditcontainer/components/genericEditor/media/services';
import { FileValidatorFactory } from 'smarteditcommons';
import { createSimulateNgOnChanges } from 'testhelpers';

describe('MediaUploadFormComponent', () => {
    const fileValidatorFactory = new FileValidatorFactory();
    const cdr = jasmine.createSpyObj<ChangeDetectorRef>('changeDetectorRef', ['detectChanges']);
    let mediaBackendValidationHandler: jasmine.SpyObj<MediaBackendValidationHandler>;
    let mediaUploaderService: jasmine.SpyObj<MediaUploaderService>;

    let component: MediaUploadFormComponent;

    type Input = Partial<Pick<typeof component, 'image'>>;
    let simulateNgOnChanges: ReturnType<typeof createSimulateNgOnChanges>;
    beforeEach(() => {
        mediaBackendValidationHandler = jasmine.createSpyObj<MediaBackendValidationHandler>(
            'mediaBackendValidationHandler',
            ['handleResponse']
        );
        mediaUploaderService = jasmine.createSpyObj<MediaUploaderService>('mediaUploaderService', [
            'uploadMedia'
        ]);

        component = new MediaUploadFormComponent(
            cdr,
            fileValidatorFactory,
            mediaBackendValidationHandler,
            mediaUploaderService
        );
        simulateNgOnChanges = createSimulateNgOnChanges<Input>(component);
    });

    describe('GIVEN image has changed', () => {
        it('AND it has value THEN it sets imageParams properly', () => {
            const name = 'someName';

            const image = {
                name
            };
            simulateNgOnChanges({
                image: new SimpleChange(undefined, image, false)
            });

            expect(component.imageParams).toEqual({
                code: name,
                description: name,
                altText: name
            });
        });
    });

    describe('onCancel', () => {
        it('should reset params AND emit', () => {
            const emitSpy = spyOn(component.onCancel, 'emit');
            component.cancel();

            expect(component.imageParams).toEqual(null);
            expect(component.fieldErrors).toEqual([]);
            expect(component.isUploading).toBe(false);

            expect(emitSpy).toHaveBeenCalled();
        });
    });

    describe('uploadMedia', () => {
        it('GIVEN no validation errors THEN it uploads the image', async () => {
            const uploadedMedia = { uuid: '1' } as ICMSMedia;
            mediaUploaderService.uploadMedia.and.returnValue(Promise.resolve(uploadedMedia));

            const onUploadSuccessEmitSpy = spyOn(component.onUploadSuccess, 'emit');

            const name = 'someName';
            const image = {} as File;
            component.image = image;

            component.imageParams = {
                code: name,
                description: name,
                altText: name
            };

            await component.uploadMedia();

            expect(mediaUploaderService.uploadMedia).toHaveBeenCalledWith({
                file: image,
                code: name,
                description: name,
                altText: name
            });

            // assert that params has been reset
            expect(component.imageParams).toBeNull();
            expect(component.fieldErrors).toEqual([]);
            expect(component.isUploading).toBe(false);

            expect(onUploadSuccessEmitSpy).toHaveBeenCalledWith('1');
            expect(component.isUploading).toBe(false);
        });

        it('GIVEN uploadMedia fails THEN it delegates error handling to mediaBackendValidationHandler', async () => {
            component.imageParams = {
                code: 'code'
            } as any;

            mediaUploaderService.uploadMedia.and.returnValue(Promise.reject());

            await component.uploadMedia();

            expect(mediaBackendValidationHandler.handleResponse).toHaveBeenCalled();
        });

        it('GIVEN code is not provided THEN it populates errors AND does not upload', async () => {
            component.imageParams = {
                code: '',
                description: 'someName',
                altText: 'someName'
            };

            await component.uploadMedia();

            expect(mediaUploaderService.uploadMedia).not.toHaveBeenCalled();
            expect(component.fieldErrors.length).toBe(1);
        });
    });

    describe('getErrorsForFieldByCode', () => {
        it('should filter errors on subject and get messages', () => {
            component.fieldErrors = [
                {
                    subject: 'code',
                    message: 'some code message'
                }
            ];
            expect(component.getErrorsForFieldByCode('code')).toEqual(['some code message']);
        });

        it('should not populate messages for unmatched subjects in errors', () => {
            component.fieldErrors = [
                {
                    subject: 'code',
                    message: 'some code message'
                }
            ];
            expect(component.getErrorsForFieldByCode('altText')).toEqual([]);
        });
    });
});
