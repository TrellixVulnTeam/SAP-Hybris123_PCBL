/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { ItemComponentData, ITEM_COMPONENT_DATA_TOKEN, SelectComponent } from 'smarteditcommons';
import { Media } from '../../../services';

/** Represents Media Selector Dropdown option.  */
@Component({
    selector: 'se-media-printer',
    templateUrl: './MediaPrinterComponent.html',
    styleUrls: ['./MediaPrinterComponent.scss', '../../../mediaPreviewContainer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaPrinterComponent {
    public media: Media;
    public isSelected: boolean;
    public select: SelectComponent<Media>;

    constructor(@Inject(ITEM_COMPONENT_DATA_TOKEN) public data: ItemComponentData<Media>) {
        ({ item: this.media, selected: this.isSelected, select: this.select } = data);
    }

    public isDisabled(): boolean {
        return this.select.isReadOnly;
    }
}
