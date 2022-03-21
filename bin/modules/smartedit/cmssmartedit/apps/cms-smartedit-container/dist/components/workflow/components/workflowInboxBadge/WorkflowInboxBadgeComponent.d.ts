import { Observable } from 'rxjs';
import { WorkflowService } from '../../services/WorkflowService';
export declare class WorkflowInboxBadgeComponent {
    private workflowService;
    inboxCount$: Observable<number>;
    constructor(workflowService: WorkflowService);
    ngOnInit(): void;
    stringifyCount(count: number): string;
}
