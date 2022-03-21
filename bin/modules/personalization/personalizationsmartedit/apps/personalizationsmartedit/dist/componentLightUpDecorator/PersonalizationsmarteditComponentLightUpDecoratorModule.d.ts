/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
import * as angular from 'angular';
import { CrossFrameEventService } from 'smarteditcommons';
import { PersonalizationsmarteditContextService } from 'personalizationsmartedit/service/PersonalizationsmarteditContextServiceInner';
import { PersonalizationsmarteditComponentHandlerService } from 'personalizationsmartedit/service/PersonalizationsmarteditComponentHandlerService';
export declare class PersonalizationsmarteditComponentLightUpDecoratorController implements angular.IController {
    private personalizationsmarteditContextService;
    private personalizationsmarteditComponentHandlerService;
    private crossFrameEventService;
    private CONTAINER_SOURCE_ID_ATTR;
    private OVERLAY_COMPONENT_CLASS;
    private CONTAINER_TYPE_ATTRIBUTE;
    private ID_ATTRIBUTE;
    private TYPE_ATTRIBUTE;
    private CATALOG_VERSION_UUID_ATTRIBUTE;
    private $element;
    private yjQuery;
    private CONTAINER_TYPE;
    private ACTION_ID_ATTR;
    private PARENT_CONTAINER_SELECTOR;
    private PARENT_CONTAINER_WITH_ACTION_SELECTOR;
    private COMPONENT_SELECTOR;
    private unRegister;
    constructor(personalizationsmarteditContextService: PersonalizationsmarteditContextService, personalizationsmarteditComponentHandlerService: PersonalizationsmarteditComponentHandlerService, crossFrameEventService: CrossFrameEventService, CONTAINER_SOURCE_ID_ATTR: string, OVERLAY_COMPONENT_CLASS: string, CONTAINER_TYPE_ATTRIBUTE: string, ID_ATTRIBUTE: string, TYPE_ATTRIBUTE: string, CATALOG_VERSION_UUID_ATTRIBUTE: string, $element: JQuery<HTMLElement>, yjQuery: JQueryStatic);
    isComponentSelected(): boolean;
    isVariationComponentSelected(component: JQuery<HTMLElement>): boolean;
    calculate(): void;
    $onInit(): void;
    $onDestroy(): void;
}
export declare class PersonalizationsmarteditComponentLightUpDecoratorModule {
}
