/**
 * The IPageInfoService provides information about the storefront page currently loaded in the iFrame.
 */
export declare abstract class IPageInfoService {
    /**
     * This extracts the pageUID of the storefront page loaded in the smartedit iframe.
     */
    getPageUID(): Promise<string>;
    /**
     * This extracts the pageUUID of the storefront page loaded in the smartedit iframe.
     * The UUID is different from the UID in that it is an encoding of uid and catalog version combined
     */
    getPageUUID(): Promise<string>;
    /**
     * This extracts the catalogVersionUUID of the storefront page loaded in the smartedit iframe.
     * The UUID is different from the UID in that it is an encoding of uid and catalog version combined
     */
    getCatalogVersionUUIDFromPage(): Promise<string>;
}
