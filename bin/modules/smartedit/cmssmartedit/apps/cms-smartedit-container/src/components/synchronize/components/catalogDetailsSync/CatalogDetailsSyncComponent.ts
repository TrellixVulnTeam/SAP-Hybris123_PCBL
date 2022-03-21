/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, Inject } from '@angular/core';
import {
    CatalogDetailsItemData,
    CATALOG_DETAILS_ITEM_DATA,
    SeDowngradeComponent
} from 'smarteditcommons';

@SeDowngradeComponent()
@Component({
    selector: 'se-catalog-details-sync',
    template: `
        <se-synchronize-catalog
            [catalog]="catalogDetails.catalog"
            [catalogVersion]="catalogDetails.catalogVersion"
            [activeCatalogVersion]="catalogDetails.activeCatalogVersion"
        >
        </se-synchronize-catalog>
    `
})
export class CatalogDetailsSyncComponent {
    constructor(@Inject(CATALOG_DETAILS_ITEM_DATA) public catalogDetails: CatalogDetailsItemData) {}
}
