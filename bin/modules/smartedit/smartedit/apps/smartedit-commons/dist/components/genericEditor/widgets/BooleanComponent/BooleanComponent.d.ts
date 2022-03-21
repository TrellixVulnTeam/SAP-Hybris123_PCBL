import { OnInit } from '@angular/core';
import { GenericEditorWidgetData } from '../../../genericEditor/types';
export declare class BooleanComponent implements OnInit {
    widget: GenericEditorWidgetData<any>;
    qualifierId: string;
    constructor(widget: GenericEditorWidgetData<any>);
    ngOnInit(): void;
}
