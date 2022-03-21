/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SeDowngradeComponent } from 'smarteditcommons';

@SeDowngradeComponent()
@Component({
    selector: 'se-media-remove-button',
    templateUrl: './MediaRemoveButtonComponent.html',
    styleUrls: ['./MediaRemoveButtonComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaRemoveButtonComponent {
    @Input() isDisabled: boolean;
    @Output() clickHandler = new EventEmitter<void>();
}
