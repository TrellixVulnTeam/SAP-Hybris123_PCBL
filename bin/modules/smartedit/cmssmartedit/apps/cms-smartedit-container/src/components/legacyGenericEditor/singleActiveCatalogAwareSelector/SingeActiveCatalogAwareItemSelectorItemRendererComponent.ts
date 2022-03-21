/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, Inject } from '@angular/core';
import {
    SeDowngradeComponent,
    ITEM_COMPONENT_DATA_TOKEN,
    ItemComponentData
} from 'smarteditcommons';

@SeDowngradeComponent()
@Component({
    selector: 'se-single-active-catalog-aware-item-selector-item-renderer',
    template: `
        <span class="se-single-catalog-item">
            <span
                class="se-single-catalog-item__label"
                title="{{ data.item.label | seL10n | async }}"
                >{{ data.item.label | seL10n | async }}</span
            >
            <span title="{{ 'se.cms.catalogawareitem.itemtype.code' | translate }}">
                {{ data.item.code }}</span
            >
        </span>
    `
})
export class SingeActiveCatalogAwareItemSelectorItemRendererComponent {
    constructor(@Inject(ITEM_COMPONENT_DATA_TOKEN) public data: ItemComponentData<any>) {}
}
