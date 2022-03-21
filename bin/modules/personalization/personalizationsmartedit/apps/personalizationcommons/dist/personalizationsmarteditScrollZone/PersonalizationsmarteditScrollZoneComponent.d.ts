/// <reference types="angular" />
/// <reference types="jquery" />
export declare class PersonalizationsmarteditScrollZoneComponent {
    private $scope;
    private $timeout;
    private $compile;
    private yjQuery;
    scrollZoneTop: boolean;
    scrollZoneBottom: boolean;
    start: boolean;
    scrollZoneVisible: boolean;
    isTransparent: boolean;
    elementToScroll: any;
    getElementToScroll: any;
    scrollZoneId: string;
    constructor($scope: any, $timeout: any, $compile: any, yjQuery: JQueryStatic);
    stopScroll(): void;
    scrollTop(): void;
    scrollBottom(): void;
    $onChanges(changes: any): void;
    $onInit(): void;
    $onDestroy(): void;
}
