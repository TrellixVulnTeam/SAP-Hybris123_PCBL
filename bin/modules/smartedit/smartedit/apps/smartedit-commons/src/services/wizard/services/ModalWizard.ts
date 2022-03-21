/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IModalService } from '@smart/utils';

import { SeDowngradeService } from '../../../di/SeDowngradeService';
import { ModalWizardTemplateComponent } from '../components/ModalWizardTemplateComponent';
import { WizardAction } from './WizardActions';

import '../components/modalWizardNavBar.scss';

/**
 * Used to create wizards that are embedded into the {@link ModalService}.
 */
@SeDowngradeService()
export class ModalWizard {
    constructor(private modalService: IModalService) {}

    /**
     * Open provides a simple way to create modal wizards, with much of the boilerplate taken care of for you
     * such as look, feel and wizard navigation.
     *
     * @returns Promise that will either be resolved (wizard finished) or
     * rejected (wizard cancelled).
     */
    open(config: WizardAction): Promise<any> {
        this.validateConfig(config);

        return new Promise((resolve, reject) => {
            const ref = this.modalService.open<WizardAction>({
                component: ModalWizardTemplateComponent,
                templateConfig: { isDismissButtonVisible: true },
                data: config,
                config: {
                    focusTrapped: false,
                    backdropClickCloseable: false
                }
            });

            ref.afterClosed.subscribe(resolve, reject);
        });
    }

    private validateConfig(config: WizardAction): void {
        if (!config.controller && !config.component) {
            throw new Error(
                'WizardService - initialization exception. No controller nor component provided'
            );
        }

        if (config.controller && config.component) {
            throw new Error(
                'WizardService - initialization exception. Provide either controller or component'
            );
        }
    }
}
