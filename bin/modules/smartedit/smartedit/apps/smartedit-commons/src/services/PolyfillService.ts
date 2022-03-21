/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { BrowserService } from '@smart/utils';

import { SeDowngradeService } from 'smarteditcommons/di';
import { TestModeService } from './TestModeService';

/* @internal */
@SeDowngradeService()
export class PolyfillService {
    constructor(private browserService: BrowserService, private testModeService: TestModeService) {}

    public isEligibleForEconomyMode(): boolean {
        return this.browserService.isIE() || this.testModeService.isE2EMode();
    }

    public isEligibleForExtendedView(): boolean {
        return (
            this.browserService.isIE() ||
            this.browserService.isFF() ||
            this.testModeService.isE2EMode()
        );
    }

    public isEligibleForThrottledScrolling(): boolean {
        return this.browserService.isIE();
    }
}
