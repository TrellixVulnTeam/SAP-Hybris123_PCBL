import { Injector, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Placement } from 'popper.js';
import { CompileHtmlNgController, ToolbarItemInternal, ToolbarItemType } from 'smarteditcommons';
import { ToolbarComponent } from './ToolbarComponent';
export declare class ToolbarActionComponent implements OnInit, OnChanges {
    toolbar: ToolbarComponent;
    item: ToolbarItemInternal;
    legacyController: CompileHtmlNgController;
    actionInjector: Injector;
    type: typeof ToolbarItemType;
    constructor(toolbar: ToolbarComponent);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    get isCompact(): boolean;
    get placement(): Placement;
    onOutsideClicked(): void;
    onOpenChange(): void;
    private setup;
}
