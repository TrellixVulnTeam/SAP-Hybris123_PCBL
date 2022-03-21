export interface IWorkflow {
    createVersion: boolean;
    description: string;
    isAvailableForCurrentPrincipal: boolean;
    status: string;
    workflowCode: string;
}
