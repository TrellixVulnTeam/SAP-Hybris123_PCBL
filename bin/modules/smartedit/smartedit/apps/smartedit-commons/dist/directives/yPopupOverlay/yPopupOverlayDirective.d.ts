/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
/// <reference types="angular-mocks" />
import * as angular from 'angular';
import { YPopupOverlayScope } from './yPopupEngineService';
import { YPopupOverlayUtilsClickOrderService } from './yPopupOverlayUtilsClickOrderService';
import { YPopupOverlayUtilsDOMCalculations } from './yPopupOverlayUtilsDOMCalculations';
/**
 * A string, representing the prefix of the generated UUID for each yPopupOverlay.
 * This uuid is added as an attribute to the overlay DOM element.
 */
export interface YPopupOverlaySize {
    width: number;
    height: number;
}
export declare const yPopupOverlayUuidPrefix = "ypo-uuid-_";
/**
 * A popup overlay configuration object that must contain either a template or a templateUrl.
 */
export interface YPopupDirectiveConfig {
    /**
     * Aligns the popup vertically relative to the anchor (element).
     */
    valign: 'bottom' | 'top';
    /**
     * Aligns the popup horizontally relative to the anchor (element).
     */
    halign: 'right' | 'left';
    template: string;
    templateUrl: string;
}
/**
 *
 * **Deprecated since 2005, use {@link PopupOverlayComponent}.**
 *
 * The yPopupOverlay is meant to be a directive that allows popups/overlays to be displayed attached to any element.
 * The element that the directive is applied to is called the anchor element. Once the popup is displayed, it is
 * positioned relative to the anchor, depending on the configuration provided.<br />
 * <br />
 * <h3>Scrolling Limitation</h3>
 * In this initial implementation, it appends the popup element to the body, and positions itself relative to body.
 * This means that it can handle default window/body scrolling, but if the anchor is contained within an inner
 * scrollable DOM element then the positions will not work correctly.
 *
 * ### Parameters
 *
 * `yPopupOverlay` - see {@link YPopupDirectiveConfig}.
 *
 * `yPopupOverlay.halign` - Default `'right'`.
 *
 * `yPopupOverlay.valign` - Default `'left'`.
 *
 * `yPopupOverlayTrigger` - see {@link YPopupOverlayTrigger}.
 *
 * `yPopupOverlayOnShow` - An angular expression executed whenever this overlay is displayed
 *
 * `yPopupOverlayOnHide` - An angular expression executed whenever this overlay is hidden
 *
 * @deprecated
 */
export declare class YPopupOverlayDirective {
    private $scope;
    private $element;
    private $compile;
    private $attrs;
    private $timeout;
    private yjQuery;
    private yPopupOverlayUtilsDOMCalculations;
    private yPopupOverlayUtilsClickOrderService;
    uuid: string;
    private popupElement;
    private popupSize;
    private popupDisplayed;
    private popupElementScope;
    private oldTrigger;
    private untrigger;
    private doCheckTrigger;
    private active;
    private yPopupOverlayTrigger;
    private yPopupOverlay;
    private yPopupOverlayOnShow;
    private yPopupOverlayOnHide;
    constructor($scope: YPopupOverlayScope, $element: JQuery<Element>, $compile: angular.ICompileService, $attrs: angular.IAttributes, $timeout: angular.ITimeoutService, yjQuery: JQueryStatic, yPopupOverlayUtilsDOMCalculations: YPopupOverlayUtilsDOMCalculations, yPopupOverlayUtilsClickOrderService: YPopupOverlayUtilsClickOrderService);
    $onInit(): void;
    $doCheck(): void;
    $onDestroy(): void;
    /**
     * Handles click event, triggered by the
     */
    onBodyElementClicked($event: Event): boolean;
    /**
     * Check if a this.yjQuery element contains a child element.
     * @param parentElement
     * @param childElement Click event target
     * @returns {boolean|*} True if parent contains child
     */
    private isChildOfElement;
    /**
     * Calculates the size of the popup content and stores it.
     * Returns true if the size has changed since the previous call.
     */
    private checkPopupSizeChanged;
    private updatePopupElementPositionAndSize;
    private togglePoppup;
    private getTemplateString;
    private hide;
    private show;
    private updateTriggers;
    private resetPopupSize;
}
