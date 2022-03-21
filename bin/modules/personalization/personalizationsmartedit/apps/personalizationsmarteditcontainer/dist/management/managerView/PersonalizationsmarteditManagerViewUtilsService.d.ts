/// <reference types="angular-translate" />
import * as angular from "angular";
import { PersonalizationsmarteditRestService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditRestService';
import { PersonalizationsmarteditMessageHandler } from 'personalizationcommons';
import { PersonalizationsmarteditCommerceCustomizationService } from 'personalizationcommons';
export declare class PersonalizationsmarteditManagerViewUtilsService {
    private personalizationsmarteditRestService;
    private personalizationsmarteditMessageHandler;
    private personalizationsmarteditCommerceCustomizationService;
    private PERSONALIZATION_MODEL_STATUS_CODES;
    private waitDialogService;
    private confirmationModalService;
    private $translate;
    constructor(personalizationsmarteditRestService: PersonalizationsmarteditRestService, personalizationsmarteditMessageHandler: PersonalizationsmarteditMessageHandler, personalizationsmarteditCommerceCustomizationService: PersonalizationsmarteditCommerceCustomizationService, PERSONALIZATION_MODEL_STATUS_CODES: any, waitDialogService: any, confirmationModalService: any, $translate: angular.translate.ITranslateService);
    deleteCustomizationAction: (customization: any, customizations: any[]) => void;
    deleteVariationAction: (customization: any, variation: any) => void;
    toogleVariationActive: (customization: any, variation: any) => void;
    customizationClickAction: (customization: any) => any;
    getCustomizations: (filter: any) => any;
    updateCustomizationRank: (customizationCode: string, increaseValue: number) => Promise<void>;
    updateVariationRank: (customization: any, variationCode: string, increaseValue: number) => any;
    setCustomizationRank: (customization: any, increaseValue: number, customizations: any[]) => void;
    setVariationRank: (customization: any, variation: any, increaseValue: number) => void;
    private getActionsForVariation;
}
