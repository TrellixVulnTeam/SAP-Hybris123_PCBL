import { OnDestroy, OnInit } from '@angular/core';
import { CmsitemsRestService, ICMSPage } from 'cmscommons';
import { ManagePageService } from 'cmssmarteditcontainer/services/pages/ManagePageService';
import { CrossFrameEventService, ICatalogService, IDropdownMenuItemData, MultiNamePermissionContext } from 'smarteditcommons';
export declare class PermanentlyDeletePageItemComponent implements OnInit, OnDestroy {
    private managePageService;
    private cmsitemsRestService;
    private catalogService;
    private crossFrameEventService;
    private dropdownMenuData;
    pageInfo: ICMSPage;
    permanentlyDeletePagePermission: MultiNamePermissionContext[];
    private unregPageSyncStatusUpdate;
    private isDeletable;
    constructor(managePageService: ManagePageService, cmsitemsRestService: CmsitemsRestService, catalogService: ICatalogService, crossFrameEventService: CrossFrameEventService, dropdownMenuData: IDropdownMenuItemData);
    ngOnInit(): Promise<void>;
    ngOnDestroy(): void;
    permanentlyDelete(): void;
    isDeleteButtonDisabled(): boolean;
    private fetchPageDeletableConditions;
}
