/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import {
    FILE_VALIDATION_CONFIG,
    GenericEditorFieldMessage,
    SeDowngradeComponent
} from 'smarteditcommons';
import { Media, MediaService } from '../../services';

const mediaSelectorI18nKeys = {
    UPLOAD: 'se.media.format.upload',
    REPLACE: 'se.media.format.replace',
    UNDER_EDIT: 'se.media.format.under.edit',
    REMOVE: 'se.media.format.remove'
};

@SeDowngradeComponent()
@Component({
    selector: 'se-media-format',
    templateUrl: './MediaFormatComponent.html',
    styleUrls: ['./MediaFormatComponent.scss', '../../mediaPreviewContainer.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MediaFormatComponent implements OnInit, OnChanges {
    @Input() errorMessages: GenericEditorFieldMessage[];
    @Input() isEditable: boolean;
    @Input() isUnderEdit: boolean;
    @Input() isFieldDisabled: boolean;
    @Input() mediaUuid: string | undefined;
    @Input() mediaFormat: string;

    @Output() onFileSelect: EventEmitter<FileList>;
    @Output() onDelete: EventEmitter<void>;

    public media: Media | null;
    public mediaFormatI18nKey: string;
    public mediaSelectorI18nKeys: typeof mediaSelectorI18nKeys;
    public acceptedFileTypes: typeof FILE_VALIDATION_CONFIG.ACCEPTED_FILE_TYPES;

    constructor(private mediaService: MediaService) {
        this.onFileSelect = new EventEmitter();
        this.onDelete = new EventEmitter();
        this.media = null;
        this.mediaSelectorI18nKeys = mediaSelectorI18nKeys;
        this.acceptedFileTypes = FILE_VALIDATION_CONFIG.ACCEPTED_FILE_TYPES;
    }

    async ngOnInit(): Promise<void> {
        this.mediaFormatI18nKey = `se.media.format.${this.mediaFormat}`;
        if (this.mediaUuid) {
            return this.fetchAndSetMedia();
        }
    }

    async ngOnChanges(changes: SimpleChanges): Promise<void> {
        const mediaUuidChange = changes.mediaUuid;

        // To prevent calling fetchAndSetMedia twice.
        // Skips the first change as the condition is checked in ngOnInit which is called after the ngOnChanges
        if (mediaUuidChange && !mediaUuidChange.firstChange) {
            if (this.mediaUuid) {
                // Media Image has been replaced
                return this.fetchAndSetMedia();
            } else {
                // Media Image has been removed
                this.media = null;
            }
        }
    }

    public onFileSelectorFileSelect(file: FileList): void {
        this.onFileSelect.emit(file);
    }

    public onRemoveButtonClick(): void {
        this.onDelete.emit();
    }

    public isMediaPreviewEnabled(): boolean {
        return this.mediaUuid && !this.isUnderEdit && !!this.media?.code;
    }

    public isMediaAbsent(): boolean {
        return !this.mediaUuid && !this.isUnderEdit;
    }

    public getErrors(): string[] {
        return (this.errorMessages || [])
            .filter((error) => error.format === this.mediaFormat)
            .map((error) => error.message);
    }

    private async fetchAndSetMedia(): Promise<void> {
        this.media = await this.mediaService.getMedia(this.mediaUuid);
    }
}
