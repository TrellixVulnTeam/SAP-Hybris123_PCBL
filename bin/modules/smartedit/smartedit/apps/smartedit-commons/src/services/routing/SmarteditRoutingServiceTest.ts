/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { UpgradeModule } from '@angular/upgrade/static';
import { LogService } from '@smart/utils';
import { Observable } from 'rxjs';

import { SmarteditRoutingService } from './SmarteditRoutingService';
import { AJSNavigationEnd, AJSNavigationError, AJSNavigationStart } from './types';

function mockRouter(url: string): jasmine.SpyObj<Router> {
    const router = jasmine.createSpyObj<Router>('router', ['navigateByUrl']);

    router.navigateByUrl.and.returnValue(Promise.resolve());

    (router.url as string) = url;
    ((router.events as unknown) as jasmine.SpyObj<Observable<Event>>) = jasmine.createSpyObj<
        Observable<Event>
    >('events', ['subscribe']);

    return router;
}

describe('SmarteditRoutingService', () => {
    let service: SmarteditRoutingService;
    let router: jasmine.SpyObj<Router>;
    let document: jasmine.SpyObj<Document>;
    let logService: jasmine.SpyObj<LogService>;
    let upgrade: jasmine.SpyObj<UpgradeModule>;
    let injectorGet$On: jasmine.Spy;

    beforeEach(() => {
        router = mockRouter('/smartedit');

        document = jasmine.createSpyObj('document', ['location']);
        document.location.href = 'https://smarteditabsoluteurl';
        logService = jasmine.createSpyObj('logService', ['warn']);

        injectorGet$On = jasmine.createSpy('$on');
        upgrade = jasmine.createSpyObj('upgrade', ['$injector']);
        upgrade.$injector = jasmine.createSpyObj('$injector', ['get']);
        upgrade.$injector.get.and.returnValue({ $on: injectorGet$On });

        service = new SmarteditRoutingService(router, document, logService, upgrade);

        service.init();
    });

    it('WHEN "init" and routeChangeSuccess are called THEN listeners are created', () => {
        service.routeChangeSuccess();

        const getCalls = new Array(3)
            .fill(null)
            .map((_, index) => upgrade.$injector.get.calls.argsFor(index)[0]);
        const get$OnCalls = new Array(3)
            .fill(null)
            .map((_, index) => injectorGet$On.calls.argsFor(index)[0]);

        expect(router.events.subscribe).toHaveBeenCalledTimes(1);
        expect(getCalls).toEqual(['$rootScope', '$rootScope', '$rootScope']);
        expect(upgrade.$injector.get).toHaveBeenCalledTimes(3);
        expect(injectorGet$On).toHaveBeenCalledTimes(3);
        expect(get$OnCalls).toEqual([
            '$routeChangeSuccess',
            '$routeChangeError',
            '$routeChangeStart'
        ]);
    });

    it('WHEN "init" is called twice THEN listeners are created only once', () => {
        service.routeChangeSuccess();

        expect(router.events.subscribe).toHaveBeenCalledTimes(1);
        expect(upgrade.$injector.get).toHaveBeenCalledWith('$rootScope');
        expect(upgrade.$injector.get).toHaveBeenCalledTimes(3);
        expect(injectorGet$On).toHaveBeenCalledTimes(3);

        // clear calls
        (router.events.subscribe as jasmine.Spy).calls.reset();
        (upgrade.$injector.get as jasmine.Spy).calls.reset();
        injectorGet$On.calls.reset();

        // simulating second init()
        service.init();
        expect(router.events.subscribe).not.toHaveBeenCalledTimes(1);
        expect(upgrade.$injector.get).not.toHaveBeenCalledWith('$rootScope');
        expect(upgrade.$injector.get).not.toHaveBeenCalled();
        expect(injectorGet$On).not.toHaveBeenCalled();
    });

    it('WHEN "go" method is called THEN it will call navigation', () => {
        service.go('some-url');

        expect(router.navigateByUrl).toHaveBeenCalledWith('some-url');
    });

    it('WHEN "path" method is called THEN it will return the current router URL', () => {
        expect(service.path()).toBe('/smartedit');
    });

    it('WHEN "absUrl" method is called THEN will return absolute URL', () => {
        expect(service.absUrl()).toBe('https://smarteditabsoluteurl');
    });

    describe('"routeChangeSuccess"', () => {
        it('WHEN NG router emits an event THEN it should invoke given callback', (done) => {
            service.routeChangeSuccess().subscribe((event) => {
                expect(event instanceof NavigationEnd).toBe(true);
                done();
            });

            const callback = (router.events.subscribe as jasmine.Spy).calls.argsFor(0)[0];
            callback(new NavigationEnd(null, '/ng', null));
        });

        it('WHEN NG router emits an event with url equal null THEN it should not invoke given callback', () => {
            const handler = jasmine.createSpy();
            service.routeChangeSuccess().subscribe(handler);

            const callback = (router.events.subscribe as jasmine.Spy).calls.argsFor(0)[0];
            callback(new NavigationEnd(null, null, null));

            expect(handler).not.toHaveBeenCalled();
        });

        it('WHEN NG router emits an event with url does not start with "/ng" THEN it should not invoke given callback', () => {
            const handler = jasmine.createSpy();
            service.routeChangeSuccess().subscribe(handler);

            const callback = (router.events.subscribe as jasmine.Spy).calls.argsFor(0)[0];
            callback(new NavigationEnd(null, '/navigation', null));

            expect(handler).not.toHaveBeenCalled();
        });

        it('WHEN AJS router emits an event THEN it should invoke given callback', (done) => {
            service.routeChangeSuccess().subscribe((event) => {
                expect((event as any).current.originalPath).toBe('/pages');
                done();
            });

            const callback = injectorGet$On.calls
                .allArgs()
                .find((args) => args[0] === '$routeChangeSuccess')[1];
            callback({ name: 'event' }, { originalPath: '/pages' }, null);
        });

        it('WHEN AJS router emits an event when param "current" is null THEN it should not invoke given callback', () => {
            const handler = jasmine.createSpy();
            service.routeChangeSuccess().subscribe(handler);

            const callback = injectorGet$On.calls
                .allArgs()
                .find((args) => args[0] === '$routeChangeSuccess')[1];
            callback({ name: 'event' }, null, null);

            expect(handler).not.toHaveBeenCalled();
        });

        it('WHEN AJS router emits an event when param "current" is defined but its "originalPath" property is null THEN it should not invoke given callback', () => {
            const handler = jasmine.createSpy();
            service.routeChangeSuccess().subscribe(handler);

            const callback = injectorGet$On.calls
                .allArgs()
                .find((args) => args[0] === '$routeChangeSuccess')[1];
            callback({ name: 'event' }, { originalPath: null }, null);

            expect(handler).not.toHaveBeenCalled();
        });

        it('WHEN NG router emits an event with url equal the last router url THEN it should not invoke given callback', (done) => {
            service.routeChangeSuccess().subscribe((event) => {
                expect(event instanceof NavigationEnd).toBe(true);
                done();
            });

            const callback = (router.events.subscribe as jasmine.Spy).calls.argsFor(0)[0];
            callback(new NavigationEnd(null, '/ng', null));

            const handler = jasmine.createSpy();
            service.routeChangeSuccess().subscribe(handler);

            callback(new NavigationEnd(null, '/ng', null));
            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe('"routeChangeStart"', () => {
        it('WHEN NG router emits an event THEN it should invoke given callback', (done) => {
            service.routeChangeStart().subscribe((event) => {
                expect(event instanceof NavigationStart).toBe(true);
                done();
            });

            const callback = (router.events.subscribe as jasmine.Spy).calls.argsFor(0)[0];
            callback(new NavigationStart(null, '/ng', null));
        });

        it('WHEN NG router emits an event with url equal null THEN it should not invoke given callback', () => {
            const handler = jasmine.createSpy();
            service.routeChangeStart().subscribe(handler);

            const callback = (router.events.subscribe as jasmine.Spy).calls.argsFor(0)[0];
            callback(new NavigationStart(null, null, null));

            expect(handler).not.toHaveBeenCalled();
        });

        it('WHEN NG router emits an event with url does not start with "/ng" THEN it should not invoke given callback', () => {
            const handler = jasmine.createSpy();
            service.routeChangeStart().subscribe(handler);

            const callback = (router.events.subscribe as jasmine.Spy).calls.argsFor(0)[0];
            callback(new NavigationStart(null, '/navigation', null));

            expect(handler).not.toHaveBeenCalled();
        });

        it('WHEN AJS router emits an event THEN it should invoke given callback', (done) => {
            service.routeChangeStart().subscribe((event) => {
                expect((event as any).next.originalPath).toBe('/pages');
                done();
            });

            const callback = injectorGet$On.calls
                .allArgs()
                .find((args) => args[0] === '$routeChangeStart')[1];
            callback({ name: 'event' }, { originalPath: '/pages' }, null);
        });

        it('WHEN AJS router emits an event when param "next" is null THEN it should not invoke given callback', () => {
            const handler = jasmine.createSpy();
            service.routeChangeStart().subscribe(handler);

            const callback = injectorGet$On.calls
                .allArgs()
                .find((args) => args[0] === '$routeChangeStart')[1];
            callback({ name: 'event' }, null, null);

            expect(handler).not.toHaveBeenCalled();
        });

        it('WHEN AJS router emits an event when param "next" is defined but its "originalPath" property is null THEN it should not invoke given callback', () => {
            const handler = jasmine.createSpy();
            service.routeChangeStart().subscribe(handler);

            const callback = injectorGet$On.calls
                .allArgs()
                .find((args) => args[0] === '$routeChangeStart')[1];
            callback({ name: 'event' }, { originalPath: null }, null);

            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe('"routeChangeError"', () => {
        it('WHEN NG router emits an event THEN it should invoke given callback', (done) => {
            service.routeChangeError().subscribe((event) => {
                expect(event instanceof NavigationError).toBe(true);
                done();
            });

            const callback = (router.events.subscribe as jasmine.Spy).calls.argsFor(0)[0];
            callback(new NavigationError(null, '/ng', null));
        });

        it('WHEN NG router emits an event with url equal null THEN it should invoke given callback', () => {
            const handler = jasmine.createSpy();
            service.routeChangeError().subscribe(handler);

            const callback = (router.events.subscribe as jasmine.Spy).calls.argsFor(0)[0];
            callback(new NavigationError(null, null, null));

            expect(handler).toHaveBeenCalled();
        });

        it('WHEN NG router emits an event with url does not start with "/ng" THEN it should not invoke given callback', () => {
            const handler = jasmine.createSpy();
            service.routeChangeError().subscribe(handler);

            const callback = (router.events.subscribe as jasmine.Spy).calls.argsFor(0)[0];
            callback(new NavigationError(null, null, null));

            expect(handler).toHaveBeenCalled();
        });

        it('WHEN AJS router emits an event THEN it should invoke given callback', (done) => {
            service.routeChangeError().subscribe((event) => {
                expect((event as any).current.originalPath).toBe('/ng');
                done();
            });

            const callback = injectorGet$On.calls
                .allArgs()
                .find((args) => args[0] === '$routeChangeError')[1];
            callback({ name: 'event' }, { originalPath: '/ng' }, null, 'rejection');
        });

        it('WHEN AJS router emits an event when param "current" is null THEN it should invoke given callback', (done) => {
            service.routeChangeError().subscribe((event) => {
                expect((event as any).current).toBe(null);
                done();
            });

            const callback = injectorGet$On.calls
                .allArgs()
                .find((args) => args[0] === '$routeChangeError')[1];
            callback({ name: 'event' }, null, null);
        });

        it('WHEN AJS router emits an event when param "current" is defined but its "originalPath" property is null THEN it should invoke given callback', (done) => {
            service.routeChangeError().subscribe((event) => {
                expect((event as any).current.originalPath).toBe(null);
                done();
            });

            const callback = injectorGet$On.calls
                .allArgs()
                .find((args) => args[0] === '$routeChangeError')[1];
            callback({ name: 'event' }, { originalPath: null }, null);
        });
    });

    describe('WHEN "reload" method is called', () => {
        it('THEN will reload the current URL by default', () => {
            service.reload().then(() => {
                expect(router.navigateByUrl).toHaveBeenCalledTimes(2);
                expect(router.navigateByUrl.calls.argsFor(1)[0]).toBe('/smartedit');
            });
        });

        it('THEN will reload the given URL', () => {
            service.reload('/other').then(() => {
                expect(router.navigateByUrl).toHaveBeenCalledTimes(2);
                expect(router.navigateByUrl.calls.argsFor(1)[0]).toBe('/other');
            });
        });
    });

    describe('WHEN "getCurrentUrlFromEvent" method is called', () => {
        it('with Angular "NavigationEnd" event THEN it will return url from this event', () => {
            const event = new NavigationEnd(null, '/ng/path', null);
            expect(service.getCurrentUrlFromEvent(event)).toEqual('/ng/path');
        });

        it('with Angular "NavigationStart" event THEN it will return url from this event', () => {
            const event = new NavigationStart(null, '/ng/path', null);
            expect(service.getCurrentUrlFromEvent(event)).toEqual('/ng/path');
        });

        it('with Angular "NavigationError" event THEN it will return url from this event', () => {
            const event = new NavigationError(null, '/ng/path', null);
            expect(service.getCurrentUrlFromEvent(event)).toEqual('/ng/path');
        });

        it('with AngularJS "AJSNavigationEnd" event THEN it will return url from this event', () => {
            const event: AJSNavigationEnd = {
                event: null,
                current: { originalPath: '/ajs/path' },
                previous: null
            };
            expect(service.getCurrentUrlFromEvent(event)).toEqual('/ajs/path');
        });

        it('with AngularJS "AJSNavigationStart" event THEN it will return url from this event', () => {
            const event: AJSNavigationStart = {
                event: null,
                current: { originalPath: '/ajs/path' },
                next: null
            };
            expect(service.getCurrentUrlFromEvent(event)).toEqual('/ajs/path');
        });

        it('with AngularJS "AJSNavigationError" event THEN it will return url from this event', () => {
            const event: AJSNavigationError = {
                event: null,
                current: { originalPath: '/ajs/path' },
                previous: null,
                rejection: null
            };
            expect(service.getCurrentUrlFromEvent(event)).toEqual('/ajs/path');
        });
    });
});
