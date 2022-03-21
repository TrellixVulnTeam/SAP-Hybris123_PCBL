/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SeDowngradeComponent } from 'smarteditcommons';

@SeDowngradeComponent()
@Component({
    selector: 'se-media-advanced-properties',
    templateUrl: './MediaAdvancedPropertiesComponent.html',
    styleUrls: ['./MediaAdvancedPropertiesComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaAdvancedPropertiesComponent {
    @Input() code: string;
    @Input() description: string;
    @Input() altText: string;

    public i18nKeys = {
        DESCRIPTION: 'se.media.advanced.information.description',
        CODE: 'se.media.advanced.information.code',
        ALT_TEXT: 'se.media.advanced.information.alt.text',
        ADVANCED_INFORMATION: 'se.media.advanced.information',
        INFORMATION: 'se.media.information'
    };
}
