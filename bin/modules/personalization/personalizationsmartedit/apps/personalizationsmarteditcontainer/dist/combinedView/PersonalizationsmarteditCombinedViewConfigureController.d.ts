/// <reference types="angular-translate" />
import * as angular from "angular";
import { LoDashStatic } from 'lodash';
import { PersonalizationsmarteditContextService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditContextServiceOuter';
import { PaginationHelper } from 'personalizationcommons';
import { PersonalizationsmarteditMessageHandler } from 'personalizationcommons';
import { PersonalizationsmarteditUtils } from 'personalizationcommons';
import { CustomizationDataFactory } from 'personalizationsmarteditcontainer/dataFactory/CustomizationDataFactory';
import { ComponentMenuService } from "cmssmarteditcontainer";
export interface PersonalizationsmarteditCombinedViewConfigureControllerScope extends angular.IScope {
    selectionArray: any[];
    selectedElement: any;
    catalogFilter: any;
    selectedItems: any;
}
export declare class PersonalizationsmarteditCombinedViewConfigureController {
    protected $translate: angular.translate.ITranslateService;
    protected customizationDataFactory: CustomizationDataFactory;
    protected personalizationsmarteditContextService: PersonalizationsmarteditContextService;
    protected personalizationsmarteditMessageHandler: PersonalizationsmarteditMessageHandler;
    protected personalizationsmarteditUtils: PersonalizationsmarteditUtils;
    protected componentMenuService: ComponentMenuService;
    protected PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER: any;
    protected PERSONALIZATION_VIEW_STATUS_MAPPING_CODES: any;
    private $scope;
    private $q;
    private lodash;
    private modalManager;
    init: () => void;
    pagination: PaginationHelper;
    moreCustomizationsRequestProcessing: boolean;
    combinedView: any;
    customizationFilter: any;
    customizationPageFilter: any;
    constructor($translate: angular.translate.ITranslateService, customizationDataFactory: CustomizationDataFactory, personalizationsmarteditContextService: PersonalizationsmarteditContextService, personalizationsmarteditMessageHandler: PersonalizationsmarteditMessageHandler, personalizationsmarteditUtils: PersonalizationsmarteditUtils, componentMenuService: ComponentMenuService, PERSONALIZATION_CUSTOMIZATION_PAGE_FILTER: any, PERSONALIZATION_VIEW_STATUS_MAPPING_CODES: any, $scope: PersonalizationsmarteditCombinedViewConfigureControllerScope, $q: angular.IQService, lodash: LoDashStatic, modalManager: any);
    getCustomizations: (categoryFilter: any) => void;
    addMoreItems: () => void;
    selectElement: (item: any) => void;
    initUiSelect: (uiSelectController: any) => void;
    removeSelectedItem: (item: any) => void;
    getClassForElement: (index: any) => string;
    getLetterForElement: (index: any) => string;
    isItemInSelectDisabled: (item: any) => any;
    isItemSelected: (item: any) => any;
    searchInputKeypress: (keyEvent: any, searchObj: any) => void;
    buttonHandlerFn: (buttonId: any) => void;
    pageFilterChange: (itemId: any) => void;
    catalogFilterChange: (itemId: any) => void;
    isItemFromCurrentCatalog: (item: any) => boolean;
    getAndSetCatalogVersionNameL10N: (customization: any) => void;
    successCallback: (response: any) => void;
    errorCallback: () => void;
    private getDefaultStatus;
    private getCustomizationsFilterObject;
    private isCombinedViewContextPersRemoved;
}
