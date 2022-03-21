/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, Injector, Input } from '@angular/core';
import { CompileHtmlNgController } from '../../../directives';
import { WizardService, WizardStep } from '../services/WizardService';

@Component({
    selector: 'se-modal-wizard-step-outlet',
    template: `
        <!-- AngularJS -->

        <ng-container *ngIf="steps && steps.length > 0">
            <ng-container *ngFor="let step of steps">
                <div
                    [ngClass]="{
                        'se-modal-wizard__content--visible': isActive(step)
                    }"
                    class="se-modal-wizard__content"
                >
                    <!-- AngularJS -->

                    <div
                        *ngIf="!!step.templateUrl"
                        [ngInclude]="step.templateUrl"
                        [compileHtmlNgController]="compileHtmlNgController"
                    ></div>

                    <!-- Angular -->

                    <div *ngIf="step.component">
                        <ng-container
                            *ngComponentOutlet="step.component; injector: wizardApiInjector"
                        ></ng-container>
                    </div>
                </div>
            </ng-container>
        </ng-container>
    `
})
export class ModalWizardStepOutletComponent {
    @Input() steps: WizardStep[];
    @Input() compileHtmlNgController: CompileHtmlNgController;
    @Input() wizardService: WizardService;

    @Input() wizardApiInjector: Injector;

    public isActive(step: WizardStep): boolean {
        return this.wizardService.getCurrentStepId() === step.id;
    }
}
