import { AfterViewInit, OnDestroy } from '@angular/core';
import { PopoverComponent } from '@fundamental-ngx/core';
import { Placement } from 'popper.js';
import './TooltipComponent.scss';
/**
 * Used to display content in a popover after trigger is applied
 *
 * ### Example
 *
 *      <se-tooltip [triggers]="mouseover">
 *          <span se-tooltip-trigger>Hover me</span>
 *          <p se-tooltip-body>Content</p>
 *      </se-tooltip>
 */
export declare class TooltipComponent implements AfterViewInit, OnDestroy {
    /**
     * Array of strings defining what event triggers popover to appear.
     * Accepts any DOM {@link https://www.w3schools.com/jsref/dom_obj_event.asp events}.
     */
    triggers: string[];
    placement: Placement;
    title: string;
    appendTo: HTMLElement | 'body';
    isChevronVisible: boolean;
    /** Additional css classes applied to fd-popover element. */
    additionalClasses: string[];
    popover: PopoverComponent;
    private popoverIsOpenChangeSubscription;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
