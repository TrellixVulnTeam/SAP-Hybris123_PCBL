/// <reference types="angular-translate" />
/// <reference types="angular-mocks" />
import * as angular from "angular";
import { PersonalizationsmarteditDateUtils } from "personalizationcommons";
import { PersonalizationsmarteditRestService } from "personalizationsmarteditcontainer/service/PersonalizationsmarteditRestService";
export declare class ManageCustomizationViewComponent {
    private DATE_CONSTANTS;
    private CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS;
    private PERSONALIZATION_MODEL_STATUS_CODES;
    private CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS;
    private PERSONALIZATION_DATE_FORMATS;
    private MODAL_BUTTON_ACTIONS;
    private personalizationsmarteditRestService;
    private personalizationsmarteditDateUtils;
    private personalizationsmarteditMessageHandler;
    private personalizationsmarteditCommerceCustomizationService;
    private personalizationsmarteditUtils;
    private confirmationModalService;
    private systemEventService;
    private $translate;
    private $log;
    private static DOCHECK_COUNTER_INTERVAL;
    customizationCode: string;
    variationCode: string;
    modalManager: any;
    initialCustomization: any;
    customization: any;
    edit: any;
    activeTabNumber: any;
    editMode: boolean;
    tabsArr: any;
    private doCheckCounter;
    constructor(DATE_CONSTANTS: any, CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS: any, PERSONALIZATION_MODEL_STATUS_CODES: any, CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS: any, PERSONALIZATION_DATE_FORMATS: any, MODAL_BUTTON_ACTIONS: any, personalizationsmarteditRestService: PersonalizationsmarteditRestService, personalizationsmarteditDateUtils: PersonalizationsmarteditDateUtils, personalizationsmarteditMessageHandler: any, personalizationsmarteditCommerceCustomizationService: any, personalizationsmarteditUtils: any, confirmationModalService: any, systemEventService: any, $translate: angular.translate.ITranslateService, $log: angular.ILogService);
    $onInit(): void;
    $doCheck(): void;
    getVariationsForCustomization(customizationCode: any): Promise<any>;
    createCommerceCustomizationData(variations: any): any;
    getCustomization(): void;
    initTabs(): void;
    selectTab(tab: any): void;
    onSave(): void;
    onCancel(): Promise<any>;
    isBasicInfoTabValid(customizationForm: any): any;
    isTargetGroupTabValid(customizationForm: any): any;
    isCustomizationValid(customizationForm: any): any;
    isModalDirty(): boolean;
}
