/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CMSItem } from 'cmscommons';
import { ISeComponent, SeComponent } from 'smarteditcommons';
import {
    CatalogInformationService,
    ProductCatalog,
    CategoriesFetchStrategy
} from '../../../../genericEditor/catalog/services/CatalogInformationService';
import { CategoryNodeComponent } from './categoryNode';
import { CategorySelectorItemComponent } from './categorySelectorItem';

/**
 * A component that allows users to select categories from one or more catalogs.
 * This component is catalog aware; the list of categories displayed is dependent on
 * the product catalog and catalog version selected by the user within the component.
 */
@SeComponent({
    selector: 'se-category-selector',
    templateUrl: 'categorySelectorTemplate.html',
    inputs: ['id:@', 'model:=', 'qualifier', 'editable:?']
})
export class CategorySelectorComponent implements ISeComponent {
    /** An identifier used to track down the component in the page. */
    public id: string;
    /**
     * The object where the list of selected categories will be stored.
     * The model must contain a property with the same name as the qualifier.
     * That property must be of type array and is used to store the UIDs of the categories selected.
     */
    public model: CMSItem;
    /** The key of the property in the model that will hold the list of categories selected. */
    public qualifier: string;
    /** A flag that specifies whether the component can be modified or not. If the component cannot be modified, then the categories selected are read-only. Optional, default value is true. */
    public editable: boolean;

    public categoryNodeComponent: typeof CategoryNodeComponent;
    public categorySelectorItemComponent: typeof CategorySelectorItemComponent;
    public getCatalogs: () => Promise<ProductCatalog[]>;
    public itemsFetchStrategy: CategoriesFetchStrategy;

    constructor(private catalogInformationService: CatalogInformationService) {
        this.categoryNodeComponent = CategoryNodeComponent;
        this.categorySelectorItemComponent = CategorySelectorItemComponent;
    }

    $onInit(): void {
        this.getCatalogs = this.catalogInformationService.makeGetProductCatalogsInformation();
        this.itemsFetchStrategy = this.catalogInformationService.categoriesFetchStrategy;

        if (this.editable === undefined) {
            this.editable = true;
        }
    }
}
