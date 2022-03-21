/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeModule } from 'smarteditcommons';

import { LegacyCatalogDetailsComponent } from './components/LegacyCatalogDetailsComponent';
import { LegacyCatalogVersionDetailsComponent } from './components/LegacyCatalogVersionDetailsComponent';
import { LegacyHomePageLinkComponent } from './components/LegacyHomePageLinkComponent';

@SeModule({
    declarations: [
        LegacyCatalogDetailsComponent,
        LegacyHomePageLinkComponent,
        LegacyCatalogVersionDetailsComponent
    ]
})
export class LegacyCatalogDetailsModule {}
