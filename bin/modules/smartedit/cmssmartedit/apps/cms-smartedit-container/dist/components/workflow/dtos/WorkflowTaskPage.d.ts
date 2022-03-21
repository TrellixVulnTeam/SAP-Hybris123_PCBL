import { LocalizedMap } from 'smarteditcommons';
/**
 * Interface used by WorkflowTask as a page related attachment.
 */
export interface WorkflowTaskPage {
    pageName: string;
    pageUid: string;
    catalogId: string;
    catalogName: LocalizedMap;
    catalogVersion: string;
}
