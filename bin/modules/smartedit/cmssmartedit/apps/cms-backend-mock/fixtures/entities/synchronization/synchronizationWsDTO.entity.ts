/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
export interface ISynchronizationWsDTO {
    items: {
        itemId: string;
        itemType: string;
    }[];
}
