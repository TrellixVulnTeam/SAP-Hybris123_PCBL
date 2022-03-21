/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    GenericEditorDropdownModule,
    SelectModule,
    SpinnerModule,
    TooltipModule,
    TranslationModule
} from 'smarteditcommons';
import {
    MediaPreviewComponent,
    MediaAdvancedPropertiesComponent,
    MediaErrorsComponent,
    MediaFileSelectorComponent,
    MediaSelectorComponent,
    MediaPrinterComponent,
    MediaActionLabelComponent,
    MediaRemoveButtonComponent,
    MediaFormatComponent,
    MediaFormatUploadedComponent,
    MediaUploadFormComponent,
    MediaUploadFieldComponent,
    MediaComponent,
    MediaContainerComponent,
    MediaContainerSelectorItemComponent,
    MediaContainerSelectorComponent
} from './components';

import { MediaBackendValidationHandler, MediaService, MediaUploaderService } from './services';

import './media.scss';

@NgModule({
    imports: [
        TranslationModule.forChild(),
        CommonModule,
        FormsModule,
        TooltipModule,
        SelectModule,
        SpinnerModule,
        GenericEditorDropdownModule
    ],
    providers: [MediaService, MediaUploaderService, MediaBackendValidationHandler],
    declarations: [
        MediaErrorsComponent,
        MediaFileSelectorComponent,
        MediaPreviewComponent,
        MediaAdvancedPropertiesComponent,
        MediaSelectorComponent,
        MediaPrinterComponent,
        MediaActionLabelComponent,
        MediaRemoveButtonComponent,
        MediaFormatComponent,
        MediaFormatUploadedComponent,
        MediaUploadFormComponent,
        MediaUploadFieldComponent,
        MediaComponent,
        MediaContainerComponent,
        MediaContainerSelectorComponent,
        MediaContainerSelectorItemComponent
    ],
    entryComponents: [
        MediaErrorsComponent,
        MediaFileSelectorComponent,
        MediaPreviewComponent,
        MediaAdvancedPropertiesComponent,
        MediaSelectorComponent,
        MediaPrinterComponent,
        MediaActionLabelComponent,
        MediaRemoveButtonComponent,
        MediaFormatComponent,
        MediaFormatUploadedComponent,
        MediaUploadFormComponent,
        MediaUploadFieldComponent,
        MediaComponent,
        MediaContainerComponent,
        MediaContainerSelectorItemComponent
    ]
})
export class MediaModule {}
