import { IContextAwareEditableItemService, IPageService } from 'cmscommons';
import { WorkflowService } from '../../components/workflow/services/WorkflowService';
export declare class ContextAwareEditableItemService extends IContextAwareEditableItemService {
    private workflowService;
    private pageService;
    constructor(workflowService: WorkflowService, pageService: IPageService);
    isItemEditable(itemUid: string): Promise<boolean>;
    /**
     * Verifies whether the item's active workflow equals to the workflow of page currently in preview.
     */
    private editableInCurrentPageContext;
}
