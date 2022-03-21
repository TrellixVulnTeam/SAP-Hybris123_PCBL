/// <reference types="angular" />
/// <reference types="jquery" />
import { DoCheck, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ComponentHandlerService, ContextualMenu } from 'smartedit/services';
import { CompileHtmlNgController, ComponentAttributes, IContextualMenuButton, IContextualMenuService, NodeUtils, PopupOverlayConfig, SystemEventService } from 'smarteditcommons';
import { BaseContextualMenuComponent } from './BaseContextualMenuComponent';
export declare class MoreItemsComponent {
    parent: ContextualMenuDecoratorComponent;
    constructor(parent: ContextualMenuDecoratorComponent);
}
export declare class ContextualMenuItemOverlayComponent {
    private data;
    private parent;
    legacyController: CompileHtmlNgController;
    constructor(data: {
        item: IContextualMenuButton;
    }, parent: ContextualMenuDecoratorComponent);
    ngOnInit(): void;
    get item(): IContextualMenuButton;
    private createLegacyController;
}
export declare class ContextualMenuDecoratorComponent extends BaseContextualMenuComponent implements OnInit, DoCheck, OnDestroy {
    private yjQuery;
    private element;
    private contextualMenuService;
    private systemEventService;
    private componentHandlerService;
    private nodeUtils;
    smarteditComponentType: string;
    smarteditComponentId: string;
    smarteditContainerType: string;
    smarteditContainerId: string;
    smarteditCatalogVersionUuid: string;
    smarteditElementUuid: string;
    componentAttributes: ComponentAttributes;
    set active(_active: string | boolean);
    get active(): boolean | string;
    items: ContextualMenu;
    openItem: IContextualMenuButton;
    moreMenuIsOpen: boolean;
    slotAttributes: {
        smarteditSlotId: string;
        smarteditSlotUuid: string;
    };
    itemTemplateOverlayWrapper: PopupOverlayConfig;
    moreMenuPopupConfig: PopupOverlayConfig;
    moreButton: {
        displayClass: string;
        i18nKey: string;
    };
    private displayedItem;
    private oldWidth;
    private dndUnRegFn;
    private unregisterRefreshItems;
    private _active;
    constructor(yjQuery: JQueryStatic, element: ElementRef, contextualMenuService: IContextualMenuService, systemEventService: SystemEventService, componentHandlerService: ComponentHandlerService, nodeUtils: NodeUtils);
    ngDoCheck(): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    get smarteditSlotId(): string;
    get smarteditSlotUuid(): string;
    onInit(): void;
    toggleMoreMenu(): void;
    shouldShowTemplate(menuItem: IContextualMenuButton): boolean;
    onShowItemPopup(item: IContextualMenuButton): void;
    onHideItemPopup(hideMoreMenu?: boolean): void;
    onShowMoreMenuPopup(): void;
    onHideMoreMenuPopup(): void;
    hideAllPopups(): void;
    getItems(): ContextualMenu;
    showContextualMenuBorders(): boolean;
    triggerMenuItemAction(item: IContextualMenuButton, $event: Event): void;
    private maxContextualMenuItems;
    private updateItems;
}
