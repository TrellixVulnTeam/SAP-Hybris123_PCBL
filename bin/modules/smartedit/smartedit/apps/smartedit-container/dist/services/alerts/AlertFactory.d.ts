import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig, AlertService as FundamentalAlertService } from '@fundamental-ngx/core';
import { TranslateService } from '@ngx-translate/core';
import { Alert, BaseAlertFactory, IAlertConfig, IAlertConfigLegacy, LogService } from 'smarteditcommons';
export declare class AlertFactory extends BaseAlertFactory {
    private logService;
    private domSanitizer;
    constructor(logService: LogService, domSanitizer: DomSanitizer, fundamentalAlertService: FundamentalAlertService, translateService: TranslateService, ALERT_CONFIG_DEFAULTS: AlertConfig);
    createAlert(alertConf: string | IAlertConfigLegacy | IAlertConfig): Alert;
    createInfo(alertConf: string | IAlertConfigLegacy | IAlertConfig): Alert;
    createDanger(alertConf: string | IAlertConfigLegacy | IAlertConfig): Alert;
    createWarning(alertConf: string | IAlertConfigLegacy | IAlertConfig): Alert;
    createSuccess(alertConf: string | IAlertConfigLegacy | IAlertConfig): Alert;
    /**
     * Accepts message string or config object
     * Will convert a str param to { message: str }
     */
    getAlertConfigFromStringOrConfig(strOrConf: string | IAlertConfigLegacy | IAlertConfig): IAlertConfigLegacy | IAlertConfig;
    private isFundamentalAlertConfig;
    private validateAndGetAlertConfigFromLegacyConfig;
    private getAlertConfigFromLegacyConfig;
    private validateLegacyAlertConfig;
    private sanitizeTemplates;
    /**
     * @deprecated
     * Deprecated since 1905
     */
    private fixLegacyAlert;
}
