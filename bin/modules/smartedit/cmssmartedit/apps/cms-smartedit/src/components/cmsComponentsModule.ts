/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import './componentsStyling.scss';
import { SeModule } from 'smarteditcommons';

import { CmsSmarteditServicesModule } from '../services';
import { SharedComponentButton } from './sharedComponent/sharedComponentButton';
import { SlotSynchronizationPanel } from './synchronize/slots/SlotSynchronizationPanel';

@SeModule({
    imports: [CmsSmarteditServicesModule],
    declarations: [SlotSynchronizationPanel, SharedComponentButton]
})
export class CmsComponentsModule {}
