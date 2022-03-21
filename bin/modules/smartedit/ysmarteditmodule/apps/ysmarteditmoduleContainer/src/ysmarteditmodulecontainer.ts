/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { SeEntryModule } from 'smarteditcommons';
import { DummyInterceptor } from './DummyInterceptor';

@SeEntryModule('ysmarteditmoduleContainer')
@NgModule({
    imports: [BrowserModule, UpgradeModule],
    declarations: [],
    entryComponents: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DummyInterceptor,
            multi: true
        }
    ]
})
export class YSmarteditModuleContainerModule {}
