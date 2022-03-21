import { PersonalizationsmarteditRestService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditRestService';
export declare class CustomizationDataFactory {
    protected personalizationsmarteditRestService: PersonalizationsmarteditRestService;
    protected personalizationsmarteditUtils: any;
    defaultSuccessCallbackFunction: (repsonse: any) => void;
    defaultErrorCallbackFunction: (response: any) => void;
    items: any[];
    private defaultFilter;
    private defaultDataArrayName;
    constructor(personalizationsmarteditRestService: PersonalizationsmarteditRestService, personalizationsmarteditUtils: any);
    getCustomizations(filter: any): void;
    updateData(params: any, successCallbackFunction: any, errorCallbackFunction: any): any;
    refreshData(): void;
    resetData(): void;
}
