/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ISeDropdownSelectedOption, TypedMap } from 'smarteditcommons';

/**
 * @internal
 * @ignore
 */
export interface ISelectedSite extends ISeDropdownSelectedOption {
    uid: string;
    contentCatalogs: string[];
    name: TypedMap<string>;
    previewUrl: string;
}

export const SITES_ID = 'sites-id';
