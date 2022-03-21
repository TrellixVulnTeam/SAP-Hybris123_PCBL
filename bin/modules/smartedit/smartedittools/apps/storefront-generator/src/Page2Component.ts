/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component } from '@angular/core';
@Component({
    selector: 'page2',
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
                data-smartedit-component-type="componentType2"
                data-smartedit-component-id="staticDummyComponent"
                data-smartedit-component-uuid="staticDummyComponent"
                data-smartedit-catalog-version-uuid="apparel-ukContentCatalog/Staged"
            >
                <div class="box"><p>new component 2</p></div>
            </div>
        </div>
    `
})
export class Page2Component {}
