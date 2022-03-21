/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { functionsUtils } from '../../utils';
import { FileMimeTypeService } from '../file-mime-type';
import { FileValidator, FileValidatorFactory } from '../file-validator-factory';
import { FileValidationService, FILE_VALIDATION_CONFIG } from './file-validation.service';

describe('FileValidationService', () => {
    let fileValidator: jasmine.SpyObj<FileValidator>;
    let fileMimeTypeService: jasmine.SpyObj<FileMimeTypeService>;
    let fileValidatorFactory: jasmine.SpyObj<FileValidatorFactory>;

    let service: FileValidationService;
    beforeEach(() => {
        fileMimeTypeService = jasmine.createSpyObj<FileMimeTypeService>('fileMimeTypeService', [
            'isFileMimeTypeValid'
        ]);

        fileValidator = jasmine.createSpyObj<FileValidator>('fileValidator', ['validate']);
        fileValidatorFactory = jasmine.createSpyObj<FileValidatorFactory>('fileValidatorFactory', [
            'build'
        ]);

        service = new FileValidationService(fileMimeTypeService, fileValidatorFactory);
    });

    beforeEach(() => {
        fileValidatorFactory.build.and.returnValue(fileValidator);
    });

    beforeEach(() => {
        FILE_VALIDATION_CONFIG.ACCEPTED_FILE_TYPES = ['png', 'jpg'];
        FILE_VALIDATION_CONFIG.MAX_FILE_SIZE_IN_BYTES = 8;
        FILE_VALIDATION_CONFIG.I18N_KEYS = {
            FILE_TYPE_INVALID: 'se.upload.file.type.invalid',
            FILE_SIZE_INVALID: 'se.upload.file.size.invalid'
        };
    });

    describe('validate', () => {
        it('should resolve a promise promise if the given file is valid', async () => {
            const file = {} as File;
            const context = [];
            fileMimeTypeService.isFileMimeTypeValid.and.returnValue(Promise.resolve());
            fileValidator.validate.and.returnValue(true);

            await service.validate(file, context);
            expect(true).toBe(true);
        });

        it('should reject with the errors context if the file header is valid but there are object validation errors', async () => {
            const file = {} as File;
            const context = [];
            fileMimeTypeService.isFileMimeTypeValid.and.returnValue(Promise.resolve());
            fileValidator.validate.and.callFake((_file, errorsContext) => {
                errorsContext.push({
                    subject: 'size',
                    message: 'se.upload.file.size.invalid'
                });
                return false;
            });

            try {
                await service.validate(file, context);
                functionsUtils.assertFail();
            } catch (error) {
                expect(error).toEqual([
                    {
                        message: 'se.upload.file.size.invalid',
                        subject: 'size'
                    }
                ]);
            }
        });

        it('should reject with the errors context if the file is invalid', async () => {
            const file = {} as File;
            const context = [];
            fileMimeTypeService.isFileMimeTypeValid.and.returnValue(Promise.reject());
            fileValidator.validate.and.callFake((_file, errorsContext) => {
                errorsContext.push({
                    subject: 'size',
                    message: 'se.upload.file.size.invalid'
                });
                return false;
            });

            try {
                await service.validate(file, context);
                functionsUtils.assertFail();
            } catch (error) {
                expect(error).toEqual([
                    {
                        message: 'se.upload.file.size.invalid',
                        subject: 'size'
                    },
                    {
                        message: 'se.upload.file.type.invalid',
                        subject: 'type'
                    }
                ]);
            }
        });
    });

    describe('buildAcceptedFileTypesList', () => {
        it('should return a comma separated list of file extension', () => {
            expect(service.buildAcceptedFileTypesList()).toBe('.png,.jpg');
        });
    });
});
