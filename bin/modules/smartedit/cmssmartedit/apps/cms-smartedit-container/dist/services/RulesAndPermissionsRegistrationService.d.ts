import { AttributePermissionsRestService, CMSModesService, IPageService, TypePermissionsRestService } from 'cmscommons';
import { ICatalogService, ICatalogVersionPermissionService, IExperienceService, IPermissionService, ISharedDataService } from 'smarteditcommons';
import { WorkflowService } from '../components/workflow/services';
import { CatalogVersionRestService } from '../dao';
export declare class RulesAndPermissionsRegistrationService {
    private attributePermissionsRestService;
    private catalogService;
    private catalogVersionPermissionService;
    private catalogVersionRestService;
    private cMSModesService;
    private experienceService;
    private pageService;
    private permissionService;
    private sharedDataService;
    private typePermissionsRestService;
    private workflowService;
    constructor(attributePermissionsRestService: AttributePermissionsRestService, catalogService: ICatalogService, catalogVersionPermissionService: ICatalogVersionPermissionService, catalogVersionRestService: CatalogVersionRestService, cMSModesService: CMSModesService, experienceService: IExperienceService, pageService: IPageService, permissionService: IPermissionService, sharedDataService: ISharedDataService, typePermissionsRestService: TypePermissionsRestService, workflowService: WorkflowService);
    register(): void;
    private onSuccess;
    private onError;
    private getCurrentPageActiveWorkflow;
    private registerRules;
    private registerRulesForTypeCodeFromContext;
    private registerRulesForCurrentPage;
    private registerRulesForTypeCode;
    private registerRulesForTypeAndQualifier;
    private registerPermissions;
}
