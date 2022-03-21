/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { SeDowngradeComponent } from 'smarteditcommons';

/** Represents a tooltip, which when clicked will display a media image. */
@SeDowngradeComponent()
@Component({
    selector: 'se-media-preview',
    templateUrl: './MediaPreviewComponent.html',
    styleUrls: ['./MediaPreviewComponent.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.se-media-preview]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaPreviewComponent {
    @Input() imageUrl: string;
}
