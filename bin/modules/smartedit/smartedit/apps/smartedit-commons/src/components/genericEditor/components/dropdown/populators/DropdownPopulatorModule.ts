/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* eslint-disable max-classes-per-file */
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as lodash from 'lodash';

import { diBridgeUtils } from '../../../../../di';
import { LanguageService } from '../../../../../services';
import { moduleUtils } from '../../../../../utils';
import { DropdownPopulatorInterface } from './DropdownPopulatorInterface';
import { OptionsDropdownPopulator } from './options';
import { IDropdownPopulatorInterface } from './types';
import { UriDropdownPopulator } from './uri';

/**
 * For AngularJS, Custom Dropdown Populator classes extend the DropdownPopulatorInterface,
 * so here we return constructor function with pre-set dependencies.
 */
const dropdownPopulatorInterfaceConstructorFactory = (
    languageService: LanguageService,
    translateService: TranslateService
): new () => any =>
    class extends DropdownPopulatorInterface {
        constructor() {
            super(lodash, languageService, translateService);
        }
    };

@NgModule({
    providers: [
        OptionsDropdownPopulator,
        UriDropdownPopulator,
        {
            // required for AngularJS
            provide: IDropdownPopulatorInterface,
            useFactory: dropdownPopulatorInterfaceConstructorFactory,
            deps: [LanguageService, TranslateService]
        },
        moduleUtils.initialize(() => {
            // make IDropdownPopulatorInterface provider (DropdownPopulatorInterface) available in AngularJS by 'DropdownPopulatorInterface'
            diBridgeUtils.downgradeService(
                'DropdownPopulatorInterface',
                null,
                IDropdownPopulatorInterface
            );
        })
    ]
})
export class DropdownPopulatorModule {}
