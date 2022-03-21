/// <reference types="angular" />
/// <reference types="angular-translate" />
import { ClientPagedList, ClientPagedListColumnKey, ClientPagedListItem, IDropdownMenuItem, TypedMap } from 'smarteditcommons';
declare type ClientPagedListScope = ClientPagedList & angular.IScope;
/**
 * **Deprecated since 2005, use [ClientPagedListComponent]{@link /smarteditcommons/components/ClientPagedListComponent.html}**.
 *
 *
 * Component responsible for displaying a client-side paginated list of items with custom renderers. It allows the user to search and sort the list.
 *
 * ### Parameters
 *
 * `items` An array of item descriptors.
 *
 * `keys` An array of object(s) with a property and an i18n key.
 *  The properties must match one at least one of the descriptors' keys and will be used as the columns of the table. The related i18n keys are used for the column headers' title.
 *
 * `renderers` An object that contains HTML renderers for specific keys property. A renderer is a function that returns a HTML string. This function accepts two arguments: "item" and "key".
 *
 * `injectedContext` An object that exposes values or functions to the component. It can be used by the custom HTML renderers to bind a function to a click event for example.
 *
 * `reversed` If set to true, the list will be sorted descending.
 *
 * `itemsPerPage` The number of items to display per page.
 *
 * `query` The ngModel query object used to filter the list.
 *
 * `displayCount` If set to true the size of the filtered collection will be displayed.
 *
 * `itemFilterKeys` (OPTIONAL) An array of object keys that will determine which fields the "LegacyFilterByFieldFilter"
 * will use to filter through the items.
 *
 *      <client-paged-list items="pageListCtl.pages"
 *                  keys="[{
 *                          property:'title',
 *                          i18n:'pagelist.headerpagetitle'
 *                          },{
 *                          property:'uid',
 *                          i18n:'pagelist.headerpageid'
 *                          },{
 *                          property:'typeCode',
 *                          i18n:'pagelist.headerpagetype'
 *                          },{
 *                          property:'template',
 *                          i18n:'pagelist.headerpagetemplate'
 *                          }]"
 *                  renderers="pageListCtl.renderers"
 *                  injectedContext="pageListCtl.injectedContext"
 *                  sort-by="'title'"
 *                  reversed="true"
 *                  items-per-page="10"
 *                  query="pageListCtl.query.value"
 *                  display-count="true"
 *      ></client-paged-list>
 *
 * ### Example of a <strong>renderers</strong> object
 *
 *      renderers = {
 *          name: function(item, key) {
 *              return "<a data-ng-click=\"injectedContext.onLink( item.path )\">{{ item[key.property] }}</a>";
 *          }
 *      };
 *
 * ### Example of an <strong>injectedContext</strong> object
 *
 *      injectedContext = {
 *          onLink: function(link) {
 *              if (link) {
 *                  var experiencePath = this._buildExperiencePath();
 *                  iframeManagerService.setCurrentLocation(link);
 *                  $location.path(experiencePath);
 *              }
 *          }.bind(this)
 *      };
 *
 * @deprecated
 */
export declare class LegacyClientPagedListComponent implements Partial<ClientPagedListScope> {
    private $scope;
    private $filter;
    items: ClientPagedListItem[];
    itemsPerPage: number;
    totalItems: number;
    keys: ClientPagedListColumnKey[];
    renderers: TypedMap<() => string>;
    injectedContext: TypedMap<(...args: []) => any>;
    identifier: string | undefined;
    sortBy: string;
    reversed: boolean;
    query: string;
    displayCount: boolean;
    dropdownItems: IDropdownMenuItem[];
    selectedItem: ClientPagedListItem | undefined;
    itemFilterKeys: string[];
    readonly currentPage: number;
    columnWidth: number;
    columnToggleReversed: boolean;
    headersSortingState: TypedMap<boolean>;
    visibleSortingHeader: string;
    constructor($scope: ClientPagedListScope, $filter: angular.IFilterService);
    $onInit(): void;
    filterCallback: (filteredList: ClientPagedListItem[]) => void;
    getFilterKeys: () => string[];
    orderByColumn: (columnKey: string) => void;
}
export {};
