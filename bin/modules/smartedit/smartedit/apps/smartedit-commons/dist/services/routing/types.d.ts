/// <reference types="angular-route" />
import { NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import * as angular from 'angular';
export declare enum NavigationEventSource {
    NG = "ng",
    AJS = "ajs"
}
export declare type IAngularJSRoute = angular.route.IRoute & {
    originalPath?: string;
};
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
export declare type RouteNavigationEnd = NavigationEnd | AJSNavigationEnd;
export declare type RouteNavigationStart = NavigationStart | AJSNavigationStart;
export declare type RouteNavigationError = NavigationError | AJSNavigationError;
export interface RouteChangeEvent<T> {
    from: NavigationEventSource;
    url: string;
    routeData: T;
}
