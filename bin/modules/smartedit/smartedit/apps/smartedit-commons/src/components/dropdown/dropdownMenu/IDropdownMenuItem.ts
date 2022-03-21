/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Type } from '@angular/core';

/**
 * Describes Dropdown Menu Item for {@link DropdownMenuComponent}.
 */
export interface IDropdownMenuItem {
    /**
     * i18n.
     */
    key?: string;
    /**
     * Icon css class.
     */
    icon?: string;
    /**
     * **Deprecated since 2005, use {@link IDropdownMenuItem#component}.**
     *
     * HTML string that will be rendered.
     *
     * Either one of callback, template, templateUrl or component must be present.
     *
     * @deprecated
     */
    template?: string;
    /**
     * **Deprecated since 2005, use {@link IDropdownMenuItem#component}.**
     *
     * Same as template but instead of passing a string, pass an URL to an HTML file.
     *
     * Either one of callback, template, templateUrl or component must be present.
     *
     * @deprecated
     */
    templateUrl?: string;
    /**
     * Component that will be rendered.
     *
     * Either one of callback, template, templateUrl or component must be present.
     */
    component?: Type<any>;
    /**
     * Custom css class that is appended to the dropdown item
     */
    customCss?: string;
    /**
     * When provided, the Item will be rendered by default component ({@link DropdownMenuItemDefaultComponent}).
     *
     * This function will be called with two arguments when the item is clicked.
     * The first one is [selectedItem]{@link DropdownMenuComponent#selectedItem}, the second one is the clicked item itself.
     *
     * Either one of callback, template, templateUrl or component must be present.
     */
    callback?(...args: any[]): void;
    /**
     * Predicate for displaying the Item.
     */
    condition?(...args: any[]): boolean;
}
