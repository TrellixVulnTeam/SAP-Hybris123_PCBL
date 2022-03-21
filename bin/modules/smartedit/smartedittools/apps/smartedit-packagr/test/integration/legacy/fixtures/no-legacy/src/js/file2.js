/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('fooModule', [])
    .service('foo', function() {
        this.sayHello = function() {
            return 'foo';
        };
    })
    .component('fooComponent', {
        templateUrl: 'fooTemplate.html'
    });
