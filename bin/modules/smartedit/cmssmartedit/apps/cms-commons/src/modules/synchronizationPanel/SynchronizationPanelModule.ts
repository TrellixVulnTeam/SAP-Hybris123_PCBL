/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule, ValueProvider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    diBridgeUtils,
    L10nPipeModule,
    MessageModule,
    moduleUtils,
    SpinnerModule,
    TooltipModule,
    TranslationModule
} from 'smarteditcommons';

import { SynchronizationPanelComponent, SynchronizationPanelItemComponent } from './components';
import {
    DEFAULT_SYNCHRONIZATION_EVENT,
    DEFAULT_SYNCHRONIZATION_POLLING,
    DEFAULT_SYNCHRONIZATION_STATUSES
} from './constants';

// TODO: Remove after all consumers (slotSyncButton, pageSyncMenuToolbarItem) has been migrated at least to TS. They should use imports instead.
const PROVIDE_DEFAULTS: ValueProvider[] = [
    {
        provide: 'SYNCHRONIZATION_STATUSES',
        useValue: DEFAULT_SYNCHRONIZATION_STATUSES
    },
    {
        provide: 'SYNCHRONIZATION_POLLING',
        useValue: DEFAULT_SYNCHRONIZATION_POLLING
    },
    {
        provide: 'SYNCHRONIZATION_EVENT',
        useValue: DEFAULT_SYNCHRONIZATION_EVENT
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslationModule.forChild(),
        TooltipModule,
        MessageModule,
        SpinnerModule,
        L10nPipeModule
    ],
    declarations: [SynchronizationPanelComponent, SynchronizationPanelItemComponent],
    entryComponents: [SynchronizationPanelComponent],
    providers: [
        ...PROVIDE_DEFAULTS,
        moduleUtils.initialize(() => {
            diBridgeUtils.downgradeService(
                'SYNCHRONIZATION_STATUSES',
                null,
                'SYNCHRONIZATION_STATUSES'
            );
            diBridgeUtils.downgradeService(
                'SYNCHRONIZATION_POLLING',
                null,
                'SYNCHRONIZATION_POLLING'
            );
            diBridgeUtils.downgradeService('SYNCHRONIZATION_EVENT', null, 'SYNCHRONIZATION_EVENT');
        })
    ],
    exports: [SynchronizationPanelComponent]
})
export class SynchronizationPanelModule {}
