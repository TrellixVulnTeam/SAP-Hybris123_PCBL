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
import { ClonePageWizardService } from '../../clonePageWizard';

/**
 * ClonePageItemComponent builds an item allowing for the cloning of a given CMS
 * page.
 */
@SeDowngradeComponent()
@Component({
    selector: 'se-clone-page-item',
    templateUrl: './ClonePageItemComponent.html'
})
export class ClonePageItemComponent implements OnInit {
    public pageInfo: ICMSPage;
    public clonePagePermission: MultiNamePermissionContext[];

    constructor(
        @Inject(DROPDOWN_MENU_ITEM_DATA) private dropdownMenuData: IDropdownMenuItemData,
        private clonePageWizardService: ClonePageWizardService
    ) {}

    ngOnInit(): void {
        this.pageInfo = this.dropdownMenuData.selectedItem;
        this.clonePagePermission = [
            {
                names: ['se.clone.page.type'],
                context: {
                    typeCode: this.pageInfo.typeCode
                }
            }
        ];
    }

    onClickOnClone(): void {
        this.clonePageWizardService.openClonePageWizard(this.pageInfo);
    }
}
