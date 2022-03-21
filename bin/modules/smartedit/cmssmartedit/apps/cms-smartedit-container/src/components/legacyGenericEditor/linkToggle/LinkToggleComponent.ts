/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Component, Inject } from '@angular/core';
import {
    SeDowngradeComponent,
    GENERIC_EDITOR_WIDGET_DATA,
    GenericEditorWidgetData,
    GenericEditorField,
    IGenericEditor
} from 'smarteditcommons';

export interface LinkToggleDTO {
    linkToggle?: {
        urlLink?: string;
        external?: boolean;
    };
}

@SeDowngradeComponent()
@Component({
    selector: 'se-link-toggle',
    templateUrl: './LinkToggleComponent.html',
    styleUrls: ['./LinkToggleComponent.scss']
})
export class LinkToggleComponent {
    public field: GenericEditorField;
    public model: LinkToggleDTO;

    constructor(
        @Inject(GENERIC_EDITOR_WIDGET_DATA)
        data: GenericEditorWidgetData<LinkToggleDTO>
    ) {
        ({ field: this.field, model: this.model } = data);

        if (!this.model.linkToggle) {
            this.model.linkToggle = {};
        }

        if (this.model.linkToggle.external === undefined) {
            this.model.linkToggle.external = true;
        }
    }

    public clearUrlLink(): void {
        this.model.linkToggle.urlLink = '';
    }
}
