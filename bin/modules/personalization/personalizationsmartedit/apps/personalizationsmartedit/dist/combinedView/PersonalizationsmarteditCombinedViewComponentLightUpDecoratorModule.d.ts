/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
import * as angular from 'angular';
import { CrossFrameEventService } from 'smarteditcommons';
import { PersonalizationsmarteditContextService } from 'personalizationsmartedit/service/PersonalizationsmarteditContextServiceInner';
export interface PersonalizationsmarteditCombinedViewComponentLightUpDecoratorControllerScope extends angular.IScope {
    letterForElement: string;
    classForElement: string;
}
export declare class PersonalizationsmarteditCombinedViewComponentLightUpDecoratorController implements angular.IController {
    $scope: PersonalizationsmarteditCombinedViewComponentLightUpDecoratorControllerScope;
    private personalizationsmarteditContextService;
    private crossFrameEventService;
    private PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING;
    private $element;
    private allBorderClassess;
    private unRegister;
    constructor($scope: PersonalizationsmarteditCombinedViewComponentLightUpDecoratorControllerScope, personalizationsmarteditContextService: PersonalizationsmarteditContextService, crossFrameEventService: CrossFrameEventService, PERSONALIZATION_COMBINED_VIEW_CSS_MAPPING: any, $element: JQuery<HTMLElement>);
    calculate(): void;
    $onInit(): void;
    $onDestroy(): void;
}
export declare class PersonalizationsmarteditCombinedViewComponentLightUpDecoratorModule {
}
