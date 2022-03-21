/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { LegacySmarteditCommonsModule, SeModule } from 'smarteditcommons';
import { LegacySmarteditServicesModule } from 'smarteditcontainer/services/LegacySmarteditServicesModule';
import { LegacyClientPagedListComponent } from './LegacyClientPagedListComponent';

/**
 * **Deprecated sine 2005, use {@link smarteditcommons/modules/ClientPagedListModule.html}.**
 *
 * @deprecated
 */
@SeModule({
    imports: [
        'pascalprecht.translate',
        'ui.bootstrap',
        LegacySmarteditCommonsModule,
        LegacySmarteditServicesModule
    ],
    declarations: [LegacyClientPagedListComponent]
})
export class ClientPagedListModule {}
