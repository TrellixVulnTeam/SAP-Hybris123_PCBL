/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('barModule', ['fooModule']).service('bar', function(foo) {
    this.sayHello = function() {
        return foo.sayHello() + 'bar';
    };
});
