import { OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { IPageService, ICMSPage } from 'cmscommons';
import { DisplayConditionsFacade } from 'cmssmarteditcontainer/facades';
import { FetchStrategy } from 'smarteditcommons';
export declare class DisplayConditionsPrimaryPageComponent implements OnChanges {
    private pageService;
    private displayConditionsFacade;
    readOnly: boolean;
    associatedPrimaryPage: ICMSPage;
    pageType: string;
    onPrimaryPageSelect: EventEmitter<ICMSPage>;
    associatedPrimaryPageUid: string;
    fetchStrategy: FetchStrategy;
    constructor(pageService: IPageService, displayConditionsFacade: DisplayConditionsFacade);
    ngOnChanges(changes: SimpleChanges): void;
    associatedPrimaryPageUidOnChange(uid: string): Promise<void>;
    private setAssociatedPrimaryPageSelected;
}
