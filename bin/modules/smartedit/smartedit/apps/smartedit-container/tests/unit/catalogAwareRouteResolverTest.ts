/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';

import {
    EVENTS,
    ICatalogVersionPermissionService,
    IExperience,
    ISharedDataService,
    LANDING_PAGE_PATH,
    SystemEventService
} from 'smarteditcommons';
import { CatalogAwareRouteResolverFunctions, ExperienceService } from 'smarteditcontainer/services';
import { promiseHelper } from 'testhelpers';

describe('CatalogAwareRouteResolverFunctions', () => {
    let experienceService: jasmine.SpyObj<ExperienceService>;
    let $route: angular.route.IRouteService;
    let sharedDataService: jasmine.SpyObj<ISharedDataService>;
    let catalogVersionPermissionService: jasmine.SpyObj<ICatalogVersionPermissionService>;
    let $location: jasmine.SpyObj<angular.ILocationService>;
    let $q: angular.IQService;
    let $log: jasmine.SpyObj<angular.ILogService>;
    let systemEventService: jasmine.SpyObj<SystemEventService>;
    let nextExperience: IExperience;

    let executeStorefrontResolve: () => PromiseLike<any>;
    let executeExperienceFromPathResolve: () => PromiseLike<any>;

    beforeEach(() => {
        experienceService = jasmine.createSpyObj<ExperienceService>('experienceService', [
            'getCurrentExperience',
            'buildAndSetExperience',
            'hasCatalogVersionChanged'
        ]);

        $q = promiseHelper.$q();

        $log = jasmine.createSpyObj<angular.ILogService>('$log', ['info', 'error']);

        $route = jasmine.createSpyObj<angular.route.IRouteService>('$route', ['reload']);
        $route.current = {
            params: {
                key1: 'value1'
            },
            locals: {}
        } as angular.route.ICurrentRoute;

        sharedDataService = jasmine.createSpyObj<ISharedDataService>('sharedDataService', [
            'get',
            'set'
        ]);

        catalogVersionPermissionService = jasmine.createSpyObj<ICatalogVersionPermissionService>(
            'catalogVersionPermissionService',
            ['hasReadPermissionOnCurrent']
        );

        $location = jasmine.createSpyObj<angular.ILocationService>('$location', ['url']);

        systemEventService = jasmine.createSpyObj<SystemEventService>('systemEventService', [
            'publishAsync'
        ]);

        nextExperience = {
            pageId: 'somePageId'
        } as IExperience;

        executeStorefrontResolve = () => {
            return CatalogAwareRouteResolverFunctions.storefrontResolve(
                $log,
                $location,
                experienceService,
                sharedDataService,
                systemEventService,
                catalogVersionPermissionService
            );
        };

        executeExperienceFromPathResolve = () => {
            return CatalogAwareRouteResolverFunctions.experienceFromPathResolve(
                $route,
                $log,
                $location,
                experienceService,
                systemEventService,
                catalogVersionPermissionService
            );
        };
    });

    describe('storefrontResolve', () => {
        it('GIVEN there is no current experience THEN we are redirected to Landing Page', (done) => {
            // GIVEN
            experienceService.getCurrentExperience.and.returnValue(Promise.resolve(null));

            // WHEN
            const promise = executeStorefrontResolve();

            // THEN
            promise.then(() => {
                expect($location.url).toHaveBeenCalledWith(LANDING_PAGE_PATH);
                expect(systemEventService.publishAsync).not.toHaveBeenCalled();
                expect(sharedDataService.set).not.toHaveBeenCalled();
                done();
            });
        });

        describe('catalogVersion has changed', () => {
            beforeEach(() => {
                experienceService.getCurrentExperience.and.returnValue(
                    Promise.resolve(nextExperience)
                );
                experienceService.hasCatalogVersionChanged.and.returnValue($q.when(true));
            });

            afterEach(() => {
                expect(sharedDataService.set).toHaveBeenCalledWith('experience', nextExperience);
            });

            it('GIVEN has read access to cataloVersion exists THEN experience update event is sent', (done) => {
                // GIVEN
                catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue(
                    $q.when(true)
                );

                // WHEN
                const promise = executeStorefrontResolve();

                // THEN
                promise.then(() => {
                    expect($location.url).not.toHaveBeenCalled();
                    expect(systemEventService.publishAsync).toHaveBeenCalledWith(
                        EVENTS.EXPERIENCE_UPDATE
                    );
                    done();
                });
            });

            it('GIVEN no read access to catalogVersion exists THEN redirected to landing page and experience update event is not sent', (done) => {
                // GIVEN
                catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue(
                    $q.when(false)
                );

                // WHEN
                const promise = executeStorefrontResolve();

                // THEN

                promise.then(() => {
                    expect($location.url).toHaveBeenCalledWith(LANDING_PAGE_PATH);
                    expect(systemEventService.publishAsync).not.toHaveBeenCalled();
                    done();
                });
            });
        });

        describe('catalogVersion has not changed', () => {
            beforeEach(() => {
                experienceService.getCurrentExperience.and.returnValue(
                    Promise.resolve(nextExperience)
                );
                experienceService.hasCatalogVersionChanged.and.returnValue($q.when(false));
            });

            it('GIVEN has read access to cataloVersion exists THEN experience update event is not sent', (done) => {
                // GIVEN
                catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue(
                    $q.when(true)
                );

                // WHEN
                const promise = executeStorefrontResolve();

                // THEN
                promise.then(() => {
                    expect($location.url).not.toHaveBeenCalled();
                    expect(systemEventService.publishAsync).not.toHaveBeenCalled();
                    done();
                });
            });

            it('GIVEN no read access to catalogVersion exists THEN redirected to landing page and experience update event not sent', (done) => {
                // GIVEN
                catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue(
                    $q.when(false)
                );

                // WHEN
                const promise = executeStorefrontResolve();

                // THEN
                promise.then(() => {
                    expect($location.url).toHaveBeenCalledWith(LANDING_PAGE_PATH);
                    expect(systemEventService.publishAsync).not.toHaveBeenCalled();
                    done();
                });
            });
        });
    });

    describe('experienceFromPathResolve', () => {
        it('GIVEN no experience coud be built THEN we are redirected to landing page', (done) => {
            // GIVEN
            experienceService.buildAndSetExperience.and.returnValue(Promise.resolve(null));

            // WHEN
            const promise = executeExperienceFromPathResolve();

            // THEN
            promise.then(() => {
                expect($location.url).toHaveBeenCalledWith(LANDING_PAGE_PATH);
                expect(systemEventService.publishAsync).not.toHaveBeenCalled();
                done();
            });
        });

        describe('catalogVersion has changed', () => {
            beforeEach(() => {
                experienceService.buildAndSetExperience.and.returnValue(
                    Promise.resolve(nextExperience)
                );
                experienceService.hasCatalogVersionChanged.and.returnValue($q.when(true));
            });

            it('GIVEN has read access to cataloVersion exists THEN experience update event is sent', (done) => {
                // GIVEN
                catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue(
                    $q.when(true)
                );

                // WHEN
                const promise = executeExperienceFromPathResolve();

                // THEN

                promise.then(() => {
                    expect($location.url).not.toHaveBeenCalled();
                    expect(systemEventService.publishAsync).toHaveBeenCalledWith(
                        EVENTS.EXPERIENCE_UPDATE
                    );
                    done();
                });
            });

            it('GIVEN no read access to cataloVersion exists THEN redirected to landing page and experience update event not sent', (done) => {
                // GIVEN
                catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue(
                    $q.when(false)
                );

                // WHEN
                const promise = executeExperienceFromPathResolve();

                // THEN
                promise.then(() => {
                    expect($location.url).toHaveBeenCalledWith(LANDING_PAGE_PATH);
                    expect(systemEventService.publishAsync).not.toHaveBeenCalled();
                    done();
                });
            });
        });

        describe('catalogVersion has not changed', () => {
            beforeEach(() => {
                experienceService.buildAndSetExperience.and.returnValue($q.when(nextExperience));
                experienceService.hasCatalogVersionChanged.and.returnValue($q.when(false));
            });

            it('GIVEN has read access to cataloVersion exists THEN experience update event is not sent', (done) => {
                // GIVEN
                catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue(
                    $q.when(true)
                );

                // WHEN
                const promise = executeExperienceFromPathResolve();

                // THEN
                promise.then(() => {
                    expect($location.url).not.toHaveBeenCalled();
                    expect(systemEventService.publishAsync).not.toHaveBeenCalled();
                    done();
                });
            });

            it('GIVEN no read access to catalogVersion THEN it will redirect to Landing Page and experience update event will not be sent', (done) => {
                // GIVEN
                catalogVersionPermissionService.hasReadPermissionOnCurrent.and.returnValue(
                    $q.when(false)
                );

                // WHEN
                const promise = executeExperienceFromPathResolve();

                // THEN
                promise.then(() => {
                    expect($location.url).toHaveBeenCalledWith(LANDING_PAGE_PATH);
                    expect(systemEventService.publishAsync).not.toHaveBeenCalled();
                    done();
                });
            });
        });
    });
});
