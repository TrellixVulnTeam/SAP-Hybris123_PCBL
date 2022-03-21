import * as angular from 'angular';
import { IModalButtonOptions } from './IModalButtonOptions';
export interface IModalConfig {
    title?: string;
    titleSuffix?: string;
    cssClasses?: string;
    buttons?: IModalButtonOptions[];
    size?: string;
    templateInline?: string;
    templateUrl?: string;
    animation?: boolean;
    controllerAs?: string;
    inlineTemplateSelector?: string;
    controller?: angular.IControllerConstructor | string;
}
