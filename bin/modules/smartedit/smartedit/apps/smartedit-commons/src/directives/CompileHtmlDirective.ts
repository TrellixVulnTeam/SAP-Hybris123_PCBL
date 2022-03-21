/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { TypedMap } from '@smart/utils';
import { CompileHtml, CompileHtmlNgController } from './CompileHtml';

/**
 *  Used as support for legacy AngularJS templates in Angular components.
 *
 *  Compiles the template provided by the HTML Template string and scope.
 */
@Directive({ selector: '[seCompileHtml]' })
export class CompileHtmlDirective extends CompileHtml implements OnChanges {
    /** HTML Template string to be compiled by directive e.g. `<div>some text</div>` */
    @Input() seCompileHtml: string;
    /** Data to be consumed by AngularJS template. */
    @Input() scope: TypedMap<any>;
    @Input() compileHtmlNgController: CompileHtmlNgController;

    constructor(elementRef: ElementRef, renderer: Renderer2, upgrade: UpgradeModule) {
        super(elementRef, renderer, upgrade);
    }

    ngOnChanges(changes: SimpleChanges): void {
        changes.template = changes.seCompileHtml;
        super.ngOnChanges(changes);
    }
}
