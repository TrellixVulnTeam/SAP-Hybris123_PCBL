/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { ChangeDetectorRef } from '@angular/core';
import { MediaComponent } from 'cmssmarteditcontainer/components/genericEditor';
import {
    FileValidationService,
    GenericEditorWidgetData,
    LogService,
    TypedMap
} from 'smarteditcommons';

describe('MediaComponent', () => {
    let fileValidationService: jasmine.SpyObj<FileValidationService>;
    let logService: jasmine.SpyObj<LogService>;
    let widgetData: GenericEditorWidgetData<TypedMap<string>>;
    const cdr = jasmine.createSpyObj<ChangeDetectorRef>('changeDetectorRef', ['detectChanges']);

    let component: MediaComponent;
    beforeEach(() => {
        fileValidationService = jasmine.createSpyObj<FileValidationService>(
            'fileValidationService',
            ['validate']
        );

        logService = jasmine.createSpyObj<LogService>('logService', ['warn']);

        widgetData = {
            model: {
                en: undefined
            },
            qualifier: 'en',
            field: {
                initiated: ['1', '2']
            },
            isFieldDisabled: () => false
        } as any;

        component = new MediaComponent(cdr, fileValidationService, logService, widgetData);
    });

    describe('onFileSelect', () => {
        it('GIVEN selected file is valid THEN it sets the image properly', async () => {
            const files = ([
                {
                    name: 'someName'
                }
            ] as unknown) as FileList;
            fileValidationService.validate.and.returnValue(Promise.resolve());

            await component.onFileSelect(files);

            expect(component.fileErrors).toEqual([]);
            expect(component.image).toBe(files[0]);
        });

        it('GIVEN selected file is not valid THEN it resets the image AND logs the message about failure', async () => {
            const files = ([
                {
                    name: 'someName'
                }
            ] as unknown) as FileList;
            fileValidationService.validate.and.returnValue(Promise.reject());

            await component.onFileSelect(files);

            expect(logService.warn).toHaveBeenCalled();
            expect(component.image).toBeNull();
        });
    });

    describe('onMediaUploaded', () => {
        it('sets given id as media id by the language', () => {
            const id = '123';
            component.onMediaUploaded(id);

            expect(widgetData.model.en).toBe(id);
        });

        it('GIVEN Generic Editor Field initiated array exists THEN it clears the array', () => {
            const id = '123';
            component.onMediaUploaded(id);

            expect(widgetData.field.initiated.length).toBe(0);
        });
    });

    describe('canShowFileSelector', () => {
        it('GIVEN model exists AND there is no id for given language AND there is no image THEN it returns true', () => {
            expect(component.canShowFileSelector()).toBe(true);
        });
    });
});
