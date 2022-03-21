/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, OnInit, Inject } from '@angular/core';
import { ICMSPage } from 'cmscommons';
import {
    MultiNamePermissionContext,
    SeDowngradeComponent,
    DROPDOWN_MENU_ITEM_DATA,
    IDropdownMenuItemData
} from 'smarteditcommons';
import { PageInfoMenuService } from '../../services';

/**
 * EditPageItem builds an action item allowing for the edition of a given CMS page
 */
@SeDowngradeComponent()
@Component({
    selector: 'se-edit-page-item',
    templateUrl: './EditPageItemComponent.html'
})
export class EditPageItemComponent implements OnInit {
    public pageInfo: ICMSPage;
    public editPagePermission: MultiNamePermissionContext[];

    constructor(
        @Inject(DROPDOWN_MENU_ITEM_DATA) private dropdownMenuData: IDropdownMenuItemData,
        private pageInfoMenuService: PageInfoMenuService
    ) {}

    ngOnInit(): void {
        this.pageInfo = this.dropdownMenuData.selectedItem;
        this.editPagePermission = [
            {
                names: ['se.edit.page.type'],
                context: {
                    typeCode: this.pageInfo.typeCode
                }
            },
            {
                names: ['se.act.on.page.in.workflow'],
                context: {
                    pageInfo: this.pageInfo
                }
            }
        ];
    }

    onClickOnEdit(): void {
        return this.pageInfoMenuService.openPageEditor(this.pageInfo);
    }
}
