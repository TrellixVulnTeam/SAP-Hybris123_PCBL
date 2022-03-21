/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
// import { SeFilter } from '../../../common/di/SeFilter';
import { FilterByFieldPipe, SeFilter, TypedMap } from 'smarteditcommons';

/**
 * **Deprecated since 2005, use {@link FilterByFieldPipe}**.
 *
 * @deprecated
 */
@SeFilter()
export class FilterByFieldFilter {
    public static transform() {
        return (
            items: TypedMap<string>[],
            query: string,
            keys?: string[],
            callbackFcn?: (filtered: TypedMap<string>[]) => void
        ): TypedMap<string>[] => FilterByFieldPipe.transform(items, query, keys, callbackFcn);
    }
}
