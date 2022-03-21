/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { InjectionToken } from '@angular/core';

import { CLICK_DROPDOWN, LINKED_DROPDOWN } from '../../../../utils';
import { SEDropdownAPI } from '../../../legacyGenericEditor';
import { FetchStrategy, SelectApi } from '../../../select';
import { GenericEditorField, GenericEditorOption } from '../../types';
import { DropdownPopulatorFetchPageResponse, IDropdownPopulator } from './populators';

export const LINKED_DROPDOWN_TOKEN = new InjectionToken<string>(LINKED_DROPDOWN);
export const DROPDOWN_IMPLEMENTATION_SUFFIX_TOKEN = new InjectionToken<string>(
    'DROPDOWN_IMPLEMENTATION_SUFFIX_TOKEN'
);
export const CLICK_DROPDOWN_TOKEN = new InjectionToken<string>(CLICK_DROPDOWN);

/**
 * @internal
 * @ignore
 */
export interface GenericEditorDropdownConfiguration {
    field: GenericEditorField;
    qualifier: string;
    model: any;
    id: string;
    onClickOtherDropdown?: (key?: string, qualifier?: string) => void;
    /**
     * **Deprecated since 2105.**
     */
    getApi?: ($api: { $api: SEDropdownAPI }) => void;
}

/**
 * @internal
 * @ignore
 */
export interface GenericEditorDropdownAPI extends SEDropdownAPI {}

/**
 * @internal
 * @ignore
 */
export interface IGenericEditorDropdownService {
    field: GenericEditorField;
    qualifier: string;
    model: any;
    initialized: boolean;
    isMultiDropdown: boolean;
    isPaged: boolean;
    items: GenericEditorOption[];
    selection: any;

    /**
     * **Deprecated since 2105.**
     */
    resultsHeaderTemplateUrl: string;

    /**
     * **Deprecated since 2105.**
     */
    resultsHeaderTemplate: string;
    fetchStrategy: FetchStrategy<any>;
    populator: IDropdownPopulator;
    init(): void;
    onClick(): void;
    triggerAction(): void;
    reset(): void;
    setSelectAPI(api: SelectApi): void;
    fetchPage(
        search: string,
        pageSize: number,
        currentPage: number
    ): Promise<DropdownPopulatorFetchPageResponse | void>;
    fetchAll(search?: string): PromiseLike<GenericEditorOption[]>;
}

/**
 * @internal
 * @ignore
 */
export abstract class IGenericEditorDropdownServiceConstructor {
    constructor(conf: GenericEditorDropdownConfiguration) {
        //
    }
}

export type IGenericEditorDropdownSelectedOption = GenericEditorOption;
export interface IGenericEditorDropdownSelectedOptionEventData<
    T extends IGenericEditorDropdownSelectedOption = IGenericEditorDropdownSelectedOption
> {
    qualifier: string;
    optionObject: T;
}
