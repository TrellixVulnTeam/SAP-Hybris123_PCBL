import { OnDestroy } from '@angular/core';
export interface ComponentAttributes {
    [index: string]: string;
    smarteditCatalogVersionUuid: string;
    smarteditComponentId: string;
    smarteditComponentType: string;
    smarteditComponentUuid: string;
    smarteditElementUuid: string;
}
export declare abstract class AbstractDecorator implements OnDestroy {
    active: boolean;
    smarteditElementuuid: string;
    smarteditComponentId: string;
    smarteditComponentUuid: string;
    smarteditComponentType: string;
    smarteditCatalogVersionUuid: string;
    smarteditContainerId: string;
    smarteditContainerUuid: string;
    smarteditContainerType: string;
    private _cachedCcomponentAttributes;
    static getScopes(): string[];
    constructor();
    get componentAttributes(): ComponentAttributes;
    ngOnDestroy(): void;
}
