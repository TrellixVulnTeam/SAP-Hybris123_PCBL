/// <reference types="angular-animate" />
/// <reference types="angular-mocks" />
/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
import * as angular from 'angular';
import '../sliderPanel.scss';
import { SliderPanelConfiguration } from '../interfaces';
import { SliderPanelServiceFactory } from '../SliderPanelServiceFactory';
/**
 * This object defines injectable Angular constants that store the CSS class names used in the controller to define the
 * rendering and animation of the slider panel.
 */
export declare const CSS_CLASSNAMES: {
    /**
     * The class name applied to the slide panel container to trigger the sliding action in the CSS animation.
     */
    SLIDERPANEL_ANIMATED: string;
    /**
     * A common prefix for the class names that defines how the content of the slider panel is to be rendered.
     */
    SLIDERPANEL_SLIDEPREFIX: string;
};
/**
 * # Module
 *
 * **Deprecated since 2005, use {@link SliderPanelModule}.**
 *
 * This module defines the slider panel AngularJS component and its associated constants and controller.
 *
 * ## Basic Implementation
 *
 * To define a new slider panel, you must make some basic modifications to your AngularJS module and controller, as well
 * as to your HTML template.
 *
 * ### AngularJS Module
 *
 * You must add the sliderPanelModule as a dependency to your AngularJS module.
 *
 *      angular.module('yourApp', ['sliderPanelModule']) { ... }
 *
 *
 * ### AngularJS Controller
 *
 * Within the AngularJS controller, you must add a function to be instantiated so that the controller will trigger the
 * display of the slider panel.
 *
 *
 *      angular.module('yourApp', ['sliderPanelModule'])
 *          .controller('yourController', function() {
 *              ...
 *              this.showSliderPanel = function() {};
 *              ...
 *          });
 *
 * ### HTML template
 *
 * To include HTML content in the slider panel, you must embed the HTML content in a `<y-slider-panel> </y-slider-panel>` tag.<br />
 * For more information, see the definition of the component.
 *
 *
 *      <y-slider-panel data-slider-panel-show="$ctrl.sliderPanelShow">
 *          <content>
 *              any HTML content
 *          </content>
 *      </y-slider-panel>
 *
 * You can then make the slider panel visible by calling the "Show Slider Panel" function defined in the associated controller; for example:
 *
 *
 *      <button class="btn btn-default" ng-click="$ctrl.sliderPanelShow();">
 *          Show Slider Panel
 *      </button>
 *
 * ## Advanced Configurations
 *
 * A default set of configurations is applied to all slider panels. You can overwrite and update the default configuration.
 *
 * To update the configuration of a specific slider panel, you must instantiate a JSON object that contains the expected
 * configuration in the AngularJS controller and provide it to the slider panel controller using the HTML template, for example:
 *
 *
 *      <y-slider-panel ... data-slider-panel-configuration="$ctrl.sliderPanelConfiguration">
 *
 * If you define this type of configuration set, SmartEdit will automatically merge it with the slider panel's default configuration.
 * For information about the available settings, see the SliderPanelService.getNewServiceInstance method.
 *
 * # Component
 *
 * **Deprecated since 2005, use {@link SliderPanelComponent}.**
 *
 * ### Parameters
 *
 *
 * `dataSliderPanelConfiguration` - (optional) A JSON object containing the configuration to be applied on slider panel.
 *
 * `dataSliderPanelHide` - (optional) A function shared in a two ways binding by the main controller and the slider panel and used to trigger the hiding of the slider panel.
 *
 * `dataSliderPanelShow` - A function shared in a two ways binding by the main controller and the slider panel and used to trigger the display of the slider panel.
 *
 * The ySliderPanel AngularJS component allows for the dynamic display of any HTML content on a sliding panel.
 *
 * @deprecated
 */
export declare class YSliderPanelComponent {
    private $animate;
    private $element;
    private $timeout;
    private $window;
    private yjQuery;
    private sliderPanelServiceFactory;
    sliderPanelConfiguration: SliderPanelConfiguration;
    sliderPanelHide: () => angular.IPromise<any>;
    sliderPanelShow: () => angular.IPromise<any>;
    isShown: boolean;
    sliderPanelDismissAction: () => void;
    slideClassName: string;
    private sliderPanelService;
    private uniqueId;
    private inlineStyling;
    constructor($animate: angular.animate.IAnimateService, $element: JQuery, $timeout: angular.ITimeoutService, $window: angular.IWindowService, yjQuery: JQueryStatic, sliderPanelServiceFactory: SliderPanelServiceFactory);
    $onInit(): void;
    $onDestroy(): void;
    hideSlider(): angular.IPromise<any>;
    showSlider(): angular.IPromise<any>;
    isSaveDisabled(): boolean;
    private addScreenResizeEventHandler;
}
