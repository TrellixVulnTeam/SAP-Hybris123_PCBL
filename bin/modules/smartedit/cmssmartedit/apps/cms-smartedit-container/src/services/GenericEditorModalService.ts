/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ModalConfig } from '@fundamental-ngx/core';

import { IGenericEditorModalServiceComponent } from 'cmscommons';
import { IModalService, SeDowngradeService } from 'smarteditcommons';
import {
    GenericEditorModalComponent,
    GenericEditorUnrelatedErrorMessage
} from './components/GenericEditorModalComponent';

export type GenericEditorModalComponentSaveCallback<T = any> = (item: T) => void;
export type GenericEditorModalComponentErrorCallback = (
    messages: GenericEditorUnrelatedErrorMessage[],
    instance: GenericEditorModalComponent
) => void;

export interface IGenericEditorModalComponentData {
    data: IGenericEditorModalServiceComponent;
    saveCallback?: GenericEditorModalComponentSaveCallback;
    errorCallback?: GenericEditorModalComponentErrorCallback;
}

/**
 * The Generic Editor Modal Service is used to open an editor modal window that contains a tabset.
 */

@SeDowngradeService()
export class GenericEditorModalService {
    constructor(private modalService: IModalService) {}

    /**
     * Function that opens an editor modal. For this method, you must specify an object to contain the edited information, and a save
     * callback that will be triggered once the Save button is clicked.
     */
    public open<T = any>(
        data: IGenericEditorModalServiceComponent,
        saveCallback?: GenericEditorModalComponentSaveCallback<T>,
        errorCallback?: GenericEditorModalComponentErrorCallback,
        config?: ModalConfig
    ): Promise<T> {
        const modalConfig: ModalConfig = config ? { ...config } : {};

        modalConfig.modalPanelClass = `modal-lg ${modalConfig.modalPanelClass || ''}`.trimRight();
        modalConfig.escKeyCloseable = false;

        const ref = this.modalService.open<IGenericEditorModalComponentData>({
            component: GenericEditorModalComponent,
            data: {
                data,
                saveCallback,
                errorCallback
            },
            config: modalConfig,
            templateConfig: {
                title: data.title,
                isDismissButtonVisible: true,
                titleSuffix: 'se.cms.editor.title.suffix'
            }
        });

        return new Promise((resolve, reject) => ref.afterClosed.subscribe(resolve, reject));
    }
}
