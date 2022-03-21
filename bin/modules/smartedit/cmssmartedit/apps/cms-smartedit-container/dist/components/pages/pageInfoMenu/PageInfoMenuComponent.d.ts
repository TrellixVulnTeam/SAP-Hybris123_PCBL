import { OnInit, OnDestroy } from '@angular/core';
import { CMSItemStructure, ICMSPage, IPageService } from 'cmscommons';
import { ICatalogService, IUriContext, MultiNamePermissionContext, SystemEventService, ToolbarItemInternal } from 'smarteditcommons';
import { PageInfoForViewing, PageInfoMenuService } from '../services';
export declare class PageInfoMenuComponent implements OnInit, OnDestroy {
    toolbarItem: ToolbarItemInternal;
    private pageInfoMenuService;
    private pageService;
    private catalogService;
    private systemEventService;
    pageInfo: PageInfoForViewing;
    pageStructure: CMSItemStructure;
    isReady: boolean;
    cmsPage: ICMSPage;
    uriContext: IUriContext;
    editPagePermission: MultiNamePermissionContext[];
    private unRegContentCatalogUpdate;
    constructor(toolbarItem: ToolbarItemInternal, pageInfoMenuService: PageInfoMenuService, pageService: IPageService, catalogService: ICatalogService, systemEventService: SystemEventService);
    ngOnInit(): Promise<void>;
    ngOnDestroy(): void;
    onEditPageClick(): void;
    setPageData(): Promise<void>;
    onDropdownToggle(open: boolean): Promise<void>;
    private closeMenu;
}
