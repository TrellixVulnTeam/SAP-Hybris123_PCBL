/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces useValue:false */

import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import {
    CatalogDetailsItem,
    CompileHtmlNgController,
    CATALOG_DETAILS_ITEM_DATA,
    ICatalog,
    ICatalogVersion,
    SeDowngradeComponent
} from 'smarteditcommons';

@SeDowngradeComponent()
@Component({
    selector: 'se-catalog-version-item-renderer',
    template: `
        <ng-container>
            <div *ngIf="item.component">
                <ng-container
                    *ngComponentOutlet="item.component; injector: itemInjector"
                ></ng-container>
            </div>

            <!--  AngularJS Support-->

            <div
                *ngIf="item.include"
                [ngInclude]="item.include"
                [compileHtmlNgController]="legacyController"
            ></div>
        </ng-container>
    `
})
export class CatalogVersionItemRendererComponent implements OnInit, OnChanges {
    @Input() item: CatalogDetailsItem;
    @Input() catalog: ICatalog;
    @Input() catalogVersion: ICatalogVersion;
    @Input() activeCatalogVersion: ICatalogVersion;
    @Input() siteId: string;

    public legacyController: CompileHtmlNgController;
    public itemInjector: Injector;

    constructor(private injector: Injector) {}

    ngOnInit(): void {
        this.createLegacyController();
        this.createInjector();
    }

    ngOnChanges(): void {
        this.createLegacyController();
        this.createInjector();
    }

    private createLegacyController(): void {
        if (!this.item.include) {
            return;
        }

        this.legacyController = {
            alias: '$ctrl',
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            value: () => this
        };
    }

    private createInjector(): void {
        if (!this.item.component) {
            return;
        }

        this.itemInjector = Injector.create({
            parent: this.injector,
            providers: [
                {
                    provide: CATALOG_DETAILS_ITEM_DATA,
                    useValue: {
                        siteId: this.siteId,
                        catalog: this.catalog,
                        catalogVersion: this.catalogVersion,
                        activeCatalogVersion: this.activeCatalogVersion
                    }
                }
            ]
        });
    }
}
