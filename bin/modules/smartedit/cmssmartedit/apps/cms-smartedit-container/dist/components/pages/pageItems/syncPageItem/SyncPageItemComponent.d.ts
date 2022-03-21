import { OnInit } from '@angular/core';
import { ICMSPage } from 'cmscommons';
import { ICatalogService, IModalService, LogService, MultiNamePermissionContext, SystemEventService, IDropdownMenuItemData } from 'smarteditcommons';
export declare class SyncPageItemComponent implements OnInit {
    private dropdownMenuData;
    private catalogService;
    private systemEventService;
    private modalService;
    private logService;
    pageInfo: ICMSPage;
    syncPagePermission: MultiNamePermissionContext[];
    constructor(dropdownMenuData: IDropdownMenuItemData, catalogService: ICatalogService, systemEventService: SystemEventService, modalService: IModalService, logService: LogService);
    ngOnInit(): void;
    sync(): Promise<void>;
}
