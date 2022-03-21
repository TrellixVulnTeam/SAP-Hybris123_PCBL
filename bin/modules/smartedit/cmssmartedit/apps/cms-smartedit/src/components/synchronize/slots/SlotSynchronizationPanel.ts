/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IPageService, SlotStatus } from 'cmscommons';
import {
    IAlertServiceType,
    IPageInfoService,
    ISeComponent,
    SeComponent,
    TypedMap
} from 'smarteditcommons';

@SeComponent({
    templateUrl: 'slotSynchronizationPanelTemplate.html',
    inputs: ['slotId']
})
export class SlotSynchronizationPanel implements ISeComponent {
    public SYNCHRONIZATION_SLOTS_SELECT_ALL_COMPONENTS_LABEL =
        'se.cms.synchronization.slots.select.all.components';
    private synchronizationPanelApi: any;
    private slotId: string;

    constructor(
        private pageService: IPageService,
        private pageInfoService: IPageInfoService,
        private slotSynchronizationService: any,
        private pageContentSlotsService: any,
        private $translate: angular.translate.ITranslateService,
        private $q: angular.IQService
    ) {}

    public getApi($api: any): void {
        this.synchronizationPanelApi = $api;
    }

    public getSyncStatus = (): angular.IPromise<any> => {
        const promise = this.pageInfoService.getPageUID().then((pageId: string) =>
            this.slotSynchronizationService
                .getSyncStatus(pageId, this.slotId)
                .then((syncStatus: any) => {
                    if (!this.slotSynchronizationService.syncStatusExists(syncStatus)) {
                        throw new Error(
                            'The SlotSynchronizationPanel must only be called for the slot whose sync status is available.'
                        );
                    } else {
                        return this.isSyncDisallowed().then((isDisallowed: boolean) => {
                            if (isDisallowed) {
                                this.disableSync();
                            }
                            return syncStatus;
                        });
                    }
                })
        );

        return this.$q.when(promise);
    };

    public performSync = (itemsToSync: TypedMap<string>[]): angular.IPromise<void> =>
        this.slotSynchronizationService.performSync(itemsToSync);

    private isSyncDisallowed(): angular.IPromise<boolean> {
        return this.isPageSlot().then((isPageSlot: boolean) =>
            this.isPageApproved().then((isPageApproved: boolean) => isPageSlot && !isPageApproved)
        );
    }

    private isPageSlot(): angular.IPromise<boolean> {
        return this.pageContentSlotsService
            .getSlotStatus(this.slotId)
            .then(
                (slotStatus: SlotStatus) =>
                    slotStatus === SlotStatus.PAGE || slotStatus === SlotStatus.OVERRIDE
            );
    }

    private isPageApproved(): angular.IPromise<boolean> {
        const promise = this.pageInfoService
            .getPageUUID()
            .then((pageUuid: string) => this.pageService.isPageApproved(pageUuid));

        return this.$q.when(promise);
    }

    private disableSync(): void {
        this.synchronizationPanelApi.setMessage({
            type: IAlertServiceType.WARNING,
            description: this.$translate.instant('se.cms.synchronization.slot.disabled.msg')
        });
        this.synchronizationPanelApi.disableItemList(true);
    }
}
