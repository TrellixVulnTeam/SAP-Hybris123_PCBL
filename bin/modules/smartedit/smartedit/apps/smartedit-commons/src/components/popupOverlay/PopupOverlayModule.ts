/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopoverModule } from '@fundamental-ngx/core';

import { CompileHtmlModule } from '../../directives/CompileHtmlModule';
import { PopupOverlayComponent } from './PopupOverlayComponent';

@NgModule({
    imports: [CommonModule, PopoverModule, CompileHtmlModule],
    declarations: [PopupOverlayComponent],
    entryComponents: [PopupOverlayComponent],
    exports: [PopupOverlayComponent]
})
export class PopupOverlayModule {}
