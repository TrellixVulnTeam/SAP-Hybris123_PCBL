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
    selector: 'se-navigation-editor-link',
    template: `
        <div class="nav-management-link-container">
            <a
                class="nav-management-link-item__link se-catalog-version__link"
                [href]="getLink()"
                translate="se.cms.cataloginfo.navigationmanagement"
            ></a>
        </div>
    `
})
export class NavigationEditorLinkComponent {
    constructor(@Inject(CATALOG_DETAILS_ITEM_DATA) public catalogDetails: CatalogDetailsItemData) {}

    public getLink(): string {
        const {
            siteId,
            catalog: { catalogId },
            catalogVersion: { version }
        } = this.catalogDetails;

        return `#!/navigations/${siteId}/${catalogId}/${version}`;
    }
}
