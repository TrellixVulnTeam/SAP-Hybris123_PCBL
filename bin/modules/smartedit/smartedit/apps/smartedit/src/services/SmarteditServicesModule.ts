/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';

import {
    moduleUtils,
    DragAndDropServiceModule,
    IAnnouncementService,
    ICatalogVersionPermissionService,
    IDragAndDropCrossOrigin,
    IFeatureService,
    INotificationMouseLeaveDetectionService,
    INotificationService,
    IPageInfoService,
    IPermissionService,
    IPerspectiveService,
    IPositionRegistry,
    IPreviewService,
    IRenderService,
    IResizeListener,
    IRestServiceFactory,
    ISmartEditContractChangeListener,
    IWaitDialogService,
    PolyfillService,
    PriorityService,
    SmarteditCommonsModule
} from 'smarteditcommons';

import { AnnouncementService } from './AnnouncementServiceInner';
import { CatalogVersionPermissionService } from './catalogVersionPermissionServiceInner';
import { ComponentHandlerService } from './ComponentHandlerService';
import { ContextualMenuService } from './ContextualMenuService';
import { DelegateRestService } from './DelegateRestServiceInner';
import { DragAndDropCrossOrigin } from './DragAndDropCrossOriginInner';
import { FeatureService } from './FeatureServiceInner';
import { NotificationMouseLeaveDetectionService } from './NotificationMouseLeaveDetectionServiceInner';
import { NotificationService } from './NotificationServiceInner';
import { PageInfoService } from './PageInfoServiceInner';
import { PermissionService } from './PermissionServiceInner';
import { PerspectiveService } from './PerspectiveServiceInner';
import { PositionRegistry } from './PositionRegistry';
import { PreviewService } from './PreviewServiceInner';
import { RenderService } from './RenderServiceInner';
import { ResizeComponentService } from './resizeComponentService';
import { ResizeListener } from './ResizeListener';
import { RestServiceFactory } from './RestServiceFactoryInner';
import { SeNamespaceService } from './SeNamespaceService';
import { SmartEditContractChangeListener } from './SmartEditContractChangeListener';
import { WaitDialogService } from './WaitDialogServiceInner';

@NgModule({
    imports: [DragAndDropServiceModule, SmarteditCommonsModule],
    providers: [
        { provide: IPermissionService, useClass: PermissionService },
        DelegateRestService,
        RestServiceFactory,
        ResizeListener,
        SeNamespaceService,
        ContextualMenuService,
        ComponentHandlerService,
        ResizeComponentService,
        PriorityService,
        {
            provide: IRestServiceFactory,
            useClass: RestServiceFactory
        },
        {
            provide: IRenderService,
            useClass: RenderService
        },
        {
            provide: ICatalogVersionPermissionService,
            useClass: CatalogVersionPermissionService
        },
        {
            provide: ISmartEditContractChangeListener,
            useClass: SmartEditContractChangeListener
        },
        { provide: IPageInfoService, useClass: PageInfoService },
        {
            provide: IResizeListener,
            useClass: ResizeListener
        },
        {
            provide: IPositionRegistry,
            useClass: PositionRegistry
        },
        {
            provide: IAnnouncementService,
            useClass: AnnouncementService
        },
        {
            provide: IPerspectiveService,
            useClass: PerspectiveService
        },
        {
            provide: IFeatureService,
            useClass: FeatureService
        },
        {
            provide: INotificationMouseLeaveDetectionService,
            useClass: NotificationMouseLeaveDetectionService
        },
        {
            provide: IWaitDialogService,
            useClass: WaitDialogService
        },
        {
            provide: IPreviewService,
            useClass: PreviewService
        },
        {
            provide: IDragAndDropCrossOrigin,
            useClass: DragAndDropCrossOrigin
        },
        PolyfillService,
        {
            provide: INotificationService,
            useClass: NotificationService
        },
        moduleUtils.initialize(
            (notificationMouseLeaveDetectionService: NotificationMouseLeaveDetectionService) => {
                //
            },
            [INotificationMouseLeaveDetectionService]
        )
    ]
})
export class SmarteditServicesModule {}
