/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CMSItem } from './CMSItem';

/**
 * @description
 * Interface for cms-component information
 */
export interface ICMSComponent extends CMSItem {
    uuid: string;
    visible: boolean;
    restricted?: boolean;
    cloneable: boolean;
    /** Contains the uuid of the slots where this component is used. */
    slots: string[];
}
