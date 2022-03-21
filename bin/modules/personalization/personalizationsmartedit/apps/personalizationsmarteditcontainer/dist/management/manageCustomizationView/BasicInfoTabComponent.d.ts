export declare class BasicInfoTabComponent {
    PERSONALIZATION_MODEL_STATUS_CODES: any;
    DATE_CONSTANTS: any;
    datetimeConfigurationEnabled: boolean;
    private _customization;
    constructor(PERSONALIZATION_MODEL_STATUS_CODES: any, DATE_CONSTANTS: any);
    get customization(): any;
    set customization(value: any);
    resetDateTimeConfiguration(): void;
    customizationStatusChange(): void;
}
