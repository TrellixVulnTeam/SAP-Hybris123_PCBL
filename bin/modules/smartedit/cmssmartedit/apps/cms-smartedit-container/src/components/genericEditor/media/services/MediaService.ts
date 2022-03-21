/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    CONTEXT_CATALOG,
    CONTEXT_CATALOG_VERSION,
    RestServiceFactory,
    SeDowngradeService,
    stringUtils,
    MEDIA_PATH,
    Page
} from 'smarteditcommons';

export interface Media {
    id: string;
    code: string;
    description: string;
    altText: string;
    url: string;
    downloadUrl: string;
}

export interface MediaDTO {
    altText: string;
    catalogId: string;
    catalogVersion: string;
    code: string;
    description: string;
    downloadUrl: string;
    mime: string;
    url: string;
    uuid: string;
}

interface ContextParams {
    catalogId: string;
    catalogVersion: string;
    code?: string;
}

/** Service to deal with media related CRUD operations. */
@SeDowngradeService()
export class MediaService {
    constructor(private restServiceFactory: RestServiceFactory) {}

    /**
     * Fetches paged search results by making a REST call to the appropriate item endpoint.
     *
     * @param mask for filtering the search.
     * @param pageSize number of items in the page.
     * @param currentPage current page number.
     */
    public async getPage(
        mask: string,
        pageSize: number,
        currentPage: number
    ): Promise<Page<Media>> {
        const contextParams: ContextParams = {
            catalogId: CONTEXT_CATALOG,
            catalogVersion: CONTEXT_CATALOG_VERSION
        };
        if (!stringUtils.isBlank(mask)) {
            contextParams.code = mask;
        }

        const subParams = this.contextParamsToCommaSeparated(contextParams);

        const payload = {
            namedQuery: 'namedQueryMediaSearchByCodeCatalogVersion',
            params: subParams,
            pageSize,
            currentPage
        };
        const response = await this.restServiceFactory
            .get<{ media: MediaDTO[] }>(MEDIA_PATH)
            .get(payload);

        const page: Page<Media> = {
            results: [],
            pagination: undefined
        };
        page.results = response.media.map((media) => this.mediaDTOtoMedia(media));

        return page;
    }

    /**
     * This method fetches a Media by its UUID.
     * @param uuid uuid of a media (contains catalog information).
     */
    public async getMedia(uuid: string): Promise<Media> {
        // identifier is added to URI and not getByid argument because it contains slashes
        const url = `${MEDIA_PATH}/${uuid}`;
        const media = await this.restServiceFactory.get<MediaDTO>(url).get();

        return this.mediaDTOtoMedia(media);
    }

    /**
     * Returns comma separated params that will be attached to payload.
     *
     * E.g. "catalogId:CURRENT_CONTEXT_CATALOG,catalogVersion:CURRENT_CONTEXT_CATALOG_VERSION"
     */
    private contextParamsToCommaSeparated(params: ContextParams): string {
        return Object.keys(params)
            .reduce((accumulator, next) => {
                accumulator += `,${next}:${params[next]}`;
                return accumulator;
            }, '')
            .substring(1);
    }

    private mediaDTOtoMedia({
        uuid,
        code,
        description,
        altText,
        url,
        downloadUrl
    }: MediaDTO): Media {
        return {
            id: uuid,
            code,
            description,
            altText,
            url,
            downloadUrl
        };
    }
}
