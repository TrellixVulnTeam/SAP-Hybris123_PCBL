import { OnInit } from '@angular/core';
import { ICMSPage } from 'cmscommons';
import { MultiNamePermissionContext, IDropdownMenuItemData } from 'smarteditcommons';
import { ClonePageWizardService } from '../../clonePageWizard';
export declare class ClonePageItemComponent implements OnInit {
    private dropdownMenuData;
    private clonePageWizardService;
    pageInfo: ICMSPage;
    clonePagePermission: MultiNamePermissionContext[];
    constructor(dropdownMenuData: IDropdownMenuItemData, clonePageWizardService: ClonePageWizardService);
    ngOnInit(): void;
    onClickOnClone(): void;
}
