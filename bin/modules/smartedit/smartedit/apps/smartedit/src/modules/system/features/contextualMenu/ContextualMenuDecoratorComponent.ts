/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* eslint-disable max-classes-per-file */
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    forwardRef,
    Component,
    DoCheck,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';

import { filter } from 'rxjs/operators';
import { ComponentHandlerService, ContextualMenu } from 'smartedit/services';
import {
    CompileHtmlNgController,
    ComponentAttributes,
    CLOSE_CTX_MENU,
    IContextualMenuButton,
    IContextualMenuService,
    NodeUtils,
    PopupOverlayConfig,
    POPUP_OVERLAY_DATA,
    REFRESH_CONTEXTUAL_MENU_ITEMS_EVENT,
    SeCustomComponent,
    SystemEventService,
    YJQUERY_TOKEN
} from 'smarteditcommons';
import { BaseContextualMenuComponent } from './BaseContextualMenuComponent';

@Component({
    selector: 'se-more-items-component',
    template: `
        <div class="se-contextual-more-menu fd-menu">
            <ul
                id="{{ parent.smarteditComponentId }}-{{ parent.smarteditComponentType }}-more-menu"
                class="fd-menu__list se-contextual-more-menu__list"
            >
                <li
                    *ngFor="let item of parent.getItems().moreMenuItems; let $index = index"
                    [attr.data-smartedit-id]="parent.smarteditComponentId"
                    [attr.data-smartedit-type]="parent.smarteditComponentType"
                    class="se-contextual-more-menu__item"
                    [ngClass]="item.customCss"
                >
                    <se-popup-overlay
                        [popupOverlay]="parent.itemTemplateOverlayWrapper"
                        [popupOverlayTrigger]="parent.shouldShowTemplate(item)"
                        [popupOverlayData]="{ item: item }"
                        (popupOverlayOnShow)="parent.onShowItemPopup(item)"
                        (popupOverlayOnHide)="parent.onHideItemPopup(false)"
                    >
                        <se-contextual-menu-item
                            [mode]="'compact'"
                            [index]="$index"
                            [componentAttributes]="parent.componentAttributes"
                            [slotAttributes]="parent.slotAttributes"
                            [itemConfig]="item"
                            (click)="parent.triggerMenuItemAction(item, $event)"
                            [attr.data-component-id]="parent.smarteditComponentId"
                            [attr.data-component-uuid]="
                                parent.componentAttributes.smarteditComponentUuid
                            "
                            [attr.data-component-type]="parent.smarteditComponentType"
                            [attr.data-slot-id]="parent.smarteditSlotId"
                            [attr.data-slot-uuid]="parent.smarteditSlotUuid"
                            [attr.data-container-id]="parent.smarteditContainerId"
                            [attr.data-container-type]="parent.smarteditContainerType"
                        >
                        </se-contextual-menu-item>
                    </se-popup-overlay>
                </li>
            </ul>
        </div>
    `
})
export class MoreItemsComponent {
    constructor(
        @Inject(forwardRef(() => ContextualMenuDecoratorComponent))
        public parent: ContextualMenuDecoratorComponent
    ) {}
}

@Component({
    template: `
        <div
            *ngIf="item.action.template || item.action.templateUrl || item.action.component"
            class="se-contextual-extra-menu"
        >
            <!-- AngularJS -->

            <div *ngIf="item.action.template">
                <div
                    [seCompileHtml]="item.action.template"
                    [compileHtmlNgController]="legacyController"
                ></div>
            </div>
            <div *ngIf="item.action.templateUrl">
                <div
                    [ngInclude]="item.action.templateUrl"
                    [compileHtmlNgController]="legacyController"
                ></div>
            </div>

            <!-- Angular -->

            <ng-container *ngIf="item.action.component">
                <ng-container *ngComponentOutlet="item.action.component"></ng-container>
            </ng-container>
        </div>
    `,
    selector: 'se-contextual-menu-item-overlay'
})
export class ContextualMenuItemOverlayComponent {
    public legacyController: CompileHtmlNgController;
    constructor(
        @Inject(POPUP_OVERLAY_DATA) private data: { item: IContextualMenuButton },
        @Inject(forwardRef(() => ContextualMenuDecoratorComponent))
        private parent: ContextualMenuDecoratorComponent
    ) {}

    ngOnInit(): void {
        this.createLegacyController();
    }

    public get item(): IContextualMenuButton {
        return this.data.item;
    }

    private createLegacyController(): void {
        this.legacyController = {
            alias: 'ctrl',
            value: (): ContextualMenuDecoratorComponent => this.parent
        };
    }
}

@SeCustomComponent()
@Component({
    selector: 'contextual-menu',
    templateUrl: './ContextualMenuDecoratorComponent.html'
})
export class ContextualMenuDecoratorComponent
    extends BaseContextualMenuComponent
    implements OnInit, DoCheck, OnDestroy {
    @Input('data-smartedit-component-type') public smarteditComponentType: string;
    @Input('data-smartedit-component-id') public smarteditComponentId: string;
    @Input('data-smartedit-container-type') public smarteditContainerType: string;
    @Input('data-smartedit-container-id') public smarteditContainerId: string;
    @Input('data-smartedit-catalog-version-uuid') public smarteditCatalogVersionUuid: string;
    @Input('data-smartedit-element-uuid') public smarteditElementUuid: string;
    @Input() public componentAttributes: ComponentAttributes;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TS2380
    @Input() public set active(_active: string | boolean) {
        if (typeof _active === 'string') {
            this._active = _active === 'true';
        } else {
            this._active = _active;
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TS2380
    public get active(): boolean | string {
        return this._active;
    }

    public items: ContextualMenu;
    public openItem: IContextualMenuButton = null;
    public moreMenuIsOpen = false;

    public slotAttributes: {
        smarteditSlotId: string;
        smarteditSlotUuid: string;
    };

    public itemTemplateOverlayWrapper: PopupOverlayConfig = {
        component: ContextualMenuItemOverlayComponent
    };

    public moreMenuPopupConfig: PopupOverlayConfig = {
        component: MoreItemsComponent,
        halign: 'left'
    };

    public moreButton = {
        displayClass: 'sap-icon--overflow',
        i18nKey: 'se.cms.contextmenu.title.more'
    };

    private displayedItem: IContextualMenuButton;
    private oldWidth: number = null;
    private dndUnRegFn: () => void;
    private unregisterRefreshItems: () => void;
    private _active: boolean | string;

    constructor(
        @Inject(YJQUERY_TOKEN) private yjQuery: JQueryStatic,
        private element: ElementRef,
        private contextualMenuService: IContextualMenuService,
        private systemEventService: SystemEventService,
        private componentHandlerService: ComponentHandlerService,
        private nodeUtils: NodeUtils
    ) {
        super();
    }

    /*
     * will only init when element's is not 0, which is what happens after a recompile of decorators called by sakExecutor after perspective change or refresh
     */
    ngDoCheck(): void {
        if (this.element) {
            const width = this.element.nativeElement.offsetWidth;
            if (this.oldWidth !== width) {
                this.oldWidth = width;
                this.ngOnDestroy();
                this.onInit();
            }
        }
    }

    ngOnDestroy(): void {
        if (this.dndUnRegFn) {
            this.dndUnRegFn();
        }
        if (this.unregisterRefreshItems) {
            this.unregisterRefreshItems();
        }
    }

    ngOnInit(): void {
        this.componentAttributes = this.nodeUtils.collectSmarteditAttributesByElementUuid(
            this.smarteditElementUuid
        );

        this.slotAttributes = {
            smarteditSlotId: this.smarteditSlotId,
            smarteditSlotUuid: this.smarteditSlotUuid
        };

        this.onInit();

        this.contextualMenuService.onContextualMenuItemsAdded
            .pipe(filter((type) => type === this.smarteditComponentType))
            .subscribe((type) => this.updateItems());
    }

    public get smarteditSlotId(): string {
        return this.componentHandlerService.getParentSlotForComponent(this.element.nativeElement);
    }

    public get smarteditSlotUuid(): string {
        return this.componentHandlerService.getParentSlotUuidForComponent(
            this.element.nativeElement
        );
    }

    onInit(): void {
        this.updateItems();

        this.dndUnRegFn = this.systemEventService.subscribe(CLOSE_CTX_MENU, () =>
            this.hideAllPopups()
        );
        this.unregisterRefreshItems = this.systemEventService.subscribe(
            REFRESH_CONTEXTUAL_MENU_ITEMS_EVENT,
            () => this.updateItems
        );
    }

    toggleMoreMenu(): void {
        this.moreMenuIsOpen = !this.moreMenuIsOpen;
    }
    shouldShowTemplate(menuItem: IContextualMenuButton): boolean {
        return this.displayedItem === menuItem;
    }

    onShowItemPopup(item: IContextualMenuButton): void {
        this.setRemainOpen('someContextualPopupOverLay', true);

        this.openItem = item;
        (this.openItem as any).isOpen = true; // does anything use this?
    }

    onHideItemPopup(hideMoreMenu?: boolean): void {
        if (this.openItem) {
            (this.openItem as any).isOpen = false; // does anything use this?
            this.openItem = null;
        }

        this.displayedItem = null;
        this.setRemainOpen('someContextualPopupOverLay', false);
        if (hideMoreMenu) {
            this.onHideMoreMenuPopup();
        }
    }

    onShowMoreMenuPopup(): void {
        this.setRemainOpen('someContextualPopupOverLay', true);
    }

    onHideMoreMenuPopup(): void {
        this.moreMenuIsOpen = false;
        this.setRemainOpen('someContextualPopupOverLay', false);
    }

    hideAllPopups(): void {
        this.onHideMoreMenuPopup();
        this.onHideItemPopup();
    }

    getItems(): ContextualMenu {
        return this.items;
    }

    showContextualMenuBorders(): boolean {
        return this.active && this.items && this.items.leftMenuItems.length > 0;
    }

    triggerMenuItemAction(item: IContextualMenuButton, $event: Event): void {
        $event.stopPropagation();
        $event.preventDefault();

        if (item.action.template || item.action.templateUrl || item.action.component) {
            if (this.displayedItem === item) {
                this.displayedItem = null;
            } else {
                this.displayedItem = item;
            }
        } else if (item.action.callback) {
            // close any popups
            this.hideAllPopups();
            item.action.callback(
                {
                    componentType: this.smarteditComponentType,
                    componentId: this.smarteditComponentId,
                    containerType: this.smarteditContainerType,
                    containerId: this.smarteditContainerId,
                    componentAttributes: this.componentAttributes,
                    slotId: this.smarteditSlotId,
                    slotUuid: this.smarteditSlotUuid,
                    element: this.yjQuery(this.element.nativeElement)
                },
                $event
            );
        }
    }

    private maxContextualMenuItems(): number {
        const ctxSize = 50;
        const buttonMaxCapacity =
            Math.round(this.yjQuery(this.element.nativeElement).width() / ctxSize) - 1;
        let leftButtons = buttonMaxCapacity >= 4 ? 3 : buttonMaxCapacity - 1;
        leftButtons = leftButtons < 0 ? 0 : leftButtons;
        return leftButtons;
    }

    private updateItems(): void {
        this.contextualMenuService
            .getContextualMenuItems({
                componentType: this.smarteditComponentType,
                componentId: this.smarteditComponentId,
                containerType: this.smarteditContainerType,
                containerId: this.smarteditContainerId,
                componentAttributes: this.componentAttributes,
                iLeftBtns: this.maxContextualMenuItems(),
                element: this.yjQuery(this.element.nativeElement)
            })
            .then((newItems: ContextualMenu) => {
                this.items = newItems;
            });
    }
}
