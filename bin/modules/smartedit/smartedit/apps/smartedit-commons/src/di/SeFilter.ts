/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { diNameUtils } from './DINameUtils';
import { SeFilterConstructor } from './types';

/**
 * **Deprecated since 2005.**
 *
 * Decorator used to compose alter original filter constuctor that will later be added to angularJS module filters.
 * @deprecated
 */
export const SeFilter = function () {
    return function (filterConstructor: SeFilterConstructor): SeFilterConstructor {
        filterConstructor.filterName = diNameUtils.buildFilterName(filterConstructor);

        return filterConstructor;
    };
};
