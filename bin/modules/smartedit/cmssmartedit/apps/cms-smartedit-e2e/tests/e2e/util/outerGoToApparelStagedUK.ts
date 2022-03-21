/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* forbiddenNameSpaces:false */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    moduleUtils,
    IExperienceService,
    SeEntryModule,
    SmarteditRoutingService
} from 'smarteditcommons';

@SeEntryModule('ngGoToApparelStagedUK')
@NgModule({
    imports: [CommonModule],
    providers: [
        moduleUtils.bootstrap(
            (
                smarteditRoutingService: SmarteditRoutingService,
                experienceService: IExperienceService
            ) => {
                experienceService
                    .buildAndSetExperience({
                        siteId: 'apparel-uk',
                        catalogId: 'apparel-ukContentCatalog',
                        catalogVersion: 'Staged'
                    })
                    .then(function () {
                        return smarteditRoutingService.go('/ng/storefront');
                    });
            },
            [SmarteditRoutingService, IExperienceService]
        )
    ]
})
export class NgGoToApparelStagedUKModule {}

(window as any).pushModules(NgGoToApparelStagedUKModule);
