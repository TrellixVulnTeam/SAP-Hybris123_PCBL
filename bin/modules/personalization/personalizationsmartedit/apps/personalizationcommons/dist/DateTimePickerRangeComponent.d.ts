import { LanguageService } from 'smarteditcommons';
import { PersonalizationsmarteditDateUtils } from './PersonalizationsmarteditDateUtils';
import * as angular from 'angular';
export declare class DateTimePickerRangeComponent {
    private DATE_CONSTANTS;
    personalizationsmarteditDateUtils: PersonalizationsmarteditDateUtils;
    private $element;
    private $scope;
    private languageService;
    placeholderText: string;
    isFromDateValid: boolean;
    isToDateValid: boolean;
    isEndDateInThePast: boolean;
    name: string;
    dateFrom: string;
    dateTo: string;
    isEditable: string;
    dateFormat: string;
    constructor(DATE_CONSTANTS: any, personalizationsmarteditDateUtils: PersonalizationsmarteditDateUtils, $element: HTMLElement, $scope: angular.IScope, languageService: LanguageService);
    $onInit(): void;
    getDateOrDefault(date: any): any;
    actionsIfisEditable(): any;
    getMinToDate(date: any): any;
    getFromPickerNode(): any;
    getFromDatetimepicker(): any;
    getToPickerNode(): any;
    getToDatetimepicker(): any;
}
