import { SeValueProvider } from 'smarteditcommons';
import { PersonalizationsmarteditContextService } from 'personalizationsmartedit/service/PersonalizationsmarteditContextServiceInner';
export declare const ACTIONS_DETAILS_PROVIDER: SeValueProvider;
export declare class PersonalizationsmarteditRestService {
    protected restServiceFactory: any;
    protected personalizationsmarteditContextService: PersonalizationsmarteditContextService;
    protected ACTIONS_DETAILS: string;
    constructor(restServiceFactory: any, personalizationsmarteditContextService: PersonalizationsmarteditContextService, ACTIONS_DETAILS: string);
    extendRequestParamObjWithCatalogAwarePathVariables(requestParam: any, catalogAware: any): any;
    getCxCmsAllActionsForContainer(containerId: string, filter: any): any;
}
