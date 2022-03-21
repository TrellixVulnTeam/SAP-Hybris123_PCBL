import { IRestServiceFactory, Page, Pageable } from 'smarteditcommons';
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
export declare class PageVersioningService {
    private restServiceFactory;
    private pageVersionRESTService;
    private pageVersionsRollbackRESTService;
    private pageVersionsServiceResourceURI;
    private pageVersionsRollbackServiceResourceURI;
    constructor(restServiceFactory: IRestServiceFactory);
    /**
     * Retrieves the list of versions found for the page identified by the provided id. This method is paged.
     *
     * @param payload The payload containing search query params, including the pageable information.
     * @returns A promise that resolves to a paged list of versions.
     */
    findPageVersions(payload: PageVersionSearchPayload): Promise<Page<IPageVersion>>;
    /**
     * Retrieves the page version information for the provided versionId.
     */
    getPageVersionForId(pageUuid: string, versionId: string): Promise<IPageVersion>;
    /**
     * Retrieves the resource URI to manage page versions.
     */
    getResourceURI(): string;
    deletePageVersion(pageUuid: string, versionId: string): Promise<void>;
    /**
     * Rollbacks the page to the provided version. This process will automatically create a version of the current page.
     */
    rollbackPageVersion(pageUuid: string, versionId: string): Promise<void>;
}
