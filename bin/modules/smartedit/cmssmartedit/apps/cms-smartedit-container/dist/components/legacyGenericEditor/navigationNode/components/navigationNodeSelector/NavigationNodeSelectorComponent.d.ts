import { OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CMSItem, CmsitemsRestService } from 'cmscommons';
import { ICatalogService, SystemEventService, GenericEditorWidgetData, IUriContext, GenericEditorAttribute } from 'smarteditcommons';
export declare class NavigationNodeSelectorComponent implements OnInit, OnDestroy {
    private data;
    private catalogService;
    private cmsitemsRestService;
    private systemEventService;
    private cdr;
    field: GenericEditorAttribute;
    cmsItem: CMSItem;
    qualifier: string;
    isReady: boolean;
    nodeUid: string;
    uriContext: IUriContext;
    private unregisterSubscription;
    constructor(data: GenericEditorWidgetData<CMSItem>, catalogService: ICatalogService, cmsitemsRestService: CmsitemsRestService, systemEventService: SystemEventService, cdr: ChangeDetectorRef);
    ngOnInit(): Promise<void>;
    ngOnDestroy(): void;
    remove(): void;
}
