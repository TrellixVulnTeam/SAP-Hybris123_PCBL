/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    ButtonModule,
    FormModule as FundamentalFormModule,
    MenuModule,
    PopoverModule,
    SelectModule as FundamentalSelectModule
} from '@fundamental-ngx/core';
import { ListKeyboardControlModule, TranslationModule } from '@smart/utils';

import { CompileHtmlModule } from '../../directives/CompileHtmlModule';
import { L10nPipeModule } from '../../pipes';
import { InfiniteScrollingModule } from '../infiniteScrolling';
import { ActionableSearchItemComponent } from './actionableSearchItem';
import { DefaultItemPrinterComponent } from './defaultItemPrinter/DefaultItemPrinterComponent';
import { ItemPrinterComponent } from './itemPrinter/ItemPrinterComponent';
import { ResultsHeaderComponent } from './resultsHeader/ResultsHeaderComponent';
import { SearchInputComponent } from './searchInput/SearchInputComponent';
import { SelectComponent } from './SelectComponent';
import { SelectListComponent } from './selectList/SelectListComponent';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DragDropModule,
        PopoverModule,
        ButtonModule,
        MenuModule,
        FundamentalSelectModule,
        FundamentalFormModule,
        InfiniteScrollingModule,
        CompileHtmlModule,
        L10nPipeModule,
        ListKeyboardControlModule,
        TranslationModule.forChild()
    ],
    declarations: [
        SelectComponent,
        DefaultItemPrinterComponent,
        ItemPrinterComponent,
        ActionableSearchItemComponent,
        SelectListComponent,
        SearchInputComponent,
        ResultsHeaderComponent
    ],
    entryComponents: [
        SelectComponent,
        DefaultItemPrinterComponent,
        ItemPrinterComponent,
        ActionableSearchItemComponent,
        SelectListComponent,
        SearchInputComponent,
        ResultsHeaderComponent
    ],
    exports: [SelectComponent]
})
export class SelectModule {}
