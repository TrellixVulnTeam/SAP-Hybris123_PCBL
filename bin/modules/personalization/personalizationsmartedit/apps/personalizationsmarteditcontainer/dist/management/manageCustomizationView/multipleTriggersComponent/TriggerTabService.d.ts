import { ITriggerTab } from "./ITriggerTab";
import { TriggerDataState } from "./TriggerDataState";
export declare class TriggerTabService {
    private tabsList;
    private triggerDataState;
    constructor();
    getTriggersTabs(): ITriggerTab[];
    addTriggerTab(trigger: ITriggerTab): void;
    removeTriggerTab(trigger: ITriggerTab): void;
    getTriggerDataState(): TriggerDataState;
}
