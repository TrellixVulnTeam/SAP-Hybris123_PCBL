/// <reference types="angular" />
import { AbstractDecorator, CrossFrameEventService, ICatalogService, IPageInfoService, TypedMap } from 'smarteditcommons';
export declare class SyncIndicatorDecorator extends AbstractDecorator {
    private $q;
    private catalogService;
    private slotSynchronizationService;
    private crossFrameEventService;
    private pageInfoService;
    private SYNCHRONIZATION_STATUSES;
    private SYNCHRONIZATION_POLLING;
    pageUUID: string;
    syncStatus: TypedMap<string>;
    isVersionNonActive: boolean;
    private unRegisterSyncPolling;
    constructor($q: angular.IQService, catalogService: ICatalogService, slotSynchronizationService: any, crossFrameEventService: CrossFrameEventService, pageInfoService: IPageInfoService, SYNCHRONIZATION_STATUSES: TypedMap<string>, SYNCHRONIZATION_POLLING: TypedMap<string>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    fetchSyncStatus(): any;
}
