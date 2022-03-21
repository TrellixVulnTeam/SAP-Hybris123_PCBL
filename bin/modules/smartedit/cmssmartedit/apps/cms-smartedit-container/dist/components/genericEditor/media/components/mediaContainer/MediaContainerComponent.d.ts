import { OnInit } from '@angular/core';
import { TypePermissionsRestService } from 'cmscommons';
import { ErrorContext, FileValidationService, GenericEditorField, GenericEditorWidgetData, LogService, TypedMap } from 'smarteditcommons';
import { LoadConfigManagerService } from 'smarteditcontainer';
export interface MediaContainer {
    catalogVersion: string;
    medias: {
        [index in MediaFormatType]: string;
    } | unknown;
    qualifier: string;
    mediaContainerUuid: string;
}
export declare enum MediaFormatType {
    widescreen = "widescreen",
    desktop = "desktop",
    tablet = "tablet",
    mobile = "mobile"
}
export declare class MediaContainerComponent implements OnInit {
    private logService;
    private typePermissionsRestService;
    private loadConfigManagerService;
    private fileValidationService;
    image: {
        file: File;
        format: MediaFormatType;
    };
    advancedMediaContainerManagementEnabled: boolean;
    hasReadPermissionOnMediaRelatedTypes: boolean;
    mediaContainerCreationInProgress: boolean;
    selectorEventNameAffix: string;
    fileValidationErrors: ErrorContext[];
    initialMediaContainerName: string;
    field: GenericEditorField;
    model: TypedMap<MediaContainer | undefined>;
    lang: string;
    isFieldDisabled: () => boolean;
    private editor;
    constructor(logService: LogService, typePermissionsRestService: TypePermissionsRestService, loadConfigManagerService: LoadConfigManagerService, fileValidationService: FileValidationService, data: GenericEditorWidgetData<TypedMap<MediaContainer>>);
    ngOnInit(): Promise<void>;
    getMediaContainerName(): string;
    getMediaContainerCellClassName(format: MediaFormatType): string;
    setMediaContainer(mediaContainer: MediaContainer): void;
    canShowMediaFormatWithUploadForm(): boolean;
    isMediaFormatUnderEdit(format: MediaFormatType): boolean;
    onFileSelect(files: FileList, format?: MediaFormatType): Promise<void>;
    onFileUploadSuccess(uuid: string, format: MediaFormatType): void;
    onMediaContainerCreate(name: string): void;
    onMediaContainerRemove(): void;
    onMediaContainerNameChange(name: string): void;
    onMediaContainerCreationInProgressChange(inProgress: boolean): void;
    removeMediaByFormat(format: MediaFormatType): void;
    private initAdvancedMediaContainerManagementEnabled;
    private initHasReadPermissionOnMediaRelatedTypes;
    private setMediaUuidForFormat;
    private isAdvancedCloning;
    private isMediaContainerSelected;
    private resetImage;
    private clearModel;
}
