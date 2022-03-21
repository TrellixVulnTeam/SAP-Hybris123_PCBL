/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { CmsApprovalStatus, IPageService, WORKFLOW_FINISHED_EVENT } from 'cmscommons';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    CrossFrameEventService,
    EVENTS,
    EVENT_PERSPECTIVE_CHANGED,
    IDropdownMenuItem,
    IIframeClickDetectionService,
    IWaitDialogService,
    LogService,
    SeDowngradeComponent,
    SmarteditRoutingService,
    TypedMap
} from 'smarteditcommons';
import { WorkflowService } from '../../services/WorkflowService';

/**
 * Represents one of the approval status options available to a super user.
 */
interface PageApprovalOption extends IDropdownMenuItem {
    status: CmsApprovalStatus;
    selected?: boolean;
}
type PageApprovalOptionsByStatus = TypedMap<PageApprovalOption>;

const PAGE_APPROVAL_SELECTOR_CLOSE_CALLBACK_ID = 'pageApprovalSelectorClose';

/**
 * This component displays a dropdown in the page to allow super users force a page into approved or checked approval status.
 * This is to give them the posibility of skipping a workflow and be able to sync the page.
 *
 * It is only displayed when there is no workflow in progress.
 */
@SeDowngradeComponent()
@Component({
    selector: 'se-page-approval-selector',
    templateUrl: './PageApprovalSelectorComponent.html',
    styleUrls: ['./PageApprovalSelectorComponent.scss'],
    host: {
        '[class.se-page-approval-selector]': 'true'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageApprovalSelectorComponent implements OnInit {
    public isOpen = false;
    public showDropdown = true;
    /**
     * Options displayed in the dropdown.
     * All options except the selected one.
     */
    public pageApprovalOptions$: Observable<PageApprovalOption[]>;
    private pageApprovalOptionsSubject = new BehaviorSubject<PageApprovalOptionsByStatus>({
        CHECK: {
            // Draft
            status: CmsApprovalStatus.CHECK,
            key: 'se.cms.page.approval.check',
            icon: 'se-page-approval-selector__icon--draft',
            callback: (_selectedItem, clickedItem: PageApprovalOption): Promise<void> =>
                this.selectApprovalStatus(clickedItem)
        },
        APPROVED: {
            // Ready to Sync
            status: CmsApprovalStatus.APPROVED,
            key: 'se.cms.page.approval.approved',
            icon: 'se-page-approval-selector__icon--ready-to-sync',
            callback: (_selectedItem, clickedItem: PageApprovalOption): Promise<void> =>
                this.selectApprovalStatus(clickedItem)
        }
    });

    private unRegWfFinishedHandler: () => void;
    private unRegPerspectiveChangedHandler: () => void;

    constructor(
        private iframeClickDetectionService: IIframeClickDetectionService,
        private pageService: IPageService,
        private waitDialogService: IWaitDialogService,
        private workflowService: WorkflowService,
        private crossFrameEventService: CrossFrameEventService,
        private routingService: SmarteditRoutingService,
        private logService: LogService,
        private cdr: ChangeDetectorRef
    ) {}

    async ngOnInit(): Promise<void> {
        this.unRegWfFinishedHandler = this.crossFrameEventService.subscribe(
            WORKFLOW_FINISHED_EVENT,
            () => this.hideComponentIfWorkflowInProgress()
        );
        this.unRegPerspectiveChangedHandler = this.crossFrameEventService.subscribe(
            EVENT_PERSPECTIVE_CHANGED,
            () => this.hideComponentIfWorkflowInProgress()
        );

        this.iframeClickDetectionService.registerCallback(
            PAGE_APPROVAL_SELECTOR_CLOSE_CALLBACK_ID,
            () => this.closeDropdown()
        );

        this.pageApprovalOptions$ = this.pageApprovalOptionsSubject.pipe(
            map((options) => Object.values(options).filter((option) => !option.selected))
        );

        await this.hideComponentIfWorkflowInProgress();
    }

    ngOnDestroy(): void {
        this.unRegWfFinishedHandler();
        this.unRegPerspectiveChangedHandler();
        this.iframeClickDetectionService.removeCallback(PAGE_APPROVAL_SELECTOR_CLOSE_CALLBACK_ID);
    }

    public async onDropdownToggle(isOpen: boolean): Promise<void> {
        if (isOpen) {
            const approvalStatus = await this.getCurrentPageApprovalStatus();
            this.selectOption(approvalStatus);
        }
    }

    /**
     * Callback used to manually force the change of the approval status of a page.
     * The page will be updated with the selected status and reloaded.
     */
    private async selectApprovalStatus({ status }: PageApprovalOption): Promise<void> {
        this.waitDialogService.showWaitModal(null);
        try {
            await this.pageService.forcePageApprovalStatus(status);

            this.crossFrameEventService.publish(EVENTS.PAGE_UPDATED);

            this.routingService.reload();
        } catch (error) {
            this.logService.warn("[PageApprovalSelector] - Can't change page status.", error);
        } finally {
            this.waitDialogService.hideWaitModal();
            this.unselectOptions();
        }
    }

    private async getCurrentPageApprovalStatus(): Promise<CmsApprovalStatus> {
        const { approvalStatus } = await this.pageService.getCurrentPageInfo();
        return approvalStatus;
    }

    private async hideComponentIfWorkflowInProgress(): Promise<void> {
        const { uuid } = await this.pageService.getCurrentPageInfo();
        const workflow = await this.workflowService.getActiveWorkflowForPageUuid(uuid);

        this.showDropdown = !workflow;
        this.cdr.detectChanges();
    }

    /**
     * If the page is currently in checked or approved status, then this method will mark the corresponding status as the 'selected' option.
     */
    private selectOption(option: CmsApprovalStatus): void {
        this.unselectOptions();

        const options = this.getOptions();
        if (options[option]) {
            options[option].selected = true;
        }
        this.pageApprovalOptionsSubject.next(options);
    }

    private unselectOptions(): void {
        const options = this.getOptions();
        Object.keys(options).forEach((key) => {
            options[key].selected = false;
        });

        this.pageApprovalOptionsSubject.next(options);
    }

    private getOptions(): PageApprovalOptionsByStatus {
        return { ...this.pageApprovalOptionsSubject.getValue() };
    }

    private closeDropdown(): void {
        this.isOpen = false;
        this.cdr.detectChanges();
    }
}
