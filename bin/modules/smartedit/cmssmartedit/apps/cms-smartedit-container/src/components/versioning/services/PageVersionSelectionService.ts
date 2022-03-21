/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { TranslateService } from '@ngx-translate/core';
import { CMSModesService } from 'cmscommons';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
    CrossFrameEventService,
    EVENTS,
    EVENT_PERSPECTIVE_CHANGED,
    EVENT_PERSPECTIVE_REFRESHED,
    HIDE_TOOLBAR_ITEM_CONTEXT,
    IAlertService,
    IExperience,
    IExperienceService,
    IPageInfoService,
    SeDowngradeService,
    SHOW_TOOLBAR_ITEM_CONTEXT
} from 'smarteditcommons';
import { PageVersioningService, IPageVersion } from './PageVersioningService';

/**
 * This service is meant to be used internally by the page versions menu.
 * It allows selecting and deselecting a page version to be rendered in the Versioning Mode.
 */
@SeDowngradeService()
export class PageVersionSelectionService {
    private PAGE_VERSIONS_TOOLBAR_ITEM_KEY = 'se.cms.pageVersionsMenu';
    private PAGE_VERSION_UNSELECTED_MSG_KEY = 'se.cms.versions.unselect.version';
    private selectedPageVersionSubject = new BehaviorSubject<IPageVersion>(null);
    private selectedPageVersion: IPageVersion;
    private unSubEventPerspectiveChanged: () => void;
    private unSubEventPerspectiveRefreshed: () => void;
    private unSubEventPageChange: () => void;
    private unSubSelectedPageVersion: Subscription;

    constructor(
        private crossFrameEventService: CrossFrameEventService,
        private alertService: IAlertService,
        private experienceService: IExperienceService,
        private cMSModesService: CMSModesService,
        private pageInfoService: IPageInfoService,
        private pageVersioningService: PageVersioningService,
        private translateService: TranslateService
    ) {
        this.unSubEventPerspectiveChanged = this.crossFrameEventService.subscribe(
            EVENT_PERSPECTIVE_CHANGED,
            () => this.removePageVersionOnPerspectiveChange()
        );

        this.unSubEventPerspectiveRefreshed = this.crossFrameEventService.subscribe(
            EVENT_PERSPECTIVE_REFRESHED,
            () => this.resetPageVersionContext()
        );

        this.unSubEventPageChange = this.crossFrameEventService.subscribe(
            EVENTS.PAGE_CHANGE,
            (_eventId: string, experience: IExperience) => this.initOnPageChange(experience)
        );

        this.unSubSelectedPageVersion = this.selectedPageVersionSubject.subscribe(
            (value) => (this.selectedPageVersion = value)
        );
    }

    ngOnDestroy(): void {
        this.unSubEventPerspectiveChanged();
        this.unSubEventPerspectiveRefreshed();
        this.unSubEventPageChange();
        this.unSubSelectedPageVersion.unsubscribe();
    }

    public getSelectedPageVersion(): IPageVersion {
        return this.selectedPageVersion;
    }

    public getSelectedPageVersion$(): Observable<IPageVersion> {
        return this.selectedPageVersionSubject.asObservable();
    }

    public hideToolbarContextIfNotNeeded(): void {
        if (!this.selectedPageVersion) {
            this.crossFrameEventService.publish(
                HIDE_TOOLBAR_ITEM_CONTEXT,
                this.PAGE_VERSIONS_TOOLBAR_ITEM_KEY
            );
        }
    }

    public showToolbarContextIfNeeded(): void {
        if (this.selectedPageVersion) {
            this.crossFrameEventService.publish(
                SHOW_TOOLBAR_ITEM_CONTEXT,
                this.PAGE_VERSIONS_TOOLBAR_ITEM_KEY
            );
        }
    }

    public selectPageVersion(version: IPageVersion): void {
        if (!this.isSameVersion(this.selectedPageVersion, version)) {
            this.selectedPageVersionSubject.next(version);
            this.experienceService.updateExperience({
                versionId: version.uid
            });

            this.showToolbarContextIfNeeded();
            this.crossFrameEventService.publish(EVENTS.PAGE_SELECTED);
        }
    }

    public deselectPageVersion(showAlert = true): void {
        if (this.selectedPageVersion && showAlert) {
            const msgTranslated = this.translateService.instant(
                this.PAGE_VERSION_UNSELECTED_MSG_KEY
            );
            this.alertService.showInfo(msgTranslated);
        }

        this.selectedPageVersionSubject.next(null);
        this.experienceService.updateExperience({
            versionId: null
        });

        this.crossFrameEventService.publish(
            HIDE_TOOLBAR_ITEM_CONTEXT,
            this.PAGE_VERSIONS_TOOLBAR_ITEM_KEY
        );
    }

    public updatePageVersionDetails(version: IPageVersion): void {
        this.selectedPageVersionSubject.next(version);
    }

    /**
     * Required especially when a version is selected and you refresh the browser.
     */
    private async initOnPageChange(experience: IExperience): Promise<void> {
        if (experience.versionId && !this.selectedPageVersion) {
            const pageUuid = await this.pageInfoService.getPageUUID();
            const version = await this.pageVersioningService.getPageVersionForId(
                pageUuid,
                String(experience.versionId)
            );
            this.selectedPageVersionSubject.next(version);

            this.showToolbarContextIfNeeded();

            this.crossFrameEventService.publish(EVENTS.PAGE_SELECTED);
        }
    }

    private isSameVersion(selectedPageVersion: IPageVersion, newVersion: IPageVersion): boolean {
        return selectedPageVersion !== null && newVersion !== null
            ? this.selectedPageVersion.uid === newVersion.uid
            : false;
    }

    private async removePageVersionOnPerspectiveChange(): Promise<void> {
        const isVersioningModeActive = await this.cMSModesService.isVersioningPerspectiveActive();
        if (this.selectedPageVersion) {
            const pageUuid = await this.pageInfoService.getPageUUID();
            if (!isVersioningModeActive || this.selectedPageVersion.itemUUID !== pageUuid) {
                this.deselectPageVersion();
            }
        }
    }

    private async resetPageVersionContext(): Promise<void> {
        const experience = await this.experienceService.getCurrentExperience();
        if (!experience.versionId && this.selectedPageVersion) {
            this.selectedPageVersionSubject.next(null);
            this.hideToolbarContextIfNotNeeded();
        } else {
            this.showToolbarContextIfNeeded();
        }
    }
}
