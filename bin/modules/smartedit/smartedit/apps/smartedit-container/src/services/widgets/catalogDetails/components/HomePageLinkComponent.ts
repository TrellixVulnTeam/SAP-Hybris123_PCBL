/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, Inject } from '@angular/core';

import {
    CatalogDetailsItemData,
    CATALOG_DETAILS_ITEM_DATA,
    IExperienceService,
    SeDowngradeComponent
} from 'smarteditcommons';

@SeDowngradeComponent()
@Component({
    selector: 'se-home-page-link',
    templateUrl: './HomePageLinkComponent.html'
})
export class HomePageLinkComponent {
    constructor(
        private experienceService: IExperienceService,
        @Inject(CATALOG_DETAILS_ITEM_DATA) private data: CatalogDetailsItemData
    ) {}

    public onClick(): void {
        const {
            siteId,
            catalog: { catalogId },
            catalogVersion: { version: catalogVersion }
        } = this.data;

        this.experienceService.loadExperience({
            siteId,
            catalogId,
            catalogVersion
        });
    }
}
