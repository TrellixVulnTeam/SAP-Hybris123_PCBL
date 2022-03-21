/// <reference types="jquery" />
/// <reference types="angular-translate" />
import * as angular from "angular";
import { PersonalizationsmarteditDateUtils } from "personalizationcommons";
import { TriggerTabService } from './multipleTriggersComponent/TriggerTabService';
export declare class TargetGroupTabComponent {
    PERSONALIZATION_MODEL_STATUS_CODES: any;
    CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS: any;
    private personalizationsmarteditUtils;
    private personalizationsmarteditTriggerService;
    private $translate;
    private $timeout;
    yjQuery: JQueryStatic;
    private confirmationModalService;
    private isBlank;
    personalizationsmarteditDateUtils: PersonalizationsmarteditDateUtils;
    private triggerTabService;
    customization: any;
    sliderPanelConfiguration: any;
    edit: any;
    sliderPanelHide: any;
    sliderPanelShow: any;
    isVariationLoaded: boolean;
    constructor(PERSONALIZATION_MODEL_STATUS_CODES: any, CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS: any, personalizationsmarteditUtils: any, personalizationsmarteditTriggerService: any, $translate: angular.translate.ITranslateService, $timeout: any, yjQuery: JQueryStatic, confirmationModalService: any, isBlank: any, personalizationsmarteditDateUtils: PersonalizationsmarteditDateUtils, triggerTabService: TriggerTabService);
    getActivityActionTextForVariation(variation: any): string;
    getActivityStateForCustomization(customization: any): string;
    getActivityStateForVariation(customization: any, variation: any): string;
    getEnablementTextForVariation(variation: any): string;
    setSliderConfigForAdd(): void;
    setSliderConfigForEditing(): void;
    toggleSliderFullscreen(enableFullscreen: boolean): void;
    confirmDefaultTrigger(isDefault: any): void;
    canSaveVariation(): boolean;
    addVariationClick(): void;
    submitChangesClick(): void;
    cancelChangesClick(): void;
    isVariationSelected(): boolean;
    clearEditedVariationDetails(): void;
    setVariationRank(variation: any, increaseValue: number, $event: any, firstOrLast: any): any;
    recalculateRanksForVariations(): void;
    removeVariationClick(variation: any): void;
    addVariationAction(): void;
    editVariationAction(variation: any): void;
    toogleVariationActive(variation: any): void;
    $onInit(): void;
    $onChanges(changes: any): void;
}
