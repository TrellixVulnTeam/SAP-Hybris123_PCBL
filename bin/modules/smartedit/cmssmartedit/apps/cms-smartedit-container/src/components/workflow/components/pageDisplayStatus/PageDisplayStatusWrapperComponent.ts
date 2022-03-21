/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SeDowngradeComponent } from 'smarteditcommons';

@SeDowngradeComponent()
@Component({
    selector: 'se-page-display-status-wrapper',
    template: `
        <div class="se-page-status-toolbar-container">
            <se-page-display-status></se-page-display-status>
        </div>
    `,
    styles: [
        `
            .se-page-status-toolbar-container {
                padding-left: 5px;
                padding-right: 20px;
                height: 100%;
                display: flex;
                align-items: center;
                border-left: 1px solid fd-color('neutral', 3);
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageDisplayStatusWrapperComponent {}
