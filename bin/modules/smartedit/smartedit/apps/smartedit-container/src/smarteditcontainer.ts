/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces useClass:false */
/* forbiddenNameSpaces useValue:false */
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlHandlingStrategy } from '@angular/router';
import { UpgradeModule } from '@angular/upgrade/static';
import {
    diBridgeUtils,
    diNameUtils,
    moduleUtils,
    AngularJSBootstrapIndicatorService,
    AngularJSLazyDependenciesService,
    AuthenticationManager,
    AuthenticationService,
    AuthorizationService,
    BootstrapPayload,
    ClientPagedListModule,
    ConfirmDialogComponent,
    ContentCatalogRestService,
    CustomHandlingStrategy,
    FilterByFieldPipeModule,
    FundamentalsModule,
    GatewayFactory,
    GatewayProxy,
    HeaderLanguageDropdownComponent,
    HttpInterceptorModule,
    IAuthenticationManagerService,
    IAuthenticationService,
    ICatalogService,
    IConfirmationModalService,
    IExperienceService,
    IFeatureService,
    IIframeClickDetectionService,
    IModalService,
    IPermissionService,
    IRenderService,
    ISessionService,
    ISharedDataService,
    IStorageService,
    IToolbarServiceFactory,
    IUrlService,
    IWaitDialogService,
    L10nService,
    LegacyGEWidgetToCustomElementConverter,
    NonValidationErrorInterceptor,
    NG_ROUTE_PREFIX,
    NG_ROUTE_WILDCARD,
    PermissionContext,
    PermissionErrorInterceptor,
    PreviewErrorInterceptor,
    ProductCatalogRestService,
    PromiseUtils,
    PERSPECTIVE_SELECTOR_WIDGET_KEY,
    ResourceNotFoundErrorInterceptor,
    RestServiceFactory,
    RetryInterceptor,
    SelectModule,
    SeGenericEditorModule,
    SeRouteService,
    SeTranslationModule,
    SharedComponentsModule,
    SmarteditBootstrapGateway,
    SmarteditErrorHandler,
    SmarteditRoutingService,
    SMARTEDIT_IFRAME_WRAPPER_ID,
    SSOAuthenticationHelper,
    ToolbarDropDownPosition,
    ToolbarItemType,
    ToolbarSection,
    UnauthorizedErrorInterceptor,
    YJQUERY_TOKEN
} from 'smarteditcommons';

import { AnnouncementBoardComponent } from './components/announcements/AnnouncementBoardComponent';
import { AnnouncementComponent } from './components/announcements/AnnouncementComponent';
import { ConfigurationModalComponent } from './components/generalConfiguration/ConfigurationModalComponent';
import { HeartBeatAlertComponent } from './components/heartBeat/HeartBeatAlertComponent';
import { HotkeyNotificationModule } from './components/hotkeyNotification';
import { InvalidRouteComponent } from './components/ng/InvalidRouteComponent';
import { SmarteditcontainerComponent } from './components/ng/SmarteditcontainerComponent';
import { NotificationPanelModule } from './components/notifications/NotificationPanelModule';
import { LandingPageComponent, StorefrontPageComponent } from './components/pages';
import { ProductCatalogVersionModule } from './components/productCatalogVersion';
import { ShortcutLinkComponent } from './components/shortcutLink/ShortcutLinkComponent';
import { SitesLinkComponent } from './components/sitesLink/SitesLinkComponent';
import {
    DeviceSupportWrapperComponent,
    ExperienceSelectorWrapperComponent,
    LogoComponent
} from './components/topToolbars';
import { UserAccountComponent } from './components/userAccount/UserAccountComponent';
import {
    AlertServiceModule,
    BootstrapService,
    CatalogService,
    ConfigurationModalService,
    ConfirmationModalService,
    DelegateRestService,
    DEFAULT_DEFAULT_RULE_NAME,
    ExperienceService,
    HeartBeatService,
    IframeClickDetectionService,
    IframeManagerService,
    LoadConfigManagerService,
    PermissionsRegistrationService,
    SessionService,
    SharedDataService,
    SiteService,
    SmarteditServicesModule,
    StorageService,
    StorefrontPageGuard,
    TranslationsFetchService,
    UrlService
} from './services';
import { PerspectiveSelectorComponent } from './services/perspectiveSelectorWidget/PerspectiveSelectorComponent';
import { StorageModule } from './services/storage';

import { ToolbarModule } from './services/toolbar';
import { CatalogDetailsModule } from './services/widgets/catalogDetails/CatalogDetailsModule';

// https://stackoverflow.com/questions/38888008/how-can-i-use-create-dynamic-template-to-compile-dynamic-component-with-angular
export const SmarteditContainerFactory = (bootstrapPayload: BootstrapPayload): any => {
    @NgModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            UpgradeModule,
            HttpClientModule,
            AlertServiceModule,
            FundamentalsModule,
            SeGenericEditorModule,
            SharedComponentsModule,
            ClientPagedListModule,
            FilterByFieldPipeModule,
            NotificationPanelModule,
            StorageModule.forRoot(),
            ToolbarModule,
            CatalogDetailsModule,
            SelectModule,
            HotkeyNotificationModule,
            ProductCatalogVersionModule,
            HttpInterceptorModule.forRoot(
                UnauthorizedErrorInterceptor,
                ResourceNotFoundErrorInterceptor,
                RetryInterceptor,
                NonValidationErrorInterceptor,
                PreviewErrorInterceptor,
                PermissionErrorInterceptor
            ),
            SeTranslationModule.forRoot(TranslationsFetchService),
            SmarteditServicesModule,
            ...bootstrapPayload.modules,
            // AngularJS router is left with '/' path for Landing Page
            // Routes are "flat" because there are routes registered also in cmssmarteditcontainer.ts
            // And they conflict each (overriding themselves)
            SeRouteService.provideNgRoute(
                [
                    {
                        path: NG_ROUTE_PREFIX,
                        shortcutComponent: SitesLinkComponent,
                        component: LandingPageComponent
                    },
                    {
                        path: `${NG_ROUTE_PREFIX}/sites/:siteId`,
                        component: LandingPageComponent
                    },
                    {
                        path: `${NG_ROUTE_PREFIX}/storefront`,
                        canActivate: [StorefrontPageGuard],
                        priority: 30,
                        titleI18nKey: 'se.route.storefront.title',
                        component: StorefrontPageComponent
                    },
                    {
                        path: NG_ROUTE_WILDCARD,
                        component: InvalidRouteComponent
                    }
                ],
                { useHash: true, initialNavigation: true, onSameUrlNavigation: 'reload' }
            )
        ],
        declarations: [
            SmarteditcontainerComponent,
            InvalidRouteComponent,
            SitesLinkComponent,
            ConfirmDialogComponent,
            AnnouncementComponent,
            AnnouncementBoardComponent,
            ConfigurationModalComponent,
            PerspectiveSelectorComponent,
            HeartBeatAlertComponent,
            LandingPageComponent,
            StorefrontPageComponent
        ],
        entryComponents: [
            SmarteditcontainerComponent,
            SitesLinkComponent,
            ConfirmDialogComponent,
            AnnouncementComponent,
            ConfigurationModalComponent,
            PerspectiveSelectorComponent,
            HeartBeatAlertComponent,
            LandingPageComponent,
            StorefrontPageComponent
        ],
        providers: [
            {
                provide: ErrorHandler,
                useClass: SmarteditErrorHandler
            },
            SiteService,
            SSOAuthenticationHelper,
            moduleUtils.provideValues(bootstrapPayload.constants),
            { provide: UrlHandlingStrategy, useClass: CustomHandlingStrategy },
            // APP_BASE_HREF = "!" to be matching legacy angular JS setup
            { provide: APP_BASE_HREF, useValue: '!' },
            LegacyGEWidgetToCustomElementConverter,
            IframeManagerService,
            {
                provide: IAuthenticationManagerService,
                useClass: AuthenticationManager
            },
            {
                provide: IAuthenticationService,
                useClass: AuthenticationService
            },
            {
                provide: IConfirmationModalService,
                useClass: ConfirmationModalService
            },
            {
                provide: ISharedDataService,
                useClass: SharedDataService
            },
            SeRouteService,
            {
                provide: ISessionService,
                useClass: SessionService
            },
            {
                provide: IStorageService,
                useClass: StorageService
            },
            {
                provide: IUrlService,
                useClass: UrlService
            },
            {
                provide: IIframeClickDetectionService,
                useClass: IframeClickDetectionService
            },
            {
                provide: ICatalogService,
                useClass: CatalogService
            },
            {
                provide: IExperienceService,
                useClass: ExperienceService
            },
            SmarteditRoutingService,
            ContentCatalogRestService,
            ProductCatalogRestService,
            LoadConfigManagerService,
            moduleUtils.bootstrap(
                (
                    auth: IAuthenticationService,
                    gatewayProxy: GatewayProxy,
                    bootstrapIndicator: AngularJSBootstrapIndicatorService,
                    featureService: IFeatureService,
                    configurationModalService: ConfigurationModalService,
                    toolbarServiceFactory: IToolbarServiceFactory,
                    loadConfigManagerService: LoadConfigManagerService,
                    gatewayFactory: GatewayFactory,
                    smarteditBootstrapGateway: SmarteditBootstrapGateway,
                    yjQuery: JQueryStatic,
                    iframeManagerService: IframeManagerService,
                    waitDialogService: IWaitDialogService,
                    promiseUtils: PromiseUtils,
                    bootstrapService: BootstrapService,
                    sharedDataService: ISharedDataService,
                    modalService: IModalService,
                    renderService: IRenderService,
                    heartBeatService: HeartBeatService,
                    routingService: SmarteditRoutingService
                ) => {
                    gatewayProxy.initForService(
                        auth,
                        [
                            'filterEntryPoints',
                            'isAuthEntryPoint',
                            'authenticate',
                            'logout',
                            'isReAuthInProgress',
                            'setReAuthInProgress',
                            'isAuthenticated'
                        ],
                        diNameUtils.buildServiceName(AuthenticationService)
                    );
                    gatewayFactory.initListener();

                    bootstrapIndicator.onSmarteditContainerReady().subscribe(() => {
                        routingService.init();
                        routingService.routeChangeSuccess().subscribe((event) => {
                            modalService.dismissAll();
                        });

                        loadConfigManagerService.loadAsObject().then((configurations: any) => {
                            sharedDataService.set(
                                'defaultToolingLanguage',
                                configurations.defaultToolingLanguage
                            );

                            if (!!configurations.typeAheadDebounce) {
                                sharedDataService.set(
                                    'typeAheadDebounce',
                                    configurations.typeAheadDebounce
                                );
                            }

                            if (!!configurations.typeAheadMiniSearchTermLength) {
                                sharedDataService.set(
                                    'typeAheadMiniSearchTermLength',
                                    configurations.typeAheadMiniSearchTermLength
                                );
                            }
                        });

                        featureService.addToolbarItem({
                            toolbarId: 'smartEditPerspectiveToolbar',
                            key: PERSPECTIVE_SELECTOR_WIDGET_KEY,
                            nameI18nKey: 'se.perspective.selector.widget',
                            type: 'TEMPLATE',
                            priority: 1,
                            section: 'left',
                            component: PerspectiveSelectorComponent
                        });

                        const smartEditHeaderToolbarService = toolbarServiceFactory.getToolbarService(
                            'smartEditHeaderToolbar'
                        );

                        smartEditHeaderToolbarService.addItems([
                            {
                                key: 'headerToolbar.logoTemplate',
                                type: ToolbarItemType.TEMPLATE,
                                component: LogoComponent,
                                priority: 1,
                                section: ToolbarSection.left
                            },
                            {
                                key: 'headerToolbar.userAccountTemplate',
                                type: ToolbarItemType.HYBRID_ACTION,
                                iconClassName: 'sap-icon--customer',
                                component: UserAccountComponent,
                                priority: 1,
                                actionButtonFormat: 'compact',
                                section: ToolbarSection.right,
                                dropdownPosition: ToolbarDropDownPosition.right
                            },
                            {
                                key: 'headerToolbar.languageSelectorTemplate',
                                type: ToolbarItemType.HYBRID_ACTION,
                                iconClassName: 'sap-icon--world',
                                component: HeaderLanguageDropdownComponent,
                                priority: 2,
                                actionButtonFormat: 'compact',
                                section: ToolbarSection.right,
                                dropdownPosition: ToolbarDropDownPosition.center
                            },
                            {
                                key: 'headerToolbar.configurationTemplate',
                                type: ToolbarItemType.ACTION,
                                actionButtonFormat: 'compact',
                                iconClassName: 'icon-action-settings',
                                callback: () => {
                                    configurationModalService.editConfiguration();
                                },
                                priority: 3,
                                section: ToolbarSection.right,
                                permissions: ['smartedit.configurationcenter.read']
                            }
                        ]);

                        const smartEditExperienceToolbarService = toolbarServiceFactory.getToolbarService(
                            'smartEditExperienceToolbar'
                        );

                        smartEditExperienceToolbarService.addItems([
                            {
                                key: 'se.cms.shortcut',
                                type: ToolbarItemType.TEMPLATE,
                                component: ShortcutLinkComponent,
                                priority: 1,
                                section: ToolbarSection.left
                            },
                            {
                                key: 'experienceToolbar.deviceSupportTemplate',
                                type: ToolbarItemType.TEMPLATE,
                                component: DeviceSupportWrapperComponent,
                                priority: 1,
                                section: ToolbarSection.right
                            },
                            {
                                type: ToolbarItemType.TEMPLATE,
                                key: 'experienceToolbar.experienceSelectorTemplate',
                                // className: 'se-experience-selector',
                                component: ExperienceSelectorWrapperComponent,
                                priority: 1, // first in the middle
                                section: ToolbarSection.middle
                            }
                        ]);

                        function offSetStorefront() {
                            // Set the storefront offset
                            yjQuery(SMARTEDIT_IFRAME_WRAPPER_ID).css(
                                'padding-top',
                                yjQuery('.se-toolbar-group').height() + 'px'
                            );
                        }

                        // storefront actually loads twice all the JS files, including webApplicationInjector.js, smartEdit must be protected against receiving twice a smartEditBootstrap event
                        function getBootstrapNamespace(): any {
                            /* forbiddenNameSpaces window._:false */
                            if (window.__smartedit__.smartEditBootstrapped) {
                                window.__smartedit__.smartEditBootstrapped = {};
                            }
                            return window.__smartedit__.smartEditBootstrapped;
                        }

                        smarteditBootstrapGateway
                            .getInstance()
                            .subscribe('loading', (eventId: string, data: any) => {
                                const deferred = promiseUtils.defer();

                                iframeManagerService.setCurrentLocation(data.location);
                                waitDialogService.showWaitModal();

                                const smartEditBootstrapped = getBootstrapNamespace();
                                delete smartEditBootstrapped[data.location];

                                return deferred.promise;
                            });

                        smarteditBootstrapGateway
                            .getInstance()
                            .subscribe('unloading', (eventId: string, data: any) => {
                                const deferred = promiseUtils.defer();

                                waitDialogService.showWaitModal();

                                return deferred.promise;
                            });

                        smarteditBootstrapGateway
                            .getInstance()
                            .subscribe('bootstrapSmartEdit', (eventId: string, data: any) => {
                                offSetStorefront();
                                const deferred = promiseUtils.defer();
                                const smartEditBootstrapped = getBootstrapNamespace();

                                if (!smartEditBootstrapped[data.location]) {
                                    smartEditBootstrapped[data.location] = true;
                                    loadConfigManagerService
                                        .loadAsObject()
                                        .then((configurations: any) => {
                                            bootstrapService.bootstrapSEApp(configurations);
                                            deferred.resolve();
                                        });
                                } else {
                                    deferred.resolve();
                                }
                                return deferred.promise;
                            });

                        smarteditBootstrapGateway
                            .getInstance()
                            .subscribe('smartEditReady', function () {
                                const deferred = promiseUtils.defer();
                                deferred.resolve();

                                waitDialogService.hideWaitModal();
                                return deferred.promise;
                            });
                    });
                },
                [
                    IAuthenticationService,
                    GatewayProxy,
                    AngularJSBootstrapIndicatorService,
                    IFeatureService,
                    ConfigurationModalService,
                    IToolbarServiceFactory,
                    LoadConfigManagerService,
                    GatewayFactory,
                    SmarteditBootstrapGateway,
                    YJQUERY_TOKEN,
                    IframeManagerService,
                    IWaitDialogService,
                    PromiseUtils,
                    BootstrapService,
                    ISharedDataService,
                    IModalService,
                    IRenderService,
                    HeartBeatService,
                    SmarteditRoutingService
                ]
            ),
            moduleUtils.initialize(
                (
                    legacyGEWidgetToCustomElementConverter: LegacyGEWidgetToCustomElementConverter,
                    delegateRestService: DelegateRestService,
                    httpClient: HttpClient,
                    restServiceFactory: RestServiceFactory,
                    permissionsRegistrationService: PermissionsRegistrationService,
                    permissionService: IPermissionService,
                    authorizationService: AuthorizationService,
                    l10nService: L10nService
                ) => {
                    diBridgeUtils.downgradeService('httpClient', HttpClient);
                    diBridgeUtils.downgradeService('restServiceFactory', RestServiceFactory);
                    diBridgeUtils.downgradeService(
                        'authenticationService',
                        AuthenticationService,
                        IAuthenticationService
                    );

                    permissionService.registerDefaultRule({
                        names: [DEFAULT_DEFAULT_RULE_NAME],
                        verify: (permissionNameObjs: PermissionContext[]) => {
                            const permissionNames = permissionNameObjs.map(
                                (permissionName: PermissionContext) => permissionName.name
                            );
                            return authorizationService.hasGlobalPermissions(permissionNames);
                        }
                    });

                    legacyGEWidgetToCustomElementConverter.convert();

                    permissionsRegistrationService.registerRulesAndPermissions();

                    return l10nService.resolveLanguage();
                },
                [
                    LegacyGEWidgetToCustomElementConverter,
                    DelegateRestService,
                    HttpClient,
                    RestServiceFactory,
                    PermissionsRegistrationService,
                    IPermissionService,
                    AuthorizationService,
                    L10nService
                ]
            )
        ],
        bootstrap: [SmarteditcontainerComponent]
    })
    class Smarteditcontainer {}
    return Smarteditcontainer;
};
