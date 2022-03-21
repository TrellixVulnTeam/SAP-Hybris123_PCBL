import { Type } from '@angular/core';
import { TypedMap } from '@smart/utils';
import { WizardService } from './WizardService';
export interface WizardAction {
    id?: string;
    i18n?: string;
    /**
     * Component to be used as a wizard controller.
     */
    component?: Type<any>;
    /**
     * **Deprecated since 2005, use [component]{@link WizardAction#component}.**
     *
     * An angular controller which will be the underlying controller
     * for all of the wizard. This controller MUST implement the function <strong>getWizardConfig()</strong> which
     * returns a {@link WizardConfig}.<br />
     * If you need to do any manual wizard manipulation, 'wizardManager' can be injected into your controller.
     * See {@link WizardService}.
     */
    controller?: string | (new (...args: any[]) => any);
    /**
     * **Deprecated since 2005, use [component]{@link WizardAction.component}.**
     *
     * An alternate controller name that can be used in your wizard step
     */
    controllerAs?: string;
    isMainAction?: boolean;
    destinationIndex?: number;
    stepIndex?: number;
    wizardService?: WizardService;
    /**
     * A map of properties to initialize the {@link WizardService} with. They are accessible under wizardManager.properties.
     * templates. By default the controller name is wizardController.
     */
    properties?: TypedMap<any>;
    isCurrentStep?(): boolean;
    enableIfCondition?(): boolean;
    executeIfCondition?(): boolean | Promise<any>;
    execute?(wizardService: WizardService): void;
}
export declare class WizardActions {
    customAction(configuration: WizardAction): WizardAction;
    done(configuration?: WizardAction): WizardAction;
    next(configuration?: WizardAction): WizardAction;
    navBarAction(configuration: WizardAction): WizardAction;
    back(configuration: WizardAction): WizardAction;
    cancel(): WizardAction;
    private createNewAction;
}
