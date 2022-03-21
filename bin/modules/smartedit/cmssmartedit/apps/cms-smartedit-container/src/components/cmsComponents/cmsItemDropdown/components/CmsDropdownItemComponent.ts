/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CMSLinkItem } from 'cmssmarteditcontainer/components/legacyGenericEditor/singleActiveCatalogAwareSelector/types';
import { SeDowngradeComponent, SystemEventService } from 'smarteditcommons';

// TODO move it higher when cmsItemDropdown.js is migrated
const ON_EDIT_NESTED_COMPONENT_EVENT = 'ON_EDIT_NESTED_COMPONENT';

@SeDowngradeComponent()
@Component({
    selector: 'se-cms-dropdown-item',
    templateUrl: './CmsDropdownItemComponent.html',
    styleUrls: ['./CmsDropdownItemComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // Workaround before parent component gets migrated
    encapsulation: ViewEncapsulation.None
})
export class CmsDropdownItemComponent {
    @Input() item: CMSLinkItem;
    @Input() isSelected: boolean;
    @Input() qualifier: string;

    constructor(private systemEventService: SystemEventService) {}

    public onClick(event: Event): void {
        event.stopPropagation();

        if (this.isSelected) {
            this.systemEventService.publishAsync(ON_EDIT_NESTED_COMPONENT_EVENT, {
                qualifier: this.qualifier,
                item: this.item
            });
        }
    }
}
