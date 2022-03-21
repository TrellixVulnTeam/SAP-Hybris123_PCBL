/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
    DropdownMenuModule,
    L10nPipeModule,
    SelectModule,
    SliderPanelModule
} from 'smarteditcommons';
import {
    ProductNodeComponent,
    CategoryNodeComponent,
    ProductSelectorItemComponent,
    CategorySelectorItemComponent
} from '../../legacyGenericEditor/catalog';
import { ItemSelectorPanelComponent } from './components/itemSelectorPanel';
import { CatalogInformationService } from './services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DropdownMenuModule,
        SliderPanelModule,
        SelectModule,
        TranslateModule.forChild(),
        L10nPipeModule
    ],
    providers: [CatalogInformationService],
    declarations: [
        ItemSelectorPanelComponent,
        ProductNodeComponent,
        CategoryNodeComponent,
        ProductSelectorItemComponent,
        CategorySelectorItemComponent
    ],
    entryComponents: [
        ItemSelectorPanelComponent,
        ProductNodeComponent,
        CategoryNodeComponent,
        ProductSelectorItemComponent,
        CategorySelectorItemComponent
    ]
})
export class CatalogModule {}
