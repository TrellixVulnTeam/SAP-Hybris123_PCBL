/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
import { IEventService } from '../../interfaces';
import { LanguageService } from '../../services/language.service';
import { LanguageDropdown } from './language-dropdown';
/**
 * @ngdoc component
 * @name  @smartutils.components:LanguageDropdownComponent
 *
 * @description
 * A component responsible for displaying and selecting application language. Uses {@link @smartutils.components:SelectComponent SelectComponent} to show language items
 *
 */
export declare class LanguageDropdownComponent extends LanguageDropdown {
    eventService: IEventService;
    constructor(languageService: LanguageService, eventService: IEventService);
}
