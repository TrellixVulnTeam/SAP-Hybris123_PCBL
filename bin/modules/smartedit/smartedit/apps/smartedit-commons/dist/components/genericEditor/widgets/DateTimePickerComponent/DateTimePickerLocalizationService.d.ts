import { TranslateService } from '@ngx-translate/core';
import { TypedMap } from '@smart/utils';
import { Datetimepicker, Tooltips } from 'eonasdan-bootstrap-datetimepicker';
import { LanguageService } from '../../../../services/language/LanguageService';
/**
 * The DateTimePickerLocalizationService is responsible for both localizing the date time picker as well as the tooltips
 */
export declare class DateTimePickerLocalizationService {
    private translate;
    private resolvedLocaleToMomentLocaleMap;
    private tooltipsMap;
    private languageService;
    constructor(translate: TranslateService, resolvedLocaleToMomentLocaleMap: TypedMap<string>, tooltipsMap: Tooltips, languageService: LanguageService);
    localizeDateTimePicker(datetimepicker: Datetimepicker): Promise<void>;
    private convertResolvedToMomentLocale;
    private getLocalizedTooltips;
    private compareTooltips;
    private localizeDateTimePickerUI;
    private localizeDateTimePickerTooltips;
}
