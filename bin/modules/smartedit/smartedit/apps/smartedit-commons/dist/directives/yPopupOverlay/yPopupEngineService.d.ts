/// <reference types="angular-mocks" />
import * as angular from 'angular';
import Popper from 'popper.js';
import { YPopoverConfig, YPopoverOnClickOutside, YPopoverTrigger } from '../../components/popover/yPopoverDirective';
export interface YPopupOverlayScope extends angular.IScope {
    closePopupOverlay: () => void;
}
/**
 * Controls when the overlay is displayed.
 * If yPopupOverlayTrigger is `true`, the overlay is displayed, if false (or something other then true or click) then the overlay is hidden.
 * If yPopupOverlayTrigger is `click` then the overlay is displayed when the anchor (element) is clicked on.
 */
export declare type YPopupOverlayTrigger = YPopoverTrigger | string | boolean;
export interface YPopupEngineConfig {
    onCreate: (conf: Popper.Data) => void;
    onUpdate: (conf: Popper.Data) => void;
    placement: Popper.Placement;
    modifiers: Popper.Modifiers;
    trigger: YPopupOverlayTrigger;
    onClickOutside: YPopoverOnClickOutside;
}
export interface YPopupOverlayEvent {
    event: string;
    handle: (event: Event) => void;
}
export interface IYPopupEngine {
    /**
     * Displays the popup.
     */
    show(): void;
    configure(conf: YPopoverConfig): void;
    /**
     * Hides the popup by removing it from the DOM.
     */
    hide(): void;
    /**
     * Configures the anchor's trigger type.
     */
    setTrigger(newTrigger: YPopupOverlayTrigger): void;
    /**
     * Removes the popup from the DOM and unregisters all events from the anchor.
     */
    dispose(): void;
}
/**
 * Service that positions a template relative to an anchor element.
 */
export declare class YPopupEngineService {
    constructor($document: angular.IDocumentService, $compile: angular.ICompileService, $timeout: angular.ITimeoutService);
}
