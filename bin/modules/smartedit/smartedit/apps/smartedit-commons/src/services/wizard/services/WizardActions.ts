/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Type } from '@angular/core';
import { TypedMap } from '@smart/utils';

import { SeDowngradeService } from '../../../di/SeDowngradeService';
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

const DEFAULT_WIZARD_ACTION: WizardAction = {
    id: 'wizard_action_id',
    i18n: 'wizard_action_label',
    isMainAction: true,
    enableIfCondition() {
        return true;
    },
    executeIfCondition() {
        return true;
    },
    execute(wizardService: WizardService) {
        return;
    }
};

/* @internal */
@SeDowngradeService()
export class WizardActions {
    customAction(configuration: WizardAction): WizardAction {
        return this.createNewAction(configuration);
    }

    done(configuration?: WizardAction): WizardAction {
        const custom = {
            id: 'ACTION_DONE',
            i18n: 'se.action.done',
            execute: (wizardService: WizardService): void => {
                wizardService.close();
            }
        };

        return this.createNewAction(configuration, custom);
    }

    next(configuration?: WizardAction): WizardAction {
        const custom = {
            id: 'ACTION_NEXT',
            i18n: 'se.action.next',
            execute(wizardService: WizardService): void {
                wizardService.goToStepWithIndex(wizardService.getCurrentStepIndex() + 1);
            }
        };

        return this.createNewAction(configuration, custom);
    }

    navBarAction(configuration: WizardAction): WizardAction {
        if (!configuration.wizardService || configuration.destinationIndex === null) {
            throw new Error(
                'Error initializating navBarAction, must provide the wizardService and destinationIndex fields'
            );
        }

        const custom = {
            id: 'ACTION_GOTO',
            i18n: 'action.goto',
            enableIfCondition: (): boolean =>
                configuration.wizardService.getCurrentStepIndex() >= configuration.destinationIndex,
            execute: (wizardService: WizardService): void => {
                wizardService.goToStepWithIndex(configuration.destinationIndex);
            }
        };

        return this.createNewAction(configuration, custom);
    }

    back(configuration: WizardAction): WizardAction {
        const custom = {
            id: 'ACTION_BACK',
            i18n: 'se.action.back',
            isMainAction: false,
            execute(wizardService: WizardService): void {
                const currentIndex = wizardService.getCurrentStepIndex();
                if (currentIndex <= 0) {
                    throw new Error('Failure to execute BACK action, no previous index exists!');
                }
                wizardService.goToStepWithIndex(currentIndex - 1);
            }
        };

        return this.createNewAction(configuration, custom);
    }

    cancel(): WizardAction {
        return this.createNewAction({
            id: 'ACTION_CANCEL',
            i18n: 'se.action.cancel',
            isMainAction: false,
            execute(wizardService: WizardService) {
                wizardService.cancel();
            }
        });
    }

    private createNewAction(
        configuration: WizardAction = null,
        customConfiguration: WizardAction = null
    ): WizardAction {
        return { ...DEFAULT_WIZARD_ACTION, ...customConfiguration, ...configuration };
    }
}
