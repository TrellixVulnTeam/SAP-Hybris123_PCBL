/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    COMPONENT_UPDATED_EVENT,
    IComponentVisibilityAlertService,
    IEditorModalService,
    ISlotRestrictionsService
} from 'cmscommons';
import { ComponentHandlerService } from 'smartedit';
import {
    IContextualMenuButton,
    IContextualMenuConfiguration,
    IFeatureService,
    SeDowngradeService,
    SystemEventService
} from 'smarteditcommons';

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
@SeDowngradeService()
export class EditorEnablerService {
    private contextualMenuButton: IContextualMenuButton;
    private isEditorModalOpen: boolean;

    constructor(
        private componentHandlerService: ComponentHandlerService,
        private componentVisibilityAlertService: IComponentVisibilityAlertService,
        private editorModalService: IEditorModalService,
        private featureService: IFeatureService,
        private slotRestrictionsService: ISlotRestrictionsService,
        private systemEventService: SystemEventService
    ) {
        this.contextualMenuButton = {
            key: 'se.cms.edit', // It's the same key as the i18n, however here we're not doing any i18n work.
            nameI18nKey: 'se.cms.contextmenu.nameI18nKey.edit',
            i18nKey: 'se.cms.contextmenu.title.edit',
            descriptionI18nKey: 'se.cms.contextmenu.descriptionI18n.edit',
            displayClass: 'editbutton',
            displayIconClass: 'sap-icon--edit',
            displaySmallIconClass: 'sap-icon--edit',
            priority: 400,
            permissions: ['se.context.menu.edit.component'],
            action: {
                callback: (config: IContextualMenuConfiguration): Promise<void> =>
                    this.onClickEditButton(config)
            },
            condition: (config: IContextualMenuConfiguration): Promise<boolean> =>
                this.isSlotEditableForNonExternalComponent(config)
        };
    }

    /**
     * Enables the Edit contextual menu item for the given component types.
     *
     * @param componentTypes The list of component types, as defined in the platform, for which to enable the Edit contextual menu.
     */
    public enableForComponents(componentTypes: string[]): void {
        const contextualMenuConfig = {
            ...this.contextualMenuButton,
            regexpKeys: componentTypes
        };

        this.featureService.addContextualMenuButton(contextualMenuConfig);
    }

    private async onClickEditButton({
        slotUuid,
        componentAttributes
    }: IContextualMenuConfiguration): Promise<void> {
        if (this.isEditorModalOpen) {
            return;
        }

        this.isEditorModalOpen = true;
        try {
            const item = await this.editorModalService.open(componentAttributes);

            this.isEditorModalOpen = false;

            this.systemEventService.publish(COMPONENT_UPDATED_EVENT, item);

            return this.componentVisibilityAlertService.checkAndAlertOnComponentVisibility({
                itemId: item.uuid,
                itemType: item.itemtype,
                catalogVersion: item.catalogVersion,
                restricted: item.restricted,
                slotId: slotUuid,
                visible: item.visible
            });
        } catch {
            this.isEditorModalOpen = false;
        }
    }

    private async isSlotEditableForNonExternalComponent(
        config: IContextualMenuConfiguration
    ): Promise<boolean> {
        const slotId = this.componentHandlerService.getParentSlotForComponent(config.element);
        const isEditable = await this.slotRestrictionsService.isSlotEditable(slotId);

        return (
            isEditable &&
            !this.componentHandlerService.isExternalComponent(
                config.componentId,
                config.componentType
            )
        );
    }
}
