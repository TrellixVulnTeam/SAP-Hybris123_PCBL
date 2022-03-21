/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { coreAnnotationsHelper } from 'testhelpers';

beforeEach(() => {
    jasmine.clock().uninstall();
    coreAnnotationsHelper.init();
});
afterEach(() => {
    jasmine.clock().uninstall();
});
