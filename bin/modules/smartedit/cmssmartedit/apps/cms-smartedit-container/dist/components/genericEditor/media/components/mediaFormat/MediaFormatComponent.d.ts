import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FILE_VALIDATION_CONFIG, GenericEditorFieldMessage } from 'smarteditcommons';
import { Media, MediaService } from '../../services';
declare const mediaSelectorI18nKeys: {
    UPLOAD: string;
    REPLACE: string;
    UNDER_EDIT: string;
    REMOVE: string;
};
export declare class MediaFormatComponent implements OnInit, OnChanges {
    private mediaService;
    errorMessages: GenericEditorFieldMessage[];
    isEditable: boolean;
    isUnderEdit: boolean;
    isFieldDisabled: boolean;
    mediaUuid: string | undefined;
    mediaFormat: string;
    onFileSelect: EventEmitter<FileList>;
    onDelete: EventEmitter<void>;
    media: Media | null;
    mediaFormatI18nKey: string;
    mediaSelectorI18nKeys: typeof mediaSelectorI18nKeys;
    acceptedFileTypes: typeof FILE_VALIDATION_CONFIG.ACCEPTED_FILE_TYPES;
    constructor(mediaService: MediaService);
    ngOnInit(): Promise<void>;
    ngOnChanges(changes: SimpleChanges): Promise<void>;
    onFileSelectorFileSelect(file: FileList): void;
    onRemoveButtonClick(): void;
    isMediaPreviewEnabled(): boolean;
    isMediaAbsent(): boolean;
    getErrors(): string[];
    private fetchAndSetMedia;
}
export {};
