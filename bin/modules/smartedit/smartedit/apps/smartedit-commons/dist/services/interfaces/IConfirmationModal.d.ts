import { TypedMap } from '@smart/utils';
export declare type ConfirmationModalScope = TypedMap<any>;
/**
 * Describes configuration of Confirmation Modal (Angular).
 */
export interface ConfirmationModalConfig {
    /**
     * Message string to be displayed in the confirmation modal
     */
    description?: string;
    /**
     * Object containing translations for description
     */
    descriptionPlaceholders?: TypedMap<string>;
    /**
     * Confirmation modal title
     */
    title?: string;
    /**
     * Flags whether only confirm button should be displayed
     */
    showOkButtonOnly?: boolean;
}
/**
 * Describes configuration of Confirmation Modal (AngularJS).
 */
export interface LegacyConfirmationModalConfig extends ConfirmationModalConfig {
    /**
     * Object with properties to be passed to AngularJS modal controller scope
     */
    scope?: ConfirmationModalScope;
    /**
     * Inline template to be rendered within the modal
     */
    template?: string;
    /**
     * Template url to be included within the modal
     */
    templateUrl?: string;
}
