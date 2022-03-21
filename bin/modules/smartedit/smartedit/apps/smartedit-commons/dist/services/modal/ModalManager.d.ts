/// <reference types="angular-translate" />
import * as angular from 'angular';
import * as uib from 'angular-ui-bootstrap';
import { IModalButtonOptions } from './IModalButtonOptions';
import { IModalConfig } from './IModalConfig';
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
export declare class ModalManager {
    private config;
    private $translate;
    private modalInstance;
    title: string;
    titleSuffix: string;
    private buttonEventCallback;
    private showDismissX;
    private buttons;
    private closeFunction;
    private dismissCallback;
    private dismissFunction;
    private _defaultButtonOptions;
    constructor(config: IModalConfig, // specify interface
    $translate: angular.translate.ITranslateService, modalInstance: uib.IModalInstanceService);
    /**
     * @returns Added button
     */
    addButton(newButtonConf: IModalButtonOptions): IModalButtonOptions;
    /**
     * **Caution!**
     *
     * This is a reference to the buttons being used by the modal manager, not a clone. This should
     * only be used to read or update properties provided in the Button configuration.
     * See [addButton]{@link ModalManager#addButton} for more details.
     *
     * @returns An array of all the buttons on the modal window, empty array if there are no buttons.
     */
    getButtons(): IModalButtonOptions[];
    removeAllButtons(): void;
    removeButton(buttonId: string): void;
    /**
     * Enables a button on the modal window, allowing it to be pressed.
     */
    enableButton(buttonId: string): void;
    /**
     * Disables the button on the modal window, preventing it from being pressed.
     */
    disableButton(buttonId: string): void;
    /**
     * @returns The first button found with a matching id, otherwise null.
     */
    getButton(buttonId: string): IModalButtonOptions;
    /**
     * Whether to display the "X" dismiss button at the top right corner of the modal window,
     * when the modal header is displayed.
     */
    setShowHeaderDismiss(showButton: boolean): void;
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
    setDismissCallback(callback: () => Promise<any>): void;
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
    setButtonHandler(buttonHandlerFunction: (id: string) => void | Promise<any>): void;
    /**
     * The close function will close the modal window, passing the provided data (if any) to the successCallback
     * of the modal promise by resolving the promise.
     *
     * @param data Any data to be returned to the resolved modal promise when the modal is closed.
     */
    close(dataToReturn: any): void;
    /**
     * The dismiss function will close the modal window, rejecting the modal promise with the provided data.
     */
    dismiss(dataToReturn?: any): void;
    _showDismissButton(): boolean;
    _buttonPressed(button: IModalButtonOptions): void;
    _handleDismissButton(): void;
    _hasButtons(): boolean;
    private createButton;
}
