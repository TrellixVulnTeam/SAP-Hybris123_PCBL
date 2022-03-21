/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import * as uib from 'angular-ui-bootstrap';
import * as lo from 'lodash';

import { defaultButtonOptions } from './constants';
import { IModalButtonOptions } from './IModalButtonOptions';
import { IModalConfig } from './IModalConfig';
import { ModalButtonActions } from './ModalButtonActions';
import { ModalButtonStyles } from './ModalButtonStyles';

/**
 * The ModalManager is a service designed to provide easy runtime modification to various aspects of a modal window,
 * such as the modifying the title, adding a buttons, setting callbacks, etc...
 *
 * The ModalManager constructor is not exposed publicly, but an instance of ModalManager is added to the scope of
 * the modal content implicitly through the scope chain/prototyping. As long as you don't create an
 * {@link https://docs.angularjs.org/guide/scope isolated scope} for the modal, you can access it through $scope.modalManager
 *
 * ### Example
 *
 *       .controller('modalTestController', function($scope, $log) {
 *          var buttonHandlerFn = function (buttonId) {
 *              $log.debug("button with id", buttonId, "was pressed!");
 *          };
 *          $scope.modalManager.setButtonHandler(buttonHandlerFn);
 *          ...
 */
export class ModalManager {
    public title = '';
    public titleSuffix: string;

    private buttonEventCallback: (id: string) => void | Promise<any>;
    private showDismissX = true;
    private buttons: IModalButtonOptions[] = [];
    private closeFunction: (data: any) => void;
    private dismissCallback: () => Promise<any>;
    private dismissFunction: (data: any) => void;
    private _defaultButtonOptions: IModalButtonOptions = defaultButtonOptions;

    constructor(
        private config: IModalConfig, // specify interface
        private $translate: angular.translate.ITranslateService,
        private modalInstance: uib.IModalInstanceService
    ) {
        if (!this.modalInstance) {
            throw new Error('no.modalInstance.injected');
        }
        if (typeof this.config.title === 'string') {
            this.title = config.title;
        }

        if (typeof this.config.titleSuffix === 'string') {
            this.titleSuffix = config.titleSuffix;
        }

        if (this.config.buttons) {
            this.buttons = [
                ...this.buttons,
                ...this.config.buttons.map((options: IModalButtonOptions) =>
                    this.createButton(options)
                )
            ];
        }

        this.closeFunction = this.modalInstance.close;
        this.dismissFunction = this.modalInstance.dismiss;
    }

    /**
     * @returns Added button
     */
    public addButton(newButtonConf: IModalButtonOptions): IModalButtonOptions {
        const button: IModalButtonOptions = this.createButton(newButtonConf);

        this.buttons = [...this.buttons, button];

        return button;
    }

    /**
     * **Caution!**
     *
     * This is a reference to the buttons being used by the modal manager, not a clone. This should
     * only be used to read or update properties provided in the Button configuration.
     * See [addButton]{@link ModalManager#addButton} for more details.
     *
     * @returns An array of all the buttons on the modal window, empty array if there are no buttons.
     */
    public getButtons(): IModalButtonOptions[] {
        return this.buttons;
    }

    public removeAllButtons(): void {
        this.buttons = [];
    }

    public removeButton(buttonId: string): void {
        this.buttons = this.buttons.filter(
            (options: IModalButtonOptions) => options.id !== buttonId
        );
    }

    /**
     * Enables a button on the modal window, allowing it to be pressed.
     */
    public enableButton(buttonId: string): void {
        this.buttons = this.buttons.map((options: IModalButtonOptions) =>
            options.id === buttonId ? { ...options, disabled: false } : options
        );
    }

    /**
     * Disables the button on the modal window, preventing it from being pressed.
     */
    public disableButton(buttonId: string): void {
        this.buttons = this.buttons.map((options: IModalButtonOptions) =>
            options.id === buttonId ? { ...options, disabled: true } : options
        );
    }

    /**
     * @returns The first button found with a matching id, otherwise null.
     */
    public getButton(buttonId: string): IModalButtonOptions {
        return this.buttons.find((options: IModalButtonOptions) => options.id === buttonId);
    }

    /**
     * Whether to display the "X" dismiss button at the top right corner of the modal window,
     * when the modal header is displayed.
     */
    public setShowHeaderDismiss(showButton: boolean): void {
        if (typeof showButton === 'boolean') {
            this.showDismissX = showButton;
        } else {
            throw new Error('modalService.ModalManager.showDismissX.illegal.param');
        }
    }

    /**
     * Sets the function to be called when the X dismiss button at the top right corner of the modal window
     * is pressed. This function must either return null or a promise.
     *
     * If the promise is resolved, or if the function returns null or undefined, then the modal is closed and the returned
     * modal promise is rejected.
     *
     * If the callback promise is rejected, the modal is not closed, allowing you to provide some kind of validation
     * before closing.
     */
    public setDismissCallback(callback: () => Promise<any>): void {
        this.dismissCallback = callback;
    }

    /**
     * @param buttonHandlerFunction Callback function that is called when any button on the
     * modal, that has no [callback]{@link IModalButtonOptions#callback}, is pressed.
     * If a button has a [callback]{@link IModalButtonOptions#callback} function, then that function will be
     * that function will be called instead.
     *
     * This callback function receives a single parameter, which is the string ID of the button that was pressed.
     * Additionally, this function must either return null, undefined or a promise.
     *
     * If null/undefined is return, the modal will continue to process the Button Action.
     * In this case, no data will be returned to the modal promise if the modal is closed.
     *
     * If a promise is returned by this function, then the Button Action
     * may be cancelled/ignored by rejecting the promise. If the promise is resolved, the {@link ModalManager}
     * will continue to process the Button Action.
     *
     * If by resolving the promise returned by this callback function with data passed to the resolve, and the Button Action
     * is such that it results in the modal closing, then the modal promise is resolved or rejected with that same data. This allows you to pass data from this function
     * to the `modalService.open(...)` caller.
     *
     * See [for more details on the button callback]{@link IModalButtonOptions.callback}
     *
     *
     * A few scenarios for example:
     * #1 A button with a button callback is pressed.
     * <br/>Result: callback function is never called.
     *
     * #2 A button is pressed, callback function returns null
     * <br/>Result: The modal manager will execute any action on the button
     *
     * #3 A button is pressed, callback function returns a promise, that promise is rejected
     * <br/>Result: Modal Manager will ignore the button action and nothing else will happen
     *
     * #4 A button with a dismiss action is pressed, callback function returns a promise, and that promise is resolved with data "Hello"
     * <br/>Result: ModalManager will execute the dismiss action, closing the modal, and errorCallback of the modal promise, passing "Hello" as data
     *
     *
     * Code sample of validating some data before closing the modal
     *
     * ### Example
     *
     *      function validateSomething(): boolean {
     *          return true;
     *      };
     *
     *      function buttonHandlerFn (buttonId: string): Promise<any> {
     *         if (buttonId === 'submit') {
     *             const deferred = $q.defer();
     *             if (validateSomething()) {
     *               deferred.resolve("someResult");
     *              } else {
     *                  deferred.reject();  // cancel the submit button's close action
     *               }
     *              return deferred.promise;
     *           }
     *      };
     *
     *      $scope.modalManager.setButtonHandler(buttonHandlerFn);
     *
     */
    public setButtonHandler(buttonHandlerFunction: (id: string) => void | Promise<any>): void {
        this.buttonEventCallback = buttonHandlerFunction;
    }

    /**
     * The close function will close the modal window, passing the provided data (if any) to the successCallback
     * of the modal promise by resolving the promise.
     *
     * @param data Any data to be returned to the resolved modal promise when the modal is closed.
     */
    public close(dataToReturn: any): void {
        if (this.closeFunction) {
            this.closeFunction(dataToReturn);
        }
    }

    /**
     * The dismiss function will close the modal window, rejecting the modal promise with the provided data.
     */
    public dismiss(dataToReturn?: any): void {
        if (this.dismissFunction) {
            this.dismissFunction(dataToReturn);
        }
    }

    public _showDismissButton(): boolean {
        return this.showDismissX;
    }

    public _buttonPressed(button: IModalButtonOptions): void {
        let callbackReturnedPromise: Promise<any> | void;

        if (button.callback) {
            callbackReturnedPromise = button.callback();
        } else if (this.buttonEventCallback) {
            callbackReturnedPromise = this.buttonEventCallback(button.id);
        }

        if (button.action !== ModalButtonActions.None) {
            const exitFn = button.action === ModalButtonActions.Close ? this.close : this.dismiss;

            if (callbackReturnedPromise) {
                callbackReturnedPromise.then((data: any) => exitFn.call(this, data)).catch(lo.noop);
            } else {
                exitFn.call(this);
            }
        }

        if (callbackReturnedPromise) {
            callbackReturnedPromise.then(lo.noop).catch(lo.noop);
        }
    }

    public _handleDismissButton(): void {
        if (this.dismissCallback) {
            this.dismissCallback()
                .then((result: any) => this.dismiss(result))
                .catch(lo.noop);
        } else {
            this.dismiss();
        }
    }

    public _hasButtons(): boolean {
        return this.buttons.length > 0;
    }

    private createButton(buttonConfig: IModalButtonOptions): IModalButtonOptions {
        const config: IModalButtonOptions = {
            ...this._defaultButtonOptions,
            ...buttonConfig
        };

        this.$translate(buttonConfig.label || this._defaultButtonOptions.label).then(
            (label: string) => {
                config.label = label;
            }
        );

        const styleValidated: boolean = Object.keys(ModalButtonStyles).some(
            (key: any) => ModalButtonStyles[key] === config.style
        );
        const actionValidated: boolean = Object.keys(ModalButtonActions).some(
            (key: any) => ModalButtonActions[key] === config.action
        );

        if (!styleValidated) {
            throw new Error('modalService.ModalManager._createButton.illegal.button.style');
        }

        if (!actionValidated) {
            throw new Error('modalService.ModalManager._createButton.illegal.button.action');
        }

        return config;
    }
}
