/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces useValue:false */
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Injector,
    Input,
    Output,
    OnChanges,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { Placement } from 'popper.js';

import { ITemplateCacheService } from 'smarteditcommons/services/interfaces/ITemplateCacheService';
import { SeDowngradeComponent } from '../../../di';
import { stringUtils } from '../../../utils';
import { DropdownMenuItemDefaultComponent } from './DropdownMenuItemDefaultComponent';
import { IDropdownMenuItem } from './IDropdownMenuItem';

import './DropdownMenuComponent.scss';
/**
 * Renders a Dropdown Menu.
 * It has two Inputs `dropdownItems` and `selectedItem`.
 *
 * The dropdownItems is an array of objects
 * which must contain either an i18n key associated to a callback function,
 * a static HTML template or a templateUrl leading to an external HTML file.
 * An optional condition can be added to define whether the item is to get
 * rendered.
 *
 * The selectedItem is the object associated to the dropdown. It is passed
 * as argument for the callback of dropdownItems.
 * For a given item, if a condition callback is defined, the item will show
 * only if this callback returns true
 *
 * ### Example
 *
 *      this.dropdownItems = [
 *          {
 *              key: 'my.translated.key',
 *              callback: function() {
 *                  doSomething();
 *              }.bind(this)
 *              },
 *              { template: '<my-component />' },
 *              { templateUrl: 'myComponentTemplate.html' }
 *      ];
 *
 */
@SeDowngradeComponent()
@Component({
    selector: 'se-dropdown-menu',
    templateUrl: './DropdownMenuComponent.html'
})
export class DropdownMenuComponent implements OnChanges {
    /**
     * An array of objects containing parameters allowing for the selection of a cached HTML template used to render the dropdown menu item.
     */
    @Input() dropdownItems: IDropdownMenuItem[];
    /**
     * An object defining the context of the page associated to the dropdown item.
     */
    @Input() selectedItem: any;
    @Input() placement: Placement;
    /**
     * Uses the projected anchor instead of a the default contextual menu icon.
     */
    @Input() useProjectedAnchor = false;
    @Input() isOpen = false;
    /**
     * List of additional classes that will be added to menu list element classes.
     */
    @Input() additionalClasses: string[] = [];
    @Output() isOpenChange = new EventEmitter<boolean>();

    @ViewChild('toggleMenu', { static: true }) toggleMenuElement: ElementRef<HTMLDivElement>;

    public clonedDropdownItems: IDropdownMenuItem[];
    public dropdownMenuItemDefaultInjector: Injector;

    constructor(private $templateCache: ITemplateCacheService, private cd: ChangeDetectorRef) {}

    /** @internal */
    @HostListener('document:click', ['$event'])
    clickHandler(event: MouseEvent): void {
        // toggle menu
        if (this.toggleMenuElement.nativeElement.contains(event.target as Node)) {
            event.stopPropagation();
            this.isOpen = !this.isOpen;
            this.cd.detectChanges();

            this.emitIsOpenChange();
            return;
        }

        // close when any element except toggleMenuElement has been clicked
        if (this.isOpen) {
            this.isOpen = false;
            this.cd.detectChanges();

            this.emitIsOpenChange();
            return;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.dropdownItems) {
            this.clonedDropdownItems = this.dropdownItems
                .map((item) => ({
                    ...item,
                    condition: item.condition || ((): boolean => true)
                }))
                .map((item) => this.setComponentOrTemplateUrl(item));
        }
    }

    private emitIsOpenChange(): void {
        this.isOpenChange.emit(this.isOpen);
    }

    /** @internal */
    private setComponentOrTemplateUrl(dropdownItem: IDropdownMenuItem): IDropdownMenuItem {
        switch (this.validateDropdownItem(dropdownItem)) {
            case 'callback':
                return {
                    ...dropdownItem,
                    component: DropdownMenuItemDefaultComponent
                };
            case 'template':
                // replacing 'template' with cached 'templateUrl'
                return {
                    ...dropdownItem,
                    templateUrl: this.cacheDropdownItemTemplate(dropdownItem),
                    template: null
                };

            default:
                return dropdownItem;
        }
    }

    /** @internal */
    private cacheDropdownItemTemplate(dropdownItem: IDropdownMenuItem): string {
        const keyOfCachedTemplate =
            'yDropdownItem_' +
            stringUtils.getEncodedString(dropdownItem.template) +
            '_Template.html';

        if (!this.$templateCache.get(keyOfCachedTemplate)) {
            this.$templateCache.put(keyOfCachedTemplate, dropdownItem.template);
        }
        return keyOfCachedTemplate;
    }

    /** @internal */
    private validateDropdownItem(dropdownItem: IDropdownMenuItem): string {
        const expectedAttributes: Readonly<string[]> = [
            'callback',
            'template',
            'templateUrl',
            'component'
        ];
        const passedAttributes = Object.keys(dropdownItem);
        const validatedAttributes = passedAttributes.filter(
            (attribute) => expectedAttributes.indexOf(attribute) !== -1
        );

        if (validatedAttributes.length !== 1) {
            throw new Error(
                'DropdownMenuComponent.validateDropdownItem - Dropdown Item must contain at least a callback, template, templateUrl or component'
            );
        }
        const targetAttribute = validatedAttributes[0];
        return targetAttribute;
    }
}
