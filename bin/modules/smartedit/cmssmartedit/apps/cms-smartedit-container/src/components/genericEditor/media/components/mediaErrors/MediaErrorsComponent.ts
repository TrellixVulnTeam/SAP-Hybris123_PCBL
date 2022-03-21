/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, Input } from '@angular/core';
import { SeDowngradeComponent, ValidationError } from 'smarteditcommons';

@SeDowngradeComponent()
@Component({
    selector: 'se-media-errors',
    templateUrl: './MediaErrorsComponent.html'
})
export class MediaErrorsComponent {
    @Input() errors: ValidationError[];
}
