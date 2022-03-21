/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { ICMSPage } from 'cmscommons';
import { ManagePageService } from 'cmssmarteditcontainer/services/pages/ManagePageService';
import {
    DROPDOWN_MENU_ITEM_DATA,
    IDropdownMenuItemData,
    MultiNamePermissionContext,
    SeDowngradeComponent
} from 'smarteditcommons';

@SeDowngradeComponent()
@Component({
    selector: 'se-restore-page-item',
    templateUrl: './RestorePageItemComponent.html'
})
export class RestorePageItemComponent implements OnInit {
    public pageInfo: ICMSPage;
    public restorePagePermission: MultiNamePermissionContext[];

    constructor(
        private managePageService: ManagePageService,
        @Inject(DROPDOWN_MENU_ITEM_DATA) private dropdownMenuData: IDropdownMenuItemData
    ) {}

    ngOnInit(): void {
        this.pageInfo = this.dropdownMenuData.selectedItem;
        this.restorePagePermission = [
            {
                names: ['se.restore.page.type'],
                context: {
                    typeCode: this.pageInfo.typeCode
                }
            }
        ];
    }

    public restorePage(): void {
        this.managePageService.restorePage(this.pageInfo);
    }
}
