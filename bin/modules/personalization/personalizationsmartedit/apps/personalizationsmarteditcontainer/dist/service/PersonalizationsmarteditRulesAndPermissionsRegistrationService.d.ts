/// <reference types="angular" />
import { IPermissionService } from 'smarteditcommons';
import { PersonalizationsmarteditContextService } from './PersonalizationsmarteditContextServiceOuter';
import { PersonalizationsmarteditRestService } from './PersonalizationsmarteditRestService';
export declare class PersonalizationsmarteditRulesAndPermissionsRegistrationService {
    private personalizationsmarteditContextService;
    private personalizationsmarteditRestService;
    private permissionService;
    private catalogVersionPermissionService;
    private pageService;
    private $q;
    constructor(personalizationsmarteditContextService: PersonalizationsmarteditContextService, personalizationsmarteditRestService: PersonalizationsmarteditRestService, permissionService: IPermissionService, catalogVersionPermissionService: any, pageService: any, $q: angular.IQService);
    registerRules(): void;
    private getCustomizationFilter;
}
