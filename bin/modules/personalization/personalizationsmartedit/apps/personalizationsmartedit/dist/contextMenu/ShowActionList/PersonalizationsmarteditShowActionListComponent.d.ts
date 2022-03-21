import { PersonalizationsmarteditContextService } from 'personalizationsmartedit/service/PersonalizationsmarteditContextServiceInner';
import { PersonalizationsmarteditComponentHandlerService } from 'personalizationsmartedit/service/PersonalizationsmarteditComponentHandlerService';
export declare class PersonalizationsmarteditShowActionListComponent {
    protected personalizationsmarteditContextService: PersonalizationsmarteditContextService;
    protected personalizationsmarteditUtils: any;
    protected personalizationsmarteditComponentHandlerService: PersonalizationsmarteditComponentHandlerService;
    selectedItems: any;
    containerSourceId: string;
    containerId: any;
    constructor(personalizationsmarteditContextService: PersonalizationsmarteditContextService, personalizationsmarteditUtils: any, personalizationsmarteditComponentHandlerService: PersonalizationsmarteditComponentHandlerService);
    $onInit(): void;
    getLetterForElement(index: number): string;
    getClassForElement(index: number): string;
    initItem(item: any): void;
    isCustomizationFromCurrentCatalog(customization: string): boolean;
}
