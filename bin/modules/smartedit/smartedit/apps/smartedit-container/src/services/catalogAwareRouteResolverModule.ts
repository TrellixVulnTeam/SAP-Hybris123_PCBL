/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* eslint-disable max-classes-per-file */
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';

import {
    ICatalogVersionPermissionService,
    ISharedDataService,
    LANDING_PAGE_PATH,
    SeModule,
    SystemEventService
} from 'smarteditcommons';
import { ExperienceService } from './ExperienceServiceOuter';
import { CatalogAwareRouteResolverHelper } from './resolvers';

export class CatalogAwareRouteResolverFunctions {
    public static storefrontResolve(
        $log: angular.ILogService,
        $location: angular.ILocationService,
        experienceService: ExperienceService,
        sharedDataService: ISharedDataService,
        systemEventService: SystemEventService,
        catalogVersionPermissionService: ICatalogVersionPermissionService
    ): PromiseLike<any> {
        'ngInject';

        return CatalogAwareRouteResolverHelper.executeAndCheckCatalogPermissions(
            catalogVersionPermissionService,
            $log,
            experienceService,
            systemEventService,
            () =>
                CatalogAwareRouteResolverHelper.checkExperienceIsSet(
                    experienceService,
                    sharedDataService
                )
        ).catch(() => {
            $location.url(LANDING_PAGE_PATH);
        });
    }

    public static experienceFromPathResolve(
        $route: angular.route.IRouteService,
        $log: angular.ILogService,
        $location: angular.ILocationService,
        experienceService: ExperienceService,
        systemEventService: SystemEventService,
        catalogVersionPermissionService: ICatalogVersionPermissionService
    ): PromiseLike<any> {
        'ngInject';

        return CatalogAwareRouteResolverHelper.executeAndCheckCatalogPermissions(
            catalogVersionPermissionService,
            $log,
            experienceService,
            systemEventService,
            () =>
                CatalogAwareRouteResolverHelper.buildExperienceFromRoute(
                    experienceService,
                    $route.current.params
                )
        ).catch(() => {
            $location.url(LANDING_PAGE_PATH);
        });
    }
}

@SeModule({
    providers: [
        {
            provide: 'catalogAwareRouteResolverFunctions',
            useValue: CatalogAwareRouteResolverFunctions
        }
    ]
})
export class CatalogAwareRouteResolverModule {}
