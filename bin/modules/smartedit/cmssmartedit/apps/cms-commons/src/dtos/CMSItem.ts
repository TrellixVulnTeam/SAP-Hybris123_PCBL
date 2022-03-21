/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Payload } from 'smarteditcommons';
/**
 * @description
 * Interface for CMSItem information
 */
export interface CMSItem extends Payload {
    name: string;
    typeCode: string;
    itemtype?: string;
    uid: string;
    uuid: string;
    catalogVersion: string;
    componentType?: string;
    creationtime?: Date;
    modifiedtime?: Date;
    onlyOneRestrictionMustApply?: boolean;
}
