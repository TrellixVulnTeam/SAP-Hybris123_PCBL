import { OnInit } from '@angular/core';
import { ICMSPage } from 'cmscommons';
import { MultiNamePermissionContext, IDropdownMenuItemData } from 'smarteditcommons';
import { PageInfoMenuService } from '../../services';
export declare class EditPageItemComponent implements OnInit {
    private dropdownMenuData;
    private pageInfoMenuService;
    pageInfo: ICMSPage;
    editPagePermission: MultiNamePermissionContext[];
    constructor(dropdownMenuData: IDropdownMenuItemData, pageInfoMenuService: PageInfoMenuService);
    ngOnInit(): void;
    onClickOnEdit(): void;
}
