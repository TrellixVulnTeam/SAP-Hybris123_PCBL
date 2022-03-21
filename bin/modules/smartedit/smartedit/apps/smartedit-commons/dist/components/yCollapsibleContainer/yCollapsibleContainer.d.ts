import { CollapsibleContainerConfig } from '../collapsible';
/**
 * This object defines injectable Angular constants that store the default configuration and CSS class names used in the controller to define the rendering and animation of the collapsible container.
 */
export declare const COLLAPSIBLE_CONTAINER_CONSTANTS: {
    /**
     * A JSON object defining the configuration applied by default to each collapsible container.
     *
     * @param expandedByDefault Specifies if the collapsible container is expanded by default.
     * @param iconAlignment Specifies if the expand-collapse icon is to be displayed to the left or to the right of the container header.
     * @param iconVisible Specifies if the expand-collapse icon is to be rendered.
     */
    DEFAULT_CONFIGURATION: CollapsibleContainerConfig;
    /**
     * A classname allowing for the display of a CSS-based icon positioned to the left of the collapsible container's header
     */
    ICON_LEFT: string;
    /**
     * A classname allowing for the display of a CSS-based icon positioned to the right of the collapsible container's header
     */
    ICON_RIGHT: string;
};
/**
 * # Module
 *
 * **Deprecated since 2005, use {@link CollapsibleContainerModule}.**
 *
 * This module defines the collapsible container Angular component and its associated constants and controller.
 *
 * ## Requires
 * - ui.bootstrap
 * - yLoDashModule
 *
 * ## Basic Implementation
 *
 * To define a new collapsible container, you must make some basic modifications to your Angular module and controller, as well
 * as to your HTML template. You can also customize the rendering of your collapsible container in your controller.
 *
 * ### Angular Module
 *
 * You must add the smarteditCommonsModule as a dependency to your Angular module.
 *
 *      angular.module('yourApp', ['smarteditCommonsModule']) { ... }
 *
 * ### HTML template
 *
 * To include HTML content in the collapsible panel, you must embed it within a `<y-collapsible-container> </y-collapsible-container>` tag.<br />
 *
 *    <y-collapsible-container>
 *       <header>
 *           Your title here
 *       </header>
 *      <content>
 *           Your content here
 *       </content>
 *    </y-collapsible-container>
 *
 * ### Angular Controller
 *
 * Within your Angular controller, you can define configurations which will get applied on the collapsible container.
 *
 *      angular.module('yourApp', ['sliderPanelModule'])
 *        .controller('yourController', function() {
 *                 ...
 *                 this.configuration = { ... };
 *                 ...
 *      });
 *
 * The configurations are passed and applied to the collapsible container through the binded variable 'configuration'
 *
 *      <y-collapsible-container data-configuration="$yourCtrl.configuration">
 *        ...
 *      </y-collapsible-container>
 *
 *
 * # Component
 *
 * **Deprecated since 2005, use {@link CollapsibleContainerComponent}.**
 *
 * The component allows for the dynamic display of any HTML content on a collapsible container.
 *
 * ### Parameters
 *
 * `configuration` - See {@link CollapsibleContainerConfig}
 *
 * `getApi` - Exposes the collapsible container's api object
 *
 * @deprecated
 */
export declare class YCollapsibleContainerComponent {
    isExpanded: boolean;
    private configuration;
    private getApi;
    private api;
    $onInit(): void;
    getIconRelatedClassname(): string;
}
