import { IComponentVisibilityAlertService, IEditorModalService, ISlotRestrictionsService } from 'cmscommons';
import { ComponentHandlerService } from 'smartedit';
import { IFeatureService, SystemEventService } from 'smarteditcommons';
/**
 * Allows enabling the Edit Component contextual menu item,
 * providing a SmartEdit CMS admin the ability to edit various properties of the given component.
 *
 * Convenience service to attach the open Editor Modal action to the contextual menu of a given component type, or
 * given regex corresponding to a selection of component types.
 *
 * Example: The Edit button is added to the contextual menu of the CMSParagraphComponent, and all types postfixed
 * with BannerComponent.
 */
export declare class EditorEnablerService {
    private componentHandlerService;
    private componentVisibilityAlertService;
    private editorModalService;
    private featureService;
    private slotRestrictionsService;
    private systemEventService;
    private contextualMenuButton;
    private isEditorModalOpen;
    constructor(componentHandlerService: ComponentHandlerService, componentVisibilityAlertService: IComponentVisibilityAlertService, editorModalService: IEditorModalService, featureService: IFeatureService, slotRestrictionsService: ISlotRestrictionsService, systemEventService: SystemEventService);
    /**
     * Enables the Edit contextual menu item for the given component types.
     *
     * @param componentTypes The list of component types, as defined in the platform, for which to enable the Edit contextual menu.
     */
    enableForComponents(componentTypes: string[]): void;
    private onClickEditButton;
    private isSlotEditableForNonExternalComponent;
}
