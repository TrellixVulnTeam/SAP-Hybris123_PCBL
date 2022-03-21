import { IModalService } from 'smarteditcommons';
export declare class PersonalizationsmarteditCommerceCustomizationView {
    private modalService;
    private MODAL_BUTTON_ACTIONS;
    private MODAL_BUTTON_STYLES;
    constructor(modalService: IModalService, MODAL_BUTTON_ACTIONS: any, MODAL_BUTTON_STYLES: any);
    openCommerceCustomizationAction: (customization: any, variation: any) => void;
}
