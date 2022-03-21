/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslationModule } from '@smart/utils';

import { CompileHtmlModule } from '../../../directives';
import { FundamentalsModule } from '../../../FundamentalsModule';
import { DropdownMenuComponent } from './DropdownMenuComponent';
import { DropdownMenuItemComponent } from './DropdownMenuItemComponent';
import { DropdownMenuItemDefaultComponent } from './DropdownMenuItemDefaultComponent';

@NgModule({
    imports: [CommonModule, FundamentalsModule, CompileHtmlModule, TranslationModule.forChild()],
    declarations: [
        DropdownMenuComponent,
        DropdownMenuItemComponent,
        DropdownMenuItemDefaultComponent
    ],
    entryComponents: [DropdownMenuComponent, DropdownMenuItemDefaultComponent],
    exports: [DropdownMenuComponent]
})
export class DropdownMenuModule {}
