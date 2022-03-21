import { IContextAwareEditableItemService } from 'cmscommons';
import { ISeComponent } from 'smarteditcommons';
export declare class SharedComponentButton implements ISeComponent {
    private contextAwareEditableItemService;
    smarteditComponentId: string;
    isReady: boolean;
    message: string;
    constructor(contextAwareEditableItemService: IContextAwareEditableItemService);
    $onInit(): void;
}
