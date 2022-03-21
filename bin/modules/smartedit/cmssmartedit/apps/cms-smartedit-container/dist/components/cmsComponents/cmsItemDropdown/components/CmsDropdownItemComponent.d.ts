import { CMSLinkItem } from 'cmssmarteditcontainer/components/legacyGenericEditor/singleActiveCatalogAwareSelector/types';
import { SystemEventService } from 'smarteditcommons';
export declare class CmsDropdownItemComponent {
    private systemEventService;
    item: CMSLinkItem;
    isSelected: boolean;
    qualifier: string;
    constructor(systemEventService: SystemEventService);
    onClick(event: Event): void;
}
