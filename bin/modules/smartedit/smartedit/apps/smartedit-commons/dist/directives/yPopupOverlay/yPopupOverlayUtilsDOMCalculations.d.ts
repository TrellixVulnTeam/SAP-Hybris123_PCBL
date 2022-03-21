import * as angular from 'angular';
/**
 * A rectangle object representing the size and absolutely positioned location of the overlay.
 */
export interface YPopupOveryayPosition {
    /** The width of the overlay element */
    width: number;
    height: number;
    top: number;
    /** The left side of the overlay element */
    left: number;
}
/**
 * Contains some {@link YPopupOverlayDirective} helper functions for calculating positions and sizes on the DOM
 */
export declare class YPopupOverlayUtilsDOMCalculations {
    private $window;
    private $document;
    constructor($window: angular.IWindowService, $document: angular.IDocumentService);
    /**
     * Modifies the input rectangle to be absolutely positioned horizontally in the viewport.<br />
     * Does not modify vertical positioning.
     */
    adjustHorizontalToBeInViewport(absPosition: YPopupOveryayPosition): void;
    /**
     * Calculates the preferred position of the overlay, based on the size and position of the anchor
     * and the size of the overlay element
     *
     * ### Parameters
     *
     * `anchorBoundingClientRect` - A bounding rectangle representing the overlay's anchor
     *
     * `anchorBoundingClientRect.top` - The top of the anchor, absolutely positioned
     *
     * `anchorBoundingClientRect.right` - The right of the anchor, absolutely positioned
     *
     * `anchorBoundingClientRect.bottom` - The bottom of the anchor, absolutely positioned
     *
     * `anchorBoundingClientRect.left` - The left of the anchor, absolutely positioned
     *
     * `targetWidth` - The width of the overlay element
     *
     * `targetHeight` - The height of the overlay element
     *
     * `[targetValign='bottom']` - The preferred vertical alignment, either 'top' or 'bottom'
     *
     * `[targetHalign='right']` - The preferred horizontal alignment, either 'left' or 'right'
     *
     * @returns A new size and position for the overlay
     */
    calculatePreferredPosition(anchorBoundingClientRect: ClientRect, targetWidth: number, targetHeight: number, targetValign: 'top' | 'bottom', targetHalign: 'left' | 'right'): YPopupOveryayPosition;
    private getScrollBarWidth;
}
