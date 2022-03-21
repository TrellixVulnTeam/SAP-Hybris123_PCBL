/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IVersion } from '../versions';

export interface IPageMock {
    siteId: string;
    pageUUID: string;
    versions: IVersion[];
}
