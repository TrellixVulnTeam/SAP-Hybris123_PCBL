/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeDowngradeService } from 'smarteditcommons';
import { PageRestrictionsRestService } from '../../dao';

/**
 * Service that concerns business logic tasks related to CMS restrictions for CMS pages.
 */
@SeDowngradeService()
export class PageRestrictionsService {
    constructor(private pageRestrictionsRestService: PageRestrictionsRestService) {}

    /**
     * @returns The number of restrictions applied to the page for the given page UID.
     */
    public async getPageRestrictionsCountForPageUID(pageUID: string): Promise<number> {
        const response = await this.pageRestrictionsRestService.getPagesRestrictionsForPageId(
            pageUID
        );

        return response.pageRestrictionList.length;
    }
}
