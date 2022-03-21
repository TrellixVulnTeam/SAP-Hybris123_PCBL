/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { GenericEditorStructure } from 'smarteditcommons';
import { PageType } from '../../dao/PageTypeService';

export interface PageTemplateType {
    frontEndName: string;
    name: string;
    uid: string;
    uuid: string;
}
export interface PageBuilderModel {
    pageInfoFields?: GenericEditorStructure;
    pageType?: PageType;
    pageTemplate?: PageTemplateType;
}

export interface RestrictionsEditorFunctionBindings {
    reset?: () => void;
    cancel?: () => void;
    isDirty?: () => boolean;
}
