import { FileMimeTypeService } from '../file-mime-type';
import { FileValidatorFactory, ErrorContext } from '../file-validator-factory';
export declare const FILE_VALIDATION_CONFIG: {
    /** A list of file types supported by the platform. */
    ACCEPTED_FILE_TYPES: string[];
    /** The maximum size, in bytes, for an uploaded file. */
    MAX_FILE_SIZE_IN_BYTES: number;
    /** A map of all the internationalization keys used by the file validation service. */
    I18N_KEYS: {
        FILE_TYPE_INVALID: string;
        FILE_SIZE_INVALID: string;
    };
};
/**
 * Validates if a specified file meets the required file type and file size constraints of SAP Hybris Commerce.
 */
export declare class FileValidationService {
    private fileMimeTypeService;
    private fileValidatorFactory;
    private validators;
    constructor(fileMimeTypeService: FileMimeTypeService, fileValidatorFactory: FileValidatorFactory);
    /**
     * Transforms the supported file types into a comma separated list of file type extensions.
     *
     * @returns A comma-separated list of supported file type extensions
     */
    buildAcceptedFileTypesList(): string;
    /**
     * Validates the specified file object against custom validator and its mimetype.
     * It appends the errors to the error context array provided or it creates a new error context array.
     *
     * @param file The web API file object to be validated.
     * @param context The contextual error array to append the errors to. It is an output parameter.
     * @returns A promise that resolves if the file is valid otherwise it rejects with a list of errors.
     */
    validate(file: File, errorsContext: ErrorContext[]): Promise<ErrorContext[] | void>;
}
