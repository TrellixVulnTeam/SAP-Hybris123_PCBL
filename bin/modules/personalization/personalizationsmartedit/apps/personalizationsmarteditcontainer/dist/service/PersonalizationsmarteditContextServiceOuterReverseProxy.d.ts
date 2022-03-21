import { PersonalizationsmarteditContextService } from "personalizationsmarteditcontainer/service/PersonalizationsmarteditContextServiceOuter";
export declare class PersonalizationsmarteditContextServiceReverseProxy {
    protected personalizationsmarteditContextService: PersonalizationsmarteditContextService;
    protected workflowService: any;
    protected pageInfoService: any;
    static readonly WORKFLOW_RUNNING_STATUS = "RUNNING";
    constructor(personalizationsmarteditContextService: PersonalizationsmarteditContextService, workflowService: any, pageInfoService: any);
    applySynchronization(): void;
    isCurrentPageActiveWorkflowRunning(): Promise<boolean>;
}
