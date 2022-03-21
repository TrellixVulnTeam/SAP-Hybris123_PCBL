import { FormField, Payload } from '@smart/utils';
import { GenericEditorField } from '../../types';
/**
 * TODO: Some parts of the generic editor field can be moved up to this component.
 * and then we could dynamic inject which form we should put the control in.
 */
export declare class GenericEditorDynamicFieldComponent {
    form: FormField;
    component: Payload;
    field: GenericEditorField;
    qualifier: string;
    id: string;
}
