/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    FundamentalModalTemplateModule,
    LanguageDropdownModule,
    LoginDialogModule,
    SelectModule,
    TranslationModule
} from '@smart/utils';

import { CollapsibleContainerModule } from './components/collapsible';
import { DataTableModule } from './components/dataTable';
import { DropdownMenuModule } from './components/dropdown/dropdownMenu';
import { DynamicPagedListModule } from './components/dynamicPagedList';
import { InfiniteScrollingModule } from './components/infiniteScrolling/InfiniteScrollingModule';
import { EditableListModule } from './components/list';
import { MessageModule } from './components/message';
import { PaginationModule } from './components/pagination';
import { PopupOverlayModule } from './components/popupOverlay/PopupOverlayModule';
import { PreventVerticalOverflowModule } from './components/preventVerticalOverflow';
import { HelpModule } from './components/SeHelp';
import { SliderPanelModule } from './components/sliderPanel';
import { SpinnerModule } from './components/spinner';
import { TabsModule } from './components/tabs';
import { TooltipModule } from './components/tooltip';
import { NgTreeModule } from './components/treeModule/TreeModule';
import { WaitDialogComponent } from './components/WaitDialogComponent/WaitDialogComponent';
import { MoreTextModule } from './components/yMoreText';
import {
    CompileHtmlModule,
    HasOperationPermissionDirectiveModule,
    ResizeObserverModule
} from './directives';
import { FundamentalsModule } from './FundamentalsModule';
import { ReversePipeModule, StartFromPipeModule } from './pipes';

@NgModule({
    imports: [
        TranslationModule.forChild(),
        FundamentalsModule,
        CommonModule,
        FormsModule,
        SelectModule,
        LanguageDropdownModule,
        ReactiveFormsModule,
        CollapsibleContainerModule,
        CompileHtmlModule,
        MessageModule,
        NgTreeModule,
        HasOperationPermissionDirectiveModule,
        DropdownMenuModule,
        ResizeObserverModule,
        InfiniteScrollingModule,
        SpinnerModule,
        PopupOverlayModule,
        StartFromPipeModule,
        PaginationModule,
        TooltipModule,
        ReversePipeModule,
        EditableListModule,
        SliderPanelModule,
        LoginDialogModule,
        FundamentalModalTemplateModule,
        DynamicPagedListModule,
        DataTableModule,
        HelpModule,
        TabsModule,
        MoreTextModule,
        PreventVerticalOverflowModule
    ],
    declarations: [WaitDialogComponent],
    entryComponents: [WaitDialogComponent],
    exports: [
        WaitDialogComponent,
        SelectModule,
        LanguageDropdownModule,
        CompileHtmlModule,
        MessageModule,
        NgTreeModule,
        CollapsibleContainerModule,
        HasOperationPermissionDirectiveModule,
        DropdownMenuModule,
        PopupOverlayModule,
        ResizeObserverModule,
        InfiniteScrollingModule,
        StartFromPipeModule,
        PaginationModule,
        TooltipModule,
        ReversePipeModule,
        EditableListModule,
        SpinnerModule,
        SliderPanelModule,
        LoginDialogModule,
        FundamentalModalTemplateModule,
        DynamicPagedListModule,
        DataTableModule,
        HelpModule,
        TabsModule,
        MoreTextModule,
        PreventVerticalOverflowModule
    ]
})
export class SharedComponentsModule {}
