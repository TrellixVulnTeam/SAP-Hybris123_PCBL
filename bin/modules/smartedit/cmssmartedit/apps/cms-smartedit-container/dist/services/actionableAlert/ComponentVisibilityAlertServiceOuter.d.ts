import { IComponentVisibilityAlertService, SlotComponent } from 'cmscommons';
import { IAlertService, ISharedDataService } from 'smarteditcommons';
import { ActionableAlertService } from './ActionableAlertService';
export declare class ComponentVisibilityAlertService extends IComponentVisibilityAlertService {
    private sharedDataService;
    private alertService;
    private actionableAlertService;
    constructor(sharedDataService: ISharedDataService, alertService: IAlertService, actionableAlertService: ActionableAlertService);
    checkAndAlertOnComponentVisibility(component: SlotComponent): Promise<void>;
}
