/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
import { Observable } from 'rxjs';
export declare enum FundamentalModalButtonStyle {
    Default = "light",
    Primary = "emphasized"
}
export declare enum FundamentalModalButtonAction {
    Close = "close",
    Dismiss = "dismiss",
    None = "none"
}
export interface IFundamentalModalButtonOptions {
    id: string;
    label: string;
    callback?: () => Observable<any>;
    action?: FundamentalModalButtonAction;
    style?: FundamentalModalButtonStyle;
    compact?: boolean;
    disabled?: boolean;
    disabledFn?: () => boolean;
}
/**
 * @ngdoc object
 * @name modalServiceModule.object:ModalButtonActions
 * @description
 * An enum type representing buttons available actions.
 */
export declare enum ModalButtonActions {
    /**
     * @ngdoc property
     * @name None
     * @propertyOf modalServiceModule.object:ModalButtonActions
     * @description none
     *
     */
    None = "none",
    /**
     * @ngdoc property
     * @name Close
     * @propertyOf modalServiceModule.object:ModalButtonActions
     * @description close
     *
     */
    Close = "close",
    /**
     * @ngdoc property
     * @name Dismiss
     * @propertyOf modalServiceModule.object:ModalButtonActions
     * @description dismiss
     *
     */
    Dismiss = "dismiss"
}
/**
 * @ngdoc object
 * @name modalServiceModule.object:ModalButtonStyles
 * @description
 * An enum type representing buttons available styles.
 */
export declare enum ModalButtonStyles {
    /**
     * @ngdoc property
     * @name Default
     * @propertyOf modalServiceModule.object:ModalButtonStyles
     * @description default
     */
    Default = "default",
    /**
     * @ngdoc property
     * @name Primary
     * @propertyOf modalServiceModule.object:ModalButtonStyles
     * @description primary
     */
    Primary = "primary"
}
/**
 * @ngdoc interface
 * @name modalServiceModule.interface:IModalButtonOptions
 *
 * @description
 * Interface for IModalButtonOptions
 */
export interface IModalButtonOptions {
    /**
     * @ngdoc property
     * @name id
     * @propertyOf modalServiceModule.interface:IModalButtonOptions
     * @description
     * id: String
     *
     * The key used to identify button
     */
    id: string;
    /**
     * @ngdoc property
     * @name label
     * @propertyOf modalServiceModule.interface:IModalButtonOptions
     * @description
     * label: String
     *
     * Translation key
     */
    label: string;
    /**
     * @ngdoc property
     * @name action
     * @propertyOf modalServiceModule.interface:IModalButtonOptions
     * @description
     * action: {@link modalServiceModule.object:ModalButtonActions ModalButtonActions}
     *
     * Used to define what action button should perform after click
     */
    action?: ModalButtonActions;
    /**
     * @ngdoc property
     * @name style
     * @propertyOf modalServiceModule.interface:IModalButtonOptions
     * @description
     * style: {@link modalServiceModule.object:ModalButtonStyles ModalButtonStyles}
     *
     * Property used to style the button
     */
    style?: ModalButtonStyles;
    /**
     * @ngdoc property
     * @name disabled
     * @propertyOf modalServiceModule.interface:IModalButtonOptions
     * @description
     * disabled: Boolean
     *
     * Decides whether button is disabled or not
     */
    disabled?: boolean;
    /**
     * @ngdoc method
     * @name callback
     * @propertyOf modalServiceModule.interface:IModalButtonOptions
     * @description
     * callback: () => void || Promise<any>
     *
     * Method triggered when button is pressed
     */
    callback?: () => void | Promise<any>;
}
