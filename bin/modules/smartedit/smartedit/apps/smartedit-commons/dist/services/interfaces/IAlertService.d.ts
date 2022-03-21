import { InjectionToken } from '@angular/core';
import { IAlertConfig } from '@smart/utils';
import { IAlertServiceType, IBaseAlertService } from 'smarteditcommons/services';
import { CompileHtmlNgController } from '../../directives';
/**
 * When you provide AlertService from '@fundamental-ngx/core' as a dependency
 * it doesn't work, seems to be constructor class name collision.
 * Provide this token in a Module and use it in constructor as follows
 * @Inject(ALERT_SERVICE_TOKEN) fundamentalAlertService: FundamentalAlertService
 */
export declare const ALERT_SERVICE_TOKEN: InjectionToken<string>;
export interface IAlertConfigLegacy {
    message?: string;
    type?: IAlertServiceType;
    messagePlaceholders?: {
        [key: string]: any;
    };
    template?: string;
    templateUrl?: string;
    closeable?: boolean;
    timeout?: number;
    successful?: boolean;
    id?: string;
    controller?: CompileHtmlNgController['value'];
}
export declare abstract class IAlertService implements IBaseAlertService {
    showAlert(alertConf: string | IAlertConfigLegacy | IAlertConfig): void;
    showInfo(alertConf: string | IAlertConfigLegacy | IAlertConfig): void;
    showDanger(alertConf: string | IAlertConfigLegacy | IAlertConfig): void;
    showWarning(alertConf: string | IAlertConfigLegacy | IAlertConfig): void;
    showSuccess(alertConf: string | IAlertConfigLegacy | IAlertConfig): void;
}
