/// <reference types="angular" />
import { IDropdownMenuItem } from './IDropdownMenuItem';
import './yDropdownMenu.scss';
/**
 * **Deprecated since 2005, use {@link DropdownMenuComponent}.**
 */
export declare class YDropDownMenuComponent {
    private $templateCache;
    dropdownItems: IDropdownMenuItem[];
    selectedItem: IDropdownMenuItem;
    clonedDropdownItems: IDropdownMenuItem[];
    constructor($templateCache: angular.ITemplateCacheService);
    $onChanges(): void;
    isDeleteButton(dropdownItem: IDropdownMenuItem): boolean;
    private setTemplateUrl;
    private _cacheDropdownItemTemplate;
    private _validatePassedAttribute;
}
