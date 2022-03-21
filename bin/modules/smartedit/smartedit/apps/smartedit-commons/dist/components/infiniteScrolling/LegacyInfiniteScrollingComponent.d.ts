/// <reference types="angular" />
/// <reference types="angular-mocks" />
/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
import * as lo from 'lodash';
import { ISeComponent } from 'smarteditcommons/di';
import { Page } from 'smarteditcommons/dtos';
import { TestModeService } from 'smarteditcommons/services/TestModeService';
import { DiscardablePromiseUtils, StringUtils } from 'smarteditcommons/utils';
/** @internal */
export interface ITechnicalUniqueIdAware {
    technicalUniqueId: string;
}
/**
 * **Deprecated, since 2005, use {@link InifniteScrollingComponent}.**
 *
 * A component that you can use to implement infinite scrolling for an expanding content (typically with a ng-repeat) nested in it.
 * It is meant to handle paginated requests from a backend when data is expected to be large.
 * Since the expanding content is a <b>transcluded</b> element, we must specify the context to which the items will be attached:
 * If context is myContext, each pagination will push its new items to myContext.items.
 *
 * ### Parameters
 * `pageSize` - The maximum size of each page requested from the backend.
 *
 * `mask` - A string value sent to the server upon fetching a page to further restrict the search, it is sent as query string "mask".
 * <br>The directive listens for change to mask and will reset the scroll and re-fetch data.
 * <br/>It it left to the implementers to decide what it filters on.
 *
 * `distance` - A number representing how close the bottom of the element must be to the bottom of the container before the expression specified by fetchPage function is triggered. Measured in multiples of the container height; for example, if the container is 1000 pixels tall and distance is set to 2, the infinite scroll expression will be evaluated when the bottom of the element is within 2000 pixels of the bottom of the container. Defaults to 0 (e.g. the expression will be evaluated when the bottom of the element crosses the bottom of the container).
 *
 * `context` - The container object to which the items of the fetched `Page` will be added
 *
 * `fetchPage` - Function to fetch the next page when the bottom of the element approaches the bottom of the container.
 * fetchPage will be invoked with 3 arguments : <b>mask, pageSize, currentPage</b>. The currentPage is determined by the scrolling and starts with 0. The function must return a page of type `Page`.
 *
 * `dropDownContainerClass` - An optional CSS class to be added to the container of the dropdown. It would typically be used to override the default height. <b>The resolved CSS must set a height (or max-height) and overflow-y:scroll.</b>
 *
 * `dropDownClass` - An optional CSS class to be added to the dropdown. <b>Neither height nor overflow should be set on the dropdown, it must be free to fill up the space and reach the container size. Failure to do so will cause the directive to call nextPage as many times as the number of available pages on the server.</b>
 */
export declare class YInfiniteScrollingComponent<T extends ITechnicalUniqueIdAware> implements ISeComponent {
    private $timeout;
    private encode;
    private lodash;
    private discardablePromiseUtils;
    private $element;
    /** @internal */
    CONTAINER_CLASS: string;
    /** @internal */
    items: T[];
    /** @internal */
    initiated: boolean;
    /** @internal */
    currentPage: number;
    /** @internal */
    pagingDisabled: boolean;
    dropDownContainerClass: string;
    dropDownClass: string;
    pageSize: number;
    mask: string;
    fetchPage: (mask: string, pageSize: number, currentPage: number) => angular.IPromise<Page<T>>;
    private distance;
    private context;
    private container;
    private containerId;
    private THROTTLE_MILLISECONDS;
    constructor($timeout: angular.ITimeoutService, encode: (object: any) => string, lodash: lo.LoDashStatic, discardablePromiseUtils: DiscardablePromiseUtils, $element: JQuery<Element>, stringUtils: StringUtils, throttle: (func: (...args: any[]) => any, maxWait: number) => any, testModeService: TestModeService);
    /** @internal */
    $onChanges(): void;
    /** @internal */
    nextPage(): void;
    /** @internal */
    $postLink(): void;
}
