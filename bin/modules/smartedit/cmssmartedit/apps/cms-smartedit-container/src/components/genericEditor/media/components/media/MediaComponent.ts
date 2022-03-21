/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import {
    ErrorContext,
    FILE_VALIDATION_CONFIG,
    FileValidationService,
    GenericEditorField,
    GenericEditorWidgetData,
    GENERIC_EDITOR_WIDGET_DATA,
    LogService,
    TypedMap
} from 'smarteditcommons';

/** Represents a container for Simple Banner Component media. */
@Component({
    selector: 'se-media',
    templateUrl: './MediaComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaComponent {
    public acceptedFileTypes: typeof FILE_VALIDATION_CONFIG.ACCEPTED_FILE_TYPES;
    public fileErrors: ErrorContext[];
    public image: File | null;
    public isFieldDisabled: boolean;
    public mediaSelectorId: string;

    private mediaIdByLang: TypedMap<string>;
    private lang: string;
    private field: GenericEditorField;

    constructor(
        private cdr: ChangeDetectorRef,
        private fileValidationService: FileValidationService,
        private logService: LogService,
        @Inject(GENERIC_EDITOR_WIDGET_DATA)
        data: GenericEditorWidgetData<TypedMap<string>>
    ) {
        ({ field: this.field, model: this.mediaIdByLang, qualifier: this.lang } = data);

        this.acceptedFileTypes = FILE_VALIDATION_CONFIG.ACCEPTED_FILE_TYPES;
        this.fileErrors = [];
        this.image = null;
        this.isFieldDisabled = data.isFieldDisabled();
        this.mediaSelectorId = this.field.qualifier;
    }

    public onMediaIdChange(id: string): void {
        this.mediaIdByLang[this.lang] = id;
    }

    public async onFileSelect(fileList: FileList): Promise<void> {
        this.resetImage();

        const file = fileList[0];
        try {
            await this.fileValidationService.validate(file, this.fileErrors);
            this.image = file;
        } catch {
            this.logService.warn('Invalid file');
        }
        this.cdr.detectChanges();
    }

    public onMediaUploaded(id: string): void {
        this.resetImage();

        this.onMediaIdChange(id);

        if (this.field.initiated) {
            this.field.initiated.length = 0;
        }
    }

    public resetImage(): void {
        this.fileErrors = [];
        this.image = null;
    }

    /** File Selector can be shown only if model exists but field is not set. */
    public canShowFileSelector(): boolean {
        return this.mediaIdByLang && !this.mediaIdByLang[this.lang] && !this.image;
    }
}
