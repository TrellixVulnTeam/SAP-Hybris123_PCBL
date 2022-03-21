/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Component, Inject } from '@angular/core';
import { ICMSPage } from 'cmscommons';
import {
    SeDowngradeComponent,
    GENERIC_EDITOR_WIDGET_DATA,
    GenericEditorWidgetData
} from 'smarteditcommons';

@SeDowngradeComponent()
@Component({
    selector: 'se-page-type-editor',
    templateUrl: './PageTypeEditorComponent.html',
    styleUrls: ['./PageTypeEditorComponent.scss']
})
export class PageTypeEditorComponent {
    public model: ICMSPage;

    constructor(
        @Inject(GENERIC_EDITOR_WIDGET_DATA)
        data: GenericEditorWidgetData<ICMSPage>
    ) {
        ({ model: this.model } = data);
    }
}
