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
 *  Compiles the template provided by the templateUrl and scope.
 */
@Directive({ selector: '[ngInclude]' })
export class NgIncludeDirective extends CompileHtml implements OnChanges {
    /** Template URL to be compiled by directive e.g. `MyComponentTemplate.html` */
    @Input() ngInclude: string;

    /** Data to be consumed by AngularJS template */
    @Input() scope: TypedMap<any>;
    @Input() compileHtmlNgController: CompileHtmlNgController;

    constructor(elementRef: ElementRef, renderer: Renderer2, upgrade: UpgradeModule) {
        super(elementRef, renderer, upgrade);
    }

    ngOnChanges(changes: SimpleChanges): void {
        changes.template = changes.ngInclude;
        super.ngOnChanges(changes);
    }
}
