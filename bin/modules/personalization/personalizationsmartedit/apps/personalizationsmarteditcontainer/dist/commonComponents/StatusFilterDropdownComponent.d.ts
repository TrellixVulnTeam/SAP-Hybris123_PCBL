import * as angular from 'angular';
import { PersonalizationsmarteditUtils } from 'personalizationcommons';
export declare class StatusFilterDropdownComponent {
    protected $q: angular.IQService;
    protected personalizationsmarteditUtils: PersonalizationsmarteditUtils;
    initialValue: any;
    onSelectCallback: any;
    selectedId: any;
    items: any[];
    fetchStrategy: {
        fetchAll: () => angular.IPromise<any[]>;
    };
    constructor($q: angular.IQService, personalizationsmarteditUtils: PersonalizationsmarteditUtils);
    $onInit(): void;
    onChange(changes: any): void;
}
