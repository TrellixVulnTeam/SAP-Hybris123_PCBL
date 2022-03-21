import { OnInit } from '@angular/core';
import { ICMSPage } from 'cmscommons';
import { ManagePageService } from 'cmssmarteditcontainer/services/pages/ManagePageService';
import { ICatalogService, MultiNamePermissionContext, SystemEventService, IDropdownMenuItemData } from 'smarteditcommons';
export declare class DeletePageItemComponent implements OnInit {
    private dropdownMenuData;
    private managePageService;
    private systemEventService;
    private catalogService;
    pageInfo: ICMSPage;
    isDeletePageEnabled: boolean;
    tooltipMessage: string;
    deletePagePermission: MultiNamePermissionContext[];
    constructor(dropdownMenuData: IDropdownMenuItemData, managePageService: ManagePageService, systemEventService: SystemEventService, catalogService: ICatalogService);
    ngOnInit(): Promise<void>;
    onClickOnDeletePage(): Promise<void>;
    private setDeletePermissions;
    private getDisableDeleteTooltipMessage;
}
