import { BaseAlertService, IAlertConfig, IAlertConfigLegacy, IAlertService } from 'smarteditcommons';
import { AlertFactory } from './AlertFactory';
export declare class AlertService extends BaseAlertService implements IAlertService {
    private _alertFactory;
    constructor(_alertFactory: AlertFactory);
    showAlert(alertConf: string | IAlertConfigLegacy | IAlertConfig): void;
    showInfo(alertConf: string | IAlertConfigLegacy | IAlertConfig): void;
    showDanger(alertConf: string | IAlertConfigLegacy | IAlertConfig): void;
    showWarning(alertConf: string | IAlertConfigLegacy | IAlertConfig): void;
    showSuccess(alertConf: string | IAlertConfigLegacy | IAlertConfig): void;
}
