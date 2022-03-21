/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, Inject } from '@angular/core';
import { SeDowngradeComponent, WIZARD_API } from 'smarteditcommons';
import { WizardStepApi } from '../../../pageWizard';

@SeDowngradeComponent()
@Component({
    selector: 'se-page-type-step',
    template: `
        <se-select-page-type
            [pageTypeCode]="wizardApi.getPageTypeCode()"
            (onTypeSelected)="wizardApi.typeSelected($event)"
        >
        </se-select-page-type>
    `
})
export class PageTypeStepComponent {
    constructor(@Inject(WIZARD_API) public wizardApi: WizardStepApi) {}
}
