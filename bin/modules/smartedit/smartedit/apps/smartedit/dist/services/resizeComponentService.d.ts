/// <reference types="angular" />
/// <reference types="jquery" />
import { ComponentHandlerService } from './ComponentHandlerService';
/**
 * Internal service
 *
 * Service that resizes slots and components in the Inner Frame when the overlay is enabled or disabled.
 */
export declare class ResizeComponentService {
    private componentHandlerService;
    private yjQuery;
    constructor(componentHandlerService: ComponentHandlerService, yjQuery: JQueryStatic);
    /**
     * This methods appends CSS classes to inner frame slots and components. Passing a boolean true to showResizing
     * enables the resizing, and false vice versa.
     */
    resizeComponents(showResizing: boolean): void;
}
