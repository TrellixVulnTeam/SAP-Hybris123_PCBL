/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Injectable } from '@angular/core';
import { FileMimeTypeService } from '../file-mime-type';
import {
    FileValidatorFactory,
    ErrorContext,
    FileValidatorByProperty
} from '../file-validator-factory';

export const FILE_VALIDATION_CONFIG = {
    /** A list of file types supported by the platform. */
    ACCEPTED_FILE_TYPES: ['jpeg', 'jpg', 'gif', 'bmp', 'tiff', 'tif', 'png'],
    /** The maximum size, in bytes, for an uploaded file. */
    MAX_FILE_SIZE_IN_BYTES: 20 * 1024 * 1024,
    /** A map of all the internationalization keys used by the file validation service. */
    I18N_KEYS: {
        FILE_TYPE_INVALID: 'se.upload.file.type.invalid',
        FILE_SIZE_INVALID: 'se.upload.file.size.invalid'
    }
};

/**
 * Validates if a specified file meets the required file type and file size constraints of SAP Hybris Commerce.
 */
@Injectable()
export class FileValidationService {
    private validators: FileValidatorByProperty[] = [
        {
            subject: 'size',
            message: FILE_VALIDATION_CONFIG.I18N_KEYS.FILE_SIZE_INVALID,
            validate: (size: number): boolean =>
                size <= FILE_VALIDATION_CONFIG.MAX_FILE_SIZE_IN_BYTES
        }
    ];

    constructor(
        private fileMimeTypeService: FileMimeTypeService,
        private fileValidatorFactory: FileValidatorFactory
    ) {}

    /**
     * Transforms the supported file types into a comma separated list of file type extensions.
     *
     * @returns A comma-separated list of supported file type extensions
     */
    public buildAcceptedFileTypesList(): string {
        return FILE_VALIDATION_CONFIG.ACCEPTED_FILE_TYPES.map((fileType) => `.${fileType}`).join(
            ','
        );
    }

    /**
     * Validates the specified file object against custom validator and its mimetype.
     * It appends the errors to the error context array provided or it creates a new error context array.
     *
     * @param file The web API file object to be validated.
     * @param context The contextual error array to append the errors to. It is an output parameter.
     * @returns A promise that resolves if the file is valid otherwise it rejects with a list of errors.
     */
    public async validate(
        file: File,
        errorsContext: ErrorContext[]
    ): Promise<ErrorContext[] | void> {
        this.fileValidatorFactory.build(this.validators).validate(file, errorsContext);
        try {
            await this.fileMimeTypeService.isFileMimeTypeValid(file);
            if (errorsContext.length > 0) {
                return Promise.reject(errorsContext);
            }
        } catch {
            errorsContext.push({
                subject: 'type',
                message: FILE_VALIDATION_CONFIG.I18N_KEYS.FILE_TYPE_INVALID
            });
            return Promise.reject(errorsContext);
        }
    }
}
