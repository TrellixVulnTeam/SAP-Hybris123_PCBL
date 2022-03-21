/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IModalButtonOptions } from './IModalButtonOptions';
import { ModalButtonActions } from './ModalButtonActions';
import { ModalButtonStyles } from './ModalButtonStyles';

export const defaultButtonOptions: IModalButtonOptions = {
    id: 'button.id',
    label: 'button.label',
    action: ModalButtonActions.None,
    style: ModalButtonStyles.Primary,
    disabled: false,
    callback: null
};
