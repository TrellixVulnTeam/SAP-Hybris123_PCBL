/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ICMSMedia } from 'cmscommons';
import * as lodash from 'lodash';
import {
    IRestService,
    RestServiceFactory,
    SeDowngradeService,
    MEDIA_RESOURCE_URI
} from 'smarteditcommons';

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
@SeDowngradeService()
export class MediaUploaderService {
    private readonly mediaRestService: IRestService<ICMSMedia>;

    constructor(private restServiceFactory: RestServiceFactory) {
        this.mediaRestService = this.restServiceFactory.get(MEDIA_RESOURCE_URI);
    }

    /**
     * Uploads the media to the catalog.
     *
     * @returns Promise that resolves with the media object if request is successful.
     * If the request fails, it resolves with errors from the backend.
     */
    uploadMedia(media: MediaToUpload): Promise<ICMSMedia> {
        const formData = new FormData();
        lodash.forEach(media, (value, key: string) => {
            formData.append(key, value);
        });

        return this.mediaRestService.save(formData as any, {
            headers: { enctype: 'multipart/form-data' }
        });
    }
}
