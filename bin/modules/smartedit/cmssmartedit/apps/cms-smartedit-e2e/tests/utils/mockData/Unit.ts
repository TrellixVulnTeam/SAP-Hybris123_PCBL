/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { PageDisplayCondition } from './PageDisplayConditionMockData';
import { pageType } from './PageTypeMockData';
import { UriContextMockData } from './UriContextMockData';

export namespace Unit {
    export class MockData {
        static pageType = pageType;
        static PageDisplayCondition = PageDisplayCondition;
        static UriContext = UriContextMockData;
    }
}
