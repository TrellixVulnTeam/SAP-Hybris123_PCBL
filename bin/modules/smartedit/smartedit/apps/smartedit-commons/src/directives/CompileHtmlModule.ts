/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';

import { CompileHtmlDirective } from './CompileHtmlDirective';
import { NgIncludeDirective } from './NgIncludeDirective';

@NgModule({
    declarations: [NgIncludeDirective, CompileHtmlDirective],
    exports: [NgIncludeDirective, CompileHtmlDirective]
})
export class CompileHtmlModule {}
