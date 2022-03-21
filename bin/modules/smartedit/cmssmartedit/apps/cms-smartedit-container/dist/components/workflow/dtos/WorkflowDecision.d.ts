import { LocalizedMap } from 'smarteditcommons';
/**
 * Interface used by {@link WorkflowService} to query workflow decision.
 */
export interface WorkflowDecision {
    code: string;
    name: LocalizedMap;
    description: LocalizedMap;
}
