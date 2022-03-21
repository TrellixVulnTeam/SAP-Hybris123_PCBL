/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* eslint-disable max-classes-per-file */
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import * as lo from 'lodash';
import Popper from 'popper.js';
import ResizeObserver from 'resize-observer-polyfill';
import {
    YPopoverConfig,
    YPopoverOnClickOutside,
    YPopoverTrigger
} from '../../components/popover/yPopoverDirective';
import { SeInjectable } from '../../di';

export interface YPopupOverlayScope extends angular.IScope {
    closePopupOverlay: () => void;
}

/**
 * Controls when the overlay is displayed.
 * If yPopupOverlayTrigger is `true`, the overlay is displayed, if false (or something other then true or click) then the overlay is hidden.
 * If yPopupOverlayTrigger is `click` then the overlay is displayed when the anchor (element) is clicked on.
 */
export type YPopupOverlayTrigger = YPopoverTrigger | string | boolean;

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
@SeInjectable()
export class YPopupEngineService {
    constructor(
        $document: angular.IDocumentService,
        $compile: angular.ICompileService,
        $timeout: angular.ITimeoutService
    ) {
        class YPopupEngine implements IYPopupEngine {
            private eventListeners: (() => void)[] = [];
            private isOpen = false;
            private oldTrigger: any = null;
            private container: string | HTMLElement;
            private disposing: boolean;
            private onChanges: (element: HTMLElement, data: Popper.Data) => void;
            private onHide: () => void;
            private onShow: () => void;
            private popupElement: HTMLElement;
            private popupScope: angular.IScope;
            private popupInstance: Popper;
            private config: YPopupEngineConfig;
            private resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const element = entry.target as HTMLElement;
                    if (element === this.popupElement) {
                        this.update();
                    }
                }
            });

            private popperConfig: Popper.PopperOptions = {
                modifiers: {
                    preventOverflow: {
                        padding: 0,
                        boundariesElement: 'viewport'
                    }
                }
            };

            constructor(
                private anchorElement: Element,
                private template: string,
                private scope: angular.IScope,
                config: YPopoverConfig
            ) {
                this.configure(config);
            }

            /**
             * Configures the popup engine.
             *
             * @param config.placement Default `'bottom'`.
             * @param config.trigger Default `'hover'`.
             * @param config.container Default `document.body`.
             * @param config.onClickOutside Default `'close'`.
             */
            configure(conf: YPopoverConfig): void {
                const config = conf || ({} as YPopoverConfig);

                this.onChanges = config.onChanges;
                this.container = config.container || $document[0].body;
                this.onShow = config.onShow;
                this.onHide = config.onHide;
                this.disposing = false;

                this.config = {
                    placement: config.placement || 'bottom',
                    modifiers: config.modifiers,
                    trigger: config.trigger || YPopoverTrigger.Hover,
                    onClickOutside: config.onClickOutside || YPopoverOnClickOutside.Close,
                    onCreate: (object: Popper.Data): void => this._onChanges(object),
                    onUpdate: (object: Popper.Data): void => this._onChanges(object)
                };

                this.setTrigger(this.config.trigger);
            }

            show(): void {
                if (this.isOpen || this.disposing) {
                    return;
                }

                this.isOpen = true;

                this.popupScope = this.scope.$new(false);
                this.popupElement = $compile(this.template)(this.popupScope)[0];

                // FIXME: CMSX-6084
                this.popupInstance = new Popper(
                    this.anchorElement,
                    this.popupElement,
                    lo.merge(this.config, this.popperConfig)
                );

                if (typeof this.container === 'string') {
                    angular.element(this.container)[0].appendChild(this.popupElement);
                } else {
                    this.container.appendChild(this.popupElement);
                }

                this.resizeObserver.observe(this.popupElement);

                if (this.onShow) {
                    this.onShow();
                }

                this.update();
            }

            hide(): void {
                if (!this.isOpen) {
                    return;
                }

                this.resizeObserver.unobserve(this.popupElement);

                this.popupScope.$destroy();
                this.popupInstance.destroy();
                this.popupElement.parentNode.removeChild(this.popupElement);

                if (this.onHide) {
                    this.onHide();
                }

                this.isOpen = false;
            }

            /**
             * Updates the position of the popup.
             */
            update(): void {
                if (this.isOpen) {
                    this.popupInstance.scheduleUpdate();
                }
            }

            setTrigger(newTrigger: YPopupOverlayTrigger): void {
                if (this.oldTrigger === newTrigger) {
                    return;
                }

                this.config.trigger = newTrigger;
                this.oldTrigger = newTrigger;
                this._removeTriggers();

                this._composeEvents(newTrigger).forEach((event: YPopupOverlayEvent) =>
                    this._setEventListener(event)
                );

                if (
                    this.config.onClickOutside === YPopoverOnClickOutside.Close &&
                    this.config.trigger === YPopoverTrigger.Click
                ) {
                    const bodyClick = ($event: Event): void =>
                        $event.target !== this.anchorElement &&
                        !this.anchorElement.contains($event.target as HTMLElement) &&
                        this.hide();

                    $document[0].body.addEventListener('click', ($event) => {
                        $timeout(() => {
                            bodyClick($event);
                        });
                    });

                    this.eventListeners.push(() => {
                        $document[0].body.removeEventListener('click', bodyClick);
                    });
                }
            }

            dispose(): void {
                this.disposing = true;
                this.hide();
                this._removeTriggers();
            }

            /**
             * Removes event listeners from the anchor element.
             */
            private _removeTriggers(): void {
                this.eventListeners.forEach((unRegisterEvent: () => void) => {
                    unRegisterEvent();
                });
                this.eventListeners = [];
            }

            private _onChanges(dataObject: Popper.Data): void {
                if (this.onChanges) {
                    this.onChanges(this.popupElement, dataObject);
                }
            }

            private _handleShow($event: Event): void {
                $event.stopPropagation();
                $event.preventDefault();
                this.show();
            }

            private _handleHide($event: Event): void {
                $event.stopPropagation();
                $event.preventDefault();
                this.hide();
            }

            private _setEventListener(event: YPopupOverlayEvent): void {
                this.anchorElement.addEventListener(event.event, ($event: Event) => {
                    $timeout(() => {
                        event.handle($event);
                    });
                });
                this.eventListeners.push(() => {
                    this.anchorElement.removeEventListener(event.event, event.handle);
                });
            }

            private _composeEvents(trigger: YPopupOverlayTrigger): YPopupOverlayEvent[] {
                switch (trigger) {
                    case YPopoverTrigger.Click:
                        return [
                            {
                                event: 'click',
                                handle: (): void => (this.isOpen ? this.hide() : this.show())
                            }
                        ];

                    case YPopoverTrigger.Hover:
                        return [
                            {
                                event: 'mouseenter',
                                handle: (event: Event): void => this._handleShow(event)
                            },
                            {
                                event: 'mouseleave',
                                handle: (event: Event): void => this._handleHide(event)
                            }
                        ];
                    case YPopoverTrigger.Focus:
                        return [
                            {
                                event: 'focus',
                                handle: (event: Event): void => this._handleShow(event)
                            },
                            {
                                event: 'blur',
                                handle: (event: Event): void => this._handleHide(event)
                            }
                        ];
                    case 'show':
                    case 'true':
                    case true:
                        this.show();
                        return [];
                    case 'hide':
                    case 'false':
                    case false:
                        this.hide();
                        return [];
                    default:
                        return [];
                }
            }
        }

        return YPopupEngine;
    }
}
