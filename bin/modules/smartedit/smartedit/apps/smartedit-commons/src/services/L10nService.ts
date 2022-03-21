/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SeDowngradeService } from 'smarteditcommons/di';
import { SWITCH_LANGUAGE_EVENT } from '../utils';
import { CrossFrameEventService } from './crossFrame/CrossFrameEventService';
import { LanguageService } from './language/LanguageService';

/**
 * Service which exposes a subscription of the current language.
 */
@SeDowngradeService()
@Injectable({
    providedIn: 'root'
})
export class L10nService implements OnDestroy {
    public languageSwitch$: Observable<string>;
    private languageSwitchSubject = new BehaviorSubject<string>(null);

    private unRegSwitchLanguageEvent: () => void;

    constructor(
        private languageService: LanguageService,
        crossFrameEventService: CrossFrameEventService
    ) {
        this.languageSwitch$ = this.languageSwitchSubject.asObservable();

        this.unRegSwitchLanguageEvent = crossFrameEventService.subscribe(
            SWITCH_LANGUAGE_EVENT,
            () => this.resolveLanguage()
        );
    }

    ngOnDestroy(): void {
        this.unRegSwitchLanguageEvent();
        this.languageSwitchSubject.unsubscribe();
    }

    public async resolveLanguage(): Promise<void> {
        const resolvedLanguage = await this.languageService.getResolveLocaleIsoCode();

        this.languageSwitchSubject.next(resolvedLanguage);
    }
}
