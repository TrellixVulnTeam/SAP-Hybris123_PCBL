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
import {
    CMS_EVENT_OPEN_PAGE_WORKFLOW_MENU,
    OPEN_PAGE_WORKFLOW_MENU
} from 'cmssmarteditcontainer/components/workflow/constants';
import {
    Workflow,
    WorkflowAction,
    WorkflowActionComment,
    WorkflowActionStatus,
    WorkflowStatus,
    WorkflowTask,
    WorkflowTemplate
} from 'cmssmarteditcontainer/components/workflow/dtos';
import {
    OpenPageWorkflowMenu,
    WorkflowService
} from 'cmssmarteditcontainer/components/workflow/services/WorkflowService';
import { WorkflowTasksPollingService } from 'cmssmarteditcontainer/components/workflow/services/WorkflowTasksPollingService';
import { noop, clone } from 'lodash';
import { take } from 'rxjs/operators';

import {
    annotationService,
    pageChangeEvictionTag,
    perspectiveChangedEvictionTag,
    rarelyChangingContent,
    Cached,
    CrossFrameEventService,
    ICatalogService,
    IExperience,
    IExperienceService,
    IPerspectiveService,
    IRestService,
    IRestServiceFactory,
    ISharedDataService,
    Pagination,
    SystemEventService,
    WindowUtils,
    EVENT_PERSPECTIVE_REFRESHED,
    EVENT_PERSPECTIVE_CHANGED
} from 'smarteditcommons';

describe('Test WorkflowService', () => {
    let restServiceFactory: jasmine.SpyObj<IRestServiceFactory>;
    let crossFrameEventService: jasmine.SpyObj<CrossFrameEventService>;
    let systemEventService: jasmine.SpyObj<SystemEventService>;
    let sharedDataService: jasmine.SpyObj<ISharedDataService>;
    let perspectiveService: jasmine.SpyObj<IPerspectiveService>;
    let catalogService: jasmine.SpyObj<ICatalogService>;
    let workflowOperationsRESTService: jasmine.SpyObj<IRestService<Workflow>>;
    let workflowRESTService: jasmine.SpyObj<IRestService<Workflow>>;
    let workflowTemplateRESTService: jasmine.SpyObj<IRestService<WorkflowTemplate>>;
    let workflowActionsRESTService: jasmine.SpyObj<IRestService<Workflow>>;
    let workflowActionCommentsRESTService: jasmine.SpyObj<IRestService<WorkflowActionComment>>;
    let experienceService: jasmine.SpyObj<IExperienceService>;
    let windowUtils: jasmine.SpyObj<WindowUtils>;
    let workflowTasksPollingService: jasmine.SpyObj<WorkflowTasksPollingService>;
    let currentExperience: IExperience;

    const WORKFLOW_TEMPLATE_CODE1 = 'WorkflowTemplateCode1';
    const WORKFLOW_TEMPLATE_NAME1 = 'WorkflowTemplateName1';
    const WORKFLOW_TEMPLATE_CODE2 = 'WorkflowTemplateCode2';
    const WORKFLOW_TEMPLATE_NAME2 = 'WorkflowTemplateName2';
    const CATALOG_ID = 'contextCatalogId';
    const CATALOG_VERSION = 'contextCatalogVersion';

    const uriContext = {
        CURRENT_CONTEXT_CATALOG: CATALOG_ID,
        CURRENT_CONTEXT_CATALOG_VERSION: CATALOG_VERSION
    };
    let workflowService: WorkflowService;

    beforeEach(() => {
        restServiceFactory = jasmine.createSpyObj<IRestServiceFactory>('restServiceFactory', [
            'get'
        ]);
        experienceService = jasmine.createSpyObj<IExperienceService>('experienceService', [
            'getCurrentExperience',
            'compareWithCurrentExperience',
            'loadExperience'
        ]);
        crossFrameEventService = jasmine.createSpyObj<CrossFrameEventService>(
            'crossFrameEventService',
            ['subscribe', 'publish']
        );
        sharedDataService = jasmine.createSpyObj<ISharedDataService>('sharedDataService', [
            'set',
            'get',
            'remove'
        ]);
        perspectiveService = jasmine.createSpyObj<IPerspectiveService>('perspectiveService', [
            'getActivePerspectiveKey',
            'switchTo'
        ]);
        systemEventService = jasmine.createSpyObj<SystemEventService>('systemEventService', [
            'subscribe',
            'publish'
        ]);
        catalogService = jasmine.createSpyObj<ICatalogService>('catalogService', [
            'retrieveUriContext',
            'getDefaultSiteForContentCatalog'
        ]);
        windowUtils = jasmine.createSpyObj<WindowUtils>('windowUtils', ['getGatewayTargetFrame']);
        workflowTasksPollingService = jasmine.createSpyObj<WorkflowTasksPollingService>(
            'workflowTasksPollingService',
            ['addSubscriber']
        );
        catalogService.retrieveUriContext.and.returnValue(Promise.resolve(uriContext));
    });

    function createWorkflowInstance(): WorkflowService {
        return new WorkflowService(
            restServiceFactory,
            crossFrameEventService,
            systemEventService,
            sharedDataService,
            perspectiveService,
            catalogService,
            experienceService,
            workflowTasksPollingService
        );
    }

    describe('Open Page Workflow Menu', () => {
        beforeEach(() => {
            workflowService = createWorkflowInstance();
        });

        it('WHEN initialized THEN subscribes to EVENT_PERSPECTIVE_REFRESHED and EVENT_PERSPECTIVE_CHANGED event', () => {
            expect(crossFrameEventService.subscribe).toHaveBeenCalledWith(
                EVENT_PERSPECTIVE_REFRESHED,
                jasmine.any(Function)
            );
            expect(crossFrameEventService.subscribe).toHaveBeenCalledWith(
                EVENT_PERSPECTIVE_CHANGED,
                jasmine.any(Function)
            );
            expect(workflowTasksPollingService.addSubscriber).toHaveBeenCalledWith(
                jasmine.any(Function),
                true
            );
        });

        it('WHEN currently in basic edit perspective mode THEN publishes an event to open the menu', async () => {
            // GIVEN
            const openPageWorkflowMenu = crossFrameEventService.subscribe.calls.argsFor(
                0
            )[1] as WorkflowService['openPageWorkflowMenu'];

            sharedDataService.get.and.returnValue(Promise.resolve(OpenPageWorkflowMenu.Default));
            perspectiveService.getActivePerspectiveKey.and.returnValue(
                Promise.resolve(CMSModesService.BASIC_PERSPECTIVE_KEY)
            );

            // WHEN
            await openPageWorkflowMenu();

            // THEN
            expect(systemEventService.publish).toHaveBeenCalledWith(
                CMS_EVENT_OPEN_PAGE_WORKFLOW_MENU,
                true
            );
            expect(sharedDataService.remove).toHaveBeenCalledWith(OPEN_PAGE_WORKFLOW_MENU);
            expect(sharedDataService.set).not.toHaveBeenCalled();
            expect(perspectiveService.switchTo).not.toHaveBeenCalled();
        });

        it('WHEN currently in versioning perspective mode THEN switches to advanced mode and sets OPEN_PAGE_WORKFLOW_MENU in sharedDataService to SwitchPerspective', async () => {
            // GIVEN
            const openPageWorkflowMenu = crossFrameEventService.subscribe.calls.argsFor(
                0
            )[1] as WorkflowService['openPageWorkflowMenu'];
            sharedDataService.get.and.returnValue(Promise.resolve(OpenPageWorkflowMenu.Default));

            perspectiveService.getActivePerspectiveKey.and.returnValue(
                Promise.resolve(CMSModesService.VERSIONING_PERSPECTIVE_KEY)
            );
            sharedDataService.set.and.returnValue(Promise.resolve());
            perspectiveService.switchTo.and.returnValue(Promise.resolve());

            // WHEN
            await openPageWorkflowMenu();

            // THEN
            expect(sharedDataService.set).toHaveBeenCalledWith(
                OPEN_PAGE_WORKFLOW_MENU,
                OpenPageWorkflowMenu.SwitchPerspective
            );
            expect(perspectiveService.switchTo).toHaveBeenCalledWith(
                CMSModesService.ADVANCED_PERSPECTIVE_KEY
            );
        });

        it('WHEN OPEN_PAGE_WORKFLOW_MENU is SwitchPerspective THEN it publishes an event to open the menu', async () => {
            // GIVEN
            const openPageWorkflowMenu = crossFrameEventService.subscribe.calls.argsFor(
                0
            )[1] as WorkflowService['openPageWorkflowMenu'];
            sharedDataService.get.and.returnValue(
                Promise.resolve(OpenPageWorkflowMenu.SwitchPerspective)
            );

            // WHEN
            await openPageWorkflowMenu();

            // THEN
            expect(systemEventService.publish).toHaveBeenCalledWith(
                CMS_EVENT_OPEN_PAGE_WORKFLOW_MENU,
                true
            );
            expect(sharedDataService.remove).toHaveBeenCalledWith(OPEN_PAGE_WORKFLOW_MENU);
        });

        it('WHEN there is no OPEN_PAGE_WORKFLOW_MENU in sharedDataservice THEN it does not publish an event to open the menu', async () => {
            // GIVEN
            const openPageWorkflowMenu = crossFrameEventService.subscribe.calls.argsFor(
                0
            )[1] as WorkflowService['openPageWorkflowMenu'];
            sharedDataService.get.and.returnValue(Promise.resolve());

            // WHEN
            await openPageWorkflowMenu();

            // THEN
            expect(systemEventService.publish).not.toHaveBeenCalled();
            expect(perspectiveService.switchTo).not.toHaveBeenCalled();
            expect(sharedDataService.set).not.toHaveBeenCalled();
        });

        it('WHEN given experience from workflow task is same as current experience THEN it does not load experience', async () => {
            // GIVEN
            const task: WorkflowTask = {
                action: null,
                attachments: [
                    {
                        pageName: 'pageName',
                        pageUid: 'pageUid',
                        catalogId: 'catalogId',
                        catalogVersion: 'catalogVersion',
                        catalogName: { en: 'catalogName' }
                    }
                ]
            };
            catalogService.getDefaultSiteForContentCatalog.and.returnValue(
                Promise.resolve({
                    uid: 'siteId'
                })
            );
            experienceService.compareWithCurrentExperience.and.returnValue(Promise.resolve(true));
            sharedDataService.set.and.returnValue(Promise.resolve());
            windowUtils.getGatewayTargetFrame.and.returnValue(true);
            spyOn(workflowService, 'openPageWorkflowMenu').and.callFake(noop);

            // WHEN
            await workflowService.loadExperienceAndOpenPageWorkflowMenu(task);

            // THEN
            expect(experienceService.compareWithCurrentExperience).toHaveBeenCalledWith({
                siteId: 'siteId',
                catalogId: 'catalogId',
                catalogVersion: 'catalogVersion',
                pageId: 'pageUid'
            });
            expect(sharedDataService.set).toHaveBeenCalledWith(
                OPEN_PAGE_WORKFLOW_MENU,
                OpenPageWorkflowMenu.Default
            );
            expect(workflowService.openPageWorkflowMenu).toHaveBeenCalled();
            expect(experienceService.loadExperience).not.toHaveBeenCalled();
        });

        it('WHEN given experience from workflow task is not as same as current experience THEN it loads experience', async () => {
            // GIVEN
            const task: WorkflowTask = {
                action: null,
                attachments: [
                    {
                        pageName: 'pageName',
                        pageUid: 'pageUid',
                        catalogId: 'catalogId',
                        catalogVersion: 'catalogVersion',
                        catalogName: { en: 'catalogName' }
                    }
                ]
            };
            catalogService.getDefaultSiteForContentCatalog.and.returnValue(
                Promise.resolve({
                    uid: 'siteId'
                })
            );
            experienceService.compareWithCurrentExperience.and.returnValue(Promise.resolve(false));
            experienceService.loadExperience.and.returnValue(Promise.resolve());
            windowUtils.getGatewayTargetFrame.and.returnValue(true);

            // WHEN
            await workflowService.loadExperienceAndOpenPageWorkflowMenu(task);

            // THEN
            expect(experienceService.loadExperience).toHaveBeenCalledWith({
                siteId: 'siteId',
                catalogId: 'catalogId',
                catalogVersion: 'catalogVersion',
                pageId: 'pageUid'
            });
            expect(sharedDataService.set).toHaveBeenCalledWith(
                OPEN_PAGE_WORKFLOW_MENU,
                OpenPageWorkflowMenu.Default
            );
        });

        it('WHEN there is no current experience THEN it loads the experience from the given parameters', async () => {
            // GIVEN
            const task: WorkflowTask = {
                action: null,
                attachments: [
                    {
                        pageName: 'pageName',
                        pageUid: 'pageUid',
                        catalogId: 'catalogId',
                        catalogVersion: 'catalogVersion',
                        catalogName: { en: 'catalogName' }
                    }
                ]
            };
            catalogService.getDefaultSiteForContentCatalog.and.returnValue(
                Promise.resolve({
                    uid: 'siteId'
                })
            );
            experienceService.compareWithCurrentExperience.and.returnValue(Promise.resolve(false));
            experienceService.loadExperience.and.returnValue(Promise.resolve());
            windowUtils.getGatewayTargetFrame.and.returnValue(null);

            // WHEN
            await workflowService.loadExperienceAndOpenPageWorkflowMenu(task);

            // THEN
            expect(experienceService.loadExperience).toHaveBeenCalledWith({
                siteId: 'siteId',
                catalogId: 'catalogId',
                catalogVersion: 'catalogVersion',
                pageId: 'pageUid'
            });
            expect(sharedDataService.set).toHaveBeenCalledWith(
                OPEN_PAGE_WORKFLOW_MENU,
                OpenPageWorkflowMenu.Default
            );
        });
    });

    describe('Workflow cancel', () => {
        beforeEach(() => {
            workflowService = createWorkflowInstance();
        });

        it('WHEN cancel workflow is called THEN update rest call is made', async () => {
            // GIVEN
            workflowOperationsRESTService = jasmine.createSpyObj<IRestService<Workflow>>(
                'workflowOperationsRESTService',
                ['save']
            );
            restServiceFactory.get.and.returnValue(workflowOperationsRESTService);
            const workflow = {} as Workflow;
            workflowOperationsRESTService.save.and.returnValue(Promise.resolve());

            // WHEN
            await workflowService.cancelWorflow(workflow);

            // THEN
            expect(workflowOperationsRESTService.save).toHaveBeenCalled();
        });
    });

    describe('Workflow templates', () => {
        beforeEach(() => {
            workflowTemplateRESTService = jasmine.createSpyObj<IRestService<Workflow>>(
                'workflowTemplateRESTService',
                ['get']
            );
            restServiceFactory.get.and.returnValue(workflowTemplateRESTService);
            workflowTemplateRESTService.get.and.returnValue(
                Promise.resolve({
                    templates: []
                })
            );

            workflowService = createWorkflowInstance();

            currentExperience = {
                catalogDescriptor: null,
                siteDescriptor: null,
                productCatalogVersions: null,
                time: null,
                pageContext: {
                    catalogId: CATALOG_ID,
                    catalogVersion: CATALOG_VERSION,
                    catalogVersionUuid: 'some uuid',
                    catalogName: { en: 'some catalog name' },
                    active: true,
                    siteId: 'some site ID'
                }
            };
            experienceService.getCurrentExperience.and.returnValue(
                Promise.resolve(currentExperience)
            );
        });

        it('GIVEN current catalog version in experience has no workflows assigned to it WHEN areWorkflowsEnabledOnCurrentCatalogVersion is called THEN it returns false', async () => {
            const actual = await workflowService.areWorkflowsEnabledOnCurrentCatalogVersion();

            expect(actual).toBe(false);
        });

        it('GIVEN current catalog version in experience has workflows assigned to it WHEN areWorkflowsEnabledOnCurrentCatalogVersion is called THEN it returns true', async () => {
            // GIVEN
            workflowTemplateRESTService.get.and.returnValue(
                Promise.resolve({
                    templates: [
                        {
                            code: WORKFLOW_TEMPLATE_CODE1,
                            name: WORKFLOW_TEMPLATE_NAME1
                        }
                    ]
                })
            );

            // WHEN
            const result = await workflowService.areWorkflowsEnabledOnCurrentCatalogVersion();

            // THEN
            expect(workflowTemplateRESTService.get).toHaveBeenCalledWith(
                jasmine.objectContaining({})
            );
            expect(result).toBeTruthy();
        });
    });

    describe('Active workflow for page', () => {
        const pageUuid = 'some page UUID';
        const expectedQueryParams = {
            pageSize: 1,
            currentPage: 0,
            attachment: pageUuid,
            statuses: WorkflowStatus.RUNNING + ',' + WorkflowStatus.PAUSED
        };

        beforeEach(() => {
            workflowRESTService = jasmine.createSpyObj<IRestService<Workflow>>(
                'workflowRESTService',
                ['get']
            );
            restServiceFactory.get.and.returnValue(workflowRESTService);
            workflowService = createWorkflowInstance();
        });

        it('GIVEN there is an active workflow for current page WHEN getActiveWorkflowForPageUuid is called THEN it returns the workflow found', async () => {
            // GIVEN
            const expectedResult: Workflow = {
                workflowCode: 'some workflow property',
                templateCode: undefined,
                isAvailableForCurrentPrincipal: undefined
            };
            const response = {
                workflows: [expectedResult]
            };
            workflowRESTService.get.and.returnValue(Promise.resolve(response));

            // WHEN
            const resultWorkflow = await workflowService.getActiveWorkflowForPageUuid(pageUuid);

            // THEN
            expect(resultWorkflow).toBe(expectedResult);
            expect(workflowRESTService.get).toHaveBeenCalledWith(expectedQueryParams);
        });

        it('GIVEN no active workflow for current page exists WHEN getActiveWorkflowForPageUuid is called THEN it returns  null', async () => {
            // GIVEN
            const response = {
                workflows: []
            };
            workflowRESTService.get.and.returnValue(Promise.resolve(response));

            // WHEN
            const resultWorkflow = await workflowService.getActiveWorkflowForPageUuid(pageUuid);

            // THEN
            expect(resultWorkflow).toBe(null);
            expect(workflowRESTService.get).toHaveBeenCalledWith(expectedQueryParams);
        });

        it('GIVEN there is an active workflow for current page WHEN isPageInWorkflow is called THEN it returns true', async () => {
            // GIVEN
            const page = {
                uuid: pageUuid
            } as ICMSPage;
            const expectedResult = 'some workflow property';
            const response = {
                workflows: [expectedResult]
            };
            workflowRESTService.get.and.returnValue(Promise.resolve(response));

            // WHEN
            const isPageInWorkflow = await workflowService.isPageInWorkflow(page);

            // THEN
            expect(isPageInWorkflow).toBe(true);
        });

        it('GIVEN no active workflow for current page WHEN isPageInWorkflow is called THEN it returns false', async () => {
            // GIVEN
            const page = {
                uuid: pageUuid
            } as ICMSPage;
            const response = {
                workflows: []
            };
            workflowRESTService.get.and.returnValue(Promise.resolve(response));

            // WHEN
            const isPageInWorkflow = await workflowService.isPageInWorkflow(page);

            // THEN
            expect(isPageInWorkflow).toBe(false);
        });
    });

    describe('Workflow search', () => {
        beforeEach(() => {
            workflowRESTService = jasmine.createSpyObj<IRestService<Workflow>>(
                'workflowRESTService',
                ['get']
            );
            restServiceFactory.get.and.returnValue(workflowRESTService);
            workflowRESTService.get.and.returnValue(Promise.resolve({}));
            workflowService = createWorkflowInstance();
        });

        it('WHEN getWorkflows is called THEN it should be cached', () => {
            // WHEN / THEN
            const decoratorObj: any = annotationService.getMethodAnnotation(
                WorkflowService,
                'getWorkflows',
                Cached
            );
            expect(decoratorObj).toEqual(
                jasmine.objectContaining([
                    {
                        actions: [rarelyChangingContent],
                        tags: [
                            pageChangeEvictionTag,
                            perspectiveChangedEvictionTag,
                            workflowTasksMenuOpenedEvictionTag,
                            workflowCompletedEvictionTag,
                            workflowCreatedEvictionTag
                        ]
                    }
                ])
            );
        });

        it('Should not prepopulate catalogId and catalogVersion with default values if they were provided during workflow search', async () => {
            // GIVEN
            const queryParams = {
                pageSize: 10,
                currentPage: 0,
                status: 'STATUS',
                catalogId: 'catalogId',
                catalogVersion: 'catalogVersion'
            };
            const expectedQueryParams = clone(queryParams);

            // WHEN
            await workflowService.getWorkflows(queryParams);

            // THEN
            expect(workflowRESTService.get).toHaveBeenCalledWith(expectedQueryParams);
        });
    });

    describe('Workflow Template search', () => {
        beforeEach(() => {
            workflowTemplateRESTService = jasmine.createSpyObj<IRestService<Workflow>>(
                'workflowTemplateRESTService',
                ['get']
            );
            restServiceFactory.get.and.returnValue(workflowTemplateRESTService);
            workflowTemplateRESTService.get.and.returnValue(
                Promise.resolve({
                    templates: []
                })
            );
            workflowService = createWorkflowInstance();
        });

        it('WHEN getWorkflowTemplates is called THEN it should be cached', () => {
            // WHEN / THEN
            const decoratorObj: any = annotationService.getMethodAnnotation(
                WorkflowService,
                'getWorkflowTemplates',
                Cached
            );
            expect(decoratorObj).toEqual(
                jasmine.objectContaining([
                    {
                        actions: [rarelyChangingContent],
                        tags: [pageChangeEvictionTag]
                    }
                ])
            );
        });

        it('Should not prepopulate catalogId and catalogVersion with default values if they were provided during workflow template search', async () => {
            // GIVEN
            const queryParams = {
                catalogId: 'catalogId',
                catalogVersion: 'catalogVersion'
            };
            const expectedQueryParams = clone(queryParams);

            // WHEN
            await workflowService.getWorkflowTemplates(queryParams);

            // THEN
            expect(workflowTemplateRESTService.get).toHaveBeenCalledWith(expectedQueryParams);
        });

        it('Should return workflow template by code', async () => {
            // GIVEN
            workflowTemplateRESTService.get.and.returnValue(
                Promise.resolve({
                    templates: [
                        {
                            code: WORKFLOW_TEMPLATE_CODE1,
                            name: WORKFLOW_TEMPLATE_NAME1
                        },
                        {
                            code: WORKFLOW_TEMPLATE_CODE2,
                            name: WORKFLOW_TEMPLATE_NAME2
                        }
                    ]
                })
            );

            // WHEN
            const workflow = await workflowService.getWorkflowTemplateByCode(
                WORKFLOW_TEMPLATE_CODE1
            );

            // THEN
            expect(workflow.code).toBe(WORKFLOW_TEMPLATE_CODE1);
        });
    });

    describe('Actions For Workflow Code', () => {
        let WORKFLOW_ACTION_1: WorkflowAction;
        let WORKFLOW_ACTION_2: WorkflowAction;

        beforeEach(() => {
            WORKFLOW_ACTION_1 = {
                actionType: 'type1',
                code: 'code1',
                decisions: [
                    {
                        code: 'Approve',
                        description: { en: 'Page is correct and ready to be published' },
                        name: { en: 'Approve' }
                    },
                    {
                        code: 'Reject',
                        description: { en: 'Page needs to be reworked' },
                        name: { en: 'Reject' }
                    }
                ],
                description: { en: 'Review page to ensure it is ready to be published' },
                isCurrentUserParticipant: false,
                name: { en: 'Action 1' },
                status: WorkflowActionStatus.COMPLETED,
                startedAgoInMillis: undefined
            };

            WORKFLOW_ACTION_2 = {
                actionType: 'type2',
                code: 'code2',
                decisions: [
                    {
                        code: 'Approve2',
                        description: { en: 'Page is correct and ready to be published' },
                        name: { en: 'Approve' }
                    },
                    {
                        code: 'Reject2',
                        description: { en: 'Page needs to be reworked' },
                        name: { en: 'Reject' }
                    }
                ],
                description: { en: 'Review page to ensure it is ready to be published' },
                isCurrentUserParticipant: true,
                name: { en: 'Action 2' },
                status: WorkflowActionStatus.IN_PROGRESS,
                startedAgoInMillis: undefined
            };

            workflowActionsRESTService = jasmine.createSpyObj<IRestService<Workflow>>(
                'workflowActionsRESTService',
                ['get']
            );
            restServiceFactory.get.and.returnValue(workflowActionsRESTService);
            workflowActionsRESTService.get.and.returnValue(
                Promise.resolve({
                    workflowCode: 'someWorkflowCode',
                    actions: [WORKFLOW_ACTION_1, WORKFLOW_ACTION_2]
                })
            );
            workflowService = createWorkflowInstance();
        });

        it('WHEN getAllActionsForWorkflowCode is called THEN it should be cached', () => {
            // WHEN / THEN
            const decoratorObj: any = annotationService.getMethodAnnotation(
                WorkflowService,
                'getAllActionsForWorkflowCode',
                Cached
            );
            expect(decoratorObj).toEqual(
                jasmine.objectContaining([
                    {
                        actions: [rarelyChangingContent],
                        tags: [
                            pageChangeEvictionTag,
                            workflowTasksMenuOpenedEvictionTag,
                            workflowCompletedEvictionTag,
                            workflowCreatedEvictionTag
                        ]
                    }
                ])
            );
        });

        it('WHEN getAllActionsForWorkflowCode is called THEN should return all avaialble actions', async () => {
            // WHEN
            const workflowActions = await workflowService.getAllActionsForWorkflowCode(
                'someWorkflowCode'
            );

            // THEN
            expect(workflowActions.length).toBe(2);
        });

        it('WHEN getActiveActionsForWorkflowCode is called THEN should return active actions for the current user', async () => {
            // WHEN
            const workflowActions = await workflowService.getActiveActionsForWorkflowCode(
                'someWorkflowCode'
            );

            // THEN
            expect(workflowActions.length).toBe(1);
            expect(workflowActions[0].code).toBe('code2');
        });

        it('WHEN isUserParticipanInActiveAction is called THEN should return true if user is participan of active action', async () => {
            // WHEN
            const isParticipant = await workflowService.isUserParticipanInActiveAction(
                'someWorkflowCode'
            );

            // THEN
            expect(isParticipant).toBe(true);
        });

        it('WHEN isUserParticipanInActiveAction is called THEN should return false if user is not participan of active action', async () => {
            // GIVEN
            WORKFLOW_ACTION_2.isCurrentUserParticipant = false;

            // WHEN
            const isParticipant = await workflowService.isUserParticipanInActiveAction(
                'someWorkflowCode'
            );

            // THEN
            expect(isParticipant).toBe(false);
        });
    });

    describe('Comments For Workflow Action', () => {
        const WORKFLOW_ACTION_COMMENT_1 = {
            authorName: 'Author1',
            code: 'Code1',
            creationtime: 'Time1',
            text: 'Text1'
        };

        const WORKFLOW_ACTION_COMMENT_2 = {
            authorName: 'Author2',
            code: 'Code2',
            creationtime: 'Time2',
            text: 'Text2'
        };

        beforeEach(() => {
            workflowActionCommentsRESTService = jasmine.createSpyObj<IRestService<Workflow>>(
                'workflowActionCommentsRESTService',
                ['page']
            );
            restServiceFactory.get.and.returnValue(workflowActionCommentsRESTService);
            workflowActionCommentsRESTService.page.and.returnValue(
                Promise.resolve({
                    comments: [WORKFLOW_ACTION_COMMENT_1, WORKFLOW_ACTION_COMMENT_2],
                    pagination: {
                        currentPage: 0
                    }
                })
            );
            workflowService = createWorkflowInstance();
        });

        it('WHEN getCommentsForworkflowAction is called THEN should return all available comments associated to a given action', async () => {
            // WHEN
            const response = await workflowService.getCommentsForWorkflowAction(
                'someWorkflowCode',
                'someWorkflowAction',
                {
                    currentPage: 0
                }
            );

            // THEN
            expect(response.comments.length).toBe(2);
        });
    });

    describe('WorkflowInboxTasks', () => {
        beforeEach(() => {
            workflowActionCommentsRESTService = jasmine.createSpyObj<IRestService<Workflow>>(
                'workflowActionCommentsRESTService',
                ['get']
            );
            restServiceFactory.get.and.returnValue(workflowActionCommentsRESTService);
            workflowService = createWorkflowInstance();
        });

        it('WHEN getTotalNumberOfActiveWorkflowTasks is called THEN it returns total count based on information that polling service returned', async () => {
            // GIVEN
            const tasks: WorkflowTask[] = [];
            const pagination: Pagination = {
                count: 3,
                page: 0,
                totalPages: 10,
                totalCount: 20
            };
            const callbackFn = workflowTasksPollingService.addSubscriber.calls.argsFor(0)[0];
            callbackFn(tasks, pagination);

            // WHEN
            const count = await workflowService
                .getTotalNumberOfActiveWorkflowTasks()
                .pipe(take(1))
                .toPromise();

            // THEN
            expect(count).toBe(20);
        });
    });
});
