/// <reference types="angular-mocks" />
/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
import * as angular from 'angular';
import * as popper from 'popper.js';
export declare enum YPopoverTrigger {
    Hover = "hover",
    Click = "click",
    Focus = "focus",
    OutsideClick = "outsideClick",
    None = "none"
}
export declare enum YPopoverOnClickOutside {
    Close = "close",
    None = "none"
}
export interface YPopoverConfig {
    /** The placement of the popup, see {@link https://popper.js.org/popper-documentation.html#Popper.Defaults.placement options}. */
    placement: popper.Placement;
    /** For the trigger, see {@link yPopupOverlayModule.service:yPopupEngine#setTrigger setTrigger} method for the available triggers. */
    trigger: YPopoverTrigger;
    /** The parent element that contains the popup. It can be a CSS selector or a HTMLElement. */
    container: string | HTMLElement;
    /** Called when the popup is created. */
    onShow: () => void;
    /** Called when the popup is hidden. */
    onHide: () => void;
    /** Called when a change occurs on the popup's position or creation. */
    onChanges: (element: HTMLElement, data: popper.Data) => void;
    /** Setting to none will not affect the popup when the user clicks outside of the element. */
    onClickOutside?: YPopoverOnClickOutside.Close;
    /** Modifiers provided by the popper library, see the {@link https://popper.js.org/popper-documentation.html#Popper.Defaults.modifiers popper} documentation. */
    modifiers?: popper.Modifiers;
}
export interface YPopoverScope extends angular.IScope {
    template: string;
    placement: popper.Placement;
    title: string;
}
/**
 * This directive attaches a customizable popover on a DOM element.
 *
 * ### Parameters
 *
 * `template` - the HTML body to be used in the popover body, it will automatically be trusted by the directive. Optional but exactly one of either template or templateUrl must be defined.
 *
 * `templateUrl` - the location of the HTML template to be used in the popover body. Optional but exactly one of either template or templateUrl must be defined.
 *
 * `title` - the title to be used in the popover title section. Optional.
 *
 * `placement` - the placement of the popover around the target element. Possible values are <b>top, left, right, bottom</b>, as well as any
 * concatenation of them with the following format: placement1-placement2 such as bottom-right. Optional, default value is top.
 *
 * `trigger` - the event type that will trigger the popover. Possibles values are <b>hover, click, outsideClick, none</b>. Optional, default value is 'click'.
 */
export declare class YPopoverDirective {
    private $scope;
    private $timeout;
    private $element;
    private yjQuery;
    private $templateCache;
    private yPopupEngineService;
    private $transclude;
    title?: string;
    template: string;
    placement?: popper.Placement;
    private transcludedContent;
    private transclusionScope;
    private engine;
    private config;
    private templateUrl?;
    private trigger?;
    private isOpen?;
    private previousIsOpen;
    constructor($scope: YPopoverScope, $timeout: angular.ITimeoutService, $element: JQuery<Element>, yjQuery: JQueryStatic, $templateCache: angular.ITemplateCacheService, yPopupEngineService: any, $transclude: angular.ITranscludeFunction);
    $onInit(): void;
    $doCheck(): void;
    $onChanges(): void;
    $onDestroy(): void;
    getTemplate(): string;
}
