/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CMSPageTypes, ICMSPage } from 'cmscommons';
import { GenericEditorStructure, ICatalogVersion, IUriContext } from 'smarteditcommons';
import { PageType } from '../../../dao/PageTypeService';
import { IRestrictionType } from '../../../dao/RestrictionTypesRestService';
import {
    PageTemplateType,
    RestrictionsEditorFunctionBindings
} from '../../../services/pages/types';
import { RestrictionsDTO, WizardCallbacks } from './types';

export interface WizardStepApi {
    // Add PageWizard
    templateSelected?(pageTemplate: PageTemplateType): void;
    typeSelected?(pageType: PageType): void;

    // Clone PageWizard
    isBasePageInfoAvailable?(): boolean;
    isPageInfoActive?(): boolean;
    getBasePageInfo?(): ICMSPage;
    getPageLabel?(): string;
    getBasePageUuid?(): string;
    getPageTemplate?(): string;
    getTargetCatalogVersion?(): ICatalogVersion;
    onTargetCatalogVersionSelected?(catalogVersion: ICatalogVersion): void;
    triggerUpdateCloneOptionResult?(cloneOptionResult: string): void;

    // Common
    callbacks: WizardCallbacks;
    restrictionsEditorFunctionBindings: RestrictionsEditorFunctionBindings;
    uriContext: IUriContext;

    isRestrictionsActive(): boolean;
    getPageTypeCode(): CMSPageTypes;
    getPageInfo(): ICMSPage;
    getPageInfoStructure(): GenericEditorStructure;
    getPageRestrictions(): string[];
    getRestrictionTypes(): Promise<IRestrictionType[]>;
    getSupportedRestrictionTypes(): Promise<string[]>;
    restrictionsResult(data: RestrictionsDTO): void;
    variationResult(displayConditionResult: ICMSPage): void;
}
