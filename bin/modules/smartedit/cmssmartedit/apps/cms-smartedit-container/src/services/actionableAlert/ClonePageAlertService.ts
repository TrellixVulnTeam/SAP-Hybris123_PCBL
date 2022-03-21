/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ICMSPage } from 'cmscommons';
import { ICatalogService, SeDowngradeService } from 'smarteditcommons';
import { ActionableAlertService } from './ActionableAlertService';
import { ClonePageAlertComponent } from './ClonePageAlertComponent';

@SeDowngradeService()
export class ClonePageAlertService {
    constructor(
        private actionableAlertService: ActionableAlertService,
        private catalogService: ICatalogService
    ) {}

    /**
     * Displays an alert containing an hyperlink allowing for the user
     * to navigate to the newly cloned page.
     */
    public async displayClonePageAlert(clonedPageInfo: ICMSPage): Promise<void> {
        const catalogVersion = await this.catalogService.getCatalogVersionByUuid(
            clonedPageInfo.catalogVersion
        );
        return this.actionableAlertService.displayActionableAlert({
            component: ClonePageAlertComponent,
            mousePersist: true,
            data: {
                catalogVersion,
                clonedPageInfo
            }
        });
    }
}
