import { AlertRef } from '@fundamental-ngx/core';
import { CompileHtmlNgController } from 'smarteditcommons';
interface ILegacyAlertConfigData {
    template?: string;
    templateUrl?: string;
    controller?: CompileHtmlNgController;
}
export declare class AlertTemplateComponent {
    data: ILegacyAlertConfigData;
    constructor(ref: AlertRef);
}
export {};
