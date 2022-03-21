import { SeValueProvider, TypedMap } from 'smarteditcommons';
export declare const PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES_PROVIDER: SeValueProvider;
export declare class ActionsDataFactory {
    private PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES;
    actions: any[];
    removedActions: any[];
    constructor(PERSONALIZATION_COMMERCE_CUSTOMIZATION_ACTION_STATUSES: TypedMap<string>);
    getActions: () => any[];
    getRemovedActions: () => any[];
    resetActions: () => void;
    resetRemovedActions: () => void;
    addAction: (action: any, comparer: any) => void;
    isItemInSelectedActions: (action: any, comparer: any) => any;
}
