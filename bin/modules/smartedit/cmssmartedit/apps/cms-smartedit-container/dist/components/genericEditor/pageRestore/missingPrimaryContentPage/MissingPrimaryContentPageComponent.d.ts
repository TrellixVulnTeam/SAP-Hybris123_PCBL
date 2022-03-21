import { OnInit } from '@angular/core';
import { ICMSPage, IPageService } from 'cmscommons';
import { FetchStrategy, GenericEditorWidgetData, LogService, SelectItem } from 'smarteditcommons';
export declare class MissingPrimaryContentPageComponent implements OnInit {
    data: GenericEditorWidgetData<any>;
    private pageService;
    private logService;
    cmsPage: ICMSPage;
    fetchStrategy: FetchStrategy<SelectItem>;
    private readonly CONTENT_PAGE_TYPE_CODE;
    private readonly ERROR_MSG;
    constructor(data: GenericEditorWidgetData<any>, pageService: IPageService, logService: LogService);
    ngOnInit(): void;
    private fetchEntity;
    private fetchPage;
    private getSelectItemFromPrimaryPage;
}
