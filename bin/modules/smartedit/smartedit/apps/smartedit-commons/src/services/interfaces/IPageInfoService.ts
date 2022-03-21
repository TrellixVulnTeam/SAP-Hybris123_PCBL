/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * The IPageInfoService provides information about the storefront page currently loaded in the iFrame.
 */
export abstract class IPageInfoService {
    /**
     * This extracts the pageUID of the storefront page loaded in the smartedit iframe.
     */
    getPageUID(): Promise<string> {
        'proxyFunction';
        return null;
    }

    /**
     * This extracts the pageUUID of the storefront page loaded in the smartedit iframe.
     * The UUID is different from the UID in that it is an encoding of uid and catalog version combined
     */
    getPageUUID(): Promise<string> {
        'proxyFunction';
        return null;
    }

    /**
     * This extracts the catalogVersionUUID of the storefront page loaded in the smartedit iframe.
     * The UUID is different from the UID in that it is an encoding of uid and catalog version combined
     */
    getCatalogVersionUUIDFromPage(): Promise<string> {
        'proxyFunction';
        return null;
    }
}
