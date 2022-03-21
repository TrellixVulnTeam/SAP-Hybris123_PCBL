/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { EVENTS, IEventService } from '@smart/utils';
import { SeDirective } from '../di';

/**
 * Will cause an AngularJS re-compilation of the node declaring this directive whenever the page identifier in smartEdit layer changes.
 */
@SeDirective({
    selector: 'page-sensitive',
    replace: false,
    transclude: true,
    template: `<div class='se-page-sensitive' data-ng-if='ctrl.hasContent' data-ng-transclude></div>`,
    scope: true,
    controllerAs: 'ctrl'
})
export class PageSensitiveDirective {
    public hasContent = true;
    private unRegisterPageChangeListener: () => void;

    constructor(private crossFrameEventService: IEventService) {}

    $onInit(): void {
        this.unRegisterPageChangeListener = this.crossFrameEventService.subscribe(
            EVENTS.PAGE_CHANGE,
            () => {
                this.hasContent = false;

                setTimeout(() => {
                    this.hasContent = true;
                }, 0);
            }
        );
    }

    $onDestroy(): void {
        this.unRegisterPageChangeListener();
    }
}
