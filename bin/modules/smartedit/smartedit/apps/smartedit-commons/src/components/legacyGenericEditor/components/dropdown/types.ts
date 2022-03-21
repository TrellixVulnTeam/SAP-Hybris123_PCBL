/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    GenericEditorDropdownConfiguration as SEDropdownConfiguration,
    IGenericEditorDropdownService as ISEDropdownService
} from '../../../genericEditor/components/dropdown';
export {
    IGenericEditorDropdownSelectedOption as ISeDropdownSelectedOption,
    IGenericEditorDropdownSelectedOptionEventData as ISeDropdownSelectedOptionEventData,
    IGenericEditorDropdownService as ISEDropdownService,
    GenericEditorDropdownConfiguration as SEDropdownConfiguration
} from '../../../genericEditor/components/dropdown';

/* @internal */
export interface SEDropdownAPI {
    setResultsHeaderTemplateUrl(resultsHeaderTemplateUrl: string): void;
    setResultsHeaderTemplate(resultsHeaderTemplate: string): void;
}

/* @internal */
export type ISEDropdownServiceConstructor = new (
    conf: SEDropdownConfiguration
) => ISEDropdownService;
