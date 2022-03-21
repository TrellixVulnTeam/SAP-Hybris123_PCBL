/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { TypePermissionsRestService } from 'cmscommons';
import { isEmpty } from 'lodash';
import {
    ErrorContext,
    FileValidationService,
    GenericEditorField,
    GenericEditorWidgetData,
    GENERIC_EDITOR_WIDGET_DATA,
    IGenericEditor,
    LogService,
    SeDowngradeComponent,
    TypedMap
} from 'smarteditcommons';
import { LoadConfigManagerService } from 'smarteditcontainer';

const MediaContainerClonePrefix = 'clone_';
export interface MediaContainer {
    catalogVersion: string;
    /** Map of Media Format with its uploaded file uuid. */
    medias: { [index in MediaFormatType]: string } | unknown;
    /** Responsive Media Name. */
    qualifier: string;
    mediaContainerUuid: string;
}

export enum MediaFormatType {
    widescreen = 'widescreen',
    desktop = 'desktop',
    tablet = 'tablet',
    mobile = 'mobile'
}

/** Represents a container of pre-defined screen types for which Media can be uploaded.  */
@SeDowngradeComponent()
@Component({
    selector: 'se-media-container',
    templateUrl: './MediaContainerComponent.html'
})
export class MediaContainerComponent implements OnInit {
    /** Selected Image to be uploaded or replaced. */
    public image: {
        file: File;
        format: MediaFormatType;
    };
    /** Advanced Media Container Managmenet enables the user to create a pre-defined Media Container that can be later selected from the dropdown. */
    public advancedMediaContainerManagementEnabled: boolean;
    public hasReadPermissionOnMediaRelatedTypes: boolean;
    public mediaContainerCreationInProgress: boolean;
    /** Used by MediaContainerSelector as unique id for system event.  */
    public selectorEventNameAffix: string;
    public fileValidationErrors: ErrorContext[];
    public initialMediaContainerName: string;

    public field: GenericEditorField;
    public model: TypedMap<MediaContainer | undefined>;
    public lang: string;
    public isFieldDisabled: () => boolean;

    private editor: IGenericEditor;

    constructor(
        private logService: LogService,
        private typePermissionsRestService: TypePermissionsRestService,
        private loadConfigManagerService: LoadConfigManagerService,
        private fileValidationService: FileValidationService,
        @Inject(GENERIC_EDITOR_WIDGET_DATA)
        data: GenericEditorWidgetData<TypedMap<MediaContainer>>
    ) {
        ({
            field: this.field,
            model: this.model,
            editor: this.editor,
            qualifier: this.lang,
            isFieldDisabled: this.isFieldDisabled
        } = data);

        this.selectorEventNameAffix = `${this.field.qualifier}_${this.lang}`;
    }

    async ngOnInit(): Promise<void> {
        if (!this.model[this.lang]) {
            this.setMediaContainer({
                catalogVersion: undefined,
                medias: {},
                qualifier: undefined,
                mediaContainerUuid: undefined
            });
        }

        await this.initHasReadPermissionOnMediaRelatedTypes();

        await this.initAdvancedMediaContainerManagementEnabled();

        // Set default value for Responsive Media Name when cloning a Page in Advanced Edit
        this.initialMediaContainerName = this.getMediaContainerName();
        if (this.isAdvancedCloning()) {
            const cloneMediaName = `${MediaContainerClonePrefix}${this.initialMediaContainerName.trim()}`;
            this.onMediaContainerNameChange(cloneMediaName);
        }
    }

    public getMediaContainerName(): string {
        return this.model[this.lang]?.qualifier || '';
    }

    public getMediaContainerCellClassName(format: MediaFormatType): string {
        return `se-media-container-cell--${format}`;
    }

    public setMediaContainer(mediaContainer: MediaContainer): void {
        this.model[this.lang] = mediaContainer;
    }

    public canShowMediaFormatWithUploadForm(): boolean {
        return (
            this.hasReadPermissionOnMediaRelatedTypes &&
            (this.isMediaContainerSelected() ||
                this.mediaContainerCreationInProgress ||
                !this.advancedMediaContainerManagementEnabled)
        );
    }

    public isMediaFormatUnderEdit(format: MediaFormatType): boolean {
        // optional because image is not always selected hence it might be null
        return format === this.image?.format;
    }

    /**
     * Format is set when you select a file by "Replace" button.
     * Format is not set when you select a file in Upload Form.
     */
    public async onFileSelect(files: FileList, format?: MediaFormatType): Promise<void> {
        this.resetImage();

        try {
            const file = files[0];
            await this.fileValidationService.validate(file, this.fileValidationErrors);

            const imageFormat = this.image?.format || format;
            this.image = {
                file,
                format: imageFormat
            };
        } catch {
            this.logService.warn('Invalid file');
        }
    }

    public onFileUploadSuccess(uuid: string, format: MediaFormatType): void {
        this.setMediaUuidForFormat(uuid, format);

        this.resetImage();
    }

    public onMediaContainerCreate(name: string): void {
        this.clearModel();

        this.onMediaContainerNameChange(name);

        this.model[this.lang].medias = {};
    }

    public onMediaContainerRemove(): void {
        this.clearModel();
    }

    public onMediaContainerNameChange(name: string): void {
        this.model[this.lang].qualifier = name;
    }

    public onMediaContainerCreationInProgressChange(inProgress: boolean): void {
        this.mediaContainerCreationInProgress = inProgress;
    }

    public removeMediaByFormat(format: MediaFormatType): void {
        delete this.model[this.lang].medias[format];
    }

    private async initAdvancedMediaContainerManagementEnabled(): Promise<void> {
        const configurations = await this.loadConfigManagerService.loadAsObject();
        this.advancedMediaContainerManagementEnabled =
            (configurations.advancedMediaContainerManagement as boolean) || false;
    }

    private async initHasReadPermissionOnMediaRelatedTypes(): Promise<void> {
        try {
            const permissionsResult = await this.typePermissionsRestService.hasAllPermissionsForTypes(
                this.field.containedTypes
            );
            this.hasReadPermissionOnMediaRelatedTypes = this.field.containedTypes.every(
                (type) => permissionsResult[type].read
            );
        } catch (error) {
            this.hasReadPermissionOnMediaRelatedTypes = false;
            this.logService.warn('Failed to retrieve type permissions', error);
        }
    }

    private setMediaUuidForFormat(uuid: string, format: MediaFormatType): void {
        this.model[this.lang].medias[format] = uuid;
    }

    /**
     * Returns whether if cloning is in progress in advanced media management mode.
     */
    private isAdvancedCloning(): boolean {
        const isCloning = !!this.editor.initialContent.cloneComponent;
        return isCloning && this.advancedMediaContainerManagementEnabled;
    }

    /**
     * Verifies whether the media container is populated.
     */
    private isMediaContainerSelected(): boolean {
        return !isEmpty(this.model[this.lang]);
    }

    private resetImage(): void {
        this.fileValidationErrors = [];
        this.image = null;
    }

    /**
     * Removes all attributes from the model object. Allows to preserve the same reference to the object.
     */
    private clearModel(): void {
        Object.keys(this.model[this.lang]).forEach((key) => delete this.model[this.lang][key]);
    }
}
