/// <reference types="angular" />
/// <reference types="angular-translate" />
import { IExperienceService } from 'smarteditcommons';
import { PersonalizationpromotionssmarteditIAction, PersonalizationpromotionssmarteditRestService } from 'personalizationpromotionssmarteditcommons';
export declare class PersonalizationpromotionssmarteditPromotionsComponent {
    private $q;
    private $filter;
    private personalizationpromotionssmarteditRestService;
    private personalizationsmarteditMessageHandler;
    private actionsDataFactory;
    private experienceService;
    promotion: any;
    availablePromotions: any;
    constructor($q: angular.IQService, $filter: angular.IFilterService, personalizationpromotionssmarteditRestService: PersonalizationpromotionssmarteditRestService, personalizationsmarteditMessageHandler: any, actionsDataFactory: any, experienceService: IExperienceService);
    $onInit(): void;
    getCatalogs(): angular.IPromise<any>;
    getPromotions(): angular.IPromise<any>;
    getAvailablePromotions(): void;
    buildAction(item: any): PersonalizationpromotionssmarteditIAction;
    comparer(a1: PersonalizationpromotionssmarteditIAction, a2: PersonalizationpromotionssmarteditIAction): boolean;
    promotionSelected(item: any, uiSelectObject: any): void;
    isItemInSelectDisabled(item: any): boolean;
    initUiSelect(uiSelectController: any): void;
}
