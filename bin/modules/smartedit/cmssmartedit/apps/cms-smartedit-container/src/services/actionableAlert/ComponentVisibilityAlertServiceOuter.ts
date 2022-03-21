/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import {
    IComponentVisibilityAlertService,
    ComponentVisibilityAlertComponent,
    SlotComponent
} from 'cmscommons';
import {
    GatewayProxied,
    IAlertConfig,
    IAlertService,
    IAlertServiceType,
    IExperience,
    ISharedDataService,
    SeDowngradeService,
    EXPERIENCE_STORAGE_KEY
} from 'smarteditcommons';
import { ActionableAlertService } from './ActionableAlertService';

enum AlertMessage {
    HIDDEN = 'se.cms.component.visibility.alert.description.hidden',
    RESTRICTED = 'se.cms.component.visibility.alert.description.restricted'
}

@SeDowngradeService(IComponentVisibilityAlertService)
@GatewayProxied('checkAndAlertOnComponentVisibility')
export class ComponentVisibilityAlertService extends IComponentVisibilityAlertService {
    constructor(
        private sharedDataService: ISharedDataService,
        private alertService: IAlertService,
        private actionableAlertService: ActionableAlertService
    ) {
        super();
    }

    public async checkAndAlertOnComponentVisibility(component: SlotComponent): Promise<void> {
        const shouldShowAlert = !component.visible || component.restricted;
        if (!shouldShowAlert) {
            return;
        }

        const experience = (await this.sharedDataService.get(
            EXPERIENCE_STORAGE_KEY
        )) as IExperience;

        const message = !component.visible ? AlertMessage.HIDDEN : AlertMessage.RESTRICTED;

        const isExternal = component.catalogVersion !== experience.pageContext.catalogVersionUuid;
        if (isExternal) {
            this.alertService.showAlert({
                message
            });
        } else {
            const actionableAlertConf: IAlertConfig = {
                component: ComponentVisibilityAlertComponent,
                duration: 6000,
                data: {
                    component,
                    message
                }
            };
            this.actionableAlertService.displayActionableAlert(
                actionableAlertConf,
                IAlertServiceType.INFO
            );
        }
    }
}
