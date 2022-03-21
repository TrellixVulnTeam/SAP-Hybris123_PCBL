/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import * as angular from 'angular';

export enum NavigationEventSource {
    NG = 'ng',
    AJS = 'ajs'
}
export type IAngularJSRoute = angular.route.IRoute & { originalPath?: string };
export interface AJSNavigationEnd {
    event: angular.IAngularEvent;
    current: IAngularJSRoute;
    previous: IAngularJSRoute;
}
export interface AJSNavigationStart {
    event: angular.IAngularEvent;
    next: IAngularJSRoute;
    current: IAngularJSRoute;
}
export interface AJSNavigationError {
    event: angular.IAngularEvent;
    current: IAngularJSRoute;
    previous: IAngularJSRoute;
    rejection: any;
}
export type RouteNavigationEnd = NavigationEnd | AJSNavigationEnd;
export type RouteNavigationStart = NavigationStart | AJSNavigationStart;
export type RouteNavigationError = NavigationError | AJSNavigationError;

export interface RouteChangeEvent<T> {
    from: NavigationEventSource;
    url: string;
    routeData: T;
}
