import { ModalConfig } from '@fundamental-ngx/core';
import { IGenericEditorModalServiceComponent } from 'cmscommons';
import { IModalService } from 'smarteditcommons';
import { GenericEditorModalComponent, GenericEditorUnrelatedErrorMessage } from './components/GenericEditorModalComponent';
export declare type GenericEditorModalComponentSaveCallback<T = any> = (item: T) => void;
export declare type GenericEditorModalComponentErrorCallback = (messages: GenericEditorUnrelatedErrorMessage[], instance: GenericEditorModalComponent) => void;
export interface IGenericEditorModalComponentData {
    data: IGenericEditorModalServiceComponent;
    saveCallback?: GenericEditorModalComponentSaveCallback;
    errorCallback?: GenericEditorModalComponentErrorCallback;
}
/**
 * The Generic Editor Modal Service is used to open an editor modal window that contains a tabset.
 */
export declare class GenericEditorModalService {
    private modalService;
    constructor(modalService: IModalService);
    /**
     * Function that opens an editor modal. For this method, you must specify an object to contain the edited information, and a save
     * callback that will be triggered once the Save button is clicked.
     */
    open<T = any>(data: IGenericEditorModalServiceComponent, saveCallback?: GenericEditorModalComponentSaveCallback<T>, errorCallback?: GenericEditorModalComponentErrorCallback, config?: ModalConfig): Promise<T>;
}
