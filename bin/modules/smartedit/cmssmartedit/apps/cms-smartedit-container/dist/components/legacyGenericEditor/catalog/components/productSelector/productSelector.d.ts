import { ISeComponent } from 'smarteditcommons';
import { CatalogInformationService, ProductCatalog, ProductsFetchStrategy } from '../../../../genericEditor/catalog/services';
import { ProductNodeComponent } from './productNode/ProductNodeComponent';
import { ProductSelectorItemComponent } from './productSelectorItem';
interface ProductModel {
    products: string[];
}
/**
 *  A component that allows users to select products from one or more catalogs.
 *  This component is catalog aware; the list of products displayed is dependent on
 *  the product catalog and catalog version selected by the user within the component.
 */
export declare class ProductSelectorComponent implements ISeComponent {
    private catalogInformationService;
    /** An identifier used to track down the component in the page. */
    id: string;
    /**
     * The object where the list of selected products will be stored. The model must contain a property with the same name as the qualifier. That property must be
     * of type array and is used to store the UIDs of the products selected.
     */
    model: ProductModel;
    /** The key of the property in the model that will hold the list of products selected. */
    qualifier: string;
    /**
     * This property specifies whether the selector can be edited or not. If this flag is false,
     * then the selector is treated as read-only; the selection cannot be modified in any way. Optional, default value is true.
     */
    editable: boolean;
    maxNumItems: number;
    getCatalogs: () => Promise<ProductCatalog[]>;
    itemsFetchStrategy: ProductsFetchStrategy;
    productNodeComponent: typeof ProductNodeComponent;
    productSelectorItemComponent: typeof ProductSelectorItemComponent;
    constructor(catalogInformationService: CatalogInformationService);
    $onInit(): void;
}
export {};
