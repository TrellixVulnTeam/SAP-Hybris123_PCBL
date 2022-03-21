/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Represents workflow statuses.
 */
export enum WorkflowStatus {
    CONTINUED = 'continued',
    RUNNING = 'running',
    PAUSED = 'paused',
    FINISHED = 'finished',
    ABORTED = 'aborted',
    NEW = 'new'
}
