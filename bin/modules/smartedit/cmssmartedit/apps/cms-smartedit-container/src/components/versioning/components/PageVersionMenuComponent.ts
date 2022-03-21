/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, Inject, OnInit } from '@angular/core';
import {
    IPageInfoService,
    SeDowngradeComponent,
    ToolbarItemInternal,
    TOOLBAR_ITEM
} from 'smarteditcommons';
import { PageVersionSelectionService } from '../services';

@SeDowngradeComponent()
@Component({
    selector: 'se-page-version-menu',
    template: `
        <div
            class="se-toolbar-menu-content se-toolbar-menu-content--versions"
            *ngIf="actionItem.isOpen"
        >
            <se-versions-panel
                *ngIf="pageUuid"
                [pageUuid]="pageUuid"
                (switchMode)="onSwitchMode()"
            ></se-versions-panel>
        </div>
    `
})
export class PageVersionMenuComponent implements OnInit {
    public pageUuid: string;

    constructor(
        public pageInfoService: IPageInfoService,
        private pageVersionSelectionService: PageVersionSelectionService,
        @Inject(TOOLBAR_ITEM) public actionItem: ToolbarItemInternal
    ) {}

    async ngOnInit(): Promise<void> {
        this.pageVersionSelectionService.showToolbarContextIfNeeded();
        this.pageUuid = await this.pageInfoService.getPageUUID();
    }

    public onSwitchMode(): void {
        this.actionItem.isOpen = false;
    }
}
