import { Injector, OnChanges, OnInit } from '@angular/core';
import { CatalogDetailsItem, CompileHtmlNgController, ICatalog, ICatalogVersion } from 'smarteditcommons';
export declare class CatalogVersionItemRendererComponent implements OnInit, OnChanges {
    private injector;
    item: CatalogDetailsItem;
    catalog: ICatalog;
    catalogVersion: ICatalogVersion;
    activeCatalogVersion: ICatalogVersion;
    siteId: string;
    legacyController: CompileHtmlNgController;
    itemInjector: Injector;
    constructor(injector: Injector);
    ngOnInit(): void;
    ngOnChanges(): void;
    private createLegacyController;
    private createInjector;
}
