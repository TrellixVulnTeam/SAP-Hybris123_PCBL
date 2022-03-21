/// <reference types="angular" />
/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
/**
 * Directive responsible for evaluating and compiling HTML markup.
 *
 * ### Parameters
 *
 * `compile-html` - HTML string to be evaluated and compiled in the parent scope.
 *
 * ### Example
 *
 *      <div compile-html="<a data-ng-click=\"injectedContext.onLink( item.path )\">{{ item[key.property] }}</a>"></div>
 *
 */
export declare class CompileHtmlLegacyDirective {
    private $compile;
    private $scope;
    private $element;
    private $attrs;
    constructor($compile: angular.ICompileService, $scope: angular.IScope, $element: JQuery<HTMLElement>, $attrs: angular.IAttributes);
    $postLink(): void;
}
