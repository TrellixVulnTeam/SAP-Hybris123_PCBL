/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { DIBridgeModule, SeModule } from 'smarteditcommons/di';
import { SeConstantsModule } from './SeConstantsModule';

/**
 * Module acts as a root module of smartedit commons module.
 */
@SeModule({
    imports: [
        DIBridgeModule,
        'resourceLocationsModule',
        'functionsModule',
        'yLoDashModule',
        SeConstantsModule
    ]
})
/** @internal */
export class SmarteditRootModule {}
