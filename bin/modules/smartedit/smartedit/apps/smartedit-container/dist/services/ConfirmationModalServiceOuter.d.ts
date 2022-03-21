/// <reference types="angular" />
import { ConfirmationModalConfig, IModalService, LegacyConfirmationModalConfig } from 'smarteditcommons';
/**
 * Service used to open a confirmation modal in which an end-user can confirm or cancel an action. A confirmation modal
 * consists of a title, content, and an OK and cancel button. This modal may be used in any context in which a
 * confirmation is required.
 */
export declare class ConfirmationModalService {
    private modalService;
    constructor(modalService: IModalService);
    /**
     * Uses the [ModalService]{@link IModalService} to open a confirmation modal.
     *
     * The confirmation modal is initialized by a default i18N key as a title or by an override title passed through the
     * input configuration object. The configuration object must have one and only one of the following parameters set: description, template, or templateUrl
     *
     *
     * @param LegacyConfirmationModalConfig [LegacyConfirmationModalConfig]{@link LegacyConfirmationModalConfig}
     * used to support AngularJS confirmation dialogs
     *
     * @param ConfirmationModalConfig [ConfirmationModalConfig]{@link ConfirmationModalConfig}
     * used to support Angular confirmation dialogs
     *
     * @returns A promise that is resolved when the OK button is actioned or is rejected when the Cancel
     * button is actioned.
     */
    confirm(configuration: LegacyConfirmationModalConfig): angular.IPromise<any> | Promise<any>;
    confirm(configuration: ConfirmationModalConfig): Promise<any>;
    private angularConfirm;
    private angularJsConfirm;
    private isLegacyConfirm;
    private getLegacyButtons;
    private getButtons;
    private _validateConfirmationParameters;
    private _initializeControllerObjectWithScope;
}
