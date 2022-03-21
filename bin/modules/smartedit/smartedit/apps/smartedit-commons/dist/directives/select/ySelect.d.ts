import './ySelect.scss';
import { LogService } from '@smart/utils';
import * as angular from 'angular';
import { FetchStrategy, SelectApi } from '../../components/select';
import { UiSelect } from '../../services/interfaces';
/**
 * **Deprecated since 2005, use {@link SelectApi}.**
 * @deprecated
 */
export declare type YSelectApi = SelectApi;
/**
 * **Deprecated since 2005, use {@link SelectComponent}.**
 *
 * This component is a wrapper around ui-select directive and provides filtering capabilities for the dropdown menu that is customizable with an item template.
 * <br/>ySelect can work in both paged and non paged mode: providing either fetchAll or fetchPage function in the fetchStrategy will determine the flavour of the dropdown.
 *
 * ### Parameters
 *
 * `id` - will be used to identify internal elements of ySelect for styling (and testing) purposes.
 *
 * `controls` - Adds controls such as the magnifier and the remove button. Default is set to false.
 *
 * `fetchStrategy` - strategy object containing the necessary functions for ySelect to populate the dropdown:
 * <b>Only one of either fetchAll or fetchPage must be defined.</b>
 *
 * `fetchStrategy.fetchAll` - Function required to fetch all for a given optional mask.
 * fetchAll will be called without arguments upon initialization and with a mask every time the search section receives an input.
 * It must return a promise resolving to a list of items.
 * Every item must have a property "id" used for identification. If no itemTemplate is provided, these items will need to display a "label" property.
 *
 * `fetchStrategy.fetchPage` - Function required to fetch a page for a given optional mask.
 * fetchPage must fulfill the contract of fetchPage from {@link YInfiniteScrollingComponent}
 * It must return a promise resolving to a page of items as per `Page`.
 * Every item must have a property "id" used for identification. If no itemTemplate is provided, these items will need to display a "label" property.
 *
 * `fetchStrategy.fetchEntity` - Function to fetch an option by its identifier when we are in paged mode (fetchPage is defined) and the dropdown is initialized with a value.
 *
 * `disableChoiceFn` - A function to disable results in the drop-down. It is invoked for each item in the drop-down, with a single parameter, the item itself.
 *
 * `placeholder` - the placeholder label or i18nKey that will be printed in the search section.
 *
 * `itemTemplate` - the path to the template that will be used to display items in both the dropdown menu and the selection.
 * ItemTemplate has access to item, selected and the ySelect controller.
 * item is the item to print, selected is a boolean that is true when the template is used in the selection as opposed to the dropdown menu.
 * Default template will be:
 *
 *      <span data-ng-bind-html="item.label | translate"></span>
 *
 *
 * `keepModelOnReset` - A non-paged dropdown: if the value is set to false, the widget will remove the selected entities in the model that no longer match the values available on the server.
 * For a paged dropdown: After a standard reset, even if keepModelOnReset is set to false,  the widget will not be able to remove the selected entities in the model
 * that no longer match the values available on the server. to force the widget to remove any selected entities, you must call reset(true).
 *
 * `multiSelect` - The property specifies whether ySelect is multi-selectable.
 *
 * `reset` - A function that will be called when ySelect is reset.
 *
 * `isReadOnly` - Renders ySelect as disabled field.
 *
 * `resultsHeaderTemplate` - The template that will be used on top of the result list.
 *
 * `resultsHeaderTemplateUrl` - The path to the template what will be used on top of the result list.
 *
 * `resultsHeaderLabel` - The label that will be displayed on top of the result list.
 * Only one of resultsHeaderTemplate, resultsHeaderTemplateUtl, and resultsHeaderLabel shall be passed.
 *
 * `resetSearchInput` - Clears the search box after selecting an option.
 *
 * `onRemove` - A function that will be called when item was removed from selection, function is called with two arguments $item and $model
 *
 * `onSelect` - A function that will be called when item was selected, function is called with two arguments $item and $model
 *
 * `init` - A function that will be called when component is initialized, function is called with one argument $select
 *
 * `keyup` - A function that will be called on keyup event in search input, function is called with two arguments $event and $select.search
 *
 * `getApi` - Exposes the ySelect's api object. See {@link YSelectApi} for more information.
 *
 * `showRemoveButton` -  Adds remove button
 *
 * @deprecated
 */
export declare class YSelectComponent<T extends {
    id: string;
}> {
    private logService;
    private $templateCache;
    id: string;
    controls: boolean;
    fetchStrategy: FetchStrategy<T>;
    disableChoiceFn: (item: T) => boolean;
    placeholder: string;
    itemTemplate: string;
    keepModelOnReset: boolean;
    multiSelect: boolean;
    reset: (isForceReset: boolean) => void;
    isReadOnly: boolean;
    result: string;
    resultsHeaderTemplateUrl: string;
    resultsHeaderTemplate: string;
    resultsHeaderLabel: string;
    resetSearchInput: boolean;
    onRemove: (item: T, model: string[] | string) => void;
    onSelect: (item: T, model: string[] | string) => void;
    onChange: () => void;
    init: ($select: UiSelect<T>) => void;
    keyup: (event: Event, search: string) => void;
    validationState: string;
    theme: string;
    actionableSearchItemTemplateConfig: {
        templateUrl: string;
    };
    api: YSelectApi;
    getApi: (api: {
        $api: YSelectApi;
    }) => void;
    items: T[];
    searchEnabled: boolean;
    exposedModel: angular.INgModelController;
    model: string[] | string;
    showRemoveButton: boolean;
    constructor(logService: LogService, $templateCache: angular.ITemplateCacheService);
    $onInit(): void;
    $onChanges(changes?: angular.IOnChangesObject): Promise<any>;
    syncModels(): void;
    clear($select: UiSelect<T>, $event: Event): void;
    showResultHeader(): boolean;
    getActionableTemplateUrl(): string;
    refreshOptions(mask: string): void;
    internalOnRemove(item: T, model: string[] | string): void;
    internalOnSelect(item: T, model: string[] | string): void;
    internalInit(select: UiSelect<T>): void;
    internalKeyup(event: Event, selectSearch: string): void;
    internalOnChange(): void;
    internalFetchAll(): Promise<any>;
    internalFetchEntities(): Promise<any>;
    fetchEntity(entryId: string): Promise<T>;
    updateModelIfNecessary(): void;
    isValidConfiguration(): void;
    requiresPaginatedStyling(): boolean;
    hasError(): boolean;
    hasWarning(): boolean;
    hasControls(): boolean;
    disableChoice(item: T): boolean;
    private isPagedDropdown;
    private resetModel;
    private updateControlTemplate;
    private isModelEmpty;
    private _updateChild;
}
