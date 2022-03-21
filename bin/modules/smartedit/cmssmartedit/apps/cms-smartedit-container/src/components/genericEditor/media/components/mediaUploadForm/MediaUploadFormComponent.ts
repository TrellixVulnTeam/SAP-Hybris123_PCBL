/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';
import { ErrorResponse, ICMSMedia } from 'cmscommons';
import {
    ErrorContext,
    FileValidator,
    FileValidatorFactory,
    FILE_VALIDATION_CONFIG,
    SeDowngradeComponent,
    stringUtils
} from 'smarteditcommons';
import { MediaBackendValidationHandler, MediaUploaderService } from '../../services';

interface ImageEditableParams {
    code: string;
    description: string;
    altText: string;
}
@SeDowngradeComponent()
@Component({
    selector: 'se-media-upload-form',
    templateUrl: './MediaUploadFormComponent.html',
    styleUrls: ['./MediaUploadFormComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaUploadFormComponent implements OnChanges {
    @Input() image: File;
    @Output() onCancel: EventEmitter<void>;
    @Output() onSelect: EventEmitter<FileList>;
    @Output() onUploadSuccess: EventEmitter<string>;

    public acceptedFileTypes: string[];
    public isUploading: boolean;
    public fieldErrors: ErrorContext[];
    public imageParams: ImageEditableParams | null;

    private fileValidator: FileValidator;

    constructor(
        private cdr: ChangeDetectorRef,
        private fileValidatorFactory: FileValidatorFactory,
        private mediaBackendValidationHandler: MediaBackendValidationHandler,
        private mediaUploaderService: MediaUploaderService
    ) {
        this.onCancel = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onUploadSuccess = new EventEmitter();

        this.acceptedFileTypes = FILE_VALIDATION_CONFIG.ACCEPTED_FILE_TYPES;

        this.fieldErrors = [];
        this.imageParams = null;

        this.fileValidator = this.fileValidatorFactory.build([
            {
                subject: 'code',
                message: 'se.uploaded.image.code.is.required',
                validate: (code: string): boolean => !!code
            }
        ]);
    }

    ngOnChanges(changes: SimpleChanges): void {
        const imageChange = changes.image;
        if (imageChange) {
            const { name: imageName } = this.image;
            this.imageParams = {
                code: imageName,
                description: imageName,
                altText: imageName
            };
        }
    }

    public getErrorsForFieldByCode(code: keyof ImageEditableParams): string[] {
        return this.fieldErrors
            .filter((error) => error.subject === code)
            .map((error) => error.message);
    }

    public async uploadMedia(): Promise<void> {
        this.fieldErrors = [];
        if (!this.fileValidator.validate(this.imageParams, this.fieldErrors)) {
            return;
        }

        this.isUploading = true;
        try {
            const uploadedMedia = await this.mediaUploaderService.uploadMedia({
                file: this.image,
                code: stringUtils.escapeHtml(this.imageParams.code) as string,
                description: stringUtils.escapeHtml(this.imageParams.description) as string,
                altText: stringUtils.escapeHtml(this.imageParams.altText) as string
            });

            this.onMediaUploadSuccess(uploadedMedia);
        } catch (error) {
            this.onMediaUploadFail(error);
        } finally {
            this.isUploading = false;
        }
        this.cdr.detectChanges();
    }

    public cancel(): void {
        this.reset();

        this.onCancel.emit();
    }

    public onChangeFieldValue(value: string, paramName: keyof ImageEditableParams): void {
        this.imageParams[paramName] = value;
    }

    public onFileSelect(fileList: FileList): void {
        this.onSelect.emit(fileList);
    }

    private onMediaUploadSuccess({ uuid }: ICMSMedia): void {
        this.reset();

        this.onUploadSuccess.emit(uuid);
    }

    private onMediaUploadFail(response: ErrorResponse): void {
        this.mediaBackendValidationHandler.handleResponse(response, this.fieldErrors);
    }

    private reset(): void {
        this.imageParams = null;
        this.fieldErrors = [];
        this.isUploading = false;
    }
}
