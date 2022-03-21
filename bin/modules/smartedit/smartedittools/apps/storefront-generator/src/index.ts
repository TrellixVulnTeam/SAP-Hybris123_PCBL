/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import 'core-js/client/shim';
import 'zone.js/dist/zone';

import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RouterModule } from '@angular/router';
import { Page1Component } from './Page1Component';
import { Page2Component } from './Page2Component';
import { AppComponent } from './AppComponent';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(
            [
                { path: 'page1', pathMatch: 'full', component: Page1Component },
                { path: 'page2', pathMatch: 'full', component: Page2Component },
                { path: '', pathMatch: 'full', redirectTo: 'page1' }
            ],
            { useHash: true, initialNavigation: true }
        )
    ],
    declarations: [AppComponent, Page1Component, Page2Component],
    entryComponents: [AppComponent, Page1Component, Page2Component],
    providers: [{ provide: APP_BASE_HREF, useValue: '!' }],
    bootstrap: [AppComponent]
})
export class Storefront {}

platformBrowserDynamic()
    .bootstrapModule(Storefront)
    .catch((err) => console.log(err));
