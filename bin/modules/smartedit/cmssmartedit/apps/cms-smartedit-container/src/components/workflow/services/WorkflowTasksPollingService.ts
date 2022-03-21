/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { cloneDeep } from 'lodash';

import {
    CrossFrameEventService,
    IRestService,
    IRestServiceFactory,
    Pagination,
    SeDowngradeService,
    TimerService,
    EVENTS,
    Timer
} from 'smarteditcommons';

import { WorkflowTask } from '../dtos/WorkflowTask';
import { WorkflowTaskList } from '../dtos/WorkflowTaskList';

type WorkflowTaskSubscriber = (tasks: WorkflowTask[], pagination: Pagination) => any;

interface Subscriber {
    subscriber: WorkflowTaskSubscriber;
    callOnInit: boolean;
}

const INBOX_POLLING_PARAMS = {
    INBOX_POLLING_TIMEOUT: 20000,
    INBOX_POLLING_PAGESIZE: 10,
    INBOX_POLLING_CURRENTPAGE: 0
};

/**
 * Used to retrieve inbox tasks.
 */
@SeDowngradeService()
export class WorkflowTasksPollingService {
    private readonly resourceInboxURI = '/cmssmarteditwebservices/v1/inbox/workflowtasks';
    private subscribers: Subscriber[] = [];
    private syncPollingTimer: Timer = null;
    private savedHashedTasks: string[] = [];

    private inboxRESTService: IRestService<WorkflowTaskList>;

    constructor(
        private timerService: TimerService,
        private restServiceFactory: IRestServiceFactory,
        private crossFrameEventService: CrossFrameEventService
    ) {
        this.inboxRESTService = this.restServiceFactory.get(this.resourceInboxURI);

        this.crossFrameEventService.subscribe(EVENTS.AUTHORIZATION_SUCCESS, () =>
            this.initPolling()
        );
        this.crossFrameEventService.subscribe(EVENTS.LOGOUT, () => this.stopPolling());
        this.crossFrameEventService.subscribe(EVENTS.REAUTH_STARTED, () => this.stopPolling());

        this.initPolling();
    }

    /**
     * Stops a polling timer.
     */
    public stopPolling(): void {
        if (this.syncPollingTimer.isActive()) {
            this.syncPollingTimer.stop();
        }
    }

    /**
     * Starts a polling timer.
     */
    public startPolling(): void {
        if (!this.syncPollingTimer.isActive()) {
            this.syncPollingTimer.restart(INBOX_POLLING_PARAMS.INBOX_POLLING_TIMEOUT);
        }
    }

    /**
     * Adds a new subscriber to the polling service. The subscriber is called with a list of new tasks and a pagination information.
     *
     * @param subscriber The subscriber.
     * @param callOnInit Default is true, when set to false, will not call the subscriber on initialization of the polling.
     *
     * @returns The method that can be used to unsubscribe.
     */
    public addSubscriber(subscriber: WorkflowTaskSubscriber, callOnInit: boolean): () => void {
        this.subscribers.push({
            subscriber,
            callOnInit
        });

        const unsubscribeFn = (): void => this.unsubscribe(subscriber);

        return unsubscribeFn;
    }

    /**
     * Initializes a polling process.
     */
    private initPolling(): void {
        this.syncPollingTimer = this.timerService.createTimer(
            () => this.fetchInboxTasks(false),
            INBOX_POLLING_PARAMS.INBOX_POLLING_TIMEOUT
        );
        this.fetchInboxTasks(true);
        this.startPolling();
    }

    /**
     * Unsubscribes a subscriber.
     * @param subscriber The subscriber that will be unsubscribed.
     */
    private unsubscribe(subscriber: WorkflowTaskSubscriber): void {
        const index = this.subscribers.findIndex(
            (subs: Subscriber) => subs.subscriber === subscriber
        );

        if (index > -1) {
            this.subscribers.splice(index, 1);
        }
    }

    /**
     * Returns tasks that have not been yet delivered to subscribers.
     * @param tasks The list of retrieved tasks from the backend.
     * @return The list of new tasks.
     */
    private getNewTasks(tasks: WorkflowTask[]): WorkflowTask[] {
        const newTasks = tasks.filter((task) => {
            const hashedTask = this.encodeTask(task);
            return !this.savedHashedTasks.includes(hashedTask);
        });
        return newTasks;
    }

    /**
     * New tasks are added at the end of the array. If the array is bigger than INBOX_POLLING_PAGESIZE
     * it shrinks from the beginning to the INBOX_POLLING_PAGESIZE size.
     * @param newTasks The list of new tasks that will be stored in cache. Each task is encoded as base-64 string.
     */
    private saveNewHashedTasks(newTasks: WorkflowTask[]): void {
        newTasks.forEach((task) => this.savedHashedTasks.push(this.encodeTask(task)));
        const sizeDiff = this.savedHashedTasks.length - INBOX_POLLING_PARAMS.INBOX_POLLING_PAGESIZE;
        if (sizeDiff > 0) {
            for (let i = 0; i < sizeDiff; i++) {
                this.savedHashedTasks.shift();
            }
        }
    }

    /**
     * Encodes a task.
     * @param task the task that will be encoded to a base-64 string.
     * @return The encoded string
     */
    private encodeTask(task: WorkflowTask): string {
        const taskClone: WorkflowTask = cloneDeep(task);
        if (taskClone.action) {
            delete taskClone.action.startedAgoInMillis;
        }

        return btoa(JSON.stringify(taskClone));
    }

    /**
     * Retrieves the list if tasks from the backend in paginated view.
     * It calls each subscriber with a list of new tasks and pagination information.
     */
    private async fetchInboxTasks(isInit: boolean): Promise<void> {
        const response = await this.fetchTaskList();
        if (!response) {
            this.stopPolling();
            return;
        }

        const newTasks = this.getNewTasks(response.tasks);
        this.saveNewHashedTasks(newTasks);

        this.subscribers.forEach((subscriber: Subscriber) => {
            if (!isInit || (isInit && !!subscriber.callOnInit)) {
                subscriber.subscriber(newTasks, response.pagination);
            }
        });
    }

    private fetchTaskList(): Promise<WorkflowTaskList | void> {
        try {
            return this.inboxRESTService.get({
                pageSize: INBOX_POLLING_PARAMS.INBOX_POLLING_PAGESIZE,
                currentPage: INBOX_POLLING_PARAMS.INBOX_POLLING_CURRENTPAGE
            });
        } catch (error) {
            return;
        }
    }
}
