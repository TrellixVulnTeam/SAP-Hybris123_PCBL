/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    CustomDropdownPopulatorsToken,
    TranslationModule,
    SelectModule,
    L10nPipeModule,
    GenericEditorDropdownModule
} from 'smarteditcommons';
import { CatalogModule } from './catalog/CatalogModule';
import { CmsLinkToSelectComponent } from './cmsLinkToSelect';
import {
    CategoryDropdownPopulator,
    CmsLinkComponentContentPageDropdownPopulator,
    ProductCatalogDropdownPopulator,
    ProductDropdownPopulator
} from './dropdownPopulators';

import {
    MissingPrimaryContentPageComponent,
    DuplicatePrimaryNonContentPageComponent,
    DuplicatePrimaryContentPageLabelComponent
} from './pageRestore';
import { RestrictionsListComponent } from './restrictionsList';
import { SlotSharedCloneActionFieldComponent } from './slotSharedCloneActionField/SlotSharedCloneActionFieldComponent';
import { SlotSharedSlotTypeFieldComponent } from './slotSharedSlotTypeField/SlotSharedSlotTypeFieldComponent';
import { WorkflowCreateVersionFieldComponent } from './workflowCreateVersionField/WorkflowCreateVersionFieldComponent';

@NgModule({
    imports: [
        TranslationModule.forChild(),
        FormsModule,
        CommonModule,
        L10nPipeModule,
        SelectModule,
        GenericEditorDropdownModule,
        CatalogModule
    ],
    providers: [
        {
            provide: CustomDropdownPopulatorsToken,
            useClass: ProductDropdownPopulator,
            multi: true
        },
        {
            provide: CustomDropdownPopulatorsToken,
            useClass: ProductCatalogDropdownPopulator,
            multi: true
        },
        {
            provide: CustomDropdownPopulatorsToken,
            useClass: CategoryDropdownPopulator,
            multi: true
        },
        {
            provide: CustomDropdownPopulatorsToken,
            useClass: CmsLinkComponentContentPageDropdownPopulator,
            multi: true
        }
    ],
    declarations: [
        WorkflowCreateVersionFieldComponent,
        MissingPrimaryContentPageComponent,
        DuplicatePrimaryNonContentPageComponent,
        DuplicatePrimaryContentPageLabelComponent,
        RestrictionsListComponent,
        SlotSharedCloneActionFieldComponent,
        SlotSharedSlotTypeFieldComponent,
        RestrictionsListComponent,
        CmsLinkToSelectComponent
    ],
    entryComponents: [
        WorkflowCreateVersionFieldComponent,
        MissingPrimaryContentPageComponent,
        DuplicatePrimaryNonContentPageComponent,
        DuplicatePrimaryContentPageLabelComponent,
        RestrictionsListComponent,
        SlotSharedCloneActionFieldComponent,
        SlotSharedSlotTypeFieldComponent,
        RestrictionsListComponent,
        CmsLinkToSelectComponent
    ],
    exports: [WorkflowCreateVersionFieldComponent, CatalogModule]
})
export class GenericEditorWidgetsModule {}
