/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { LegacySmarteditServicesModule } from 'smartedit/services';
import { SeModule } from 'smarteditcommons';
import './features/contextualMenu.scss';

@SeModule({
    imports: [LegacySmarteditServicesModule]
})
export class SystemModule {}
