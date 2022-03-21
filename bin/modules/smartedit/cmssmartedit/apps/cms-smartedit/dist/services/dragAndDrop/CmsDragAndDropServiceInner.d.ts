/// <reference types="angular" />
/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
import { TranslateService } from '@ngx-translate/core';
import { AssetsService, IPageContentSlotsComponentsRestService, ISlotRestrictionsService } from 'cmscommons';
import { ComponentHandlerService } from 'smartedit';
import { DragAndDropService, GatewayFactory, IAlertService, IBrowserService, IWaitDialogService, Payload, SystemEventService, TypedMap } from 'smarteditcommons';
import { ComponentEditingFacade } from './ComponentEditingFacade';
export interface CmsDragAndDropCachedComponentHint {
    original: JQuery<HTMLElement>;
    position: number;
    rect: TypedMap<number>;
}
export interface CmsDragAndDropCachedComponent {
    id: string;
    type: string;
    original: JQuery<HTMLElement>;
    position: number;
    rect: TypedMap<number>;
    hints: CmsDragAndDropCachedComponentHint[];
}
export interface CmsDragAndDropCachedSlot {
    id: string;
    uuid: string;
    original: JQuery<HTMLElement>;
    /**
     * The list of components contained in the slot, they must contain an "id" property
     */
    components: CmsDragAndDropCachedComponent[];
    hint: {
        original: JQuery<HTMLElement>;
        rect: TypedMap<number>;
    };
    rect: TypedMap<number>;
    isAllowed?: boolean;
    mayBeAllowed?: boolean;
}
export interface CmsDragAndDropDragInfo extends Payload {
    /**
     * The smartedit id of the component.
     */
    componentId: string;
    componentUuid: string;
    componentType: string;
    slotUuid: string;
    /**
     * The smartedit id of the slot from which the component originates.
     */
    slotId: string;
    slotOperationRelatedId: string;
    slotOperationRelatedType: string;
    /**
     * The boolean that determines if the component should be cloned or not.
     */
    cloneOnDrop?: boolean;
}
/**
 * This service provides a rich drag and drop experience tailored for CMS operations.
 */
export declare class CmsDragAndDropService {
    private alertService;
    private assetsService;
    private browserService;
    private componentEditingFacade;
    private componentHandlerService;
    private dragAndDropService;
    private gatewayFactory;
    private translateService;
    private pageContentSlotsComponentsRestService;
    private slotRestrictionsService;
    private systemEventService;
    private waitDialogService;
    private yjQuery;
    private domain;
    private static readonly CMS_DRAG_AND_DROP_ID;
    private static readonly TARGET_SELECTOR;
    private static readonly SOURCE_SELECTOR;
    private static readonly MORE_MENU_SOURCE_SELECTOR;
    private static readonly SLOT_SELECTOR;
    private static readonly COMPONENT_SELECTOR;
    private static readonly HINT_SELECTOR;
    private static readonly CSS_CLASSES;
    private static readonly DEFAULT_DRAG_IMG;
    private cachedSlots;
    private highlightedSlot;
    private highlightedComponent;
    private highlightedHint;
    private dragInfo;
    private overlayRenderedUnSubscribeFn;
    private componentRemovedUnSubscribeFn;
    private gateway;
    private _window;
    constructor(alertService: IAlertService, assetsService: AssetsService, browserService: IBrowserService, componentEditingFacade: ComponentEditingFacade, componentHandlerService: ComponentHandlerService, dragAndDropService: DragAndDropService, gatewayFactory: GatewayFactory, translateService: TranslateService, pageContentSlotsComponentsRestService: IPageContentSlotsComponentsRestService, slotRestrictionsService: ISlotRestrictionsService, systemEventService: SystemEventService, waitDialogService: IWaitDialogService, yjQuery: JQueryStatic, domain: string);
    /**
     * This method registers this drag and drop instance in SmartEdit.
     */
    register(): void;
    /**
     * This method unregisters this drag and drop instance from SmartEdit.
     */
    unregister(): void;
    /**
     * This method applies this drag and drop instance in the current page. After this method is executed,
     * the user can start a drag and drop operation.
     */
    apply(): void;
    /**
     * This method updates this drag and drop instance in the current page. It is important to execute
     * this method every time a draggable or droppable element is added or removed from the page DOM.
     */
    update(): void;
    private onOverlayUpdate;
    private onStart;
    private onDragEnter;
    private onDragOver;
    private selectMouseOverElement;
    private onDrop;
    private getComponentPositionFromCachedSlot;
    private onDragLeave;
    private onStop;
    /**
     * This function returns the source of the image used as drag image. Currently, the
     * image is only returned for Safari; all the other browsers display default images
     * properly.
     */
    private getDragImageSrc;
    private initializeDragOperation;
    private cleanDragOperation;
    private highlightSlot;
    private addUIHelpers;
    private cacheElements;
    private clearHighlightedHint;
    private clearHighlightedComponent;
    private clearHighlightedSlot;
    private isMouseInRegion;
    private getElementRects;
    private getWindowScrolling;
    private scrollToModifiedSlot;
    private getSelector;
    /**
     * When a PROCESS_COMPONENTS is occuring, it could remove the currently dragged component if this one is not in the viewport.
     * To avoid having the dragged component and it's slot removed we mark then as "KEEP_VISIBLE" when the drag and drop start.
     * On drag end, an event is sent to call a RESTART_PROCESS to add or remove the components according to their viewport visibility and the component and slot are marked as "PROCESS".
     * Using yjQuery.each() here because of MiniCart component (among other slots/compoents) that have multiple occurences in DOM.
     */
    private toggleKeepVisibleComponentAndSlot;
}
