import { ChangeDetectorRef } from '@angular/core';
import { ErrorContext, FILE_VALIDATION_CONFIG, FileValidationService, GenericEditorWidgetData, LogService, TypedMap } from 'smarteditcommons';
export declare class MediaComponent {
    private cdr;
    private fileValidationService;
    private logService;
    acceptedFileTypes: typeof FILE_VALIDATION_CONFIG.ACCEPTED_FILE_TYPES;
    fileErrors: ErrorContext[];
    image: File | null;
    isFieldDisabled: boolean;
    mediaSelectorId: string;
    private mediaIdByLang;
    private lang;
    private field;
    constructor(cdr: ChangeDetectorRef, fileValidationService: FileValidationService, logService: LogService, data: GenericEditorWidgetData<TypedMap<string>>);
    onMediaIdChange(id: string): void;
    onFileSelect(fileList: FileList): Promise<void>;
    onMediaUploaded(id: string): void;
    resetImage(): void;
    canShowFileSelector(): boolean;
}
