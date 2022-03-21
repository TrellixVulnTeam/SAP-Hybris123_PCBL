import { DynamicPagedListApi } from './interfaces';
/**
 * **Deprecated since 2005, use {@link DynamicPagedListComponent}.**
 *
 * Component responsible for displaying a server-side paginated list of items with custom renderers. It allows the user to search and sort the list.
 *
 * ### Parameters
 * `config` - See {@link DynamicPagedListConfig}.
 *
 * `mask` - The string value used to filter the result.
 *
 * `getApi` - {@link OnGetApiEvent} Exposes the dynamic paged list module's api object
 *
 * `onItemsUpdate` - {@link OnItemsUpdateEvent} Exposes the item list.
 *
 * ### Example of a <strong>renderers</strong> object
 *
 *      renderers = {
 *          name: function(item, key) {
 *              return "<a data-ng-click=\"$ctrl.config.injectedContext.onLink( item.path )\">{{ item[key.property] }}</a>";
 *          }
 *      };
 *
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
 *          }.bind(this),
 *          dropdownItems: []
 *      };
 *
 */
export declare class LegacyDynamicPagedListComponent {
    private getApi;
    /**
     * Backwards compatibility getApi adapter
     */
    internalGetApi($api: DynamicPagedListApi): void;
}
