/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, Inject } from '@angular/core';
import { SeDowngradeComponent, WIZARD_API } from 'smarteditcommons';
import { WizardStepApi } from '../../../pageWizard';

@SeDowngradeComponent()
@Component({
    selector: 'se-page-info-step',
    template: `
        <span *ngIf="wizardApi.isPageInfoActive()">
            <se-generic-editor
                [structure]="wizardApi.getPageInfoStructure()"
                [content]="wizardApi.getPageInfo()"
                [(submit)]="wizardApi.callbacks.savePageInfo"
                [(reset)]="wizardApi.callbacks.resetPageInfo"
                [(isDirty)]="wizardApi.callbacks.isDirtyPageInfo"
                [(isValid)]="wizardApi.callbacks.isValidPageInfo"
            >
            </se-generic-editor>
        </span>
    `
})
export class PageInfoStepComponent {
    constructor(@Inject(WIZARD_API) public wizardApi: WizardStepApi) {}
}
