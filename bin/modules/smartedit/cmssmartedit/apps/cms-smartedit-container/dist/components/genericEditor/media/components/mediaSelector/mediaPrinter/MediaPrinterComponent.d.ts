import { ItemComponentData, SelectComponent } from 'smarteditcommons';
import { Media } from '../../../services';
export declare class MediaPrinterComponent {
    data: ItemComponentData<Media>;
    media: Media;
    isSelected: boolean;
    select: SelectComponent<Media>;
    constructor(data: ItemComponentData<Media>);
    isDisabled(): boolean;
}
