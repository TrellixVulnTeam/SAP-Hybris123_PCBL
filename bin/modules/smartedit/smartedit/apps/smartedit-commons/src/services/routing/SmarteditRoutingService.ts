/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Optional } from '@angular/core';
import {
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router,
    RouterEvent
} from '@angular/router';
import { UpgradeModule } from '@angular/upgrade/static';
import { LogService } from '@smart/utils';
import * as angular from 'angular';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { SeDowngradeService } from '../../di';
import { CustomHandlingStrategy } from '../CustomHandlingStrategy';
import {
    IAngularJSRoute,
    NavigationEventSource,
    RouteChangeEvent,
    RouteNavigationEnd,
    RouteNavigationError,
    RouteNavigationStart
} from './types';

/**
 * A service that provides navigation and URL manipulation capabilities.
 * It is a reliant source of information on routing state in Smartedit.
 */
@SeDowngradeService()
export class SmarteditRoutingService {
    private listenersInitialized = false;
    private routeChangeError$ = new ReplaySubject<RouteChangeEvent<RouteNavigationError>>();
    private routeChangeStart$ = new ReplaySubject<RouteChangeEvent<RouteNavigationStart>>();
    private routeChangeSuccess$ = new ReplaySubject<RouteChangeEvent<RouteNavigationEnd>>();
    private previousRouterUrl = '';

    constructor(
        @Optional() private router: Router,
        @Inject(DOCUMENT) private document: Document,
        private logService: LogService,
        private upgrade: UpgradeModule
    ) {}

    /**
     *  Initializes listeners for navigation events.
     */
    public init(): void {
        if (!this.listenersInitialized) {
            this.notifyOnAngularRouteEvents();
            this.notifyOnAngularJSRouteEvents();
            this.listenersInitialized = true;
        }
    }

    /** Navigates based on the provided URL (absolute). */
    public go(url: string): Promise<boolean> {
        return this.router.navigateByUrl(url);
    }

    /** Returns the current router URL. */
    public path(): string {
        return this.router.url;
    }

    /** Returns absolute URL. */
    public absUrl(): string {
        return this.document.location.href;
    }

    /** Notifies when the route change has started. */
    public routeChangeStart(): Observable<RouteNavigationStart> {
        this.warnAboutListenersNotInitialized();
        return this.routeChangeStart$.pipe(
            filter(
                (event: RouteChangeEvent<RouteNavigationStart>) =>
                    !!event.url && event.url !== this.previousRouterUrl
            ),
            map((event) => event.routeData)
        );
    }

    /** Notifies when the route change has ended. */
    public routeChangeSuccess(): Observable<RouteNavigationEnd> {
        this.warnAboutListenersNotInitialized();
        return this.routeChangeSuccess$.pipe(
            filter(
                (event: RouteChangeEvent<RouteNavigationEnd>) =>
                    !!event.url && event.url !== this.previousRouterUrl
            ),
            map((event) => event.routeData)
        );
    }

    /** Notifies when the route change has failed. */
    public routeChangeError(): Observable<RouteNavigationError> {
        this.warnAboutListenersNotInitialized();
        return this.routeChangeError$.pipe(map((event) => event.routeData));
    }

    /** Reloads the given URL. If not provided, it will reload the current URL. */
    public reload(url = this.router.url): Promise<boolean> {
        return this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigateByUrl(url));
    }

    /**
     * Extracts `url` from Angular router event or `current.originalPath` from AngularJS event
     */
    public getCurrentUrlFromEvent(
        event: RouteNavigationEnd | RouteNavigationError | RouteNavigationStart
    ): string | null {
        if (
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationError
        ) {
            return event.url;
        }

        return event && event.current && event.current.originalPath;
    }

    /**
     * @internal
     * @ignore
     */
    private warnAboutListenersNotInitialized(): void {
        if (!this.listenersInitialized) {
            this.logService.warn('Listeners not initialized, run `init()` first.');
        }
    }

    /**
     * @internal
     * @ignore
     */
    private notifyOnAngularRouteEvents(): void {
        this.router.events.subscribe((event: RouterEvent) => {
            // For some reason CustomHandlingStrategy.shouldProcessUrl is called twice
            // when switching from NG route to AJS route e.g.: /ng -> /pages/...
            // it's get called with /pages/... and then suddenly with /ng
            // however event.url is /pages/... and not /ng
            // That's why it has to do another check for ng prefix in route
            // to avoid duplicated events
            if (event && event.url && !CustomHandlingStrategy.isNgRoute(event.url)) {
                return;
            }

            switch (true) {
                case event instanceof NavigationStart: {
                    this.routeChangeStart$.next({
                        from: NavigationEventSource.NG,
                        url: event.url,
                        routeData: event as NavigationStart
                    });
                    break;
                }
                case event instanceof NavigationError: {
                    this.routeChangeError$.next({
                        from: NavigationEventSource.NG,
                        url: event.url,
                        routeData: event as NavigationError
                    });
                    break;
                }
                case event instanceof NavigationEnd: {
                    this.routeChangeSuccess$.next({
                        from: NavigationEventSource.NG,
                        url: event.url,
                        routeData: event as NavigationEnd
                    });
                    this.previousRouterUrl = event && event.url;
                    break;
                }
            }
        });
    }

    /**
     * @internal
     * @ignore
     */
    private notifyOnAngularJSRouteEvents(): void {
        this.upgrade.$injector
            .get('$rootScope')
            .$on(
                '$routeChangeSuccess',
                (
                    event: angular.IAngularEvent,
                    current: IAngularJSRoute,
                    previous: IAngularJSRoute
                ) => {
                    this.routeChangeSuccess$.next({
                        from: NavigationEventSource.AJS,
                        url: current && current.originalPath,
                        routeData: { event, current, previous }
                    });
                    this.previousRouterUrl = current && current.originalPath;
                }
            );

        this.upgrade.$injector
            .get('$rootScope')
            .$on(
                '$routeChangeError',
                (
                    event: angular.IAngularEvent,
                    current: IAngularJSRoute,
                    previous: IAngularJSRoute,
                    rejection: any
                ) => {
                    this.routeChangeError$.next({
                        from: NavigationEventSource.AJS,
                        url: current && current.originalPath,
                        routeData: { event, current, previous, rejection }
                    });
                }
            );

        this.upgrade.$injector
            .get('$rootScope')
            .$on(
                '$routeChangeStart',
                (event: angular.IAngularEvent, next: IAngularJSRoute, current: IAngularJSRoute) => {
                    this.routeChangeStart$.next({
                        from: NavigationEventSource.AJS,
                        url: next && next.originalPath,
                        routeData: { event, next, current }
                    });
                }
            );
    }
}
