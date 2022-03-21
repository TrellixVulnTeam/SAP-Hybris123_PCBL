import * as angular from "angular";
import { SeValueProvider, TypedMap } from 'smarteditcommons';
export declare const PERSONALIZATION_CATALOG_FILTER_PROVIDER: SeValueProvider;
export declare class CatalogFilterDropdownComponent {
    protected $q: angular.IQService;
    protected PERSONALIZATION_CATALOG_FILTER: TypedMap<string>;
    initialValue: any;
    onSelectCallback: any;
    selectedId: any;
    items: any[];
    fetchStrategy: {
        fetchAll: () => angular.IPromise<any[]>;
    };
    constructor($q: angular.IQService, PERSONALIZATION_CATALOG_FILTER: TypedMap<string>);
    $onInit(): void;
    onChange(changes: any): void;
}
