/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
import * as angular from 'angular';
export declare class PersonalizationInfiniteScrollDirectiveOld {
    private $scope;
    private $element;
    private $attrs;
    private $rootScope;
    private yjQuery;
    private $window;
    private $timeout;
    constructor($scope: angular.IScope, $element: JQuery<HTMLElement>, $attrs: angular.IAttributes, $rootScope: angular.IScope, yjQuery: JQueryStatic, $window: any, $timeout: any);
    $postLink(): void;
}
