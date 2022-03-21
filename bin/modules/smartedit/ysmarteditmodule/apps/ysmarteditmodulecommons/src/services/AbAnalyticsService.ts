/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IQService } from 'angular';
import { SeInjectable } from 'smarteditcommons';

@SeInjectable()
export class AbAnalyticsService {
    constructor(private $q: IQService) {}

    getABAnalyticsForComponent(): angular.IPromise<{ aValue: number; bValue: number }> {
        return this.$q.when({
            aValue: 30,
            bValue: 70
        });
    }
}
