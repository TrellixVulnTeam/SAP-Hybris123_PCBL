import { IModalService } from 'smarteditcommons';
import * as angular from 'angular';
import { PersonalizationsmarteditRestService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditRestService';
import { PersonalizationsmarteditContextUtils } from 'personalizationcommons';
import { PersonalizationsmarteditContextService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditContextServiceOuter';
import { PersonalizationsmarteditPreviewService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditPreviewService';
import { PersonalizationsmarteditUtils } from 'personalizationcommons';
export declare class PersonalizationsmarteditCombinedViewCommonsService {
    private $q;
    protected personalizationsmarteditContextUtils: PersonalizationsmarteditContextUtils;
    protected personalizationsmarteditContextService: PersonalizationsmarteditContextService;
    protected personalizationsmarteditPreviewService: PersonalizationsmarteditPreviewService;
    protected personalizationsmarteditUtils: PersonalizationsmarteditUtils;
    protected personalizationsmarteditRestService: PersonalizationsmarteditRestService;
    private modalService;
    private MODAL_BUTTON_ACTIONS;
    private MODAL_BUTTON_STYLES;
    constructor($q: angular.IQService, personalizationsmarteditContextUtils: PersonalizationsmarteditContextUtils, personalizationsmarteditContextService: PersonalizationsmarteditContextService, personalizationsmarteditPreviewService: PersonalizationsmarteditPreviewService, personalizationsmarteditUtils: PersonalizationsmarteditUtils, personalizationsmarteditRestService: PersonalizationsmarteditRestService, modalService: IModalService, MODAL_BUTTON_ACTIONS: any, MODAL_BUTTON_STYLES: any);
    openManagerAction: () => void;
    updatePreview(previewTicketVariations: any): void;
    getVariationsForPreviewTicket(): any[];
    combinedViewEnabledEvent(isEnabled: boolean): void;
    isItemFromCurrentCatalog(item: any): boolean;
    private updateActionsOnSelectedVariations;
}
