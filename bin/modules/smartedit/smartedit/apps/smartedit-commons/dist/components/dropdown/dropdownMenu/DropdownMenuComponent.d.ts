import { ChangeDetectorRef, ElementRef, EventEmitter, Injector, OnChanges, SimpleChanges } from '@angular/core';
import { Placement } from 'popper.js';
import { ITemplateCacheService } from 'smarteditcommons/services/interfaces/ITemplateCacheService';
import { IDropdownMenuItem } from './IDropdownMenuItem';
import './DropdownMenuComponent.scss';
export declare class DropdownMenuComponent implements OnChanges {
    private $templateCache;
    private cd;
    dropdownItems: IDropdownMenuItem[];
    selectedItem: any;
    placement: Placement;
    useProjectedAnchor: boolean;
    isOpen: boolean;
    additionalClasses: string[];
    isOpenChange: EventEmitter<boolean>;
    toggleMenuElement: ElementRef<HTMLDivElement>;
    clonedDropdownItems: IDropdownMenuItem[];
    dropdownMenuItemDefaultInjector: Injector;
    constructor($templateCache: ITemplateCacheService, cd: ChangeDetectorRef);
    clickHandler(event: MouseEvent): void;
    ngOnChanges(changes: SimpleChanges): void;
    private emitIsOpenChange;
    private setComponentOrTemplateUrl;
    private cacheDropdownItemTemplate;
    private validateDropdownItem;
}
