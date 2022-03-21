/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
// eslint-disable-next-line import/order
import { deprecate } from 'smarteditcontainer/deprecate';
deprecate();

import * as angular from 'angular';
import {
    instrument,
    Cloneable,
    GenericEditorModule,
    NG_ROUTE_PREFIX,
    PageSensitiveDirective,
    SeModule,
    SeRouteService,
    TemplateCacheDecoratorModule,
    TreeModule,
    TypedMap,
    YCollapsibleContainerComponent,
    YHelpModule
} from 'smarteditcommons';
import {
    CatalogAwareRouteResolverModule,
    LegacySmarteditServicesModule
} from 'smarteditcontainer/services';
import { LegacyCatalogDetailsModule } from './services/widgets/catalogDetails/legacy/LegacyCatalogDetailsModule';
import { ClientPagedListModule as LegacyClientPagedListModule } from './services/widgets/clientPagedList';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NgRouteModule = require('angular-route'); // Only supports CommonJS
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NgUiBootstrapModule = require('angular-ui-bootstrap'); // Only supports CommonJS

declare global {
    /* @internal */
    interface InternalSmartedit {
        smartEditBootstrapped: TypedMap<boolean>;
    }
}

const TOP_LEVEL_MODULE_NAME = 'smarteditcontainer';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@SeModule({
    declarations: [PageSensitiveDirective, YCollapsibleContainerComponent],
    imports: [
        LegacySmarteditServicesModule,
        LegacyCatalogDetailsModule,
        TemplateCacheDecoratorModule,
        NgRouteModule,
        NgUiBootstrapModule,
        'coretemplates',
        'modalServiceModule',
        LegacyClientPagedListModule,
        'paginationFilterModule',
        'resourceLocationsModule',
        TreeModule,
        'ySelectModule',
        YHelpModule,
        CatalogAwareRouteResolverModule,
        'seConstantsModule',
        GenericEditorModule,
        'recompileDomModule',
        'ngHrefDirectiveModule'
    ],
    providers: [],
    config: (
        $provide: angular.auto.IProvideService,
        readObjectStructureFactory: () => (arg: Cloneable) => Cloneable,
        LANDING_PAGE_PATH: string,
        STORE_FRONT_CONTEXT: string,
        $routeProvider: angular.route.IRouteProvider,
        $logProvider: angular.ILogProvider
    ) => {
        'ngInject';

        // Replace AngularJS ngHref Directive with the custom overridden directive, registered in 'ngHrefDirectiveModule'.
        // $delegate is any array of ng-href directives. In this case the first one is AngularJS built-in ng-href.
        // We remove it so that `ngHrefDirective` will be used instead.
        // See the 'ngHrefDirective' for more details.
        $provide.decorator('ngHrefDirective', [
            '$delegate',
            function ($delegate: any): any {
                $delegate.shift();
                return $delegate;
            }
        ]);

        instrument($provide, readObjectStructureFactory(), TOP_LEVEL_MODULE_NAME);

        // Due to not working Angular <-> AngularJS navigation (issues with $locationShim),
        // it is not possible to register unified routes that will handle the navigation properly.
        // Routes must be registered as an Angular routes at once, when each route component has been migrated to Angular.
        // Until then, each route must register downgraded component.
        SeRouteService.init($routeProvider);

        SeRouteService.provideLegacyRoute({
            path: LANDING_PAGE_PATH,
            route: {
                redirectTo: NG_ROUTE_PREFIX
            }
        });

        SeRouteService.provideLegacyRoute({
            path: `${LANDING_PAGE_PATH}sites/:siteId`,
            route: {
                redirectTo: `${NG_ROUTE_PREFIX}/sites/:siteId`
            }
        });

        SeRouteService.provideLegacyRoute({
            path: STORE_FRONT_CONTEXT,
            route: {
                redirectTo: `${NG_ROUTE_PREFIX}${STORE_FRONT_CONTEXT}`
            }
        });

        $logProvider.debugEnabled(false);
    }
})
/** @internal */
export class Smarteditcontainer {}
