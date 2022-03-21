/// <reference types="angular-translate" />
import * as angular from "angular";
import { CrossFrameEventService, IPermissionService } from 'smarteditcommons';
import { PersonalizationsmarteditContextService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditContextServiceOuter';
import { PersonalizationsmarteditMessageHandler } from 'personalizationcommons';
import { PersonalizationsmarteditUtils } from 'personalizationcommons';
import { PersonalizationsmarteditRestService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditRestService';
import { PersonalizationsmarteditCombinedViewCommonsService } from 'personalizationsmarteditcontainer/combinedView/PersonalizationsmarteditCombinedViewCommonsService';
import { PersonalizationsmarteditContextUtils } from 'personalizationcommons';
import { PersonalizationsmarteditPreviewService } from 'personalizationsmarteditcontainer/service/PersonalizationsmarteditPreviewService';
export declare class PersonalizationsmarteditCombinedViewMenuComponent {
    protected $translate: angular.translate.ITranslateService;
    protected personalizationsmarteditContextService: PersonalizationsmarteditContextService;
    protected personalizationsmarteditMessageHandler: PersonalizationsmarteditMessageHandler;
    protected personalizationsmarteditRestService: PersonalizationsmarteditRestService;
    protected personalizationsmarteditContextUtils: PersonalizationsmarteditContextUtils;
    protected personalizationsmarteditUtils: PersonalizationsmarteditUtils;
    protected personalizationsmarteditPreviewService: PersonalizationsmarteditPreviewService;
    protected personalizationsmarteditCombinedViewCommonsService: PersonalizationsmarteditCombinedViewCommonsService;
    protected crossFrameEventService: CrossFrameEventService;
    protected permissionService: IPermissionService;
    protected SHOW_TOOLBAR_ITEM_CONTEXT: any;
    protected COMBINED_VIEW_TOOLBAR_ITEM_KEY: any;
    combinedView: any;
    selectedItems: any;
    isCombinedViewConfigured: boolean;
    constructor($translate: angular.translate.ITranslateService, personalizationsmarteditContextService: PersonalizationsmarteditContextService, personalizationsmarteditMessageHandler: PersonalizationsmarteditMessageHandler, personalizationsmarteditRestService: PersonalizationsmarteditRestService, personalizationsmarteditContextUtils: PersonalizationsmarteditContextUtils, personalizationsmarteditUtils: PersonalizationsmarteditUtils, personalizationsmarteditPreviewService: PersonalizationsmarteditPreviewService, personalizationsmarteditCombinedViewCommonsService: PersonalizationsmarteditCombinedViewCommonsService, crossFrameEventService: CrossFrameEventService, permissionService: IPermissionService, SHOW_TOOLBAR_ITEM_CONTEXT: any, COMBINED_VIEW_TOOLBAR_ITEM_KEY: any);
    $onInit(): void;
    combinedViewClick(): void;
    getAndSetComponentsForElement(customizationId: any, variationId: any, catalog: any, catalogVersion: any): void;
    itemClick(item: any): void;
    getClassForElement(index: any): string;
    getLetterForElement(index: any): string;
    isItemFromCurrentCatalog(item: any): boolean;
    clearAllCombinedViewClick(): void;
}
