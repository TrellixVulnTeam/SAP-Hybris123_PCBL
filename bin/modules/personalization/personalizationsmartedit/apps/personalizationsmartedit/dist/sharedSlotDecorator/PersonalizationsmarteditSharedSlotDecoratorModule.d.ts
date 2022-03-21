/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
import * as angular from 'angular';
import { SlotSharedService } from 'cmssmartedit';
export declare class PersonalizationsmarteditSharedSlotDecoratorController implements angular.IController {
    private slotSharedService;
    private $element;
    active: boolean;
    smarteditComponentId: string;
    isPopupOpened: boolean;
    slotSharedFlag: boolean;
    constructor(slotSharedService: SlotSharedService, $element: JQuery<HTMLElement>);
    positionPanel(): void;
    $onChanges(changes: any): void;
    $onInit(): void;
}
export declare class PersonalizationsmarteditSharedSlotDecoratorModule {
}
