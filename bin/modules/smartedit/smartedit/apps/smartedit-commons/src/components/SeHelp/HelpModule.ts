/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CompileHtmlModule } from '../../directives/CompileHtmlModule';
import { TooltipModule } from '../tooltip';
import { HelpComponent } from './HelpComponent';

@NgModule({
    imports: [CommonModule, TooltipModule, CompileHtmlModule],
    declarations: [HelpComponent],
    entryComponents: [HelpComponent],
    exports: [HelpComponent]
})
export class HelpModule {}
