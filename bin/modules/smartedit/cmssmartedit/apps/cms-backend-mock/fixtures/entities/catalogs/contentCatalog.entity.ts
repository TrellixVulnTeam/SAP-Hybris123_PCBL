/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ICatalogVersion } from 'fixtures/entities/versions';

export interface IContentCatalog {
    name: { en: string; de?: string };
    catalogName?: { en: string; de?: string };
    versions: ICatalogVersion[];
    sites?: any[];
    catalogId?: string;
    parents?: IContentCatalog[];
}
