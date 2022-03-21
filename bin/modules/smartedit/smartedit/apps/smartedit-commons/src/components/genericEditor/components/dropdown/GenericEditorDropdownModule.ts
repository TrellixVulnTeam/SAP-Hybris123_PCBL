/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule, Optional } from '@angular/core';

import { SelectModule } from '../../../../components/select';
import { diBridgeUtils, SeConstructor } from '../../../../di';
import {
    AngularJSLazyDependenciesService,
    LogService,
    SystemEventService
} from '../../../../services';
import { moduleUtils, CLICK_DROPDOWN, LINKED_DROPDOWN } from '../../../../utils';
import { GenericEditorDropdownComponent } from './GenericEditorDropdownComponent';
import { GenericEditorDropdownServiceFactory } from './GenericEditorDropdownServiceFactory';
import {
    CustomDropdownPopulatorsToken,
    DropdownPopulatorModule,
    OptionsDropdownPopulator,
    UriDropdownPopulator
} from './populators';
import {
    CLICK_DROPDOWN_TOKEN,
    DROPDOWN_IMPLEMENTATION_SUFFIX_TOKEN,
    IGenericEditorDropdownServiceConstructor,
    LINKED_DROPDOWN_TOKEN
} from './types';

@NgModule({
    imports: [CommonModule, SelectModule, DropdownPopulatorModule],
    declarations: [GenericEditorDropdownComponent],
    entryComponents: [GenericEditorDropdownComponent],
    exports: [GenericEditorDropdownComponent],
    providers: [
        {
            provide: DROPDOWN_IMPLEMENTATION_SUFFIX_TOKEN,
            useValue: 'DropdownPopulator'
        },
        {
            provide: LINKED_DROPDOWN_TOKEN,
            useValue: LINKED_DROPDOWN
        },
        {
            provide: CLICK_DROPDOWN_TOKEN,
            useValue: CLICK_DROPDOWN
        },
        // Injected by <se-generic-editor-dropdown>. It doesn't create a new instance (as it supposed to do because it's a factory function).
        // Instead, it returns a constructor function that is instantiated in `GenericEditorDropdownComponent#ngOnInit`.
        {
            provide: IGenericEditorDropdownServiceConstructor,
            useFactory: GenericEditorDropdownServiceFactory,
            deps: [
                AngularJSLazyDependenciesService,
                LogService,
                LINKED_DROPDOWN_TOKEN,
                CLICK_DROPDOWN_TOKEN,
                DROPDOWN_IMPLEMENTATION_SUFFIX_TOKEN,
                SystemEventService,
                OptionsDropdownPopulator,
                UriDropdownPopulator,
                [new Optional(), CustomDropdownPopulatorsToken] // Only available when Custom Populator has been provided.
            ]
        },
        moduleUtils.initialize(() => {
            // **Deprecated, since 2105**
            //
            // Makes IGenericEditorDropdownServiceConstructor provider (GenericEditorDropdownServiceFactory) available in AngularJS by 'SEDropdownService'.
            diBridgeUtils.downgradeService(
                'SEDropdownService',
                IGenericEditorDropdownServiceConstructor as SeConstructor<
                    IGenericEditorDropdownServiceConstructor
                >
            );

            diBridgeUtils.downgradeService(
                'DROPDOWN_IMPLEMENTATION_SUFFIX',
                null,
                DROPDOWN_IMPLEMENTATION_SUFFIX_TOKEN
            );
            diBridgeUtils.downgradeService('LINKED_DROPDOWN', null, LINKED_DROPDOWN_TOKEN);
            diBridgeUtils.downgradeService('CLICK_DROPDOWN', null, CLICK_DROPDOWN_TOKEN);
        })
    ]
})
export class GenericEditorDropdownModule {}
