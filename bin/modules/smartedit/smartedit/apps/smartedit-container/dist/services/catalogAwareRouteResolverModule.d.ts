/// <reference types="angular-mocks" />
/// <reference types="angular-route" />
import * as angular from 'angular';
import { ICatalogVersionPermissionService, ISharedDataService, SystemEventService } from 'smarteditcommons';
import { ExperienceService } from './ExperienceServiceOuter';
export declare class CatalogAwareRouteResolverFunctions {
    static storefrontResolve($log: angular.ILogService, $location: angular.ILocationService, experienceService: ExperienceService, sharedDataService: ISharedDataService, systemEventService: SystemEventService, catalogVersionPermissionService: ICatalogVersionPermissionService): PromiseLike<any>;
    static experienceFromPathResolve($route: angular.route.IRouteService, $log: angular.ILogService, $location: angular.ILocationService, experienceService: ExperienceService, systemEventService: SystemEventService, catalogVersionPermissionService: ICatalogVersionPermissionService): PromiseLike<any>;
}
export declare class CatalogAwareRouteResolverModule {
}
