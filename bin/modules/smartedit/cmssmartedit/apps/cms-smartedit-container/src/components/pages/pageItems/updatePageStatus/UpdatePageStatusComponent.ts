/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit
} from '@angular/core';
import { CmsitemsRestService, EVENT_PAGE_STATUS_UPDATED_IN_ACTIVE_CV, ICMSPage } from 'cmscommons';
import { ManagePageService } from 'cmssmarteditcontainer/services/pages/ManagePageService';
import {
    CrossFrameEventService,
    DROPDOWN_MENU_ITEM_DATA,
    ICatalogService,
    IDropdownMenuItemData,
    SeDowngradeComponent
} from 'smarteditcommons';

/**
 * Component that updates the page status in the active catalog version to "DELETED".
 */
@SeDowngradeComponent()
@Component({
    selector: 'se-update-page-status',
    templateUrl: './UpdatePageStatusComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdatePageStatusComponent implements OnInit {
    public pageInfo: ICMSPage;
    public showButton = false;

    constructor(
        private cdr: ChangeDetectorRef,
        private managePageService: ManagePageService,
        private cmsitemsRestService: CmsitemsRestService,
        private catalogService: ICatalogService,
        private crossFrameEventService: CrossFrameEventService,
        @Inject(DROPDOWN_MENU_ITEM_DATA) private dropdownMenuData: IDropdownMenuItemData
    ) {}

    async ngOnInit(): Promise<void> {
        this.pageInfo = this.dropdownMenuData.selectedItem;
        await this.setButtonVisibility();
    }

    public async onClickOnSync(): Promise<void> {
        await this.managePageService.trashPageInActiveCatalogVersion(this.pageInfo.uid);
        this.crossFrameEventService.publish(EVENT_PAGE_STATUS_UPDATED_IN_ACTIVE_CV);
    }

    private async setButtonVisibility(): Promise<void> {
        this.showButton = await this.doesPageExistInActiveCatalogVersion();
        this.cdr.detectChanges();
    }

    private async doesPageExistInActiveCatalogVersion(): Promise<boolean> {
        const uriContext = await this.catalogService.retrieveUriContext();
        const activeVersion = await this.catalogService.getContentCatalogActiveVersion(uriContext);
        const result = await this.cmsitemsRestService.get<ICMSPage>({
            pageSize: 1,
            currentPage: 0,
            typeCode: 'AbstractPage',
            fields: 'BASIC',
            itemSearchParams: `uid:${this.pageInfo.uid}`,
            catalogId: uriContext.CONTEXT_CATALOG,
            catalogVersion: activeVersion
        });

        return result.pagination.totalCount === 1;
    }
}
