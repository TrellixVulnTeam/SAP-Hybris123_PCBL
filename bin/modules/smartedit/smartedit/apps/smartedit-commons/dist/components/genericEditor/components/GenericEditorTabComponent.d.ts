import { OnDestroy } from '@angular/core';
import { AbstractForm, AbstractForms, FormGrouping } from '@smart/utils';
import { TabData } from '../../tabs';
import { GenericEditorComponent } from '../GenericEditorComponent';
import { GenericEditorField } from '../types';
export declare class GenericEditorTabComponent implements OnDestroy {
    ge: GenericEditorComponent;
    private data;
    forms: AbstractForms;
    fields: GenericEditorField[];
    private _subscription;
    constructor(ge: GenericEditorComponent, data: TabData<FormGrouping>);
    ngOnInit(): void;
    ngOnDestroy(): void;
    getForm(id: string): AbstractForm;
}
