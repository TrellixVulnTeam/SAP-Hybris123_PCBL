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
import { ICMSPage, IPageService } from 'cmscommons';
import { ManagePageService } from 'cmssmarteditcontainer/services/pages/ManagePageService';
import {
    CrossFrameEventService,
    EVENTS,
    EVENT_CONTENT_CATALOG_UPDATE,
    IUriContext,
    Nullable,
    SeDowngradeComponent,
    SystemEventService,
    ToolbarItemInternal,
    TOOLBAR_ITEM
} from 'smarteditcommons';
import { PageFacade } from '../../../facades';

@SeDowngradeComponent()
@Component({
    selector: 'se-delete-page-toolbar-item',
    templateUrl: './DeletePageToolbarItemComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeletePageToolbarItemComponent implements OnInit, OnDestroy {
    public isReady: boolean;
    public isDeletePageEnabled: boolean;
    public tooltipMessage: Nullable<string>;
    public uriContext: IUriContext;
    public pageInfo: ICMSPage;

    private unRegPageChange: () => void;

    constructor(
        private pageService: IPageService,
        private pageFacade: PageFacade,
        private managePageService: ManagePageService,
        private systemEventService: SystemEventService,
        private crossFrameEventService: CrossFrameEventService,
        private cdr: ChangeDetectorRef,
        @Inject(TOOLBAR_ITEM) public toolbarItem: ToolbarItemInternal
    ) {}

    ngOnInit(): Promise<void> {
        this.unRegPageChange = this.crossFrameEventService.subscribe(EVENTS.PAGE_CHANGE, () =>
            this.updateToolbar()
        );
        return this.updateToolbar();
    }

    ngOnDestroy(): void {
        this.unRegPageChange();
    }

    get isDeletePageDisabled(): boolean {
        return !this.isDeletePageEnabled;
    }

    public async deletePage(): Promise<void> {
        const pageInfo = await this.pageService.getCurrentPageInfo();
        await this.managePageService.softDeletePage(pageInfo, this.uriContext);

        this.systemEventService.publishAsync(EVENT_CONTENT_CATALOG_UPDATE);
    }

    private async updateToolbar(): Promise<void> {
        this.markAsNotReady();
        this.cdr.detectChanges();

        const uriContext = await this.pageFacade.retrievePageUriContext();
        if (!uriContext) {
            return;
        }
        this.uriContext = uriContext;

        this.pageInfo = await this.pageService.getCurrentPageInfo();
        this.isDeletePageEnabled = await this.managePageService.isPageTrashable(
            this.pageInfo,
            this.uriContext
        );

        this.tooltipMessage = await this.resolveTooltipMessage(
            this.isDeletePageEnabled,
            this.pageInfo,
            this.uriContext
        );

        this.markAsReady();
        this.cdr.detectChanges();
    }

    private markAsNotReady(): void {
        this.isReady = false;
        this.isDeletePageEnabled = false;
        this.tooltipMessage = null;
    }

    private markAsReady(): void {
        this.isReady = true;
    }

    private async resolveTooltipMessage(
        isDeleteEnabled: boolean,
        pageInfo: ICMSPage,
        uriContext: IUriContext
    ): Promise<Nullable<string>> {
        return await (isDeleteEnabled
            ? null
            : this.managePageService.getDisabledTrashTooltipMessage(pageInfo, uriContext));
    }
}
