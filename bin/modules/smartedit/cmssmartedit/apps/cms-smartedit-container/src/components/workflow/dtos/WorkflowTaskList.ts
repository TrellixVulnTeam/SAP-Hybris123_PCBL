/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Pagination } from 'smarteditcommons';
import { WorkflowTask } from './WorkflowTask';

/**
 * Represent a Workflow Task List.
 */
export interface WorkflowTaskList {
    tasks: WorkflowTask[];
    pagination: Pagination;
}
