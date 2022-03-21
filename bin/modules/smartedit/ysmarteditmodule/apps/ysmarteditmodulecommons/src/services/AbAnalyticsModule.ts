/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeModule } from 'smarteditcommons';
import { AbAnalyticsService } from './AbAnalyticsService';

@SeModule({
    providers: [AbAnalyticsService]
})
export class AbAnalyticsModule {}
