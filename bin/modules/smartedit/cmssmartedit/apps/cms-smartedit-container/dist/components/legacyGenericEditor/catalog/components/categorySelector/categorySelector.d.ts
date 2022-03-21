import { CMSItem } from 'cmscommons';
import { ISeComponent } from 'smarteditcommons';
import { CatalogInformationService, ProductCatalog, CategoriesFetchStrategy } from '../../../../genericEditor/catalog/services/CatalogInformationService';
import { CategoryNodeComponent } from './categoryNode';
import { CategorySelectorItemComponent } from './categorySelectorItem';
/**
 * A component that allows users to select categories from one or more catalogs.
 * This component is catalog aware; the list of categories displayed is dependent on
 * the product catalog and catalog version selected by the user within the component.
 */
export declare class CategorySelectorComponent implements ISeComponent {
    private catalogInformationService;
    /** An identifier used to track down the component in the page. */
    id: string;
    /**
     * The object where the list of selected categories will be stored.
     * The model must contain a property with the same name as the qualifier.
     * That property must be of type array and is used to store the UIDs of the categories selected.
     */
    model: CMSItem;
    /** The key of the property in the model that will hold the list of categories selected. */
    qualifier: string;
    /** A flag that specifies whether the component can be modified or not. If the component cannot be modified, then the categories selected are read-only. Optional, default value is true. */
    editable: boolean;
    categoryNodeComponent: typeof CategoryNodeComponent;
    categorySelectorItemComponent: typeof CategorySelectorItemComponent;
    getCatalogs: () => Promise<ProductCatalog[]>;
    itemsFetchStrategy: CategoriesFetchStrategy;
    constructor(catalogInformationService: CatalogInformationService);
    $onInit(): void;
}
