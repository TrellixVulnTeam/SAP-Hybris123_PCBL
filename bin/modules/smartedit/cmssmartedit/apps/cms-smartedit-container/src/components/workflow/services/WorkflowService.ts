/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    workflowCompletedEvictionTag,
    workflowCreatedEvictionTag,
    workflowTasksMenuOpenedEvictionTag,
    CMSModesService,
    ICMSPage
} from 'cmscommons';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    pageChangeEvictionTag,
    perspectiveChangedEvictionTag,
    rarelyChangingContent,
    Cached,
    CrossFrameEventService,
    ICatalogService,
    IDefaultExperienceParams,
    IExperienceService,
    IPerspectiveService,
    IRestService,
    IRestServiceFactory,
    ISharedDataService,
    Page,
    Pageable,
    Pagination,
    SearchParams,
    SystemEventService,
    SeDowngradeService,
    EVENT_PERSPECTIVE_REFRESHED,
    EVENT_PERSPECTIVE_CHANGED,
    PAGE_CONTEXT_CATALOG,
    PAGE_CONTEXT_CATALOG_VERSION,
    windowUtils
} from 'smarteditcommons';
import { WorkflowTasksPollingService } from '../../workflow/services/WorkflowTasksPollingService';
import { CMS_EVENT_OPEN_PAGE_WORKFLOW_MENU, OPEN_PAGE_WORKFLOW_MENU } from '../constants';
import {
    Workflow,
    WorkflowAction,
    WorkflowActionComment,
    WorkflowActionStatus,
    WorkflowEditableItem,
    WorkflowEditableItemsList,
    WorkflowList,
    WorkflowOperations,
    WorkflowStatus,
    WorkflowTask,
    WorkflowTemplate,
    WorkflowTemplateList
} from '../dtos';

export enum OpenPageWorkflowMenu {
    Default = 'Default',
    SwitchPerspective = 'SwitchPerspective'
}

export interface WorkflowActionCommentPage extends Page<WorkflowActionComment> {
    comments: WorkflowActionComment[];
}

export interface WorkflowTaskPage extends Page<WorkflowTask> {
    tasks: WorkflowTask[];
}

/**
 * This service is used to manage workflows.
 */
@SeDowngradeService()
export class WorkflowService {
    private resourceWorkflowURI: string;
    private resourceWorkflowOperationsURI: string;
    private resourceWorkflowTemplateURI: string;
    private resourceWorkflowActionsURI: string;
    private resourceWorkflowActionCommentsURI: string;
    private resourceWorkflowEditableItemsURI: string;
    private resourceWorkflowInboxTasksURI: string;

    private workflowRESTService: IRestService<WorkflowList>;
    private workflowActionsRESTService: IRestService<Workflow>;
    private workflowOperationsRESTService: IRestService<Workflow>;
    private workflowTemplateRESTService: IRestService<WorkflowTemplateList>;
    private workflowActionCommentsRESTService: IRestService<WorkflowActionComment>;
    private workflowEditableItemsRESTService: IRestService<WorkflowEditableItemsList>;
    private workflowInboxTasksRESTService: IRestService<WorkflowTask>;

    private workflowTasksCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(
        private restServiceFactory: IRestServiceFactory,
        private crossFrameEventService: CrossFrameEventService,
        private systemEventService: SystemEventService,
        private sharedDataService: ISharedDataService,
        private perspectiveService: IPerspectiveService,
        private catalogService: ICatalogService,
        private experienceService: IExperienceService,
        private workflowTasksPollingService: WorkflowTasksPollingService
    ) {
        this.resourceWorkflowURI = `/cmswebservices/v1/catalogs/${PAGE_CONTEXT_CATALOG}/versions/${PAGE_CONTEXT_CATALOG_VERSION}/workflows`;
        this.resourceWorkflowActionsURI = `/cmswebservices/v1/catalogs/${PAGE_CONTEXT_CATALOG}/versions/${PAGE_CONTEXT_CATALOG_VERSION}/workflows/:workflowCode/actions`;
        this.resourceWorkflowTemplateURI = `/cmswebservices/v1/catalogs/${PAGE_CONTEXT_CATALOG}/versions/${PAGE_CONTEXT_CATALOG_VERSION}/workflowtemplates`;
        this.resourceWorkflowOperationsURI = `/cmswebservices/v1/catalogs/${PAGE_CONTEXT_CATALOG}/versions/${PAGE_CONTEXT_CATALOG_VERSION}/workflows/:workflowCode/operations`;
        this.resourceWorkflowActionCommentsURI = `/cmswebservices/v1/catalogs/${PAGE_CONTEXT_CATALOG}/versions/${PAGE_CONTEXT_CATALOG_VERSION}/workflows/:workflowCode/actions/:actionCode/comments`;
        this.resourceWorkflowEditableItemsURI = `/cmssmarteditwebservices/v1/catalogs/${PAGE_CONTEXT_CATALOG}/versions/${PAGE_CONTEXT_CATALOG_VERSION}/workfloweditableitems`;
        this.resourceWorkflowInboxTasksURI = `/cmssmarteditwebservices/v1/inbox/workflowtasks`;

        this.workflowRESTService = this.restServiceFactory.get(this.resourceWorkflowURI);
        this.workflowTemplateRESTService = this.restServiceFactory.get(
            this.resourceWorkflowTemplateURI
        );
        this.workflowActionsRESTService = this.restServiceFactory.get(
            this.resourceWorkflowActionsURI
        );
        this.workflowInboxTasksRESTService = this.restServiceFactory.get(
            this.resourceWorkflowInboxTasksURI
        );
        this.workflowEditableItemsRESTService = this.restServiceFactory.get(
            this.resourceWorkflowEditableItemsURI
        );

        this.crossFrameEventService.subscribe(EVENT_PERSPECTIVE_REFRESHED, () =>
            this.openPageWorkflowMenu()
        );
        this.crossFrameEventService.subscribe(EVENT_PERSPECTIVE_CHANGED, () =>
            this.openPageWorkflowMenu()
        );

        this.workflowTasksPollingService.addSubscriber(
            (tasks: WorkflowTask[], pagination: Pagination) => {
                const totalNumberOfTasks = pagination.totalCount || 0;
                this.updateWorkflowTasksCount(totalNumberOfTasks);
            },
            true
        );
    }

    /**
     * Fetch workflow search result by making a REST call to the workflow API.
     *
     * @param queryParams The object representing the query params
     * @param queryParams.pageSize number of items in the page
     * @param queryParams.currentPage current page number
     * @param queryParams.attachments comma separated list of attachment id
     * @param queryParams.status comma separated list of workflow status
     * @param queryParams.catalogId the catalog to search items in. If empty, the current context catalog will be used.
     * @param queryParams.catalogVersion the catalog version to search items in. If empty, the current context catalog version will be used.
     *
     * @returns If request is successful, it returns a promise that resolves with the workflow search result. If the
     * request fails, it resolves with errors from the backend.
     */
    @Cached({
        actions: [rarelyChangingContent],
        tags: [
            pageChangeEvictionTag,
            perspectiveChangedEvictionTag,
            workflowTasksMenuOpenedEvictionTag,
            workflowCompletedEvictionTag,
            workflowCreatedEvictionTag
        ]
    })
    public async getWorkflows(queryParams: SearchParams): Promise<Workflow[]> {
        const workflowList = await this.workflowRESTService.get(queryParams);
        return workflowList.workflows;
    }

    /**
     * Fetch workflow templates search result by making a REST call to the workflow API.
     *
     * @param queryParams The object representing the query params.
     * @param queryParams.catalogId the catalog to search items in. If empty, the current context catalog will be used.
     * @param queryParams.catalogVersion the catalog version to search items in. If empty, the current context catalog version will be used.
     *
     * @returns If request is successful, it returns a promise that resolves with the workflow template search result. If the
     * request fails, it resolves with errors from the backend.
     */
    @Cached({ actions: [rarelyChangingContent], tags: [pageChangeEvictionTag] })
    public async getWorkflowTemplates(queryParams: SearchParams): Promise<WorkflowTemplate[]> {
        const workflowTemplateList = await this.workflowTemplateRESTService.get(queryParams);
        return workflowTemplateList.templates;
    }

    /**
     * Fetch all actions for a given workflow code.
     *
     * @returns If request is successful, it returns a promise that resolves to list of available actions. If the
     * request fails, it resolves with errors from the backend.
     */
    @Cached({
        actions: [rarelyChangingContent],
        tags: [
            pageChangeEvictionTag,
            workflowTasksMenuOpenedEvictionTag,
            workflowCompletedEvictionTag,
            workflowCreatedEvictionTag
        ]
    })
    public async getAllActionsForWorkflowCode(workflowCode: string): Promise<WorkflowAction[]> {
        const workflow = await this.workflowActionsRESTService.get({
            workflowCode
        });
        return workflow.actions;
    }

    /**
     * Cancels the workflow. Shows the confirmation message before sending the request.
     */
    public cancelWorflow(workflow: Workflow): Promise<Workflow> {
        this.workflowOperationsRESTService = this.restServiceFactory.get(
            this.resourceWorkflowOperationsURI.replace(':workflowCode', workflow.workflowCode)
        );
        return this.workflowOperationsRESTService.save({
            operation: WorkflowOperations.CANCEL
        });
    }

    /**
     * Returns a workflow template using its code.
     *
     * @returns A promise that resolves with the workflow template result, if the request is successful. If the
     * request fails, it resolves with errors from the backend.
     */
    public async getWorkflowTemplateByCode(code: string): Promise<WorkflowTemplate> {
        const workflowTemplates = await this.getWorkflowTemplates({});

        const workflow: WorkflowTemplate = workflowTemplates.find(
            (wf: WorkflowTemplate) => wf.code === code
        );
        return workflow;
    }

    /**
     * This method determines whether the current catalog version (the one in the current experience) has workflows
     * enabled. A catalog version has workflows enabled if it has at least one workflow template assigned to it.
     *
     * @returns A promise that resolves to a boolean. It will be true, if the workflow is
     * enabled for the current catalog version. False, otherwise.
     */
    public async areWorkflowsEnabledOnCurrentCatalogVersion(): Promise<boolean> {
        const workflowTemplates = await this.getWorkflowTemplates({});
        return workflowTemplates && workflowTemplates.length > 0;
    }

    /**
     * Fetch an active workflow for a page uuid.
     *
     * @returns A promise that resolves with the workflow object
     * or null, if the request is sucessful and there is no active workflow for provided page uuid.
     * If the request fails, it resolves with errors from the backend.
     */
    public async getActiveWorkflowForPageUuid(pageUuid: string): Promise<Workflow> {
        const workflows = await this.getWorkflows({
            pageSize: 1,
            currentPage: 0,
            attachment: pageUuid,
            statuses: WorkflowStatus.RUNNING + ',' + WorkflowStatus.PAUSED
        });
        return workflows[0] === undefined ? null : workflows[0];
    }

    /**
     * Verifies whether the page is in a workflow or not.
     *
     * @returns If request is successful, it returns a promise that resolves with boolean value.
     * If the request fails, it resolves with errors from the backend.
     */
    public async isPageInWorkflow(page: ICMSPage): Promise<boolean> {
        return !!(await this.getActiveWorkflowForPageUuid(page.uuid));
    }

    /**
     * Verifies whether the use is a participant of a current active action.
     *
     * @returns If request is successful, it returns a promise that resolves to a boolean. If the
     * request fails, it resolves with errors from the backend.
     */
    public async isUserParticipanInActiveAction(workflowCode: string): Promise<boolean> {
        const activeActions = await this.getActiveActionsForWorkflowCode(workflowCode);
        return activeActions.length > 0;
    }

    /**
     * Fetch all active actions for a given workflow code and for the current user.
     *
     * @returns If request is successful, it returns a promise that resolves to list of active actions. If the
     * request fails, it resolves with errors from the backend.
     */
    public async getActiveActionsForWorkflowCode(workflowCode: string): Promise<WorkflowAction[]> {
        const actions = await this.getAllActionsForWorkflowCode(workflowCode);
        return actions.filter(
            (action) =>
                action.isCurrentUserParticipant &&
                (WorkflowActionStatus.IN_PROGRESS === action.status.toLowerCase() ||
                    WorkflowActionStatus.PAUSED === action.status.toLowerCase())
        );
    }

    /**
     * Fetch a page of comments for a given workflow action and some pageable data.
     *
     * @returns If request is successful, it returns a promise that resolves to list of available comments for a given workflow and workflow action. If the
     * request fails, it resolves with errors from the backend.
     */
    public getCommentsForWorkflowAction(
        workflowCode: string,
        workflowActionCode: string,
        payload: Pageable
    ): Promise<WorkflowActionCommentPage> {
        this.workflowActionCommentsRESTService = this.restServiceFactory.get(
            this.resourceWorkflowActionCommentsURI
                .replace(':workflowCode', workflowCode)
                .replace(':actionCode', workflowActionCode)
        );
        return this.workflowActionCommentsRESTService.page(payload);
    }

    /**
     * Fetches a page of workflow inbox tasks active for a given user.
     *
     * @returns If request is successful, it returns a promise that resolves to a page of workflow inbox tasks for a given user. If the
     * request fails, it resolves with errors from the backend.
     */
    public getWorkflowInboxTasks(payload: Pageable): Promise<WorkflowTaskPage> {
        return this.workflowInboxTasksRESTService.page(payload);
    }

    /** The total number of active workflow tasks. */
    public getTotalNumberOfActiveWorkflowTasks(): Observable<number> {
        return this.workflowTasksCountSubject.asObservable();
    }

    public updateWorkflowTasksCount(count: number): void {
        this.workflowTasksCountSubject.next(count);
    }

    /**
     * Returns information about whether each item is editable or not. It also returns a workflow code where item is editable.
     *
     * @returns If request is successful, it returns a promise that resolves to a list of objects where each object
     * contains information about whether each item is editable or not. If the request fails, it resolves with errors from the backend.
     */
    public async getWorkflowEditableItems(itemUids: string[]): Promise<WorkflowEditableItem[]> {
        const data = await this.workflowEditableItemsRESTService.get({
            itemUids
        });
        return data.editableItems;
    }

    /**
     * Returns a resource uri for workflows.
     */
    public getResourceWorkflowURI(): string {
        return this.resourceWorkflowURI;
    }

    /**
     * Returns a resource uri for workflow operations.
     */
    public getResourceWorkflowOperationsURI(): string {
        return this.resourceWorkflowOperationsURI;
    }

    /**
     * Opens the page workflow menu. If the current perspective is not basic or advanced, it will switch to advanced perspective and then opens the menu.
     */
    public async openPageWorkflowMenu(): Promise<void> {
        const data = await this.sharedDataService.get(OPEN_PAGE_WORKFLOW_MENU);
        if (data === OpenPageWorkflowMenu.Default) {
            const activePerspective = await this.perspectiveService.getActivePerspectiveKey();
            if (
                activePerspective === CMSModesService.BASIC_PERSPECTIVE_KEY ||
                activePerspective === CMSModesService.ADVANCED_PERSPECTIVE_KEY
            ) {
                this.systemEventService.publish(CMS_EVENT_OPEN_PAGE_WORKFLOW_MENU, true);
                this.sharedDataService.remove(OPEN_PAGE_WORKFLOW_MENU);
            } else {
                await this.sharedDataService.set(
                    OPEN_PAGE_WORKFLOW_MENU,
                    OpenPageWorkflowMenu.SwitchPerspective
                );
                this.perspectiveService.switchTo(CMSModesService.ADVANCED_PERSPECTIVE_KEY);
            }
        } else if (data === OpenPageWorkflowMenu.SwitchPerspective) {
            this.systemEventService.publish(CMS_EVENT_OPEN_PAGE_WORKFLOW_MENU, true);
            this.sharedDataService.remove(OPEN_PAGE_WORKFLOW_MENU);
        }
    }

    /**
     * Loads the experience by building experience params from the given Workflow Task and then opens the page workflow menu.
     * If the current experience is same as the experience params from the given workflow task, it just opens the page workflow menu.
     * Otherwise, it loads the experience and then opens the page workflow menu.
     */
    public async loadExperienceAndOpenPageWorkflowMenu(task: WorkflowTask): Promise<void> {
        if (task) {
            const defaultSite = await this.catalogService.getDefaultSiteForContentCatalog(
                task.attachments[0].catalogId
            );

            const experienceParams: IDefaultExperienceParams = {
                siteId: defaultSite.uid,
                catalogId: task.attachments[0].catalogId,
                catalogVersion: task.attachments[0].catalogVersion,
                pageId: task.attachments[0].pageUid
            };

            /**
             * First check if you are in storefront view or not,
             * - If in storefront view, then check if same as current experience or not.
             * 		- If requested experience is same as current experience then just open the workflow task menu.
             * 		- If requested experience is not same as current experience then load the provided experience.
             * - If not in storefront view, then load the provided experience.
             */
            if (!!windowUtils.getGatewayTargetFrame()) {
                const isEqual = await this.experienceService.compareWithCurrentExperience(
                    experienceParams
                );
                if (isEqual) {
                    await this.sharedDataService.set(
                        OPEN_PAGE_WORKFLOW_MENU,
                        OpenPageWorkflowMenu.Default
                    );
                    this.openPageWorkflowMenu();
                } else {
                    this._loadExperience(experienceParams);
                }
            } else {
                this._loadExperience(experienceParams);
            }
        }
    }

    private _loadExperience(experience: IDefaultExperienceParams): void {
        this.experienceService.loadExperience(experience).then(() => {
            this.sharedDataService.set(OPEN_PAGE_WORKFLOW_MENU, OpenPageWorkflowMenu.Default);
        });
    }
}
