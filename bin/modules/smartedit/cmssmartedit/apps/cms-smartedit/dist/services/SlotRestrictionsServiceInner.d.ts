/// <reference types="angular" />
/// <reference types="jquery" />
import { IPageContentSlotsComponentsRestService, ISlotRestrictionsService, TypePermissionsRestService, COMPONENT_IN_SLOT_STATUS } from 'cmscommons';
import { ComponentHandlerService } from 'smartedit';
import { IPageInfoService, LogService, IRestServiceFactory, CrossFrameEventService } from 'smarteditcommons';
import { CmsDragAndDropCachedSlot, CmsDragAndDropDragInfo } from './dragAndDrop';
import { SlotSharedService } from './SlotSharedService';
export interface ContentSlot {
    /**
     * The uid of content slot.
     *
     * E.g. 'NavigationBarSlot'
     */
    contentSlotUid: string;
    /**
     * Components types that can be placed within the slot.
     *
     * E.g.
     * ['NavigationBarComponent', 'SimpleBannerComponent', 'BannerComponent', 'CMSParagraphComponent']
     */
    validComponentTypes: string[];
}
export declare class SlotRestrictionsService extends ISlotRestrictionsService {
    private componentHandlerService;
    private logService;
    private pageContentSlotsComponentsRestService;
    private pageInfoService;
    private restServiceFactory;
    private slotSharedService;
    private typePermissionsRestService;
    private yjQuery;
    private currentPageId;
    private slotRestrictions;
    private slotsRestrictionsRestService;
    private readonly CONTENT_SLOTS_TYPE_RESTRICTION_FETCH_LIMIT;
    constructor(componentHandlerService: ComponentHandlerService, logService: LogService, pageContentSlotsComponentsRestService: IPageContentSlotsComponentsRestService, pageInfoService: IPageInfoService, restServiceFactory: IRestServiceFactory, slotSharedService: SlotSharedService, typePermissionsRestService: TypePermissionsRestService, yjQuery: JQueryStatic, crossFrameEventService: CrossFrameEventService);
    /**
     * @deprecated since 2005
     */
    getAllComponentTypesSupportedOnPage(): Promise<string[] | void>;
    getSlotRestrictions(slotId: string): Promise<string[] | void>;
    /**
     * This methods determines whether a component of the provided type is allowed in the slot.
     *
     * @param slot The slot for which to verify if it allows a component of the provided type.
     * @returns Promise containing COMPONENT_IN_SLOT_STATUS (ALLOWED, DISALLOWED, MAYBEALLOWED) string that determines whether a component of the provided type is allowed in the slot.
     *
     * TODO: The name is misleading. To not introduce breaking change in 2105, consider changing the name in the next release (after 2105).
     * Candidates: "getComponentStatusInSlot", "determineComponentStatusInSlot"
     */
    isComponentAllowedInSlot(slot: CmsDragAndDropCachedSlot, dragInfo: CmsDragAndDropDragInfo): Promise<COMPONENT_IN_SLOT_STATUS>;
    isSlotEditable(slotId: string): Promise<boolean>;
    private emptyCache;
    private cacheSlotsRestrictions;
    private recursiveFetchSlotsRestrictions;
    private fetchSlotsRestrictions;
    private getPageUID;
    private getEntryId;
    private isExternalSlot;
}
