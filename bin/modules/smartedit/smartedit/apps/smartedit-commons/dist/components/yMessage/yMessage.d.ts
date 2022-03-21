/// <reference types="angular" />
/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
/**
 * # Module
 *
 * **Deprecated since 2005, use {@link MessageModule}.**
 *
 * This module provides the yMessage component, which is responsible for rendering contextual
 * feedback messages for the user actions.
 *
 * # Component
 *
 * **Deprecated, since 2005, use {@link MessageComponent}.**
 *
 * This component provides contextual feedback messages for the user actions. To provide title and description for the yMessage
 * use transcluded elements: message-title and message-description.
 *
 * ### Parameters
 *
 * `messageId` - see [messageId]{@link MessageComponent#messageId}.
 * `type` - see [type]{@link MessageComponent#type}.
 *
 * @deprecated
 */
export declare class YMessageComponent {
    $element: JQuery;
    $compile: angular.ICompileService;
    private $scope;
    messageId: string;
    type: string;
    constructor($element: JQuery, $compile: angular.ICompileService, $scope: angular.IScope);
    $postLink(): void;
}
