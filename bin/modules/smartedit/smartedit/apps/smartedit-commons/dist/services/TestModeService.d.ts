import { InjectionToken } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
/**
 * Used to determine whether smartedit is running in a e2e (test) mode
 */
/** @internal */
export declare class TestModeService {
    private upgrade;
    static readonly TEST_TOKEN: InjectionToken<boolean>;
    private readonly TEST_KEY;
    constructor(upgrade: UpgradeModule);
    /**
     * Returns true if smartedit is running in e2e (test) mode, otherwise false.
     */
    isE2EMode(): boolean;
    private isE2EModeNg;
    private isE2EModeLegacy;
}
