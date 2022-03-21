/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Injectable, NgZone } from '@angular/core';
import { SeDowngradeService } from '../../di';
import { Timer } from './Timer';

@SeDowngradeService()
@Injectable()
export class TimerService {
    constructor(private ngZone: NgZone) {}

    createTimer(callback: () => void, duration: number): Timer {
        return new Timer(this.ngZone, callback, duration);
    }
}
