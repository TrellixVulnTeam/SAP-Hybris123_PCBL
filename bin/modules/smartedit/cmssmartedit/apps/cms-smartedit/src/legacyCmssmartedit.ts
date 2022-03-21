/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import {
    CmsResourceLocationsModule,
    ISlotRestrictionsService,
    TypePermissionsRestService
} from 'cmscommons';
import { CmsComponentsModule } from 'cmssmartedit/components';
import { ComponentHandlerService, ContextualMenuService } from 'smartedit';
import {
    ComponentUpdatedEventInfo,
    CrossFrameEventService,
    IContextualMenuButton,
    IContextualMenuConfiguration,
    IFeatureService,
    IPageInfoService,
    SeModule,
    TypedMap
} from 'smarteditcommons';
import {
    CmsSmarteditServicesModule,
    ComponentSharedService,
    EditorEnablerService,
    SlotSharedService
} from './services';
import './components/slotSharedDisabled/popovers.scss';
import { ComponentInfoService } from './services/ComponentInfoService';
import { CmsDragAndDropService, ComponentEditingFacade } from './services/dragAndDrop';

@SeModule({
    imports: [
        CmsSmarteditServicesModule,
        CmsComponentsModule,
        CmsResourceLocationsModule,
        'resourceLocationsModule',
        'decoratorServiceModule',
        'alertServiceModule',
        'translationServiceModule',
        'slotVisibilityButtonModule',
        'cmssmarteditTemplates',
        'cmscommonsTemplates',
        'smarteditServicesModule',
        'slotSharedButtonModule',
        'slotSyncButtonModule',
        'confirmationModalServiceModule',
        'sharedSlotDisabledDecoratorModule',
        'externalSlotDisabledDecoratorModule',
        'externalComponentDecoratorModule',
        'externalComponentButtonModule',
        'slotUnsharedButtonModule'
    ],
    initialize: (
        $rootScope: angular.IRootScopeService,
        $q: angular.IQService,
        $translate: angular.translate.ITranslateService,
        alertService: any,
        cmsDragAndDropService: CmsDragAndDropService,
        componentHandlerService: ComponentHandlerService,
        pageInfoService: IPageInfoService,
        confirmationModalService: any,
        contextualMenuService: ContextualMenuService,
        decoratorService: any,
        editorEnablerService: EditorEnablerService,
        featureService: IFeatureService,
        removeComponentService: any,
        slotRestrictionsService: ISlotRestrictionsService,
        slotSharedService: SlotSharedService,
        slotVisibilityService: any,
        componentEditingFacade: ComponentEditingFacade,
        cmsitemsRestService: any,
        componentInfoService: ComponentInfoService,
        componentSharedService: ComponentSharedService,
        crossFrameEventService: CrossFrameEventService,
        EVENT_SMARTEDIT_COMPONENT_UPDATED: string,
        typePermissionsRestService: TypePermissionsRestService
    ) => {
        'ngInject';
        editorEnablerService.enableForComponents(['^((?!Slot).)*$']);

        decoratorService.addMappings({
            '^((?!Slot).)*$': ['se.contextualMenu', 'externalComponentDecorator'],
            '^.*Slot$': [
                'se.slotContextualMenu',
                'se.basicSlotContextualMenu',
                'syncIndicator',
                'sharedSlotDisabledDecorator',
                'externalSlotDisabledDecorator'
            ]
        });

        featureService.addContextualMenuButton({
            key: 'externalcomponentbutton',
            priority: 100,
            nameI18nKey: 'se.cms.contextmenu.title.externalcomponent',
            i18nKey: 'se.cms.contextmenu.title.externalcomponentbutton',
            regexpKeys: ['^((?!Slot).)*$'],
            condition: (configuration: IContextualMenuConfiguration) => {
                const slotId: string = componentHandlerService.getParentSlotForComponent(
                    configuration.element
                );

                return slotRestrictionsService
                    .isSlotEditable(slotId)
                    .then((isSlotEditable: boolean) => {
                        if (!isSlotEditable) {
                            return false;
                        }

                        const smarteditCatalogVersionUuid =
                            configuration.componentAttributes &&
                            configuration.componentAttributes.smarteditCatalogVersionUuid;
                        if (smarteditCatalogVersionUuid) {
                            return pageInfoService
                                .getCatalogVersionUUIDFromPage()
                                .then((uuid: string) => smarteditCatalogVersionUuid !== uuid);
                        }

                        return componentHandlerService.isExternalComponent(
                            configuration.componentId,
                            configuration.componentType
                        );
                    });
            },
            action: {
                template:
                    '<external-component-button data-catalog-version-uuid="ctrl.componentAttributes.smarteditCatalogVersionUuid"></external-component-button>'
            },
            displayClass: 'externalcomponentbutton',
            displayIconClass: 'hyicon hyicon-globe',
            displaySmallIconClass: 'hyicon hyicon-globe'
        } as IContextualMenuButton);

        featureService.addContextualMenuButton({
            key: 'se.cms.dragandropbutton',
            priority: 200,
            nameI18nKey: 'se.cms.contextmenu.title.dragndrop',
            i18nKey: 'se.cms.contextmenu.title.dragndrop',
            regexpKeys: ['^((?!Slot).)*$'],
            condition: (configuration: IContextualMenuConfiguration) => {
                const slotId = componentHandlerService.getParentSlotForComponent(
                    configuration.element
                );
                return slotRestrictionsService
                    .isSlotEditable(slotId)
                    .then(function (slotEditable: boolean) {
                        if (slotEditable) {
                            return typePermissionsRestService
                                .hasUpdatePermissionForTypes([configuration.componentType])
                                .then(function (hasUpdatePermission: TypedMap<boolean>) {
                                    return hasUpdatePermission[configuration.componentType];
                                });
                        }
                        return false;
                    });
            },
            action: {
                callbacks: {
                    mousedown: (): void => {
                        cmsDragAndDropService.update();
                    }
                }
            },
            displayClass: 'movebutton',
            displayIconClass: 'sap-icon--move',
            displaySmallIconClass: 'sap-icon--move',
            permissions: ['se.context.menu.drag.and.drop.component']
        });

        featureService.register({
            key: 'se.cms.html5DragAndDrop',
            nameI18nKey: 'se.cms.dragAndDrop.name',
            descriptionI18nKey: 'se.cms.dragAndDrop.description',
            enablingCallback: () => {
                cmsDragAndDropService.register();
                cmsDragAndDropService.apply();
            },
            disablingCallback: () => {
                cmsDragAndDropService.unregister();
            }
        });

        featureService.addContextualMenuButton({
            key: 'se.cms.sharedcomponentbutton',
            priority: 300,
            nameI18nKey: 'se.cms.contextmenu.title.shared.component',
            i18nKey: 'se.cms.contextmenu.title.shared.component',
            regexpKeys: ['^((?!Slot).)*$'],
            condition: (configuration: IContextualMenuConfiguration) => {
                const slotId = componentHandlerService.getParentSlotForComponent(
                    configuration.element
                );

                return Promise.all([
                    componentHandlerService.isExternalComponent(
                        configuration.componentId,
                        configuration.componentType
                    ),
                    slotRestrictionsService.isSlotEditable(slotId)
                ]).then(function (response: boolean[]) {
                    if (response[0] || !response[1]) {
                        return false;
                    }

                    return componentSharedService.isComponentShared(
                        configuration.componentAttributes.smarteditComponentUuid
                    );
                });
            },
            action: {
                template: `<shared-component-button data-smartedit-component-id="ctrl.componentAttributes.smarteditComponentId"></shared-component-button>`
            },
            displayClass: 'shared-component-button',
            displayIconClass: 'sap-icon--chain-link',
            displaySmallIconClass: 'sap-icon--chain-link',
            permissions: []
        });

        featureService.addContextualMenuButton({
            key: 'se.cms.remove',
            priority: 500,
            customCss: 'se-contextual-more-menu__item--delete',
            i18nKey: 'se.cms.contextmenu.title.remove',
            nameI18nKey: 'se.cms.contextmenu.title.remove',
            regexpKeys: ['^((?!Slot).)*$'],
            condition: (configuration: IContextualMenuConfiguration) => {
                if (!configuration.isComponentHidden) {
                    const slotId: string = componentHandlerService.getParentSlotForComponent(
                        configuration.element
                    );
                    return slotRestrictionsService
                        .isSlotEditable(slotId)
                        .then(function (slotEditable: boolean) {
                            if (slotEditable) {
                                return typePermissionsRestService
                                    .hasDeletePermissionForTypes([configuration.componentType])
                                    .then(function (hasDeletePermission: TypedMap<boolean>) {
                                        return hasDeletePermission[configuration.componentType];
                                    });
                            }
                            return false;
                        });
                }

                return typePermissionsRestService
                    .hasDeletePermissionForTypes([configuration.componentType])
                    .then(function (hasDeletePermission: TypedMap<boolean>) {
                        return hasDeletePermission[configuration.componentType];
                    });
            },
            action: {
                callback: (configuration: IContextualMenuConfiguration, $event: Event): void => {
                    let slotOperationRelatedId: string;
                    let slotOperationRelatedType: string;

                    if (configuration.element) {
                        slotOperationRelatedId = componentHandlerService.getSlotOperationRelatedId(
                            configuration.element
                        );
                        slotOperationRelatedType = componentHandlerService.getSlotOperationRelatedType(
                            configuration.element
                        );
                    } else {
                        slotOperationRelatedId = configuration.containerId
                            ? configuration.containerId
                            : configuration.componentId;
                        slotOperationRelatedType =
                            configuration.containerId && configuration.containerType
                                ? configuration.containerType
                                : configuration.componentType;
                    }

                    const message: any = {};
                    message.description = 'se.cms.contextmenu.removecomponent.confirmation.message';
                    message.title = 'se.cms.contextmenu.removecomponent.confirmation.title';

                    confirmationModalService.confirm(message).then(() => {
                        removeComponentService
                            .removeComponent({
                                slotId: configuration.slotId,
                                slotUuid: configuration.slotUuid,
                                componentId: configuration.componentId,
                                componentType: configuration.componentType,
                                componentUuid:
                                    configuration.componentAttributes.smarteditComponentUuid,
                                slotOperationRelatedId,
                                slotOperationRelatedType
                            })
                            .then(function () {
                                slotVisibilityService.reloadSlotsInfo();

                                // This is necessary in case the component was used more than once in the page. If so, those instances need to be updated.
                                crossFrameEventService.publish(EVENT_SMARTEDIT_COMPONENT_UPDATED, {
                                    componentId: configuration.componentId,
                                    componentType: configuration.componentType,
                                    requiresReplayingDecorators: true
                                } as ComponentUpdatedEventInfo);

                                $translate('se.cms.alert.component.removed.from.slot', {
                                    componentID: slotOperationRelatedId,
                                    slotID: configuration.slotId
                                }).then(function (translation: string) {
                                    alertService.showSuccess({
                                        message: translation
                                    });
                                    $event.preventDefault();
                                    $event.stopPropagation();
                                });
                            });
                    });
                }
            },
            displayClass: 'removebutton',
            displayIconClass: 'sap-icon--decline',
            displaySmallIconClass: 'sap-icon--decline',
            permissions: ['se.context.menu.remove.component']
        });

        featureService.addContextualMenuButton({
            key: 'se.slotContextualMenuVisibility',
            nameI18nKey: 'slotcontextmenu.title.visibility',
            regexpKeys: ['^.*ContentSlot$'],
            action: { templateUrl: 'slotVisibilityWidgetTemplate.html' },
            permissions: ['se.slot.context.menu.visibility']
        });

        featureService.addContextualMenuButton({
            key: 'se.slotSharedButton',
            nameI18nKey: 'slotcontextmenu.title.shared.button',
            regexpKeys: ['^.*Slot$'],
            action: { templateUrl: 'slotSharedTemplate.html' },
            permissions: ['se.slot.context.menu.shared.icon']
        });

        featureService.addContextualMenuButton({
            key: 'slotUnsharedButton',
            nameI18nKey: 'slotcontextmenu.title.unshared.button',
            regexpKeys: ['^.*Slot$'],
            action: { templateUrl: 'slotUnsharedButtonWrapperTemplate.html' },
            permissions: ['se.slot.context.menu.unshared.icon']
        });

        featureService.addContextualMenuButton({
            key: 'se.slotSyncButton',
            nameI18nKey: 'slotcontextmenu.title.sync.button',
            regexpKeys: ['^.*Slot$'],
            action: { templateUrl: 'slotSyncTemplate.html' },
            permissions: ['se.sync.slot.context.menu']
        });

        featureService.addDecorator({
            key: 'syncIndicator',
            nameI18nKey: 'syncIndicator',
            permissions: ['se.sync.slot.indicator']
        });

        featureService.register({
            key: 'disableSharedSlotEditing',
            nameI18nKey: 'se.cms.disableSharedSlotEditing',
            descriptionI18nKey: 'se.cms.disableSharedSlotEditing.description',
            enablingCallback: () => {
                slotSharedService.setSharedSlotEnablementStatus(true);
            },
            disablingCallback: () => {
                slotSharedService.setSharedSlotEnablementStatus(false);
            }
        });

        featureService.addDecorator({
            key: 'sharedSlotDisabledDecorator',
            nameI18nKey: 'se.cms.shared.slot.disabled.decorator',
            // only show that the slot is shared if it is not already external
            displayCondition: (componentType: string, componentId: string) =>
                Promise.all([
                    slotRestrictionsService.isSlotEditable(componentId),
                    componentHandlerService.isExternalComponent(componentId, componentType),
                    slotSharedService.isSlotShared(componentId)
                ]).then(function (response: boolean[]) {
                    return !response[0] && !response[1] && response[2];
                })
        });

        featureService.addDecorator({
            key: 'externalSlotDisabledDecorator',
            nameI18nKey: 'se.cms.external.slot.disabled.decorator',
            displayCondition: (componentType: string, componentId: string) =>
                Promise.resolve(slotSharedService.isGlobalSlot(componentId, componentType))
        });

        featureService.addDecorator({
            key: 'externalComponentDecorator',
            nameI18nKey: 'se.cms.external.component.decorator',
            displayCondition: (componentType: string, componentId: string) =>
                Promise.resolve(
                    componentHandlerService.isExternalComponent(componentId, componentType)
                )
        });

        featureService.addContextualMenuButton({
            key: 'clonecomponentbutton',
            priority: 600,
            nameI18nKey: 'se.cms.contextmenu.title.clone.component',
            i18nKey: 'se.cms.contextmenu.title.clone.component',
            regexpKeys: ['^((?!Slot).)*$'],
            condition: (configuration: IContextualMenuConfiguration) => {
                const componentUuid = configuration.componentAttributes.smarteditComponentUuid;

                if (!configuration.isComponentHidden) {
                    const slotId: string = componentHandlerService.getParentSlotForComponent(
                        configuration.element
                    );
                    return slotRestrictionsService
                        .isSlotEditable(slotId)
                        .then(function (slotEditable: boolean) {
                            if (slotEditable) {
                                return typePermissionsRestService
                                    .hasCreatePermissionForTypes([configuration.componentType])
                                    .then(function (hasCreatePermission: TypedMap<boolean>) {
                                        if (hasCreatePermission[configuration.componentType]) {
                                            return componentInfoService
                                                .getById(componentUuid)
                                                .then((component: any) => component.cloneable);
                                        } else {
                                            return $q.when(false);
                                        }
                                    });
                            }
                            return false;
                        });
                }
                return cmsitemsRestService
                    .getById(componentUuid)
                    .then((component: any) => component.cloneable);
            },
            action: {
                callback: (configuration: IContextualMenuConfiguration): void => {
                    const sourcePosition = componentHandlerService.getComponentPositionInSlot(
                        configuration.slotId,
                        configuration.componentAttributes.smarteditComponentId
                    );
                    componentEditingFacade.cloneExistingComponentToSlot({
                        targetSlotId: configuration.slotId,
                        dragInfo: {
                            componentId: configuration.componentAttributes.smarteditComponentId,
                            componentType: configuration.componentType,
                            componentUuid: configuration.componentAttributes.smarteditComponentUuid
                        },
                        position: sourcePosition + 1
                    });
                }
            },
            displayClass: 'clonebutton',
            displayIconClass: 'sap-icon--duplicate',
            displaySmallIconClass: 'sap-icon--duplicate',
            permissions: ['se.clone.component']
        });
    }
})
export class Cmssmartedit {}
