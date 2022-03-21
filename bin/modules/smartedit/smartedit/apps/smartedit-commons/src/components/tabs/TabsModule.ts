/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectModule, TranslationModule } from '@smart/utils';

import { CompileHtmlModule } from '../../directives/CompileHtmlModule';
import { TooltipModule } from '../tooltip/TooltipModule';
import { TabComponent } from './TabComponent';
import { TabsComponent } from './TabsComponent';

@NgModule({
    imports: [
        CommonModule,
        CompileHtmlModule,
        SelectModule,
        TooltipModule,
        TranslationModule.forChild()
    ],
    declarations: [TabsComponent, TabComponent],
    entryComponents: [TabsComponent, TabComponent],
    exports: [TabsComponent, TabComponent]
})
export class TabsModule {}
