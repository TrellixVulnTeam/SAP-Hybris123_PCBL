/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { stringUtils, windowUtils } from '@smart/utils';
import * as angular from 'angular';

import * as popper from 'popper.js';
import { SeDirective } from '../../di';

import { OVERLAY_ID } from '../../utils';

export enum YPopoverTrigger {
    Hover = 'hover',
    Click = 'click',
    Focus = 'focus',
    OutsideClick = 'outsideClick',
    None = 'none'
}

export enum YPopoverOnClickOutside {
    Close = 'close',
    None = 'none'
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
@SeDirective({
    selector: '[y-popover]',
    transclude: true,
    replace: false,
    controllerAs: 'ypop',
    inputs: ['templateUrl:?', 'template:?', 'title:?', 'placement:?', 'trigger:?', 'isOpen:?']
})
export class YPopoverDirective {
    public title?: string = '';
    public template: string;
    public placement?: popper.Placement = 'top';

    private transcludedContent: JQuery<Element> = null;
    private transclusionScope: angular.IScope = null;
    private engine: any = null;
    private config: YPopoverConfig = null;
    private templateUrl?: string;
    private trigger?: YPopoverTrigger = YPopoverTrigger.Click;
    private isOpen?: boolean = false;
    private previousIsOpen = false;

    constructor(
        private $scope: YPopoverScope,
        private $timeout: angular.ITimeoutService,
        private $element: JQuery<Element>,
        private yjQuery: JQueryStatic,
        private $templateCache: angular.ITemplateCacheService,
        private yPopupEngineService: any,
        private $transclude: angular.ITranscludeFunction
    ) {
        this.$transclude((clone: JQuery<Element>, scope: angular.IScope) => {
            this.$element.append(clone);
            this.transcludedContent = clone;
            this.transclusionScope = scope;
        });
    }

    $onInit(): void {
        const anchor = this.$element[0];
        const overlay = windowUtils.isIframe() ? this.yjQuery('#' + OVERLAY_ID) : null;

        this.$scope.placement = this.placement;
        this.$scope.template = this.template;
        this.$scope.title = this.title;

        this.config = {
            placement: this.placement || 'top',
            trigger: this.trigger || YPopoverTrigger.Click,
            container: overlay && overlay.length ? overlay[0] : 'body',
            onShow: (): void => {
                this.isOpen = true;
            },
            onHide: (): void => {
                this.isOpen = false;
            },
            onChanges: (element: HTMLElement, data: popper.Data): void => {
                this.$timeout(() => {
                    if (this.placement !== data.placement) {
                        this.placement = data.placement;
                    }
                });
            }
        };

        this.engine = new this.yPopupEngineService(
            anchor,
            this.getTemplate(),
            this.$scope,
            this.config
        );
        this.isOpen = !stringUtils.isBlank(this.isOpen) ? this.isOpen : this.engine.isOpen;
    }

    $doCheck(): void {
        if (this.previousIsOpen !== this.isOpen) {
            if (this.isOpen) {
                this.engine.show();
            } else {
                this.engine.hide();
            }
            this.previousIsOpen = this.isOpen;
        }
    }

    $onChanges(): void {
        if (this.templateUrl) {
            this.template = this.$templateCache.get(this.templateUrl);
            delete this.templateUrl;
        }
        if (this.engine) {
            this.config.placement = this.placement || 'top';
            this.config.trigger = this.trigger || YPopoverTrigger.Click;
            this.engine.configure(this.config);
        }
    }

    $onDestroy(): void {
        this.engine.dispose();
        this.transcludedContent.remove();
        this.transclusionScope.$destroy();
    }

    getTemplate(): string {
        return `<y-popover-popup class="se-popover-popup" data-placement="ypop.placement" data-template="ypop.template" data-title="ypop.title"></y-popover-popup>`;
    }
}
