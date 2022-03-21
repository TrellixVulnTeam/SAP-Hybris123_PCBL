/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
import { ISyncStatusItem } from 'cmscommons';
import { from, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import {
    FundamentalModalButtonAction,
    FundamentalModalButtonStyle,
    FundamentalModalManagerService
} from 'smarteditcommons';
import { PageSynchronizationPanelModalData } from '../../types';
import { PageSynchronizationPanelComponent } from '../pageSynchronizationPanel/PageSynchronizationPanelComponent';

@Component({
    selector: 'se-page-synchronization-panel-modal',
    template: `
        <se-page-synchronization-panel
            *ngIf="isReady"
            (selectedItemsUpdate)="onSelectedItemsUpdate($event)"
            [uriContext]="data.uriContext"
            [cmsPage]="data.cmsPage"
            [showFooter]="false"
        ></se-page-synchronization-panel>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSynchronizationPanelModalComponent implements OnInit {
    @ViewChild(PageSynchronizationPanelComponent, { static: false })
    pageSynchronizationPanelComponent: PageSynchronizationPanelComponent;

    public data: PageSynchronizationPanelModalData;
    public isReady: boolean;

    private syncBtnId = 'sync';

    constructor(
        private modalManager: FundamentalModalManagerService<PageSynchronizationPanelModalData>,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.modalManager.addButtons([
            {
                id: 'cancel',
                label: 'se.cms.component.confirmation.modal.cancel',
                style: FundamentalModalButtonStyle.Default,
                action: FundamentalModalButtonAction.Dismiss
            },
            {
                id: this.syncBtnId,
                label: 'se.cms.actionitem.page.sync',
                style: FundamentalModalButtonStyle.Primary,
                action: FundamentalModalButtonAction.Close,
                disabled: true,
                callback: (): Observable<void> =>
                    from(this.pageSynchronizationPanelComponent.syncItems())
            }
        ]);

        this.modalManager
            .getModalData()
            .pipe(take(1))
            .subscribe((data) => {
                this.data = data;

                this.isReady = true;
                this.cdr.detectChanges();
            });
    }

    public onSelectedItemsUpdate(selectedItems: ISyncStatusItem[]): void {
        if (selectedItems.length === 0) {
            this.modalManager.disableButton(this.syncBtnId);
            return;
        }
        this.modalManager.enableButton(this.syncBtnId);
    }
}
