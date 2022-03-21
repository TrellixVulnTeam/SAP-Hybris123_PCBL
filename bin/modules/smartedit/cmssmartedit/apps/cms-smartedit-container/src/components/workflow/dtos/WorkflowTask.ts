/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { WorkflowAction } from './WorkflowAction';
import { WorkflowTaskPage } from './WorkflowTaskPage';

/**
 * Represents a workflow task.
 */
export interface WorkflowTask {
    action: WorkflowAction;
    attachments: WorkflowTaskPage[];
}
