import { TranslateService } from '@ngx-translate/core';
import { CMSModesService } from 'cmscommons';
import { Observable } from 'rxjs';
import { CrossFrameEventService, IAlertService, IExperienceService, IPageInfoService } from 'smarteditcommons';
import { PageVersioningService, IPageVersion } from './PageVersioningService';
/**
 * This service is meant to be used internally by the page versions menu.
 * It allows selecting and deselecting a page version to be rendered in the Versioning Mode.
 */
export declare class PageVersionSelectionService {
    private crossFrameEventService;
    private alertService;
    private experienceService;
    private cMSModesService;
    private pageInfoService;
    private pageVersioningService;
    private translateService;
    private PAGE_VERSIONS_TOOLBAR_ITEM_KEY;
    private PAGE_VERSION_UNSELECTED_MSG_KEY;
    private selectedPageVersionSubject;
    private selectedPageVersion;
    private unSubEventPerspectiveChanged;
    private unSubEventPerspectiveRefreshed;
    private unSubEventPageChange;
    private unSubSelectedPageVersion;
    constructor(crossFrameEventService: CrossFrameEventService, alertService: IAlertService, experienceService: IExperienceService, cMSModesService: CMSModesService, pageInfoService: IPageInfoService, pageVersioningService: PageVersioningService, translateService: TranslateService);
    ngOnDestroy(): void;
    getSelectedPageVersion(): IPageVersion;
    getSelectedPageVersion$(): Observable<IPageVersion>;
    hideToolbarContextIfNotNeeded(): void;
    showToolbarContextIfNeeded(): void;
    selectPageVersion(version: IPageVersion): void;
    deselectPageVersion(showAlert?: boolean): void;
    updatePageVersionDetails(version: IPageVersion): void;
    /**
     * Required especially when a version is selected and you refresh the browser.
     */
    private initOnPageChange;
    private isSameVersion;
    private removePageVersionOnPerspectiveChange;
    private resetPageVersionContext;
}
