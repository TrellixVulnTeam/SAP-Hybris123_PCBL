import { CmsitemsRestService, ICMSPage } from 'cmscommons';
import { CrossFrameEventService, IAlertService, ICatalogService, IPageInfoService, IRestServiceFactory, IUriContext, IWaitDialogService, SmarteditRoutingService, SystemEventService, IConfirmationModalService, LogService, ISharedDataService } from 'smarteditcommons';
import { WorkflowService } from '../../components/workflow/services/WorkflowService';
import { CatalogVersionRestService, PagesVariationsRestService } from '../../dao';
import { PageRestoredAlertService } from '../actionableAlert';
import { HomepageService } from '../pageDisplayConditions';
import { PageRestoreModalService } from './pageRestore/PageRestoreModalService';
export declare enum CMSPageOperation {
    TRASH_PAGE = "TRASH_PAGE"
}
export interface CMSPageOperationPayload {
    catalogId?: string;
    operation: CMSPageOperation;
    sourceCatalogVersion: string;
    targetCatalogVersion: string;
}
export declare class ManagePageService {
    private logService;
    private smarteditRoutingService;
    private alertService;
    private cmsitemsRestService;
    private systemEventService;
    private crossFrameEventService;
    private pageInfoService;
    private confirmationModalService;
    private pagesVariationsRestService;
    private waitDialogService;
    private pageRestoreModalService;
    private pageRestoredAlertService;
    private homepageService;
    private workflowService;
    private catalogService;
    private restServiceFactory;
    private sharedDataService;
    private catalogVersionRestService;
    private resourcePageOperationsURI;
    private pageOperationsRESTService;
    constructor(logService: LogService, smarteditRoutingService: SmarteditRoutingService, alertService: IAlertService, cmsitemsRestService: CmsitemsRestService, systemEventService: SystemEventService, crossFrameEventService: CrossFrameEventService, pageInfoService: IPageInfoService, confirmationModalService: IConfirmationModalService, pagesVariationsRestService: PagesVariationsRestService, waitDialogService: IWaitDialogService, pageRestoreModalService: PageRestoreModalService, pageRestoredAlertService: PageRestoredAlertService, homepageService: HomepageService, workflowService: WorkflowService, catalogService: ICatalogService, restServiceFactory: IRestServiceFactory, sharedDataService: ISharedDataService, catalogVersionRestService: CatalogVersionRestService);
    /**
     * Get the number of soft deleted pages for the provided context.
     */
    getSoftDeletedPagesCount(uriContext: IUriContext): Promise<number>;
    /**
     * This method triggers the soft deletion of a CMS page.
     *
     * @param pageInfo The page object containing the uuid and the name of the page to be deleted.
     */
    softDeletePage(pageInfo: ICMSPage, uriContext: IUriContext): Promise<void>;
    /**
     * This method triggers the permanent deletion of a CMS page.
     */
    hardDeletePage(pageInfo: ICMSPage): Promise<void>;
    /**
     *  This method triggers the restoration a CMS page.
     */
    restorePage(pageInfo: ICMSPage): Promise<void>;
    /**
     * This method indicates whether the given page can be soft deleted.
     * Only the following pages are eligible for soft deletion:
     * 1. the variation pages
     * 2. the primary pages associated with no variation pages
     * 3. the page is not in a workflow
     */
    isPageTrashable(cmsPage: ICMSPage, uriContext: IUriContext): Promise<boolean>;
    /**
     * Determines whether page can be cloned or not
     *
     * Checks if there is permission for given page in given catalog version to be cloned
     * This method uses only "outer" parts for that check so there is no need for iframe to be available
     *
     * !NOTE: Logic here is very similar to logic used in RulesAndPermissionsRegistrationService where "se.cloneable.page" rule is registered. So if any changes are done here it should be considered to adjust those changes in mentioned service as well.
     *
     */
    isPageCloneable(pageUuid: string, catalogVersion: string): Promise<boolean>;
    /**
     * Get the disabled trash tooltip message.
     */
    getDisabledTrashTooltipMessage(pageInfo: ICMSPage, uriContext: IUriContext): Promise<string>;
    /**
     * Will trash the given page in the corresponding active catalog version.
     */
    trashPageInActiveCatalogVersion(pageUid: string): Promise<void>;
    private getConfirmationModalDescription;
    private confirmSoftDelete;
    private confirmHardDelete;
    private confirmTrashingPageInActiveCatalogVersion;
    private hasFallbackHomepageOrIsPrimaryWithoutVariations;
}
