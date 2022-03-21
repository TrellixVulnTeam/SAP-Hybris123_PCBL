import { Injector } from '@angular/core';
import { CompileHtmlNgController } from '../../../directives';
import { WizardService, WizardStep } from '../services/WizardService';
export declare class ModalWizardStepOutletComponent {
    steps: WizardStep[];
    compileHtmlNgController: CompileHtmlNgController;
    wizardService: WizardService;
    wizardApiInjector: Injector;
    isActive(step: WizardStep): boolean;
}
