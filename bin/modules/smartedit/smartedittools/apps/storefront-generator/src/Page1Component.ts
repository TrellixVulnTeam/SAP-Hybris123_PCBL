/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component } from '@angular/core';
@Component({
    selector: 'page1',
    template: `
        <div
            class="slot smartEditComponent"
            id="staticDummySlot"
            data-smartedit-component-type="ContentSlot"
            data-smartedit-component-id="staticDummySlot"
            data-smartedit-catalog-version-uuid="apparel-ukContentCatalog/Staged"
            data-smartedit-component-uuid="staticDummySlot"
        >
            <div
                class="component smartEditComponent"
                id="staticDummyComponent"
                data-smartedit-component-type="componentType1"
                data-smartedit-component-id="staticDummyComponent"
                data-smartedit-component-uuid="staticDummyComponent"
                data-smartedit-catalog-version-uuid="apparel-ukContentCatalog/Staged"
            >
                <div class="box"><p>new component 1</p></div>
            </div>
        </div>
    `
})
export class Page1Component {}
