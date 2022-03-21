import { CompileHtmlNgController, IContextualMenuButton } from 'smarteditcommons';
import { SlotContextualMenuDecoratorComponent } from './SlotContextualMenuDecoratorComponent';
export declare class SlotContextualMenuItemComponent {
    parent: SlotContextualMenuDecoratorComponent;
    item: IContextualMenuButton;
    isHovered: boolean;
    legacyController: CompileHtmlNgController;
    constructor(parent: SlotContextualMenuDecoratorComponent);
    onMouseOver(): void;
    onMouseOut(): void;
    ngOnInit(): void;
    ngOnChanges(): void;
    private createLegacyController;
}
