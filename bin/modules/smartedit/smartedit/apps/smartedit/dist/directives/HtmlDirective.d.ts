/// <reference types="angular" />
/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
export declare class HtmlDirective {
    private $element;
    constructor($element: JQuery);
    $postLink(): void;
}
