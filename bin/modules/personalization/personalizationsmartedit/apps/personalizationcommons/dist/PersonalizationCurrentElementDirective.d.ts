/// <reference types="angular" />
/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
export declare class PersonalizationCurrentElementDirective {
    private $scope;
    private $element;
    private $attrs;
    constructor($scope: angular.IScope, $element: JQuery<HTMLElement>, $attrs: angular.IAttributes);
    $postLink(): void;
}
