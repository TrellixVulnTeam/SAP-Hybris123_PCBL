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
    selector: 'se-page-list-link',
    templateUrl: './PageListLinkComponent.html'
})
export class PageListLinkComponent {
    constructor(@Inject(CATALOG_DETAILS_ITEM_DATA) public catalogDetails: CatalogDetailsItemData) {}

    public getLink(): string {
        const {
            siteId,
            catalog: { catalogId },
            catalogVersion: { version }
        } = this.catalogDetails;

        return `#!/ng/pages/${siteId}/${catalogId}/${version}`;
    }
}
