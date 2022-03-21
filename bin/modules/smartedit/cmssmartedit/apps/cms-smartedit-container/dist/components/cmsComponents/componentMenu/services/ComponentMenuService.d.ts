import { IBaseCatalog, ICatalogService, IExperienceService, IStorageService, TypedMap } from 'smarteditcommons';
export interface CatalogVersion {
    isCurrentCatalog: boolean;
    catalogName: TypedMap<string>;
    catalogId: string;
    catalogVersionId: string;
    id: string;
}
/**
 * Provides functionality for Component Menu displayed from toolbar on Storefront.
 * For example it allows to determine Content Catalog Version based on which component within the menu are fetched.
 */
export declare class ComponentMenuService {
    private catalogService;
    private experienceService;
    private storageService;
    private readonly SELECTED_CATALOG_VERSION_COOKIE_NAME;
    constructor(catalogService: ICatalogService, experienceService: IExperienceService, storageService: IStorageService);
    hasMultipleContentCatalogs(): Promise<boolean>;
    /**
     * This method is used to retrieve the content catalogs of the site in the page context.
     */
    getContentCatalogs(): Promise<IBaseCatalog[]>;
    /**
     * Gets the list of catalog/catalog versions where components can be retrieved from for this page.
     */
    getValidContentCatalogVersions(): Promise<CatalogVersion[]>;
    getInitialCatalogVersion(catalogVersions: CatalogVersion[]): Promise<CatalogVersion>;
    persistCatalogVersion(catalogVersionId: string): Promise<void>;
    /**
     * Gets the list of catalog/catalog versions where components can be retrieved from for this page.
     */
    private getActiveOrCurrentVersionForCatalog;
    private getPageContext;
}
