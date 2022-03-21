import { OnInit } from '@angular/core';
import { GenericEditorWidgetData } from 'smarteditcommons';
export declare class DuplicatePrimaryNonContentPageComponent implements OnInit {
    data: GenericEditorWidgetData<any>;
    label: string;
    private page;
    private readonly PRODUCT_PAGE;
    private readonly labelI18nKeys;
    constructor(data: GenericEditorWidgetData<any>);
    ngOnInit(): void;
}
