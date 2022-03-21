/// <reference types="angular" />
/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
import { SeValueProvider } from 'smarteditcommons';
import { ComponentHandlerService } from 'smartedit';
export declare const COMPONENT_CONTAINER_TYPE_PROVIDER: SeValueProvider;
export declare const CONTAINER_SOURCE_ID_ATTR_PROVIDER: SeValueProvider;
export declare class PersonalizationsmarteditComponentHandlerService {
    protected componentHandlerService: ComponentHandlerService;
    protected yjQuery: any;
    protected CONTAINER_TYPE_ATTRIBUTE: string;
    protected CONTAINER_ID_ATTRIBUTE: string;
    protected TYPE_ATTRIBUTE: string;
    protected CONTENT_SLOT_TYPE: string;
    protected COMPONENT_CONTAINER_TYPE: string;
    protected CONTAINER_SOURCE_ID_ATTR: string;
    constructor(componentHandlerService: ComponentHandlerService, yjQuery: any, CONTAINER_TYPE_ATTRIBUTE: string, CONTAINER_ID_ATTRIBUTE: string, TYPE_ATTRIBUTE: string, CONTENT_SLOT_TYPE: string, COMPONENT_CONTAINER_TYPE: string, CONTAINER_SOURCE_ID_ATTR: string);
    getParentContainerForComponent(component: JQuery<HTMLElement> | JQuery): JQuery;
    getParentContainerIdForComponent(component: JQuery<HTMLElement> | JQuery): string;
    getParentContainerSourceIdForComponent(component: JQuery<HTMLElement> | JQuery): string;
    getParentSlotForComponent(component: JQuery<HTMLElement> | JQuery): JQuery;
    getParentSlotIdForComponent(component: HTMLElement | JQuery): string;
    getOriginalComponent(componentId: string, componentType: string): JQuery;
    isExternalComponent(componentId: string, componentType: string): boolean;
    getCatalogVersionUuid(component: HTMLElement | JQuery): string;
    getAllSlotsSelector(): string;
    getFromSelector(selector: string | HTMLElement | JQuery): JQuery;
    getContainerSourceIdForContainerId(containerId: string): any;
}
