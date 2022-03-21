export declare class RestrictionsController {
    getTypeRestrictions(pageId: string, slotId: string): import("../../fixtures/entities/contentSlots").IContentSlot | {
        contentSlotName: string;
        validComponentTypes: never[];
    } | {
        contentSlotName?: undefined;
        validComponentTypes?: undefined;
    };
    getTypeRestrictionsBySlotIds(pageId: string, payload: any): import("../../fixtures/entities/contentSlots").IContentSlot[];
    getPageTypeRestrictionTypes(): {
        pageTypeRestrictionTypeList: import("../../fixtures/entities/restrictions").IPageTypeRestrictionType[];
    };
    getRestrictionTypes(): {
        restrictionTypes: import("../../fixtures/entities/restrictions").IRestrictionType[];
    };
    getPageRestrictions(): {
        pageRestrictionList: import("../../fixtures/entities/restrictions").IPageRestriction[];
    };
}
