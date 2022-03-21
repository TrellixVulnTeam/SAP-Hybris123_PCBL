/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { SeEntryModule } from 'smarteditcommons';

@SeEntryModule('ysmarteditmodule')
@NgModule({
    imports: [BrowserModule, UpgradeModule],
    declarations: [],
    entryComponents: [],
    providers: []
})
export class YSmarteditModuleModule {}
