/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';

import { LogService, SmarteditRoutingService } from '../services';

/**
 * Overrides AngularJS {@link https://docs.angularjs.org/api/ng/directive/ngHref ngHref} directive.
 *
 * When navigating from Angular route to AngularJS route, the controller that is registered for that AngularJS route is called twice (should be once).
 * It results in `ng-view` being rendered twice.
 *
 * @internal
 * @ignore
 */
angular
    .module('ngHrefDirectiveModule', [])
    .directive('ngHref', function (
        smarteditRoutingService: SmarteditRoutingService,
        logService: LogService
    ) {
        'ngInject';
        return {
            restrict: 'A',
            replace: false,
            link(
                scope: angular.IScope,
                element: JQuery<HTMLElement>,
                attrs: angular.IAttributes
            ): void {
                const href = attrs.ngHref.replace('#!', ''); // remove shebang
                logService.debug(
                    'Navigating via overridden ngHref Directive',
                    'attrs.ngHref',
                    attrs.ngHref,
                    'href',
                    href
                );
                // Native directive does set the "href"
                element.attr('href', attrs.ngHref);

                element.bind('click', function (event) {
                    event.preventDefault();
                    smarteditRoutingService.go(href);
                });
            }
        };
    });
