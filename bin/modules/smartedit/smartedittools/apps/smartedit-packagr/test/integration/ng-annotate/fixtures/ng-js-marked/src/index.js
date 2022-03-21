/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('foo', []).service('bar', function($log) {
    'ngInject';
    $log.info('Hello FooBar');
});
