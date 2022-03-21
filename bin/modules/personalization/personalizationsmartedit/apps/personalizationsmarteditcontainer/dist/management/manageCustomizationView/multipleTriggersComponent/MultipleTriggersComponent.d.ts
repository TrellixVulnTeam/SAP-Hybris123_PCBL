import { ITriggerTab } from "./ITriggerTab";
import { TriggerTabService } from "./TriggerTabService";
export declare class MultipleTriggersComponent {
    private triggerTabService;
    tabsList: ITriggerTab[];
    constructor(triggerTabService: TriggerTabService);
    $onInit(): void;
}
