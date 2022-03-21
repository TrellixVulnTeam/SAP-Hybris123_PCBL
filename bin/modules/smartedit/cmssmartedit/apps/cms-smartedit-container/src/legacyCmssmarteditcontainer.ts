/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
// Bundling app as legacy script

// eslint-disable-next-line import/order
import { deprecate } from './deprecate';
deprecate();

import { CmsResourceLocationsModule, CMSModesService, IEditorModalService } from 'cmscommons';
import { CmsSmarteditComponentsModule } from 'cmssmarteditcontainer/components/cmsSmarteditComponentsModule';
import { CmsSmarteditServicesModule } from 'cmssmarteditcontainer/services/cmsSmarteditServicesModule';
import {
    moduleUtils,
    CATALOG_DETAILS_COLUMNS,
    InViewElementObserver,
    IFeatureService,
    IPerspectiveService,
    IToolbarServiceFactory,
    SeModule,
    SeRouteService,
    SmarteditRoutingService,
    SystemEventService,
    ToolbarDropDownPosition,
    ToolbarItemType,
    ToolbarSection,
    NG_ROUTE_PREFIX,
    ICatalogDetailsService
} from 'smarteditcommons';
import { CmsGenericEditorConfigurationService } from './components/legacyGenericEditor/config/CmsGenericEditorConfigurationService';
import { CmsGenericEditorConfigurationServiceModule } from './components/legacyGenericEditor/config/CmsGenericEditorConfigurationServiceModule';
import { NavigationEditorLinkComponent } from './components/navigation/navigationEditor/NavigationEditorLinkComponent';
import { ClonePageWizardService } from './components/pages/clonePageWizard';
import { DeletePageToolbarItemComponent } from './components/pages/deletePageMenu';
import { PageInfoMenuComponent } from './components/pages/pageInfoMenu/PageInfoMenuComponent';
import { PageListLinkComponent } from './components/pages/pageListLink/PageListLinkComponent';
import { TrashLinkComponent } from './components/pages/trashLink/TrashLinkComponent';
import {
    CatalogDetailsSyncComponent,
    PageSyncMenuToolbarItemComponent
} from './components/synchronize';
import {
    VersionItemContextComponent,
    PageVersionMenuComponent,
    ManagePageVersionService,
    RollbackPageVersionService
} from './components/versioning';
import { PageApprovalSelectorComponent } from './components/workflow/components/pageApprovalSelector/PageApprovalSelectorComponent';
import { PageDisplayStatusWrapperComponent } from './components/workflow/components/pageDisplayStatus/PageDisplayStatusWrapperComponent';
import { PageWorkflowMenuComponent } from './components/workflow/components/pageWorkflowMenu/PageWorkflowMenuComponent';
import { WorkflowInboxComponent } from './components/workflow/components/workflowInbox/WorkflowInboxComponent';
import { CmsDragAndDropService } from './services';
import {
    PRODUCT_CATEGORY_RESOURCE_BASE_URI,
    PRODUCT_CATEGORY_RESOURCE_URI,
    PRODUCT_CATEGORY_SEARCH_RESOURCE_URI
} from './services/ProductCategoryService';

@SeModule({
    imports: [
        CmsSmarteditServicesModule,
        CmsSmarteditComponentsModule,
        CmsResourceLocationsModule,
        'legacyCatalogDetailsModule',
        'resourceLocationsModule',
        'cmssmarteditContainerTemplates',
        'componentMenuModule',
        'cmscommonsTemplates',
        'genericEditorModule',
        'smarteditServicesModule',
        'cmsItemDropdownModule',
        'catalogAwareRouteResolverModule',
        'functionsModule',
        CmsGenericEditorConfigurationServiceModule
    ],
    providers: [
        ...moduleUtils.provideValues({
            PRODUCT_CATEGORY_RESOURCE_URI,
            PRODUCT_CATEGORY_RESOURCE_BASE_URI,
            PRODUCT_CATEGORY_SEARCH_RESOURCE_URI
        })
    ],
    config: (
        PAGE_LIST_PATH: string,
        TRASHED_PAGE_LIST_PATH: string,
        NAVIGATION_MANAGEMENT_PAGE_PATH: string,
        $routeProvider: ng.route.IRouteProvider,
        catalogAwareRouteResolverFunctions: any
    ) => {
        'ngInject';
        SeRouteService.init($routeProvider);

        SeRouteService.provideLegacyRoute({
            path: PAGE_LIST_PATH,
            route: {
                redirectTo: `${NG_ROUTE_PREFIX}${PAGE_LIST_PATH}`
            }
        });

        SeRouteService.provideLegacyRoute({
            path: TRASHED_PAGE_LIST_PATH,
            route: {
                redirectTo: `${NG_ROUTE_PREFIX}${TRASHED_PAGE_LIST_PATH}`
            }
        });

        SeRouteService.provideLegacyRoute({
            path: NAVIGATION_MANAGEMENT_PAGE_PATH,
            route: {
                redirectTo: `${NG_ROUTE_PREFIX}${NAVIGATION_MANAGEMENT_PAGE_PATH}`
            }
        });
    },
    initialize:
        /* jshint -W098*/
        /* need to inject for gatewayProxy initialization of componentVisibilityAlertService*/
        (
            $log: angular.ILogService,
            $rootScope: angular.IRootScopeService,
            $routeParams: any,
            $route: angular.route.IRouteService,
            NAVIGATION_MANAGEMENT_PAGE_PATH: string,
            toolbarServiceFactory: IToolbarServiceFactory,
            systemEventService: SystemEventService,
            catalogDetailsService: ICatalogDetailsService,
            featureService: IFeatureService,
            perspectiveService: IPerspectiveService,
            editorFieldMappingService: any,
            genericEditorTabService: any,
            cmsDragAndDropService: CmsDragAndDropService,
            editorModalService: IEditorModalService, // TODO: Iframe does not work properly without it. Nothing happens when you click on "Edit" component button.
            clonePageWizardService: ClonePageWizardService,
            componentVisibilityAlertService: any,
            cmsGenericEditorConfigurationService: CmsGenericEditorConfigurationService,
            managePageVersionService: ManagePageVersionService,
            rollbackPageVersionService: RollbackPageVersionService,
            inViewElementObserver: InViewElementObserver,
            COMPONENT_CLASS: string,
            smarteditRoutingService: SmarteditRoutingService
        ) => {
            'ngInject';
            smarteditRoutingService.init();

            // Configure generic editor
            cmsGenericEditorConfigurationService.setDefaultEditorFieldMappings();
            cmsGenericEditorConfigurationService.setDefaultTabFieldMappings();
            cmsGenericEditorConfigurationService.setDefaultTabsConfiguration();

            featureService.addToolbarItem({
                toolbarId: 'smartEditPerspectiveToolbar',
                key: 'se.cms.componentMenuTemplate',
                type: 'HYBRID_ACTION',
                nameI18nKey: 'se.cms.componentmenu.btn.label.addcomponent',
                descriptionI18nKey: 'cms.toolbaritem.componentmenutemplate.description',
                priority: 100,
                section: 'left',
                dropdownPosition: 'left',
                iconClassName: 'icon-add se-toolbar-menu-ddlb--button__icon',
                callback: () => {
                    systemEventService.publish('ySEComponentMenuOpen', {});
                },
                include: 'componentMenuWrapperTemplate.html',
                permissions: ['se.add.component'],
                keepAliveOnClose: true
            });

            featureService.addToolbarItem({
                toolbarId: 'smartEditPerspectiveToolbar',
                key: 'se.cms.pageInfoMenu',
                type: 'TEMPLATE',
                nameI18nKey: 'se.cms.pageinfo.menu.btn.label',
                priority: 140,
                section: 'left',
                component: PageInfoMenuComponent,
                permissions: ['se.read.page']
            });

            featureService.addToolbarItem({
                toolbarId: 'smartEditPerspectiveToolbar',
                key: 'se.cms.clonePageMenu',
                type: 'ACTION',
                nameI18nKey: 'se.cms.clonepage.menu.btn.label',
                iconClassName: 'icon-duplicate se-toolbar-menu-ddlb--button__icon',
                callback: () => {
                    clonePageWizardService.openClonePageWizard();
                },
                priority: 130,
                section: 'left',
                permissions: ['se.clone.page']
            });

            // sync 120
            featureService.addToolbarItem({
                toolbarId: 'smartEditPerspectiveToolbar',
                key: 'se.cms.pageSyncMenu',
                nameI18nKey: 'se.cms.toolbaritem.pagesyncmenu.name',
                type: 'TEMPLATE',
                component: PageSyncMenuToolbarItemComponent,
                priority: 102,
                section: 'left',
                permissions: ['se.sync.page']
            });

            featureService.addToolbarItem({
                toolbarId: 'smartEditPerspectiveToolbar',
                key: 'deletePageMenu',
                nameI18nKey: 'se.cms.actionitem.page.trash',
                type: 'TEMPLATE',
                component: DeletePageToolbarItemComponent,
                priority: 150,
                section: 'left',
                permissions: ['se.delete.page.menu']
            });

            // versions 102
            featureService.addToolbarItem({
                toolbarId: 'smartEditPerspectiveToolbar',
                key: 'se.cms.pageVersionsMenu',
                type: 'HYBRID_ACTION',
                nameI18nKey: 'se.cms.actionitem.page.versions',
                priority: 104,
                section: 'left',
                iconClassName: 'icon-timesheet se-toolbar-menu-ddlb--button__icon',
                component: PageVersionMenuComponent,
                contextComponent: VersionItemContextComponent,
                permissions: ['se.version.page'],
                keepAliveOnClose: true
            });

            featureService.addToolbarItem({
                toolbarId: 'smartEditPerspectiveToolbar',
                key: 'se.cms.createVersionMenu',
                type: 'ACTION',
                nameI18nKey: 'se.cms.actionitem.page.versions.create',
                iconClassName: 'icon-add se-toolbar-menu-ddlb--button__icon',
                callback: () => {
                    managePageVersionService.createPageVersion();
                },
                priority: 120,
                section: 'left',
                permissions: ['se.version.page', 'se.create.version.page']
            });

            featureService.addToolbarItem({
                toolbarId: 'smartEditPerspectiveToolbar',
                key: 'se.cms.rollbackVersionMenu',
                type: 'ACTION',
                nameI18nKey: 'se.cms.actionitem.page.versions.rollback',
                iconClassName: 'hyicon hyicon-rollback se-toolbar-menu-ddlb--button__icon',
                callback: () => {
                    rollbackPageVersionService.rollbackPageVersion();
                },
                priority: 120,
                section: 'left',
                permissions: ['se.version.page', 'se.rollback.version.page']
            });

            featureService.addToolbarItem({
                toolbarId: 'smartEditPerspectiveToolbar',
                key: 'se.cms.pageWorkflowMenu',
                type: 'TEMPLATE',
                nameI18nKey: 'se.cms.workflow.toolbar.view.workflow.menu',
                component: PageWorkflowMenuComponent,
                priority: 110,
                section: 'right'
            });

            featureService.addToolbarItem({
                toolbarId: 'smartEditPerspectiveToolbar',
                key: 'se.cms.pageDisplayStatus',
                type: 'TEMPLATE',
                nameI18nKey: 'se.cms.page.display.status',
                component: PageDisplayStatusWrapperComponent,
                priority: 120,
                section: 'right',
                permissions: ['se.show.page.status']
            });

            featureService.addToolbarItem({
                toolbarId: 'smartEditPerspectiveToolbar',
                key: 'se.cms.pageApprovalSelector',
                type: 'TEMPLATE',
                nameI18nKey: 'se.cms.page.approval.selector',
                component: PageApprovalSelectorComponent,
                priority: 165,
                section: 'right',
                permissions: ['se.force.page.approval']
            });

            const smartEditHeaderToolbarService = toolbarServiceFactory.getToolbarService(
                'smartEditHeaderToolbar'
            );
            smartEditHeaderToolbarService.addItems([
                {
                    key: 'se.cms.workflowInbox',
                    type: ToolbarItemType.TEMPLATE,
                    component: WorkflowInboxComponent,
                    priority: 4,
                    section: ToolbarSection.right,
                    dropdownPosition: ToolbarDropDownPosition.right
                }
            ]);

            const smartEditNavigationToolbarService = toolbarServiceFactory.getToolbarService(
                'smartEditNavigationToolbar'
            );
            smartEditNavigationToolbarService.addItems([
                {
                    key: 'se.cms.shortcut',
                    type: ToolbarItemType.TEMPLATE,
                    include: 'ShortcutLinkWrapperTemplate.html',
                    priority: 1,
                    section: ToolbarSection.left
                }
            ]);

            const smartEditPagesToolbarService = toolbarServiceFactory.getToolbarService(
                'smartEditPagesToolbar'
            );
            smartEditPagesToolbarService.addItems([
                {
                    key: 'se.cms.shortcut',
                    type: ToolbarItemType.TEMPLATE,
                    include: 'ShortcutLinkWrapperTemplate.html',
                    priority: 1,
                    section: ToolbarSection.left
                },
                {
                    key: 'se.cms.trash.page.link',
                    type: ToolbarItemType.TEMPLATE,
                    component: TrashLinkComponent,
                    priority: 1,
                    section: ToolbarSection.right
                }
            ]);

            catalogDetailsService.addItems([
                {
                    component: PageListLinkComponent
                },
                {
                    component: NavigationEditorLinkComponent
                }
            ]);

            catalogDetailsService.addItems(
                [
                    {
                        component: CatalogDetailsSyncComponent
                    }
                ],
                CATALOG_DETAILS_COLUMNS.RIGHT
            );

            featureService.register({
                key: 'se.cms.html5DragAndDrop.outer',
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

            perspectiveService.register({
                key: CMSModesService.BASIC_PERSPECTIVE_KEY,
                nameI18nKey: 'se.cms.perspective.basic.name',
                descriptionI18nKey: 'se.hotkey.tooltip',
                features: [
                    'se.contextualMenu',
                    'se.cms.dragandropbutton',
                    'se.cms.remove',
                    'se.cms.edit',
                    'se.cms.componentMenuTemplate',
                    'se.cms.clonePageMenu',
                    'se.cms.pageInfoMenu',
                    'se.emptySlotFix',
                    'se.cms.html5DragAndDrop',
                    'disableSharedSlotEditing',
                    'sharedSlotDisabledDecorator',
                    'se.cms.html5DragAndDrop.outer',
                    'externalComponentDecorator',
                    'externalcomponentbutton',
                    'externalSlotDisabledDecorator',
                    'clonecomponentbutton',
                    'deletePageMenu',
                    'se.cms.pageWorkflowMenu',
                    'se.cms.pageDisplayStatus',
                    'se.cms.pageApprovalSelector',
                    'se.cms.sharedcomponentbutton'
                ],
                perspectives: []
            });

            /* Note: For advance edit mode, the ordering of the entries in the features list will determine the order the buttons will show in the slot contextual menu */
            /* externalSlotDisabledDecorator will be removed after 2105 release */
            perspectiveService.register({
                key: CMSModesService.ADVANCED_PERSPECTIVE_KEY,
                nameI18nKey: 'se.cms.perspective.advanced.name',
                descriptionI18nKey: 'se.hotkey.tooltip',
                features: [
                    'se.slotContextualMenu',
                    'se.slotSyncButton',
                    'se.slotSharedButton',
                    'se.slotContextualMenuVisibility',
                    'se.contextualMenu',
                    'se.cms.dragandropbutton',
                    'se.cms.remove',
                    'se.cms.edit',
                    'se.cms.componentMenuTemplate',
                    'se.cms.clonePageMenu',
                    'se.cms.pageInfoMenu',
                    'se.cms.pageSyncMenu',
                    'se.emptySlotFix',
                    'se.cms.html5DragAndDrop',
                    'se.cms.html5DragAndDrop.outer',
                    'syncIndicator',
                    'externalSlotDisabledDecorator',
                    'externalComponentDecorator',
                    'externalcomponentbutton',
                    'clonecomponentbutton',
                    'slotUnsharedButton',
                    'deletePageMenu',
                    'se.cms.pageVersionsMenu',
                    'se.cms.pageWorkflowMenu',
                    'se.cms.pageDisplayStatus',
                    'se.cms.pageApprovalSelector',
                    'se.cms.sharedcomponentbutton'
                ],
                perspectives: []
            });

            perspectiveService.register({
                key: CMSModesService.VERSIONING_PERSPECTIVE_KEY,
                nameI18nKey: 'se.cms.perspective.versioning.name',
                descriptionI18nKey: 'se.cms.perspective.versioning.description',
                features: [
                    'se.cms.pageVersionsMenu',
                    'se.cms.createVersionMenu',
                    'se.cms.rollbackVersionMenu',
                    'se.cms.pageInfoMenu',
                    'disableSharedSlotEditing',
                    'sharedSlotDisabledDecorator',
                    'externalSlotDisabledDecorator',
                    'externalComponentDecorator'
                ],
                perspectives: [],
                permissions: ['se.version.page'],
                isHotkeyDisabled: true
            });

            inViewElementObserver.addSelector(`.${COMPONENT_CLASS}`, () => {
                cmsDragAndDropService.update();
            });
        }
})
export class CmssmarteditContainer {}
