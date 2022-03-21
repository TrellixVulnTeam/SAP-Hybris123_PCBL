import { EventEmitter, OnInit } from '@angular/core';
declare enum MediaFileSelectionMode {
    'replace' = "replace",
    'upload' = "upload"
}
export declare class MediaFileSelectorComponent implements OnInit {
    selectionMode?: MediaFileSelectionMode;
    labelI18nKey: string;
    acceptedFileTypes: string[];
    customClass?: string;
    disabled?: boolean;
    onFileSelect: EventEmitter<FileList>;
    ngOnInit(): void;
    buildAcceptedFileTypesList(): string;
    isReplaceMode(): boolean;
    onSelect(fileList: FileList): void;
}
export {};
