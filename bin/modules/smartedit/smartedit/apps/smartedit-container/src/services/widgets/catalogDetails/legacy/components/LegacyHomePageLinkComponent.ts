/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeComponent } from 'smarteditcommons';

/**
 * **Deprecated since 2005, use {@link HomePageLinkComponent}**.
 *
 * ### Properties
 *
 * `siteId` See [siteId]{@link /smarteditcommons/interfaces/CatalogDetailsItemData.html#siteId}.
 *
 * `catalog` See [catalog]{@link /smarteditcommons/interfaces/CatalogDetailsItemData.html#catalog}.
 *
 * `catalogVersion` See [catalogVersion]{@link /smarteditcommons/interfaces/CatalogDetailsItemData.html#catalogVersion}.
 *
 * @deprecated
 */
@SeComponent({
    selector: 'home-page-link',
    template: `
        <se-home-page-link 
            [catalog]="$ctrl.catalog" 
            [catalog-version]="$ctrl.catalogVersion" 
            [site-id]="$ctrl.siteId"> 
        </se-home-page-link>
    `,
    inputs: ['catalog', 'catalogVersion', 'siteId']
})
export class LegacyHomePageLinkComponent {}
