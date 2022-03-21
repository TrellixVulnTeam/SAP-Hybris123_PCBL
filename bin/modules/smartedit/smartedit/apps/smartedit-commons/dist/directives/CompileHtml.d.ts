import { ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { TypedMap } from '@smart/utils';
import * as angular from 'angular';
/**
 * @ignore
 */
export interface CompileHtmlNgController {
    /**
     * Argument of "ng-controller" directive, defining an alias by which a controller can be referenced in the template
     *
     * ### Example
     *
     *      ng-controller="ctrl as $ctrlAlias"
     */
    alias: string;
    /**
     * Controller constructor function or an array containing string providers and controller constructor function as a last element
     *
     * ### Example
     *
     *      value: function ctrl() {
     *        this.taskName = 'Translation (DE)';
     *      }
     *
     *      value: [
     *        'experienceService',
     *         function(experienceService) {
     *           // can access experienceService
     *         }
     *      ]
     */
    value: angular.IControllerConstructor | any[];
}
export interface DynamicScope extends angular.IScope {
    [key: string]: any;
}
/**
 * @ignore
 */
export declare abstract class CompileHtml implements OnChanges {
    private elementRef;
    private renderer;
    private upgrade;
    scope: TypedMap<any>;
    /**
     * AngularJS legacy support.
     *
     * Wraps template into the element with "ng-controller" directive.
     * Attaches Controller Constructor Function to the view.
     *
     * ### Example
     *
     * Given
     *      "template": '<div>task: {{$announcementCtrl.taskName}}</div>'
     *
     *      "controller": {
     *          alias: '$announcementCtrl',
     *          value: function ctrl() {
     *              'ngInject';
     *              this.taskName = 'Translation (DE)';
     *          }
     *      }
     *
     * Wraps into a <div> with ng-controller
     *
     *      <div ng-controller="$announcementCtrl.compileHtmlNgController.value as $announcementCtrl">
     *          <div>task: {{$announcementCtrl.taskName}}</div>
     *      </div>
     *
     * Which will be rendered as
     *
     *     <div ng-controller="$announcementCtrl.compileHtmlNgController.value as $announcementCtrl">
     *          <div>task: 'Translation (DE)'</div>
     *     </div>
     */
    compileHtmlNgController: CompileHtmlNgController;
    /**
     * Template url or HTML Template string to be compiled by directive e.g. <div>some text</div>
     */
    private template;
    private $scope;
    constructor(elementRef: ElementRef, renderer: Renderer2, upgrade: UpgradeModule);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private resetScope;
    private removeCompiledHTML;
    private hasInputChanged;
    private setCompiledHTML;
    private compile;
    private wrapTemplateIntoNgController;
    private isTemplateUrl;
    private get $templateCache();
    private get $compile();
    private get $rootScope();
}
