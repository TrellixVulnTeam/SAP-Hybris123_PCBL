/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { LocalizedMap } from 'smarteditcommons';

/**
 * Interface used by {@link WorkflowService} to query workflow decision.
 */
export interface WorkflowDecision {
    code: string;
    name: LocalizedMap;
    description: LocalizedMap;
}
