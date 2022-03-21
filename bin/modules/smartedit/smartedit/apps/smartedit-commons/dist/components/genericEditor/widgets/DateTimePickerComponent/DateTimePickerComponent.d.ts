/// <reference types="angular" />
/// <reference types="jquery" />
import { ElementRef } from '@angular/core';
import { GenericEditorWidgetData } from '../../../genericEditor/types';
import { DateTimePickerLocalizationService } from './DateTimePickerLocalizationService';
export declare class DateTimePickerComponent {
    widget: GenericEditorWidgetData<any>;
    private yjQuery;
    private dateTimePickerLocalizationService;
    dateTimePickerElement: ElementRef;
    placeholderText: string;
    constructor(widget: GenericEditorWidgetData<any>, yjQuery: JQueryStatic, dateTimePickerLocalizationService: DateTimePickerLocalizationService);
    ngAfterViewInit(): void;
    private handleDatePickerShow;
    private handleDatePickerChange;
    private get node();
    private get datetimepicker();
    private get isEditable();
}
