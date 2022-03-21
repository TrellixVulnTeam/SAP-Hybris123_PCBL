/// <reference types="angular-translate" />
import { SeValueProvider, TypedMap } from 'smarteditcommons';
export declare const PERSONALIZATION_DATE_FORMATS_PROVIDER: SeValueProvider;
export declare class PersonalizationsmarteditDateUtils {
    private $translate;
    private DATE_CONSTANTS;
    private PERSONALIZATION_DATE_FORMATS;
    private isBlank;
    constructor($translate: angular.translate.ITranslateService, DATE_CONSTANTS: any, PERSONALIZATION_DATE_FORMATS: TypedMap<string>, isBlank: any);
    formatDate(dateStr: string, format: string): any;
    formatDateWithMessage(dateStr: string, format?: string): any;
    isDateInThePast(modelValue: any): boolean;
    isDateValidOrEmpty(modelValue: any): boolean;
    isDateValid(modelValue: any): boolean;
    isDateRangeValid(startDate: any, endDate: any): boolean;
    isDateStrFormatValid(dateStr: string, format: string): boolean;
}
