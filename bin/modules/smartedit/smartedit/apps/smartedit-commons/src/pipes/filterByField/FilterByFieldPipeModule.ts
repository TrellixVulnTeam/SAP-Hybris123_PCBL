/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';

import { FilterByFieldPipe } from './FilterByFieldPipe';

@NgModule({
    declarations: [FilterByFieldPipe],
    exports: [FilterByFieldPipe]
})
export class FilterByFieldPipeModule {}
