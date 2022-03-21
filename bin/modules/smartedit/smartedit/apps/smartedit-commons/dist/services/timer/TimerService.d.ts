import { NgZone } from '@angular/core';
import { Timer } from './Timer';
export declare class TimerService {
    private ngZone;
    constructor(ngZone: NgZone);
    createTimer(callback: () => void, duration: number): Timer;
}
