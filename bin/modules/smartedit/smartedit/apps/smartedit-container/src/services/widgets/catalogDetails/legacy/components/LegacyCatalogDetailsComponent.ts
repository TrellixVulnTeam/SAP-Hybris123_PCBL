/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeComponent } from 'smarteditcommons';

/**
 * # Module
 *
 * **Deprecated since 2005, use {@link CatalogDetailsModule}.**
 *
 * # Component
 *
 * **Deprecated since 2005, use {@link CatalogDetailsComponent}.**
 *
 * ### Parameters
 *
 * `catalog` See [catalog]{@link CatalogDetailsComponent#catalog}.
 *
 * `isCatalogForCurrentSite` See [isCatalogForCurrentSite]{@link CatalogDetailsComponent#isCatalogForCurrentSite}.
 *
 * @deprecated
 */
@SeComponent({
    selector: 'catalog-details',
    template: `
        <se-catalog-details [catalog]="$ctrl.catalog" [is-catalog-for-current-site]="$ctrl.isCatalogForCurrentSite"></se-catalog-details>
    `,
    inputs: ['catalog', 'isCatalogForCurrentSite']
})
export class LegacyCatalogDetailsComponent {}
