/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { ICMSPage } from 'cmscommons';
import { GENERIC_EDITOR_WIDGET_DATA, GenericEditorWidgetData } from 'smarteditcommons';

enum CloneAction {
    'clone' = 'clone',
    'useExisting' = 'reference',
    'remove' = 'remove'
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'se-component-slot-shared-clone-action-field',
    templateUrl: './SlotSharedCloneActionFieldComponent.html',
    styleUrls: ['./SlotSharedCloneActionFieldComponent.scss']
})
export class SlotSharedCloneActionFieldComponent {
    public page: ICMSPage;
    public cloneAction = CloneAction;

    constructor(
        @Inject(GENERIC_EDITOR_WIDGET_DATA)
        public data: GenericEditorWidgetData<any>
    ) {
        ({ model: this.page } = data);
    }
}
