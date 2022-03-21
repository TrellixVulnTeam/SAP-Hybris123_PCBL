import { ModalButtonActions } from './ModalButtonActions';
import { ModalButtonStyles } from './ModalButtonStyles';
export interface IModalButtonOptions {
    id: string;
    /**
     * Translation key.
     */
    label: string;
    /**
     * Used to define what action button should perform after click.
     */
    action?: ModalButtonActions;
    /**
     * Used to style the button.
     */
    style?: ModalButtonStyles;
    disabled?: boolean;
    /**
     * Triggered when button is pressed.
     */
    callback?: () => void | Promise<any>;
}
