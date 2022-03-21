/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Datetimepicker } from 'eonasdan-bootstrap-datetimepicker';
import moment from 'moment';

import { YJQUERY_TOKEN } from 'smarteditcommons/services';
import { dateUtils } from '../../../../utils';
import { GenericEditorWidgetData } from '../../../genericEditor/types';
import { GENERIC_EDITOR_WIDGET_DATA } from '../../components/tokens';
import { DATE_PICKER_CONFIG } from './constants';
import { DateTimePickerLocalizationService } from './DateTimePickerLocalizationService';

@Component({
    selector: 'se-date-time-picker',
    templateUrl: './DateTimePickerComponent.html'
})
export class DateTimePickerComponent {
    @ViewChild('dateTimePicker', { static: false }) dateTimePickerElement: ElementRef;

    public placeholderText = 'se.componentform.select.date';

    constructor(
        @Inject(GENERIC_EDITOR_WIDGET_DATA) public widget: GenericEditorWidgetData<any>,
        @Inject(YJQUERY_TOKEN) private yjQuery: JQueryStatic,
        private dateTimePickerLocalizationService: DateTimePickerLocalizationService
    ) {}

    ngAfterViewInit(): void {
        if (this.isEditable) {
            this.node
                .datetimepicker(DATE_PICKER_CONFIG)
                .on('dp.change', () => this.handleDatePickerChange())
                .on('dp.show', () => this.handleDatePickerShow());

            if (this.widget.model[this.widget.qualifier]) {
                // Fixes ExpressionChangedAfterItWasChecked that's changing ng-touched value
                setTimeout(() => {
                    // TODO: Remove Global Moment
                    this.datetimepicker.date(moment(this.widget.model[this.widget.qualifier]));
                });
            }
        }
    }

    private handleDatePickerShow(): void {
        this.dateTimePickerLocalizationService.localizeDateTimePicker(this.datetimepicker);
    }

    private handleDatePickerChange(): void {
        const momentDate = this.datetimepicker.date();

        this.widget.model[this.widget.qualifier] = momentDate
            ? dateUtils.formatDateAsUtc(momentDate)
            : undefined;
    }

    private get node(): JQuery<HTMLDivElement> {
        return this.yjQuery<HTMLDivElement>(this.dateTimePickerElement.nativeElement);
    }

    private get datetimepicker(): Datetimepicker {
        return this.node.datetimepicker().data('DateTimePicker');
    }

    private get isEditable(): boolean {
        return !this.widget.isFieldDisabled();
    }
}
