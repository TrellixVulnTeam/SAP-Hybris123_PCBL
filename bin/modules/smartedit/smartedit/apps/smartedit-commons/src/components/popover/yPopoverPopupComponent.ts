/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import Popper from 'popper.js';
import { SeComponent } from '../../di';

/**
 * Internal component for the yPopover to hold the bindings for the template, placement, and title.
 */
@SeComponent({
    selector: 'y-popover-popup',
    templateUrl: 'yPopoverPopupTemplate.html',
    inputs: ['title:?', 'template:?', 'placement:?']
})
export class YPopoverPopupComponent {
    public title?: string;
    public template?: string;
    public placement?: Popper.Placement;
}
