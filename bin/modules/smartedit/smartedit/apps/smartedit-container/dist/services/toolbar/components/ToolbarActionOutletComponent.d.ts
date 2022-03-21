import { Injector, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CompileHtmlNgController, ToolbarItemInternal, ToolbarItemType } from 'smarteditcommons';
import { ToolbarComponent } from './ToolbarComponent';
/** @internal  */
export declare class ToolbarActionOutletComponent implements OnInit, OnChanges {
    private toolbar;
    item: ToolbarItemInternal;
    legacyController: CompileHtmlNgController;
    actionInjector: Injector;
    type: typeof ToolbarItemType;
    constructor(toolbar: ToolbarComponent);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    get isSectionRight(): boolean;
    get isPermitionGranted(): boolean;
    private setup;
}
