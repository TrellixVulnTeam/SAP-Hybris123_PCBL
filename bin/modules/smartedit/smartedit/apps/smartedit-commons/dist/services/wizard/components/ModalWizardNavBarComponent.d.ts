import './modalWizardNavBar.scss';
import { EventEmitter } from '@angular/core';
import { WizardAction } from '../services/WizardActions';
export declare class ModalWizardNavBarComponent {
    navActions: WizardAction[];
    executeAction: EventEmitter<WizardAction>;
    onClickAction(action: WizardAction): void;
}
