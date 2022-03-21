/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeFilter } from '../../di/SeFilter';
import { StartFromPipe } from '../../pipes/startFrom';

/**
 * **Deprecated since 2005, use {@link StartFromPipe}.**
 *
 * @deprecated
 */
@SeFilter()
export class StartFromFilter {
    static transform<T>() {
        return (input: T[], start: number): T[] => StartFromPipe.transform(input, start);
    }
}
