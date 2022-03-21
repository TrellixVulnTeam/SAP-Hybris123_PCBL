import { Injector, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TypedMap } from '@smart/utils';
import { CompileHtmlNgController } from '../../directives';
import { DynamicPagedListColumnKey } from '../dynamicPagedList';
import { DataTableConfig } from './DataTableComponent';
export declare class DataTableRendererComponent implements OnInit, OnChanges {
    private injector;
    column: DynamicPagedListColumnKey;
    item: TypedMap<any>;
    config: DataTableConfig;
    index: number;
    rendererInjector: Injector;
    legacyController: CompileHtmlNgController;
    constructor(injector: Injector);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private setLegacyController;
    private setInjector;
}
