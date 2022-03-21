import { BrowserService } from '@smart/utils';
import { TestModeService } from './TestModeService';
export declare class PolyfillService {
    private browserService;
    private testModeService;
    constructor(browserService: BrowserService, testModeService: TestModeService);
    isEligibleForEconomyMode(): boolean;
    isEligibleForExtendedView(): boolean;
    isEligibleForThrottledScrolling(): boolean;
}
