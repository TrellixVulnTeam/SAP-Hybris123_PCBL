/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    IRestService,
    IRestServiceFactory,
    Page,
    Pageable,
    PAGE_CONTEXT_SITE_ID,
    SeDowngradeService
} from 'smarteditcommons';

/**
 * Represents a page version.
 */
export interface IPageVersion {
    /**
     * uid of the version.
     */
    uid: string;
    /**
     * uuid of the item.
     */
    itemUUID: string;
    /**
     * date time when the page was created.
     */
    creationtime: Date;
    /**
     * user friendly name of the page version.
     */
    label: string;
    /**
     * optional string that describes the page version.
     */
    description?: string;
}

/**
 * Represents a payload to query page versions.
 */
export interface PageVersionSearchPayload extends Pageable {
    /**
     * uuid of the page whose versions to retrieve
     */
    pageUuid: string;
}

/**
 * Used to manage versions in a page.
 */
@SeDowngradeService()
export class PageVersioningService {
    private pageVersionRESTService: IRestService<IPageVersion>;
    private pageVersionsRollbackRESTService: IRestService<void>;
    private pageVersionsServiceResourceURI = `/cmswebservices/v1/sites/${PAGE_CONTEXT_SITE_ID}/cmsitems/:pageUuid/versions`;
    private pageVersionsRollbackServiceResourceURI = `/cmswebservices/v1/sites/${PAGE_CONTEXT_SITE_ID}/cmsitems/:pageUuid/versions/:versionId/rollbacks`;

    constructor(private restServiceFactory: IRestServiceFactory) {
        this.pageVersionRESTService = this.restServiceFactory.get(
            this.pageVersionsServiceResourceURI
        );
        this.pageVersionsRollbackRESTService = this.restServiceFactory.get(
            this.pageVersionsRollbackServiceResourceURI
        );
    }

    /**
     * Retrieves the list of versions found for the page identified by the provided id. This method is paged.
     *
     * @param payload The payload containing search query params, including the pageable information.
     * @returns A promise that resolves to a paged list of versions.
     */
    public findPageVersions(payload: PageVersionSearchPayload): Promise<Page<IPageVersion>> {
        return this.pageVersionRESTService.page(payload);
    }

    /**
     * Retrieves the page version information for the provided versionId.
     */
    public getPageVersionForId(pageUuid: string, versionId: string): Promise<IPageVersion> {
        return this.pageVersionRESTService.get({
            pageUuid,
            identifier: versionId
        });
    }

    /**
     * Retrieves the resource URI to manage page versions.
     */
    public getResourceURI(): string {
        return this.pageVersionsServiceResourceURI;
    }

    public deletePageVersion(pageUuid: string, versionId: string): Promise<void> {
        return this.pageVersionRESTService.remove({
            pageUuid,
            identifier: versionId
        });
    }

    /**
     * Rollbacks the page to the provided version. This process will automatically create a version of the current page.
     */
    public rollbackPageVersion(pageUuid: string, versionId: string): Promise<void> {
        return this.pageVersionsRollbackRESTService.save({ pageUuid, versionId });
    }
}
