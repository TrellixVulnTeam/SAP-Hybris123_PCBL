/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ICMSPage } from 'cmscommons';
import { RestrictionCMSItem } from '../../../components/restrictions/types';

export interface RestrictionsDTO {
    onlyOneRestrictionMustApply: boolean;
    restrictionUuids: string[];
    alwaysEnableSubmit: boolean;
}

export interface WizardCallbacks {
    isDirtyPageInfo?: () => boolean;
    isValidPageInfo?: () => boolean;
    resetPageInfo?: () => void;
    savePageInfo?: () => Promise<ICMSPage>;
}
