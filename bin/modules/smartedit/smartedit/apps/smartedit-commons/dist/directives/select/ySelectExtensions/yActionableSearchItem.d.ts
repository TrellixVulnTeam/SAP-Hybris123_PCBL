import { SystemEventService } from '../../../services';
import { YSelectComponent } from '../ySelect';
import './yActionableSearchItem.scss';
/**
 * The yActionableSearchItem Angular component is designed to work with the ySelect drop down. It allows you to add
 * a button in the resultsHeader area of the ySelect's drop-down, and trigger a user-defined action when pressed.
 *
 * ### Parameters
 *
 * `eventId='yActionableSearchItem_ACTION_CREATE'` - The event ID that is triggered on the
 * systemEventService when the button is pressed
 *
 * `actionText='se.yationablesearchitem.action.create'` - The i18n key label for the button
 *
 * @deprecated
 */
export declare class ActionableSearchItemComponent<T extends {
    id: string;
}> {
    private systemEventService;
    ySelect: YSelectComponent<T>;
    private uiSelect;
    private eventId;
    private actionText;
    private defaultEventId;
    private defaultActionText;
    constructor(systemEventService: SystemEventService);
    getActionText(): string;
    showForm(): boolean;
    getInputText(): string;
    buttonPressed(): void;
}
