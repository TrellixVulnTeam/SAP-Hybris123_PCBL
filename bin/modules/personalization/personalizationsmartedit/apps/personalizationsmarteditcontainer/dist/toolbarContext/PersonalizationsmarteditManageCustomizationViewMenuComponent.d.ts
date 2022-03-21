import { PersonalizationsmarteditContextService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditContextServiceOuter';
import { PersonalizationsmarteditContextUtils } from 'personalizationcommons';
import { PersonalizationsmarteditPreviewService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditPreviewService';
export declare class PersonalizationsmarteditManageCustomizationViewMenuComponent {
    protected personalizationsmarteditContextService: PersonalizationsmarteditContextService;
    protected personalizationsmarteditContextUtils: PersonalizationsmarteditContextUtils;
    protected personalizationsmarteditPreviewService: PersonalizationsmarteditPreviewService;
    protected personalizationsmarteditManager: any;
    protected personalizationsmarteditManagerView: any;
    constructor(personalizationsmarteditContextService: PersonalizationsmarteditContextService, personalizationsmarteditContextUtils: PersonalizationsmarteditContextUtils, personalizationsmarteditPreviewService: PersonalizationsmarteditPreviewService, personalizationsmarteditManager: any, personalizationsmarteditManagerView: any);
    createCustomizationClick(): void;
    managerViewClick(): void;
}
