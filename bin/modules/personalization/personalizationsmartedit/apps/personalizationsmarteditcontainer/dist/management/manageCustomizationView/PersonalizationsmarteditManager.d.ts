import { IModalService, SeValueProvider } from 'smarteditcommons';
export declare const CUSTOMIZATION_VARIATION_MANAGEMENT_TABS_CONSTANTS_PROVIDER: SeValueProvider;
export declare const CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS_PROVIDER: SeValueProvider;
export declare const CUSTOMIZATION_VARIATION_MANAGEMENT_SEGMENTTRIGGER_GROUPBY_PROVIDER: SeValueProvider;
export declare const DATE_CONSTANTS_PROVIDER: SeValueProvider;
export declare class PersonalizationsmarteditManager {
    private modalService;
    private MODAL_BUTTON_STYLES;
    private CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS;
    constructor(modalService: IModalService, MODAL_BUTTON_STYLES: any, CUSTOMIZATION_VARIATION_MANAGEMENT_BUTTONS: any);
    openCreateCustomizationModal: () => void;
    openEditCustomizationModal: (customizationCode: string, variationCode: string) => void;
}
