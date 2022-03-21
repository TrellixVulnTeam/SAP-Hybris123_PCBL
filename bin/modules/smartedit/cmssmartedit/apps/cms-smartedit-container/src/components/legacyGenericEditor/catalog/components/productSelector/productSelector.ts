/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ISeComponent, SeComponent } from 'smarteditcommons';
import {
    CatalogInformationService,
    ProductCatalog,
    ProductsFetchStrategy
} from '../../../../genericEditor/catalog/services';
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
@SeComponent({
    selector: 'se-product-selector',
    templateUrl: 'productSelectorTemplate.html',
    inputs: ['id:@', 'model:=', 'qualifier', 'editable:?']
})
export class ProductSelectorComponent implements ISeComponent {
    /** An identifier used to track down the component in the page. */
    public id: string;
    /**
     * The object where the list of selected products will be stored. The model must contain a property with the same name as the qualifier. That property must be
     * of type array and is used to store the UIDs of the products selected.
     */
    public model: ProductModel;
    /** The key of the property in the model that will hold the list of products selected. */
    public qualifier: string;
    /**
     * This property specifies whether the selector can be edited or not. If this flag is false,
     * then the selector is treated as read-only; the selection cannot be modified in any way. Optional, default value is true.
     */
    public editable: boolean;

    public maxNumItems = 10;
    public getCatalogs: () => Promise<ProductCatalog[]>;
    public itemsFetchStrategy: ProductsFetchStrategy;
    public productNodeComponent: typeof ProductNodeComponent;
    public productSelectorItemComponent: typeof ProductSelectorItemComponent;

    constructor(private catalogInformationService: CatalogInformationService) {
        this.productNodeComponent = ProductNodeComponent;
        this.productSelectorItemComponent = ProductSelectorItemComponent;
    }

    $onInit(): void {
        this.getCatalogs = this.catalogInformationService.makeGetProductCatalogsInformation();
        this.itemsFetchStrategy = this.catalogInformationService.productsFetchStrategy;

        if (this.editable === undefined) {
            this.editable = true;
        }
    }
}
