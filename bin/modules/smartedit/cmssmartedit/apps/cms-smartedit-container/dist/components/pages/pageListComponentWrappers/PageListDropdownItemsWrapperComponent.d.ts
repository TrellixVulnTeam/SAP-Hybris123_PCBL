import { ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICMSPage } from 'cmscommons';
import { ManagePageService } from 'cmssmarteditcontainer/services/pages/ManagePageService';
import { DataTableComponentData, ICatalogVersionPermissionService, IDropdownMenuItem } from 'smarteditcommons';
export declare class PageListDropdownItemsWrapperComponent implements OnInit {
    private route;
    data: DataTableComponentData;
    private catalogVersionPermissionService;
    private managePageService;
    private cdr;
    dropdownItems: IDropdownMenuItem[];
    item: ICMSPage;
    constructor(route: ActivatedRoute, data: DataTableComponentData, catalogVersionPermissionService: ICatalogVersionPermissionService, managePageService: ManagePageService, cdr: ChangeDetectorRef);
    ngOnInit(): Promise<void>;
    private setDropdownItems;
    private addDropdownItem;
}
