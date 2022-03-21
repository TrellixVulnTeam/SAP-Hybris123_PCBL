import * as angular from 'angular';
import { YSelectComponent } from './ySelect';
/** @internal */
export interface ItemPrinterScope<T extends {
    id: string;
}> extends angular.IScope {
    selected: boolean;
    item: string | string[];
    ySelect: YSelectComponent<T>;
}
/** @internal */
export declare class ItemPrinterComponent<T extends {
    id: string;
}> {
    private $scope;
    templateUrl: string;
    private ySelect;
    private model;
    constructor($scope: ItemPrinterScope<T>);
    $onChanges: () => void;
}
