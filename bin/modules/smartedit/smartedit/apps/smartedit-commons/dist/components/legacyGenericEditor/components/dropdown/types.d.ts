import { GenericEditorDropdownConfiguration as SEDropdownConfiguration, IGenericEditorDropdownService as ISEDropdownService } from '../../../genericEditor/components/dropdown';
export { IGenericEditorDropdownSelectedOption as ISeDropdownSelectedOption, IGenericEditorDropdownSelectedOptionEventData as ISeDropdownSelectedOptionEventData, IGenericEditorDropdownService as ISEDropdownService, GenericEditorDropdownConfiguration as SEDropdownConfiguration } from '../../../genericEditor/components/dropdown';
export interface SEDropdownAPI {
    setResultsHeaderTemplateUrl(resultsHeaderTemplateUrl: string): void;
    setResultsHeaderTemplate(resultsHeaderTemplate: string): void;
}
export declare type ISEDropdownServiceConstructor = new (conf: SEDropdownConfiguration) => ISEDropdownService;
