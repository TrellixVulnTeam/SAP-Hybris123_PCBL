/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeModule } from '../../di';

import { ModalButtonActions } from './ModalButtonActions';
import { ModalButtonStyles } from './ModalButtonStyles';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NgUiBootstrapModule = require('angular-ui-bootstrap'); // Only supports CommonJS

/**
 * Module containing {@link ModalService}.
 */
@SeModule({
    imports: [NgUiBootstrapModule, 'translationServiceModule', 'functionsModule', 'coretemplates'],
    providers: [
        {
            /**
             * Injectable angular constant<br/>
             * Defines the action to be taken after executing a button on a modal window. To be used when adding a button to the modal,
             * either when opening a modal (see [getButtons]{@link ModalManager#getButtons}) or
             * when adding a button to an existing modal (see [open]{@link ModalService#open})
             *
             * ### Example
             *
             *      myModalManager.addButton({
             *          id: 'button id',
             *          label: 'close_modal',
             *          action: MODAL_BUTTON_ACTIONS.CLOSE
             *      });
             *
             */

            provide: 'MODAL_BUTTON_ACTIONS',
            useValue: {
                /**
                 * Indicates to the {@link ModalManager} that after executing the modal button
                 * no action should be performed.
                 */
                NONE: ModalButtonActions.None,

                /**
                 * Indicates to the {@link ModalManager} that after executing the modal button,
                 * the modal window should close, and the {@link https://docs.angularjs.org/api/ng/service/$q promise} returned by the modal should be resolved.
                 */
                CLOSE: ModalButtonActions.Close,

                /**
                 * Indicates to the {@link ModalManager} that after executing the modal button,
                 * the modal window should close, and the {@link https://docs.angularjs.org/api/ng/service/$q promise} returned by the modal should be rejected.
                 */
                DISMISS: ModalButtonActions.Dismiss
            }
        },
        {
            /**
             * Injectable angular constant<br/>
             * Defines the look and feel of a button on a modal window. To be used when adding a button to the modal,
             * either when opening a modal (see [getButtons]{@link ModalManager#getButtons})) or
             * when adding a button to an existing modal (see [open]{@link ModalService#open})
             *
             * ### Example
             *      myModalManager.addButton({
             *          id: 'button id',
             *          label: 'cancel_button',
             *          style: MODAL_BUTTON_STYLES.SECONDARY
             *      });
             *
             */
            provide: 'MODAL_BUTTON_STYLES',
            useValue: {
                /**
                 * Equivalent to SECONDARY
                 */
                DEFAULT: ModalButtonStyles.Default,
                /**
                 * Indicates to the modal window that this button is the primary button of the modal, such as save or submit,
                 * and should be styled accordingly.
                 */
                PRIMARY: ModalButtonStyles.Primary,
                /**
                 * Indicates to the modal window that this button is a secondary button of the modal, such as cancel,
                 * and should be styled accordingly.
                 */
                SECONDARY: ModalButtonStyles.Default
            }
        }
    ]
})
export class ModalServiceModule {}
