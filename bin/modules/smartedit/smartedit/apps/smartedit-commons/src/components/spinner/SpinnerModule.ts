/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpinnerComponent } from './SpinnerComponent';

@NgModule({
    imports: [CommonModule],
    declarations: [SpinnerComponent],
    entryComponents: [SpinnerComponent],
    exports: [SpinnerComponent]
})
export class SpinnerModule {}
