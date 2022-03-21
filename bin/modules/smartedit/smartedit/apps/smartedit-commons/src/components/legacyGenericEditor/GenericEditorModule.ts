/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeModule, SeValueProvider } from 'smarteditcommons/di';

import {
    GENERIC_EDITOR_LOADED_EVENT,
    GENERIC_EDITOR_UNRELATED_VALIDATION_MESSAGES_EVENT
} from '../../utils';
import { SeDropdownModule } from './components/dropdown/SeDropdownModule';
import { GenericEditorComponent } from './GenericEditorComponent';

export const GENERIC_EDITOR_UNRELATED_VALIDATION_MESSAGES_EVENT_CONSTANT: SeValueProvider = {
    provide: 'GENERIC_EDITOR_UNRELATED_VALIDATION_MESSAGES_EVENT',
    useValue: GENERIC_EDITOR_UNRELATED_VALIDATION_MESSAGES_EVENT
};

/**
 * Event to notify subscribers that GenericEditor is loaded.
 */
export const GENERIC_EDITOR_LOADED_EVENT_CONSTANT: SeValueProvider = {
    provide: 'GENERIC_EDITOR_LOADED_EVENT',
    useValue: GENERIC_EDITOR_LOADED_EVENT
};

@SeModule({
    imports: [
        'smarteditServicesModule',
        'functionsModule',
        'coretemplates',
        'translationServiceModule',
        'seConstantsModule',
        'resourceLocationsModule',
        'ui.bootstrap',
        SeDropdownModule
    ],
    providers: [
        GENERIC_EDITOR_UNRELATED_VALIDATION_MESSAGES_EVENT_CONSTANT,
        GENERIC_EDITOR_LOADED_EVENT_CONSTANT
    ],
    declarations: [GenericEditorComponent]
})
export class GenericEditorModule {}
