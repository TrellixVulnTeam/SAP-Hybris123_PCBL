/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeDirective } from 'smarteditcommons';

@SeDirective({
    selector: 'html'
})
export class HtmlDirective {
    constructor(private $element: JQuery) {}

    $postLink(): void {
        this.$element.addClass('smartedit-html-container');
    }
}
