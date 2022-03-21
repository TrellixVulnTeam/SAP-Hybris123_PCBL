/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import './HelpComponent.scss';
import { Component, Input } from '@angular/core';

import { SeDowngradeComponent } from '../../di';

/**
 * This component represents a help button that will show a customizable popover on top of it when hovering.
 *
 * Either one of the template, templateUrl or Content Projection can be used to render the popover body.
 *
 *  ### Example using Content Projection
 *
 *      <se-help title="Title">
 *          <span>Some help text</span>
 *      </se-help>
 */
@SeDowngradeComponent()
@Component({
    selector: 'se-help',
    templateUrl: './HelpComponent.html'
})
export class HelpComponent {
    @Input() title: string;
    /**
     * **Deprecated since 2005, use Content Projection.**
     */
    @Input() template: string;
    /**
     * **Deprecated since 2005, use Content Projection.**
     */
    @Input() templateUrl: string;
}
