/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { RESOLVED_LOCALE_TO_MOMENT_LOCALE_MAP_VALUE, TOOLTIPS_MAP_VALUE } from './constants';
import { DateFormatterDirective } from './DateFormatterDirective';
import { DateTimePickerComponent } from './DateTimePickerComponent';
import { DateTimePickerLocalizationService } from './DateTimePickerLocalizationService';
import { RESOLVED_LOCALE_TO_MOMENT_LOCALE_MAP, TOOLTIPS_MAP } from './tokens';

/**
 * The date time picker service module is a module used for displaying a date time picker
 *
 * Use the se-date-time-picker to open the date time picker.
 *
 * Once the se-date-time-picker is opened, its DateTimePickerLocalizationService is used to localize the tooling.
 */
@NgModule({
    imports: [CommonModule, FormsModule, TranslateModule.forChild()],
    providers: [
        {
            provide: RESOLVED_LOCALE_TO_MOMENT_LOCALE_MAP,
            useValue: RESOLVED_LOCALE_TO_MOMENT_LOCALE_MAP_VALUE
        },
        {
            provide: TOOLTIPS_MAP,
            useValue: TOOLTIPS_MAP_VALUE
        },
        DateTimePickerLocalizationService
    ],
    declarations: [DateFormatterDirective, DateTimePickerComponent],
    entryComponents: [DateTimePickerComponent],
    exports: [DateFormatterDirective, DateTimePickerComponent]
})
export class DateTimePickerModule {}
