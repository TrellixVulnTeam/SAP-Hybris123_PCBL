/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
export interface RemoveComponentInfo {
    componentId: string;
    componentUuid: string;
    componentType: string;
    slotUuid: string;
    slotId: string;
    slotOperationRelatedId: string;
    slotOperationRelatedType: string;
}
