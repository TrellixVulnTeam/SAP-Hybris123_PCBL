import { InjectionToken, Type } from '@angular/core';
import { TypedMap } from '@smart/utils';
import { StringUtils } from '../../../utils';
import { IWizardActionStrategy } from './DefaultWizardActionStrategy';
import { WizardAction } from './WizardActions';
/**
 * A plain JSON object, representing the configuration options for a single step in a wizard.
 */
export interface WizardStep {
    /**
     * An optional unique ID for this step in the wizard. If no ID is provided, one is automatically generated.<br />
     * You may choose to provide an ID, making it easier to reference this step explicitly via the wizard service, or
     * be able to identify for which step a callback is being triggered.
     */
    id: string;
    /**
     * **Deprecated since 2005, use [component]{@link WizardStep#component}.**
     *
     * The url of the html template for this step.
     * @deprecated
     */
    templateUrl?: string;
    component?: Type<any>;
    /**
     * An i18n key representing a meaning (short) name for this step.
     * This name will be displayed in the wizard navigation menu.
     */
    name: string;
    /**
     * An i18n key, representing the title that will be displayed at the top of the wizard for this step.
     */
    title: string;
    actions?: WizardAction[];
}
/**
 * A plain JSON object, representing the configuration options for a modal wizard
 */
export interface WizardConfig {
    /**
     * An ordered array of Wizard Steps.
     */
    steps: WizardStep[];
    actionStrategy?: IWizardActionStrategy;
    /**
     * An optional callback function that has no parameters. This callback is triggered after the done
     * action is fired, and the wizard is about to be closed. If this function is defined and returns a value, this
     * value will be returned in the resolved promise returned by the [open]{@link ModalWizard#open}.
     * This is an easy way to pass a result from the wizard to the caller.
     */
    resultFn?: () => void;
    /**
     * An optional callback function that receives a single parameter, the current step ID. This callback
     * is used to enable/disable the next action and the done action.
     * The callback should return a boolean to enabled the action. Null, or if this callback is not defined defaults to
     * true (enabled)
     */
    isFormValid?: (stepId: string) => boolean;
    /**
     * An optional callback function that receives a single parameter, the current step ID.
     * This callback is triggered after the next action is fired. You have the opportunity to halt the Next action by
     * returning promise and rejecting it, otherwise the wizard will continue and load the next step.
     */
    onNext?: (stepId: string) => boolean | Promise<any>;
    /**
     * An optional callback function that receives a single parameter, the current step ID.
     * This callback is triggered after the cancel action is fired. You have the opportunity to halt the cancel action
     * (thereby stopping the wizard from being closed), by returning a promise and rejecting it, otherwise the wizard will
     * continue the cancel action.
     */
    onCancel?: (stepId: string) => boolean | Promise<any>;
    /**
     * An optional callback function that has no parameters. This callback is triggered after the done
     * action is fired. You have the opportunity to halt the done action (thereby stopping the wizard from being closed),
     * by returning a promise and rejecting it, otherwise the wizard will continue and close the wizard.
     */
    onDone?: (stepId: string) => boolean | Promise<any>;
    /**
     * An optional i18n key to override the default label for the Done button
     */
    doneLabel?: string;
    /**
     * An optional i18n key to override the default label for the Next button
     */
    nextLabel?: string;
    /**
     * An optional i18n key to override the default label for the Back button
     */
    backLabel?: string;
    /**
     * An optional i18n key to override the default label for the Cancel button
     */
    cancelLabel?: string;
    templateOverride?: string;
    cancelAction?: WizardAction;
}
export declare const WIZARD_MANAGER: InjectionToken<WizardService>;
export declare const WIZARD_API: InjectionToken<unknown>;
/**
 * The Wizard Manager is a wizard management service that can be injected into your wizard controller.
 */
export declare class WizardService {
    private defaultWizardActionStrategy;
    private stringUtils;
    onLoadStep: (index: number, nextStep: WizardStep) => void;
    onClose: (result: any) => void;
    onCancel: () => void;
    onStepsUpdated: (steps: WizardStep[]) => void;
    properties: TypedMap<any>;
    private _actionStrategy;
    private _currentIndex;
    private _conf;
    private _steps;
    private _getResult;
    constructor(defaultWizardActionStrategy: IWizardActionStrategy, stringUtils: StringUtils);
    initialize(conf: WizardConfig): void;
    executeAction(action: WizardAction): Promise<void>;
    /**
     * Navigates the wizard to the given step.
     * @param index The 0-based index from the steps array returned by the wizard controllers getWizardConfig() function
     */
    goToStepWithIndex(index: number): void;
    /**
     * Navigates the wizard to the given step.
     * @param id The ID of a step returned by the wizard controllers getWizardConfig() function. Note that if
     * no id was provided for a given step, then one is automatically generated.
     */
    goToStepWithId(id: string): void;
    /**
     * Adds an additional step to the wizard at runtime
     * @param index (OPTIONAL) A 0-based index position in the steps array. Default is 0.
     */
    addStep(newStep: WizardStep, index: number): void;
    /**
     * Remove a step form the wizard at runtime. If you are removing the currently displayed step, the
     * wizard will return to the first step. Removing all the steps will result in an error.
     */
    removeStepById(id: string): void;
    /**
     * Remove a step form the wizard at runtime. If you are removing the currently displayed step, the
     * wizard will return to the first step. Removing all the steps will result in an error.
     * @param index The 0-based index of the step you wish to remove.
     */
    removeStepByIndex(index: number): void;
    /**
     * Close the wizard. This will return a resolved promise to the creator of the wizard, and if any
     * resultFn was provided in the {@link ModalWizardConfig} the returned
     * value of this function will be passed as the result.
     */
    close(): void;
    /**
     * Cancel the wizard. This will return a rejected promise to the creator of the wizard.
     */
    cancel(): void;
    getSteps(): WizardStep[];
    getStepIndexFromId(id: string): number;
    /**
     * @returns True if the ID exists in one of the steps
     */
    containsStep(stepId: string): boolean;
    getCurrentStepId(): string;
    getCurrentStepIndex(): number;
    getCurrentStep(): WizardStep;
    /**
     * @returns The number of steps in the wizard. This should always be equal to the size of the array.
     * returned by [getSteps]{@link WizardManager#getSteps}.
     */
    getStepsCount(): number;
    getStepWithId(id: string): WizardStep;
    getStepWithIndex(index: number): WizardStep;
    private validateConfig;
    private validateStepUids;
}
