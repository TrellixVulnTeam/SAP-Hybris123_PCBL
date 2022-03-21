/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SeDowngradeComponent } from 'smarteditcommons';
import { Media } from '../../../services';

@SeDowngradeComponent()
@Component({
    selector: 'se-media-format-uploaded',
    templateUrl: './MediaFormatUploadedComponent.html',
    styleUrls: ['../../../mediaPreviewContainer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaFormatUploadedComponent {
    @Input() media: Media;
    @Input() replaceLabelI18nKey: string;
    @Input() acceptedFileTypes: string[];
    @Input() isFieldDisabled: boolean;

    @Output() onFileSelect: EventEmitter<FileList>;
    @Output() onDelete: EventEmitter<void>;

    constructor() {
        this.onFileSelect = new EventEmitter();
        this.onDelete = new EventEmitter();
    }

    public onFileSelectorFileSelect(file: FileList): void {
        this.onFileSelect.emit(file);
    }

    public onRemoveButtonClick(): void {
        this.onDelete.emit();
    }
}
