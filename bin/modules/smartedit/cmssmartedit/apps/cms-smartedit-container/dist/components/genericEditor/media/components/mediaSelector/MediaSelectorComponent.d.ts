import { EventEmitter, OnInit } from '@angular/core';
import { FetchStrategy } from 'smarteditcommons';
import { Media, MediaService } from '../../services';
import { MediaPrinterComponent } from './mediaPrinter';
export declare class MediaSelectorComponent implements OnInit {
    private mediaService;
    id: string;
    mediaId: string;
    mediaIdChange: EventEmitter<string>;
    isDisabled: boolean;
    fetchStrategy: FetchStrategy<Media>;
    mediaPrinterComponent: typeof MediaPrinterComponent;
    constructor(mediaService: MediaService);
    ngOnInit(): void;
    onMediaIdChange(id: string): void;
}
