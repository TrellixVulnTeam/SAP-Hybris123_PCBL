/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    InfiniteScrollingModule,
    MoreTextModule,
    PopupOverlayModule,
    TooltipModule,
    TranslationModule
} from 'smarteditcommons';

import {
    PageVersionMenuComponent,
    VersionsSearchComponent,
    VersionItemContextComponent,
    VersionItemComponent,
    VersionItemMenuComponent,
    VersionsPanelComponent
} from './components';
import {
    ManagePageVersionService,
    PageVersioningService,
    PageVersionSelectionService,
    RollbackPageVersionService
} from './services';

@NgModule({
    imports: [
        TranslationModule.forChild(),
        CommonModule,
        FormsModule,
        TooltipModule,
        PopupOverlayModule,
        MoreTextModule,
        InfiniteScrollingModule
    ],
    declarations: [
        VersionItemContextComponent,
        VersionItemMenuComponent,
        VersionItemComponent,
        VersionsSearchComponent,
        VersionsPanelComponent,
        PageVersionMenuComponent
    ],
    entryComponents: [PageVersionMenuComponent, VersionItemContextComponent],
    providers: [
        PageVersioningService,
        PageVersionSelectionService,
        ManagePageVersionService,
        RollbackPageVersionService
    ]
})
export class VersioningModule {}
