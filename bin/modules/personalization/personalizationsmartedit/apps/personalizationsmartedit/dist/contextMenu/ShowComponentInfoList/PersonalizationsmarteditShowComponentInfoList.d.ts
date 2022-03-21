/// <reference types="angular-translate" />
import { IPermissionService } from 'smarteditcommons';
import { PaginationHelper } from 'personalizationcommons';
import { PersonalizationsmarteditContextService } from 'personalizationsmartedit/service/PersonalizationsmarteditContextServiceInner';
import { PersonalizationsmarteditComponentHandlerService } from 'personalizationsmartedit/service/PersonalizationsmarteditComponentHandlerService';
import { PersonalizationsmarteditRestService } from 'personalizationsmartedit/service/PersonalizationsmarteditRestService';
import { PersonalizationsmarteditContextualMenuService } from "personalizationsmartedit/service/PersonalizationsmarteditContextualMenuService";
export declare class PersonalizationsmarteditShowComponentInfoListComponent {
    protected personalizationsmarteditContextService: PersonalizationsmarteditContextService;
    protected personalizationsmarteditContextualMenuService: PersonalizationsmarteditContextualMenuService;
    protected personalizationsmarteditUtils: any;
    protected personalizationsmarteditRestService: PersonalizationsmarteditRestService;
    protected personalizationsmarteditMessageHandler: any;
    protected $translate: angular.translate.ITranslateService;
    protected personalizationsmarteditComponentHandlerService: PersonalizationsmarteditComponentHandlerService;
    private permissionService;
    actions: any;
    isContainerIdEmpty: boolean;
    initPageSize: number;
    pagination: PaginationHelper;
    moreCustomizationsRequestProcessing: boolean;
    containerSourceId: any;
    containerId: string;
    isPageBlocked: boolean;
    isPersonalizationAllowedInWorkflow: boolean;
    context: any;
    constructor(personalizationsmarteditContextService: PersonalizationsmarteditContextService, personalizationsmarteditContextualMenuService: PersonalizationsmarteditContextualMenuService, personalizationsmarteditUtils: any, personalizationsmarteditRestService: PersonalizationsmarteditRestService, personalizationsmarteditMessageHandler: any, $translate: angular.translate.ITranslateService, personalizationsmarteditComponentHandlerService: PersonalizationsmarteditComponentHandlerService, permissionService: IPermissionService);
    $onInit(): void;
    isCustomizationFromCurrentCatalog(customization: any): boolean;
    isPersonalizationAllowedWithWorkflow(): void;
    isContextualMenuInfoEnabled(): boolean;
    customizationVisible(): boolean;
    getCustomizationsFilterObject(): any;
    isPersonalizationBlockedOnPage(): void;
    getAllActionsAffectingContainerId(containerId: any, filter: any): any;
    addMoreItems(): void;
    getPage(): void;
}
