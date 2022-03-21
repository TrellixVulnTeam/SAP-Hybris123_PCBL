import { OnInit } from '@angular/core';
import { IPageInfoService, ToolbarItemInternal } from 'smarteditcommons';
import { PageVersionSelectionService } from '../services';
export declare class PageVersionMenuComponent implements OnInit {
    pageInfoService: IPageInfoService;
    private pageVersionSelectionService;
    actionItem: ToolbarItemInternal;
    pageUuid: string;
    constructor(pageInfoService: IPageInfoService, pageVersionSelectionService: PageVersionSelectionService, actionItem: ToolbarItemInternal);
    ngOnInit(): Promise<void>;
    onSwitchMode(): void;
}
