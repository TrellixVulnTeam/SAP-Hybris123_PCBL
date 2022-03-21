/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { AngularJSLazyDependenciesService } from 'smarteditcommons';

export function mockAngularJSLazyDependenciesService(): jasmine.SpyObj<
    AngularJSLazyDependenciesService
> {
    const $templateCacheMock = jasmine.createSpyObj<angular.ITemplateCacheService>(
        '$templateCache',
        ['get', 'put']
    );

    const $rootScopeMock = jasmine.createSpyObj<angular.IRootScopeService>('$rootScope', ['$on']);

    const $locationMock = jasmine.createSpyObj('$location', ['path']);

    const angularJSLazyDependenciesServiceMock = jasmine.createSpyObj(
        'angularJSLazyDependenciesServiceMock',
        ['$templateCache', '$rootScope', '$location']
    );

    angularJSLazyDependenciesServiceMock.$templateCache.and.returnValue($templateCacheMock);
    angularJSLazyDependenciesServiceMock.$rootScope.and.returnValue($rootScopeMock);
    angularJSLazyDependenciesServiceMock.$location.and.returnValue($locationMock);

    return angularJSLazyDependenciesServiceMock;
}
