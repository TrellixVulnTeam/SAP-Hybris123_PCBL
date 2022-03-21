/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeComponent } from 'smarteditcommons';

/**
 * **Deprecated since 2005, use {@link CatalogVersionDetailsComponent}**.
 *
 * ### Parameters
 *
 * `catalog` See [catalog]{@link CatalogVersionDetailsComponent#catalog}.
 *
 * `catalogVersion` See [catalogVersion]{@link CatalogVersionDetailsComponent#catalogVersion}.
 *
 * `activeCatalogVersion` See [activeCatalogVersion]{@link CatalogVersionDetailsComponent#activeCatalogVersion}.
 *
 * `siteId` See [siteId]{@link CatalogVersionDetailsComponent#siteId}.
 *
 * @deprecated
 */
@SeComponent({
    selector: 'catalog-version-details',
    template: `
        <se-catalog-version-details 
            [catalog]="$ctrl.catalog" 
            [site-id]="$ctrl.siteId" 
            [catalog-version]="$ctrl.catalogVersion" 
            [active-catalog-version]="$ctrl.activeCatalogVersion">
        </se-catalog-version-details>
    `,
    inputs: ['catalog', 'catalogVersion', 'activeCatalogVersion', 'siteId']
})
export class LegacyCatalogVersionDetailsComponent {}
