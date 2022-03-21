/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslationModule } from '@smart/utils';

import { CompileHtmlModule } from '../../directives';
import { SliderPanelComponent } from './SliderPanelComponent';
import { SliderPanelServiceFactory } from './SliderPanelServiceFactory';

@NgModule({
    imports: [CommonModule, TranslationModule.forChild(), CompileHtmlModule],
    declarations: [SliderPanelComponent],
    entryComponents: [SliderPanelComponent],
    providers: [SliderPanelServiceFactory],
    exports: [SliderPanelComponent]
})
export class SliderPanelModule {}
