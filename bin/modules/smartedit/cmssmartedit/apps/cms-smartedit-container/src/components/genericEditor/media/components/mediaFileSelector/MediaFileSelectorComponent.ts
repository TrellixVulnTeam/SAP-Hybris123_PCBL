/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { SeDowngradeComponent } from 'smarteditcommons';

enum MediaFileSelectionMode {
    'replace' = 'replace',
    'upload' = 'upload'
}

@SeDowngradeComponent()
@Component({
    selector: 'se-media-file-selector',
    templateUrl: './MediaFileSelectorComponent.html',
    styleUrls: ['./MediaFileSelectorComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaFileSelectorComponent implements OnInit {
    @Input() selectionMode?: MediaFileSelectionMode;
    @Input() labelI18nKey: string;
    @Input() acceptedFileTypes: string[];
    @Input() customClass?: string;
    @Input() disabled?: boolean;
    @Output() onFileSelect: EventEmitter<FileList> = new EventEmitter();

    ngOnInit(): void {
        this.disabled = this.disabled || false;
        this.customClass = this.customClass || '';
        this.selectionMode = this.selectionMode || MediaFileSelectionMode.replace;
    }

    public buildAcceptedFileTypesList(): string {
        return this.acceptedFileTypes.map((fileType) => `.${fileType}`).join(',');
    }

    public isReplaceMode(): boolean {
        return this.selectionMode === MediaFileSelectionMode.replace;
    }

    public onSelect(fileList: FileList): void {
        this.onFileSelect.emit(fileList);
    }
}
