/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('externalSlotDisabledDecoratorModule', ['slotDisabledDecoratorModule'])
    .directive('externalSlotDisabledDecorator', function () {
        return {
            templateUrl: 'externalSlotDisabledDecoratorTemplate.html',
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
