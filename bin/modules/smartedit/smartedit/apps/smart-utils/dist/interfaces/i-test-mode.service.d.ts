/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
export declare const TESTMODESERVICE: string;
/**
 * @ngdoc service
 * @name @smartutils.services:TestModeService
 *
 * @description
 * Used to determine whether smartedit is running in a e2e (test) mode
 */
/** @internal */
export interface ITestModeService {
    /**
     * @ngdoc method
     * @name @smartutils.services:TestModeService#isE2EMode
     * @methodOf @smartutils.services:TestModeService
     *
     * @description
     * returns true if smartedit is running in e2e (test) mode
     *
     * @returns {Boolean} true/false
     */
    isE2EMode(): boolean;
}
