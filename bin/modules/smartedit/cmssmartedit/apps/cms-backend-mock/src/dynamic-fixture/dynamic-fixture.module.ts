/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { DynamicModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DYNAMIC_FIXTURE_CONFIG } from './constants';
import { FixtureAdjustmentInterceptor } from './interceptors/fixture-adjustment.interceptor';
import { DynamicFixtureOptions } from './interfaces';
import { ConfigService } from './services/config.service';
import { StorageService } from './services/storage.service';
import { StorageController } from './storage.controller';

@Module({})
export class DynamicFixtureModule {
    static forRoot(config: DynamicFixtureOptions): DynamicModule {
        return {
            module: DynamicFixtureModule,
            providers: [
                {
                    provide: DYNAMIC_FIXTURE_CONFIG,
                    useValue: config
                },
                ConfigService,
                StorageService,
                {
                    provide: APP_INTERCEPTOR,
                    useClass: FixtureAdjustmentInterceptor
                }
            ],
            controllers: [StorageController]
        };
    }
}
