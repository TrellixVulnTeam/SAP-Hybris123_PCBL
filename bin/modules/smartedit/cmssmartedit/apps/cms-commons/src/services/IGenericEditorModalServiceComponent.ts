/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { GenericEditorStructure, Payload } from 'smarteditcommons';

/**
 * Describes the data used by GenericEditorModalComponent.
 */
export interface IGenericEditorModalServiceComponent {
    componentUuid?: string;
    componentType?: string;
    title: string;
    content?: Payload;
    structure?: GenericEditorStructure;
    contentApi?: string;
    targetedQualifier?: string;
    editorStackId?: string;
    cancelLabel?: string;
    saveLabel?: string;
    initialDirty?: boolean;
    readOnlyMode?: boolean;
    messages?: {
        type: string;
        message: string;
    }[];
    saveCallback?: (item: Payload) => void;
    // eslint-disable-next-line @typescript-eslint/ban-types
    errorCallback?: (messages: object[], form: any) => void;
}
