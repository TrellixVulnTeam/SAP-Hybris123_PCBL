import { EventEmitter } from '@angular/core';
import { Media } from '../../../services';
export declare class MediaFormatUploadedComponent {
    media: Media;
    replaceLabelI18nKey: string;
    acceptedFileTypes: string[];
    isFieldDisabled: boolean;
    onFileSelect: EventEmitter<FileList>;
    onDelete: EventEmitter<void>;
    constructor();
    onFileSelectorFileSelect(file: FileList): void;
    onRemoveButtonClick(): void;
}
