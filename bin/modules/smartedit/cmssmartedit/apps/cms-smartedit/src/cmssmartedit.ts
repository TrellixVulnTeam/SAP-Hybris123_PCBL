/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import {
    CmsCommonsModule,
    IPageContentSlotsComponentsRestService,
    ISyncPollingService,
    IRemoveComponentService,
    IPageService,
    IContextAwareEditableItemService,
    IEditorModalService,
    IComponentVisibilityAlertService,
    IComponentSharedService,
    ISlotRestrictionsService
} from 'cmscommons';
import {
    diBridgeUtils,
    ICatalogService,
    moduleUtils,
    SeEntryModule,
    SeTranslationModule
} from 'smarteditcommons';
import { SyncIndicatorDecorator } from './components/synchronize/slots/SyncIndicatorDecorator';
import './components/contextualSlotDropdown.scss';
import { PageContentSlotsComponentsRestService } from './dao/pageContentSlotsComponentsRestService';
import {
    CmsDragAndDropService,
    ComponentEditingFacade,
    ComponentSharedService,
    ComponentVisibilityAlertService,
    EditorEnablerService,
    PageService,
    SlotRestrictionsService,
    SlotSharedService
} from './services';
import { ComponentInfoService } from './services/ComponentInfoService';
import { ContextAwareEditableItemService } from './services/contextAwareEditableItem/ContextAwareEditableItemServiceInner';
import { ContextualMenuDropdownService } from './services/ContextualMenuDropdownService';
import { EditorModalService } from './services/EditorModalServiceInner';
import { HiddenComponentMenuService } from './services/HiddenComponentMenuService';
import { PageContentSlotsService } from './services/PageContentSlotsService';
import { RemoveComponentService } from './services/RemoveComponentServiceInner';
import { SlotContainerService } from './services/SlotContainerService';
import { SlotSynchronizationService } from './services/SlotSynchronizationService';
import { SlotUnsharedService } from './services/SlotUnsharedService';
import { SlotVisibilityService } from './services/SlotVisibilityService';
import { SyncPollingService } from './services/SyncPollingServiceInner';

@SeEntryModule('cmssmartedit')
@NgModule({
    imports: [CmsCommonsModule, BrowserModule, UpgradeModule, SeTranslationModule.forChild()],
    declarations: [SyncIndicatorDecorator],
    entryComponents: [SyncIndicatorDecorator],
    providers: [
        diBridgeUtils.upgradeProvider('$q'),
        diBridgeUtils.upgradeProvider('catalogService', ICatalogService),
        diBridgeUtils.upgradeProvider('slotSynchronizationService'),
        diBridgeUtils.upgradeProvider('pageInfoService'),
        {
            provide: IPageContentSlotsComponentsRestService,
            useClass: PageContentSlotsComponentsRestService
        },
        {
            provide: ISyncPollingService,
            useClass: SyncPollingService
        },
        ContextualMenuDropdownService,
        moduleUtils.initialize(
            (contextualMenuDropdownService: ContextualMenuDropdownService) => {
                contextualMenuDropdownService.registerIsOpenEvent();
            },
            [ContextualMenuDropdownService]
        ),
        PageContentSlotsService,
        SlotUnsharedService,
        SlotVisibilityService,
        SlotContainerService,
        HiddenComponentMenuService,
        ComponentInfoService,
        SlotSynchronizationService,
        SlotSharedService,
        EditorEnablerService,
        ComponentEditingFacade,
        CmsDragAndDropService,
        {
            provide: IRemoveComponentService,
            useClass: RemoveComponentService
        },
        {
            provide: IPageService,
            useClass: PageService
        },
        {
            provide: IContextAwareEditableItemService,
            useClass: ContextAwareEditableItemService
        },
        {
            provide: IEditorModalService,
            useClass: EditorModalService
        },
        {
            provide: IComponentVisibilityAlertService,
            useClass: ComponentVisibilityAlertService
        },
        {
            provide: IComponentSharedService,
            useClass: ComponentSharedService
        },
        {
            provide: ISlotRestrictionsService,
            useClass: SlotRestrictionsService
        }
    ]
})
export class CmssmarteditModule {}
