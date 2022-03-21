/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import {
    InboxController,
    LanguagesController,
    MediaController,
    MiscellaneousController,
    PagesAndNavigationsController,
    PagesController,
    PermissionsController,
    ProductsController,
    RestrictionsController,
    SynchronizationController,
    TypesController,
    UsersController,
    UserGroupsController,
    VersionsController,
    WorkflowsController
} from './controllers';
import { DynamicFixtureModule } from './dynamic-fixture/dynamic-fixture.module';

import {
    MediaService,
    SynchronizationService,
    VersionsService,
    WorkflowsService
} from './services';

@Module({
    imports: [DynamicFixtureModule.forRoot({ baseURL: '$$$' })],
    controllers: [
        AppController,
        PagesAndNavigationsController,
        TypesController,
        LanguagesController,
        PagesController,
        MiscellaneousController,
        RestrictionsController,
        MediaController,
        VersionsController,
        UserGroupsController,
        UsersController,
        ProductsController,
        InboxController,
        PermissionsController,
        WorkflowsController,
        SynchronizationController
    ],
    providers: [WorkflowsService, MediaService, VersionsService, SynchronizationService]
})
export class AppModule {}
