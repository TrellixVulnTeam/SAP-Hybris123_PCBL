import { ChangeDetectorRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ErrorContext, FileValidatorFactory } from 'smarteditcommons';
import { MediaBackendValidationHandler, MediaUploaderService } from '../../services';
interface ImageEditableParams {
    code: string;
    description: string;
    altText: string;
}
export declare class MediaUploadFormComponent implements OnChanges {
    private cdr;
    private fileValidatorFactory;
    private mediaBackendValidationHandler;
    private mediaUploaderService;
    image: File;
    onCancel: EventEmitter<void>;
    onSelect: EventEmitter<FileList>;
    onUploadSuccess: EventEmitter<string>;
    acceptedFileTypes: string[];
    isUploading: boolean;
    fieldErrors: ErrorContext[];
    imageParams: ImageEditableParams | null;
    private fileValidator;
    constructor(cdr: ChangeDetectorRef, fileValidatorFactory: FileValidatorFactory, mediaBackendValidationHandler: MediaBackendValidationHandler, mediaUploaderService: MediaUploaderService);
    ngOnChanges(changes: SimpleChanges): void;
    getErrorsForFieldByCode(code: keyof ImageEditableParams): string[];
    uploadMedia(): Promise<void>;
    cancel(): void;
    onChangeFieldValue(value: string, paramName: keyof ImageEditableParams): void;
    onFileSelect(fileList: FileList): void;
    private onMediaUploadSuccess;
    private onMediaUploadFail;
    private reset;
}
export {};
