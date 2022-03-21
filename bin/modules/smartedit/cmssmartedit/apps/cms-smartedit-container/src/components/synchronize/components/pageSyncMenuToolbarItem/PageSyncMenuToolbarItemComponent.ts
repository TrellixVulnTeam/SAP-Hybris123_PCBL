/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
    ICMSPage,
    IPageService,
    ISyncPollingService,
    DEFAULT_SYNCHRONIZATION_POLLING as SYNCHRONIZATION_POLLING,
    ISyncStatus,
    synchronizationUtils
} from 'cmscommons';
import {
    CrossFrameEventService,
    EVENTS,
    ICatalogService,
    IPageInfoService,
    IUriContext,
    LogService,
    SeDowngradeComponent,
    SystemEventService,
    ToolbarItemInternal,
    TOOLBAR_ITEM
} from 'smarteditcommons';
import { PAGE_SYNC_STATUS_READY } from '../../constants';
import { PageSyncConditions } from '../../types';

@SeDowngradeComponent()
@Component({
    selector: 'se-page-sync-menu-toolbar-item',
    templateUrl: './PageSyncMenuToolbarItemComponent.html',
    styleUrls: ['./PageSyncMenuToolbarItemComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSyncMenuToolbarItemComponent implements OnInit, OnDestroy {
    public isReady: boolean;
    public isNotInSync: boolean;
    public syncPageConditions: PageSyncConditions;
    public helpText: string;
    public cmsPage: ICMSPage;
    public uriContext: IUriContext;

    private unRegisterPageChange: () => void;
    private unRegisterSyncPageConditions: () => void;
    private unRegisterSyncPolling: () => void;

    constructor(
        private crossFrameEventService: CrossFrameEventService,
        private systemEventService: SystemEventService,
        private catalogService: ICatalogService,
        private pageService: IPageService,
        private pageInfoService: IPageInfoService,
        private syncPollingService: ISyncPollingService,
        private translateService: TranslateService,
        private logService: LogService,
        private cdr: ChangeDetectorRef,
        @Inject(TOOLBAR_ITEM) public toolbarItem: ToolbarItemInternal
    ) {
        this.isReady = false;
    }

    ngOnInit(): Promise<void> {
        this.unRegisterPageChange = this.crossFrameEventService.subscribe(EVENTS.PAGE_CHANGE, () =>
            this.setup()
        );

        this.unRegisterSyncPageConditions = this.systemEventService.subscribe(
            PAGE_SYNC_STATUS_READY,
            (_event, syncPageConditions: PageSyncConditions) => {
                this.syncPageConditions = syncPageConditions;

                this.setHelpText();

                this.cdr.detectChanges();
            }
        );

        return this.setup();
    }

    ngOnDestroy(): void {
        this.unRegisterSyncPageConditions();
        this.unRegisterPageChange();
        if (this.unRegisterSyncPolling) {
            this.unRegisterSyncPolling();
        }
    }

    private async setup(): Promise<void> {
        this.isReady = false;
        this.isNotInSync = false;
        this.cdr.detectChanges();

        try {
            [this.cmsPage, this.uriContext] = await this.fetchSynchronizationPanelInfo();
            const isNonActive = await this.catalogService.isContentCatalogVersionNonActive();
            if (!isNonActive) {
                return;
            }
        } catch (error) {
            this.logService.error('Failed to setup PageSyncMenuToolbarItemComponent', error);
            return;
        }

        this.subscribeSyncPolling();
        this.fetchSyncStatusAndSetIsNotInSync();

        this.isReady = true;
        this.cdr.detectChanges();
    }

    private async fetchSynchronizationPanelInfo(): Promise<[ICMSPage, IUriContext]> {
        return Promise.all([
            this.pageService.getCurrentPageInfo(),
            this.catalogService.retrieveUriContext()
        ]).catch((error) => {
            this.logService.error('Failed to fetch Synchronization Panel Info', error);
            throw new Error(error);
        });
    }

    private subscribeSyncPolling(): void {
        if (this.unRegisterSyncPolling) {
            this.unRegisterSyncPolling();
        }

        this.unRegisterSyncPolling = this.crossFrameEventService.subscribe(
            SYNCHRONIZATION_POLLING.FAST_FETCH,
            () => this.fetchSyncStatusAndSetIsNotInSync()
        );
    }

    private async fetchSyncStatusAndSetIsNotInSync(): Promise<void> {
        const syncStatus = await this.fetchSyncStatus();
        this.isNotInSync = !synchronizationUtils.isInSync(syncStatus);
        this.cdr.detectChanges();
    }

    private async fetchSyncStatus(): Promise<ISyncStatus> {
        const pageUUID = await this.pageInfoService.getPageUUID();
        return this.syncPollingService.getSyncStatus(pageUUID);
    }

    private setHelpText(): void {
        let helpText = this.translateService.instant('se.cms.synchronization.page.header');
        if (!this.syncPageConditions.pageHasNoDepOrNoSyncStatus) {
            helpText += ` ${this.translateService.instant(
                'se.cms.synchronization.page.header.help'
            )}`;
        }

        this.helpText = helpText;
    }
}
