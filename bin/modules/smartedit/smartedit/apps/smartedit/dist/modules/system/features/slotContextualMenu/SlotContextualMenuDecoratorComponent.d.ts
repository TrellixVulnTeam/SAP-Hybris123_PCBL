/// <reference types="angular" />
/// <reference types="jquery" />
import { DoCheck, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ComponentAttributes, IContextualMenuButton, IContextualMenuService, NodeUtils, SystemEventService } from 'smarteditcommons';
import { BaseContextualMenuComponent } from '../contextualMenu/BaseContextualMenuComponent';
export declare class SlotContextualMenuDecoratorComponent extends BaseContextualMenuComponent implements OnInit, OnDestroy, OnChanges, DoCheck {
    private element;
    private yjQuery;
    private systemEventService;
    private contextualMenuService;
    private nodeUtils;
    smarteditComponentType: string;
    smarteditComponentId: string;
    smarteditContainerType: string;
    smarteditContainerId: string;
    smarteditSlotId: string;
    smarteditSlotUuid: string;
    smarteditCatalogVersionUuid: string;
    smarteditElementUuid: string;
    componentAttributes: ComponentAttributes;
    set active(_active: string | boolean);
    get active(): string | boolean;
    items: IContextualMenuButton[];
    itemsrc: string;
    showAtBottom: boolean;
    private oldRightMostOffsetFromPage;
    private maxContextualMenuItems;
    private showSlotMenuUnregFn;
    private hideSlotMenuUnregFn;
    private refreshContextualMenuUnregFn;
    private hideSlotUnSubscribeFn;
    private showSlotUnSubscribeFn;
    private _active;
    constructor(element: ElementRef, yjQuery: JQueryStatic, systemEventService: SystemEventService, contextualMenuService: IContextualMenuService, nodeUtils: NodeUtils);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    updateItems(): void;
    triggerMenuItemAction(item: IContextualMenuButton, $event: Event): void;
    private hidePadding;
    private getRightMostOffsetFromPage;
    private positionPanelHorizontally;
    private positionPanelVertically;
}
