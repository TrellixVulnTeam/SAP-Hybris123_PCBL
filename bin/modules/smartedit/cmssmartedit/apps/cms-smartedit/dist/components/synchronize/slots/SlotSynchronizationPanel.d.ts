/// <reference types="angular-translate" />
/// <reference types="angular" />
import { IPageService } from 'cmscommons';
import { IPageInfoService, ISeComponent, TypedMap } from 'smarteditcommons';
export declare class SlotSynchronizationPanel implements ISeComponent {
    private pageService;
    private pageInfoService;
    private slotSynchronizationService;
    private pageContentSlotsService;
    private $translate;
    private $q;
    SYNCHRONIZATION_SLOTS_SELECT_ALL_COMPONENTS_LABEL: string;
    private synchronizationPanelApi;
    private slotId;
    constructor(pageService: IPageService, pageInfoService: IPageInfoService, slotSynchronizationService: any, pageContentSlotsService: any, $translate: angular.translate.ITranslateService, $q: angular.IQService);
    getApi($api: any): void;
    getSyncStatus: () => angular.IPromise<any>;
    performSync: (itemsToSync: TypedMap<string>[]) => angular.IPromise<void>;
    private isSyncDisallowed;
    private isPageSlot;
    private isPageApproved;
    private disableSync;
}
