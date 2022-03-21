/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces useClass:false */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import {
    CmsCommonsModule,
    IPageContentSlotsComponentsRestService,
    ISyncPollingService,
    IRemoveComponentService,
    VersionExperienceInterceptor,
    IPageService,
    TRASHED_PAGE_LIST_PATH,
    IContextAwareEditableItemService,
    IEditorModalService,
    IComponentVisibilityAlertService,
    IComponentSharedService,
    ISlotRestrictionsService,
    PAGE_LIST_PATH,
    NAVIGATION_MANAGEMENT_PAGE_PATH
} from 'cmscommons';
import {
    IToolbarServiceFactory,
    L10nPipeModule,
    MessageModule,
    moduleUtils,
    NG_ROUTE_PREFIX,
    ResponseAdapterInterceptor,
    SeEntryModule,
    SeGenericEditorModule,
    SeRouteService,
    SeTranslationModule,
    SharedComponentsModule,
    ToolbarItemType,
    ToolbarSection,
    TooltipModule
} from 'smarteditcommons';
import { CmsComponentsModule } from './components/cmsComponents/CmsComponentsModule';
import { GenericEditorWidgetsModule, MediaModule } from './components/genericEditor';
import { InfoPageNameComponent } from './components/legacyGenericEditor/infoPageNameTemplate/InfoPageNameComponent';
import { LinkToggleComponent } from './components/legacyGenericEditor/linkToggle/LinkToggleComponent';
import { PageTypeEditorComponent } from './components/legacyGenericEditor/pageType/PageTypeEditorComponent';
import { SingeActiveCatalogAwareItemSelectorItemRendererComponent } from './components/legacyGenericEditor/singleActiveCatalogAwareSelector/SingeActiveCatalogAwareItemSelectorItemRendererComponent';
import { SingleActiveCatalogAwareItemSelectorComponent } from './components/legacyGenericEditor/singleActiveCatalogAwareSelector/SingleActiveCatalogAwareItemSelectorComponent';
import { NavigationManagementPageComponent } from './components/navigation/NavigationManagementPageComponent';
import { NavigationModule } from './components/navigation/NavigationModule';
import { PageComponentsModule } from './components/pages/PageComponentsModule';
import { PageListComponent } from './components/pages/pageList/PageListComponent';
import { PagesLinkComponent } from './components/pages/pagesLink/PagesLinkComponent';
import { TrashedPageListComponent } from './components/pages/trashedPageList/TrashedPageListComponent';
import { TrashedPageListModule } from './components/pages/trashedPageList/TrashedPageListModule';
import { RestrictionsModule } from './components/restrictions/RestrictionsModule';
import { SynchronizationModule } from './components/synchronize';
import { VersioningModule } from './components/versioning';
import { WorkflowModule } from './components/workflow/WorkflowModule';
import {
    CatalogVersionRestService,
    PageRestrictionsRestService,
    PageTypesRestrictionTypesRestService
} from './dao';
import { PageContentSlotsComponentsRestService } from './dao/PageContentSlotsComponentsRestServiceOuter';
import { PagesFallbacksRestService } from './dao/PagesFallbacksRestService';
import { PagesRestService } from './dao/PagesRestService';
import { PagesVariationsRestService } from './dao/PagesVariationsRestService';
import { PageTypeService } from './dao/PageTypeService';
import { RestrictionTypesRestService } from './dao/RestrictionTypesRestService';
import { StructureModeManagerFactory } from './dao/StructureModeManagerFactory';
import { StructuresRestService } from './dao/StructuresRestService';
import { TypeStructureRestService } from './dao/TypeStructureRestService';
import { DisplayConditionsFacade } from './facades/DisplayConditionsFacade';
import { PageFacade } from './facades/PageFacade';
import {
    EditorModalService,
    HomepageService,
    ComponentVisibilityAlertService,
    CmsDragAndDropService,
    ContextAwareCatalogService,
    RulesAndPermissionsRegistrationService
} from './services';
import { PageRestoredAlertService } from './services/actionableAlert';
import { ActionableAlertService } from './services/actionableAlert/ActionableAlertService';
import { ClonePageAlertComponent } from './services/actionableAlert/ClonePageAlertComponent';
import { ClonePageAlertService } from './services/actionableAlert/ClonePageAlertService';
import { PageRestoredAlertComponent } from './services/actionableAlert/PageRestoredAlertComponent';
import { ComponentSharedService } from './services/components';
import { GenericEditorModalComponent } from './services/components/GenericEditorModalComponent';
import { ContextAwareEditableItemService } from './services/contextAwareEditableItem/ContextAwareEditableItemServiceOuter';
import { GenericEditorModalService } from './services/GenericEditorModalService';
import { ExperienceGuard } from './services/guards/ExperienceGuard';
import {
    DisplayConditionsEditorModel,
    PageDisplayConditionsService
} from './services/pageDisplayConditions';
import { PageRestrictionsCriteriaService } from './services/pageRestrictions/PageRestrictionsCriteriaService';
import { PageRestrictionsService } from './services/pageRestrictions/PageRestrictionsService';
import { PageTypesRestrictionTypesService } from './services/pageRestrictions/PageTypesRestrictionTypesService';
import { RestrictionTypesService } from './services/pageRestrictions/RestrictionTypesService';
import { PageRestoreModalService, PageService } from './services/pages';
import { AddPageWizardService } from './services/pages/AddPageWizardService';
import { ManagePageService } from './services/pages/ManagePageService';
import { RestrictionsStepHandlerFactory } from './services/pages/RestrictionsStepHandlerFactory';
import { PageTemplateService } from './services/PageTemplateService';
import { ProductCategoryService } from './services/ProductCategoryService';
import { RemoveComponentService } from './services/RemoveComponentServiceOuter';
import { RestrictionsService } from './services/RestrictionsService';
import { SlotRestrictionsService } from './services/SlotRestrictionsServiceOuter';
import { SyncPollingService } from './services/SyncPollingServiceOuter';

@SeEntryModule('cmssmarteditContainer')
@NgModule({
    imports: [
        CmsCommonsModule,
        BrowserModule,
        UpgradeModule,
        SharedComponentsModule,
        SeGenericEditorModule,
        MessageModule,
        TooltipModule,
        WorkflowModule,
        VersioningModule,
        SynchronizationModule,
        SeTranslationModule.forChild(),
        L10nPipeModule,
        NavigationModule,
        GenericEditorWidgetsModule,
        MediaModule,
        PageComponentsModule,
        TrashedPageListModule,
        RestrictionsModule,
        CmsComponentsModule,
        FormsModule,
        // Routes are "flat" because there are routes registered also in smarteditcontainer.ts
        // And they conflict each (overriding themselves)
        SeRouteService.provideNgRoute(
            [
                {
                    path: `${NG_ROUTE_PREFIX}${TRASHED_PAGE_LIST_PATH}`,
                    component: TrashedPageListComponent,
                    canActivate: [ExperienceGuard]
                },
                {
                    path: `${NG_ROUTE_PREFIX}${PAGE_LIST_PATH}`,
                    component: PageListComponent,
                    canActivate: [ExperienceGuard],
                    titleI18nKey: 'se.cms.pagelist.title',
                    priority: 20
                },
                {
                    path: `${NG_ROUTE_PREFIX}${NAVIGATION_MANAGEMENT_PAGE_PATH}`,
                    component: NavigationManagementPageComponent,
                    titleI18nKey: 'se.cms.toolbaritem.navigationmenu.name',
                    canActivate: [ExperienceGuard],
                    priority: 10
                }
            ],
            { useHash: true, initialNavigation: true, onSameUrlNavigation: 'reload' }
        )
    ],
    providers: [
        PageRestrictionsRestService,
        PageRestrictionsCriteriaService,
        ExperienceGuard,
        ActionableAlertService,
        PageRestrictionsCriteriaService,
        PageRestoredAlertService,
        PageRestoreModalService,
        HomepageService,
        ManagePageService,
        PageTypesRestrictionTypesRestService,
        PageTypesRestrictionTypesService,
        RestrictionTypesRestService,
        RestrictionTypesService,
        ProductCategoryService,
        CatalogVersionRestService,
        PagesRestService,
        PagesVariationsRestService,
        PagesFallbacksRestService,
        PageTypeService,
        StructuresRestService,
        StructureModeManagerFactory,
        TypeStructureRestService,
        RestrictionsService,
        PageRestrictionsService,
        GenericEditorModalService,
        RestrictionsStepHandlerFactory,
        PageFacade,
        PageDisplayConditionsService,
        PageTemplateService,
        DisplayConditionsFacade,
        CmsDragAndDropService,
        DisplayConditionsEditorModel,
        ContextAwareCatalogService,
        RulesAndPermissionsRegistrationService,
        AddPageWizardService,
        ClonePageAlertService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: VersionExperienceInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResponseAdapterInterceptor,
            multi: true
        },
        {
            provide: IPageContentSlotsComponentsRestService,
            useClass: PageContentSlotsComponentsRestService
        },
        {
            provide: ISyncPollingService,
            useClass: SyncPollingService
        },
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
        },
        moduleUtils.bootstrap(
            (
                toolbarServiceFactory: IToolbarServiceFactory,
                rulesAndPermissionsRegistrationService: RulesAndPermissionsRegistrationService
            ) => {
                const smartEditTrashPageToolbarService = toolbarServiceFactory.getToolbarService(
                    'smartEditTrashPageToolbar'
                );
                smartEditTrashPageToolbarService.addItems([
                    {
                        key: 'se.cms.pages.list.link',
                        type: ToolbarItemType.TEMPLATE,
                        component: PagesLinkComponent,
                        priority: 1,
                        section: ToolbarSection.left
                    }
                ]);

                rulesAndPermissionsRegistrationService.register();
            },
            [IToolbarServiceFactory, RulesAndPermissionsRegistrationService]
        )
    ],
    declarations: [
        GenericEditorModalComponent,
        PageRestoredAlertComponent,
        ClonePageAlertComponent,
        SingleActiveCatalogAwareItemSelectorComponent,
        SingeActiveCatalogAwareItemSelectorItemRendererComponent,
        LinkToggleComponent,
        InfoPageNameComponent,
        PageTypeEditorComponent
    ],
    entryComponents: [
        GenericEditorModalComponent,
        PageRestoredAlertComponent,
        ClonePageAlertComponent,
        SingleActiveCatalogAwareItemSelectorComponent,
        SingeActiveCatalogAwareItemSelectorItemRendererComponent,
        LinkToggleComponent,
        InfoPageNameComponent,
        PageTypeEditorComponent
    ]
})
export class CmssmarteditContainerModule {}
