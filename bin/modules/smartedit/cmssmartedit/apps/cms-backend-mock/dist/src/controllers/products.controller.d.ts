import { IProduct, IProductCategory } from 'fixtures/entities/products';
export declare class ProductsController {
    getProductCategoriesByFreeTextSearch(versionId: string): {
        pagination: {
            count: number;
            page: number;
            totalCount: number;
            totalPages: number;
        };
        productCategories: IProductCategory[];
    };
    getProductsByFreeTextSearch(catalogId: string, versionId: string): {
        pagination: {
            count: number;
            page: number;
            totalCount: number;
            totalPages: number;
        };
        products: IProduct[];
    };
    getCategoryByCode(code: string): IProductCategory;
    getProductByCode(code: string): IProduct | {
        [key: string]: IProduct;
    };
}
