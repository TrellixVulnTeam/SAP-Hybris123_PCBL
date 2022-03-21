/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as lodash from 'lodash';
import { SeComponent } from '../../di';
import {
    CollapsibleContainerApi,
    CollapsibleContainerConfig,
    COLLAPSIBLE_DEFAULT_CONFIGURATION
} from '../collapsible';
/* forbiddenNameSpaces angular.module:false */

/**
 * This object defines injectable Angular constants that store the default configuration and CSS class names used in the controller to define the rendering and animation of the collapsible container.
 */
export const COLLAPSIBLE_CONTAINER_CONSTANTS = {
    /**
     * A JSON object defining the configuration applied by default to each collapsible container.
     *
     * @param expandedByDefault Specifies if the collapsible container is expanded by default.
     * @param iconAlignment Specifies if the expand-collapse icon is to be displayed to the left or to the right of the container header.
     * @param iconVisible Specifies if the expand-collapse icon is to be rendered.
     */
    DEFAULT_CONFIGURATION: COLLAPSIBLE_DEFAULT_CONFIGURATION,

    /**
     * A classname allowing for the display of a CSS-based icon positioned to the left of the collapsible container's header
     */
    ICON_LEFT: 'icon-left',

    /**
     * A classname allowing for the display of a CSS-based icon positioned to the right of the collapsible container's header
     */
    ICON_RIGHT: 'icon-right'
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
@SeComponent({
    selector: 'y-collapsible-container',
    templateUrl: 'yCollapsibleContainer.html',
    transclude: {
        'collapsible-container-content': 'content',
        'collapsible-container-title': '?header'
    },
    inputs: ['configuration', 'getApi:&']
})
export class YCollapsibleContainerComponent {
    public isExpanded = true;

    private configuration: CollapsibleContainerConfig;
    private getApi: (api: { $api: CollapsibleContainerApi }) => void;
    private api: CollapsibleContainerApi = {
        isExpanded: () => this.isExpanded
    };

    public $onInit(): void {
        this.configuration = lodash.defaultsDeep(
            this.configuration,
            COLLAPSIBLE_CONTAINER_CONSTANTS.DEFAULT_CONFIGURATION
        );

        this.isExpanded = this.configuration.expandedByDefault
            ? this.configuration.expandedByDefault
            : false;

        if (typeof this.getApi === 'function') {
            this.getApi({
                $api: this.api
            });
        }
    }

    public getIconRelatedClassname(): string {
        if (this.configuration.iconVisible) {
            const key = `ICON_${this.configuration.iconAlignment.toUpperCase()}`;

            return COLLAPSIBLE_CONTAINER_CONSTANTS[key as 'ICON_LEFT' | 'ICON_RIGHT'];
        }

        return '';
    }
}
