/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('sharedSlotDisabledDecoratorModule', ['slotDisabledDecoratorModule'])
    .directive('sharedSlotDisabledDecorator', function () {
        return {
            templateUrl: 'sharedSlotDisabledDecoratorTemplate.html',
            transclude: true,
            restrict: 'C',
            controllerAs: 'ctrl',
            controller() {},
            scope: {},
            bindToController: {
                active: '=',
                componentAttributes: '<'
            }
        };
    });
