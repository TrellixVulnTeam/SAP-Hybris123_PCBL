import { ICMSMedia } from 'cmscommons';
import { RestServiceFactory } from 'smarteditcommons';
export interface MediaToUpload {
    /**
     * The {@link https://developer.mozilla.org/en/docs/Web/API/File File} object to be* uploaded.
     */
    file: File;
    /** A unique code identifier for the media. */
    code: string;
    /** A description of the media. */
    description: string;
    /** An alternate text to be shown for the media. */
    altText: string;
}
/**
 * This service provides functionality to upload images and to fetch images by code for a specific catalog-catalog version combination.
 */
export declare class MediaUploaderService {
    private restServiceFactory;
    private readonly mediaRestService;
    constructor(restServiceFactory: RestServiceFactory);
    /**
     * Uploads the media to the catalog.
     *
     * @returns Promise that resolves with the media object if request is successful.
     * If the request fails, it resolves with errors from the backend.
     */
    uploadMedia(media: MediaToUpload): Promise<ICMSMedia>;
}
