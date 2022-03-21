/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeDirective } from '../di';

@SeDirective({
    selector: '[include-replace]',
    require: 'ngInclude'
})
export class IncludeReplaceDirective {
    constructor(private $element: JQuery) {}

    $postLink(): void {
        this.$element.replaceWith(this.$element.children());
    }
}
