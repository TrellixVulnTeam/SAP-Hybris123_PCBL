/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
export interface IMedia {
    id: string;
    code: string;
    uuid: string;
    description: string;
    altText: string;
    realFileName: string;
    url: string;
    format?: string;
}
