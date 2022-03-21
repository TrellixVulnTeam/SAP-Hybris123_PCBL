import { TranslateService } from '@ngx-translate/core';
import { ComponentService, IComponentVisibilityAlertService, IEditorModalService } from 'cmscommons';
import { CrossFrameEventService, IAlertService, IPageInfoService, IRenderService, IRestServiceFactory, ISharedDataService, LogService, SystemEventService } from 'smarteditcommons';
import { SlotVisibilityService } from '../SlotVisibilityService';
export interface SlotInfo {
    /** The Uid of the slot where to drop the component. */
    targetSlotId: string;
    /** The UUid of the slot where to drop the component. */
    targetSlotUUId?: string;
}
/** Represents the properties of the component required to create a clone. */
interface CloneComponentInfo extends SlotInfo {
    dragInfo: DragInfo;
    /** The position in the slot where to add the new component. */
    position: number;
}
/** Represents the component to be added to a slot. */
interface DragInfo {
    componentId: string;
    componentUuid: string;
    componentType: string;
}
/**
 * This service provides methods that allow adding or removing components in the page.
 */
export declare class ComponentEditingFacade {
    private alertService;
    private componentService;
    private componentVisibilityAlertService;
    private crossFrameEventService;
    private editorModalService;
    private logService;
    private pageInfoService;
    private renderService;
    private restServiceFactory;
    private slotVisibilityService;
    private sharedDataService;
    private systemEventService;
    private translateService;
    private contentSlotComponentsRestService;
    constructor(alertService: IAlertService, componentService: ComponentService, componentVisibilityAlertService: IComponentVisibilityAlertService, crossFrameEventService: CrossFrameEventService, editorModalService: IEditorModalService, logService: LogService, pageInfoService: IPageInfoService, renderService: IRenderService, restServiceFactory: IRestServiceFactory, slotVisibilityService: SlotVisibilityService, sharedDataService: ISharedDataService, systemEventService: SystemEventService, translateService: TranslateService);
    /**
     * Adds a new component to the slot and opens a component modal to edit its properties.
     *
     * @param slotInfo The target slot for the new component.
     * @param catalogVersionUuid The catalog version on which to create the new component
     * @param componentType The type of the new component to add.
     * @param position The position in the slot where to add the new component.
     *
     */
    addNewComponentToSlot(slotInfo: SlotInfo, catalogVersionUuid: string, componentType: string, position: number): Promise<void>;
    /**
     * Adds an existing component to the slot and display an Alert whenever the component is either hidden or restricted.
     *
     * @param targetSlotId The ID of the slot where to drop the component.
     * @param dragInfo The dragInfo object containing the componentId, componentUuid and componentType.
     * @param position The position in the slot where to add the component.
     */
    addExistingComponentToSlot(targetSlotId: string, dragInfo: DragInfo, position: number): Promise<void>;
    /**
     * This methods clones an existing component to the slot by opening a component modal to edit its properties.
     */
    cloneExistingComponentToSlot(componentInfo: CloneComponentInfo): Promise<void>;
    /**
     * This methods moves a component from two slots in a page.
     *
     * @param sourceSlotId The ID of the slot where the component is initially located.
     * @param targetSlotId The ID of the slot where to drop the component.
     * @param componentId The ID of the component to add into the slot.
     * @param position The position in the slot where to add the component.
     */
    moveComponent(sourceSlotId: string, targetSlotId: string, componentId: string, position: number): Promise<void>;
    private generateAndAlertSuccessMessage;
    private generateAndAlertErrorMessage;
    private hasErrorResponseErrors;
    private renderSlots;
}
export {};
