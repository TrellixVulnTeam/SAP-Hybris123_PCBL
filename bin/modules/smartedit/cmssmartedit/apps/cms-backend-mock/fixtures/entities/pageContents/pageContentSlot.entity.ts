/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
export interface IPageContentSlot {
    pageId: string;
    position: string;
    slotId: string;
    slotShared?: boolean;
    slotStatus?: string;
}
