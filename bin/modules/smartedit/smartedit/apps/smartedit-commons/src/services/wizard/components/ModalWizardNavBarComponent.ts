/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import './modalWizardNavBar.scss';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { WizardAction } from '../services/WizardActions';

@Component({
    selector: 'se-modal-wizard-nav-bar',
    template: `
        <div class="se-modal-wizard__steps-container" *ngIf="navActions">
            <div *ngFor="let action of navActions; let isLast = last" class="se-modal-wizard__step">
                <button
                    [attr.id]="action.id"
                    [ngClass]="{
                        'se-modal-wizard-step__action--enabled': action.enableIfCondition(),
                        'se-modal-wizard-step__action--disabled': !action.enableIfCondition(),
                        'se-modal-wizard-step__action--current': action.isCurrentStep()
                    }"
                    class="se-modal-wizard-step__action"
                    (click)="onClickAction(action)"
                    [disabled]="!action.enableIfCondition()"
                >
                    {{ action.i18n | translate }}
                </button>
                <span
                    *ngIf="!isLast"
                    [ngClass]="{
                        'se-modal-wizard__step-icon-next--enabled': action.enableIfCondition(),
                        'se-modal-wizard__step-icon-next--disabled': !action.enableIfCondition()
                    }"
                    class="sap-icon--navigation-right-arrow se-modal-wizard__step-icon-next"
                >
                </span>
            </div>
        </div>
    `
})
export class ModalWizardNavBarComponent {
    @Input() navActions: WizardAction[];
    @Output() executeAction: EventEmitter<WizardAction> = new EventEmitter();

    public onClickAction(action: WizardAction): void {
        this.executeAction.emit(action);
    }
}
