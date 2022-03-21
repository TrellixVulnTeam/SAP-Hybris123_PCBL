/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */

import { Component, Inject } from '@angular/core';
import { EVENT_SERVICE, LANGUAGE_SERVICE } from '../../constants';
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

@Component({
    selector: 'su-language-dropdown',
    template: `
        <su-select
            class="su-language-selector"
            [items]="items"
            [initialValue]="initialLanguage"
            (onItemSelected)="onSelectedLanguage($event)"
        >
        </su-select>
    `
})
export class LanguageDropdownComponent extends LanguageDropdown {
    constructor(
        @Inject(LANGUAGE_SERVICE) languageService: LanguageService,
        @Inject(EVENT_SERVICE) public eventService: IEventService
    ) {
        super(languageService, eventService);
    }
}
