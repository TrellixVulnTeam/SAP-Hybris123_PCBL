/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { EmailComponent } from './EmailComponent';

@NgModule({
    imports: [CommonModule, TranslateModule.forChild(), FormsModule],
    declarations: [EmailComponent],
    entryComponents: [EmailComponent],
    exports: [EmailComponent]
})
export class EmailModule {}
