/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import './CmsComponentsStyling.scss';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomDropdownPopulatorsToken, TranslationModule } from 'smarteditcommons';
import {
    SelectComponentTypeModalComponent,
    SubTypeSelectorComponent,
    CmsDropdownItemComponent
} from './cmsItemDropdown';
import {
    NestedComponentManagementService,
    CMSItemDropdownDropdownPopulator,
    SelectComponentTypeModalService
} from './cmsItemDropdown/services';
import { ComponentMenuModule } from './componentMenu';
import { ComponentRestrictionsEditorComponent, PageRestrictionsModule } from './restrictionEditor';

@NgModule({
    imports: [
        CommonModule,
        TranslationModule.forChild(),
        ComponentMenuModule,
        PageRestrictionsModule
    ],
    providers: [
        SelectComponentTypeModalService,
        NestedComponentManagementService,
        {
            provide: CustomDropdownPopulatorsToken,
            useClass: CMSItemDropdownDropdownPopulator,
            multi: true
        }
    ],
    declarations: [
        SubTypeSelectorComponent,
        SelectComponentTypeModalComponent,
        ComponentRestrictionsEditorComponent,
        CmsDropdownItemComponent
    ],
    entryComponents: [
        SubTypeSelectorComponent,
        SelectComponentTypeModalComponent,
        ComponentRestrictionsEditorComponent,
        CmsDropdownItemComponent
    ]
})
export class CmsComponentsModule {}
