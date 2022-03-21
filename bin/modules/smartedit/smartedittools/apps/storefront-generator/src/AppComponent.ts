/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component } from '@angular/core';
@Component({
    selector: 'storefront-app',
    template: `
        <span>this is the root of the Angular storefront</span> <br />
        <a [routerLink]="['/page1']">page1</a> <br />
        <a [routerLink]="['/page2']">page2</a>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {}
