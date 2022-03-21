import { InjectionToken, Type } from '@angular/core';
import { CompileHtmlNgController } from '../../directives/CompileHtml';
/**
 * Configuration object passed by input binding to {@link PopupOverlayComponent}.
 */
export interface PopupOverlayConfig {
    /**
     * Vertical align modifier. Relative to the anchor (element).
     */
    valign?: 'bottom' | 'top';
    /**
     * Horizontal align modifier. Relative to the anchor (element).
     */
    halign?: 'right' | 'left';
    /**
     * **Deprecated since 2005, use [component]{@link PopupOverlayConfig#component}.**
     *
     * An AngularJS template rendered within overlay.
     *
     * @deprecated
     */
    template?: string;
    /**
     * **Deprecated since 2005, use [component]{@link PopupOverlayConfig#component}.**
     *
     * An AngularJS template Url to render the template within overlay.
     *
     * @deprecated
     */
    templateUrl?: string;
    /**
     * **Deprecated since 2005, use [component]{@link PopupOverlayConfig#component}.**
     *
     * An AngularJS controller of the rendered template.
     *
     * @deprecated
     */
    legacyController?: CompileHtmlNgController;
    /**
     * An Angular component rendered within the overlay.
     */
    component?: Type<any>;
}
export declare const POPUP_OVERLAY_DATA: InjectionToken<unknown>;
