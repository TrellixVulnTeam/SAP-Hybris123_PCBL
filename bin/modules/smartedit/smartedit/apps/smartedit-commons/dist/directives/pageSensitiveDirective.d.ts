import { IEventService } from '@smart/utils';
/**
 * Will cause an AngularJS re-compilation of the node declaring this directive whenever the page identifier in smartEdit layer changes.
 */
export declare class PageSensitiveDirective {
    private crossFrameEventService;
    hasContent: boolean;
    private unRegisterPageChangeListener;
    constructor(crossFrameEventService: IEventService);
    $onInit(): void;
    $onDestroy(): void;
}
