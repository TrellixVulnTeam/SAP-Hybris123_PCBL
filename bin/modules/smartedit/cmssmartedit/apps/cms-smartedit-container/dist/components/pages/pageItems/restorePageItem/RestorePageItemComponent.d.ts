import { OnInit } from '@angular/core';
import { ICMSPage } from 'cmscommons';
import { ManagePageService } from 'cmssmarteditcontainer/services/pages/ManagePageService';
import { IDropdownMenuItemData, MultiNamePermissionContext } from 'smarteditcommons';
export declare class RestorePageItemComponent implements OnInit {
    private managePageService;
    private dropdownMenuData;
    pageInfo: ICMSPage;
    restorePagePermission: MultiNamePermissionContext[];
    constructor(managePageService: ManagePageService, dropdownMenuData: IDropdownMenuItemData);
    ngOnInit(): void;
    restorePage(): void;
}
