/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { CompileHtmlModule } from '../../directives/CompileHtmlModule';
import { ModalWizardNavBarComponent } from './components/ModalWizardNavBarComponent';
import { ModalWizardStepOutletComponent } from './components/ModalWizardStepOutletComponent';
import { ModalWizardTemplateComponent } from './components/ModalWizardTemplateComponent';
import { DefaultWizardActionStrategy } from './services/DefaultWizardActionStrategy';
import { ModalWizard } from './services/ModalWizard';
import { WizardActions } from './services/WizardActions';

/**
 * Module containing all wizard related services
 * # Creating a modal wizard in a few simple steps
 *
 * For AngularJS usage:
 *
 * 1. Inject {@link ModalWizard} where you want to use the wizard.
 * 2. Create a new controller for your wizard. This controller will be used for all steps of the wizard.
 * 3. Implement a function in your new controller called getWizardConfig that returns a {@link ModalWizardConfig}
 * 4. Use [open]{@link ModalWizard#open} method, passing in your new controller
 *
 * For Angular usage
 * 1. Import WizardModule from "smarteditcommons" to your module imports
 * 2. Inject {@link ModalWizard} using ModalWizard constructor from "smarteditcommons".
 * 3. Create a new component controller for your wizard. This component will be used for all steps of the wizard.
 * 4. Create step components to be rendered inside the wizard. If access to component controller is needed, inject the parent reference
 * 5. Implement a method in your new controller called getWizardConfig that returns a {@link ModalWizardConfig}
 * 6. Use [open]{@link ModalWizard#open} method, passing in your new controller
 *
 * ### Example AngularJS
 *
 *      \@SeInjectable()
 *      export class MyAngularJsWizardService {
 * 		    constructor(private modalWizard) {}
 * 		    open() {
 * 			    this.modalWizard.open({
 * 				    controller: (wizardManager: any) => {
 * 					    'ngInject';
 * 					    return {
 * 						        steps: [{
 * 							    id: 'step1',
 * 							    name: 'i18n.step1.name',
 * 							    title: 'i18n.step1.title',
 * 							    templateUrl: 'some/template1.html'
 * 						    }, {
 * 							    id: 'step2',
 * 							    name: 'i18n.step2.name',
 * 							    title: 'i18n.step2.title',
 * 							    templateUrl: 'some/template2.html'
 * 						    }]
 * 					    };
 * 				    }
 * 			    });
 * 		    }
 *      }
 *
 * ### Example Angular
 *
 *      export class MyAngularWizardService {
 * 		    constructor(private modalWizard: ModalWizard) {}
 * 		    open() {
 * 			    this.modalWizard.open({
 *                  component: MyWizardControllerComponent,
 * 			    });
 * 		    }
 *      }
 *
 */
@NgModule({
    imports: [CommonModule, CompileHtmlModule, TranslateModule],
    providers: [ModalWizard, WizardActions, DefaultWizardActionStrategy],
    declarations: [
        ModalWizardTemplateComponent,
        ModalWizardNavBarComponent,
        ModalWizardStepOutletComponent
    ],
    entryComponents: [
        ModalWizardTemplateComponent,
        ModalWizardNavBarComponent,
        ModalWizardStepOutletComponent
    ]
})
export class WizardModule {}
