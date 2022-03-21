import { ICatalogIds } from 'fixtures/entities/catalogIds.entity';
import { ISite } from 'fixtures/entities/sites/site.entity';
export declare class PagesAndNavigationsController {
    getCatalogItems(siteId: string, catalogId: string, versionId: string, currentPage: string, pageSize: string, sort: string): {
        componentItems: {
            creationtime: string;
            modifiedtime: string;
            name: string;
            pk: string;
            typeCode: string;
            uid: string;
            visible: boolean;
        }[];
    } | {
        componentItems?: undefined;
    };
    getTargetContentCatalogVersions(params: any): {
        versions: {
            active: boolean;
            name: {
                en: string;
            };
            uuid: string;
            version: string;
        }[];
    };
    getCatalogVersions(): {
        name: {
            en: string;
        };
        pageDisplayConditions: {
            options: {
                label: string;
                id: string;
            }[];
            typecode: string;
        }[];
        uid: string;
        version: string;
    };
    getContentCatalog(baseSiteId: string): {
        catalogs: import("../../fixtures/entities/catalogs").IContentCatalog[];
    };
    getProductCatalog(): {
        catalogs: import("../../fixtures/entities/catalogs").IContentCatalog[];
    };
    searchCatalogs(catalogIdsDTO: ICatalogIds): {
        sites: ISite[];
    };
    getSites(): {
        sites: ISite[];
    };
}
