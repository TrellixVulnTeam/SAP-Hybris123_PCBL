/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('customMocksModule', ['backendMocksUtilsModule']).run(function (httpBackendService) {
    httpBackendService
        .whenPOST(
            /permissionswebservices\/v1\/permissions\/types\/search\?permissionNames=create,change,read,remove&types=(.*)/
        )
        .respond(function () {
            var typePermissions = JSON.parse(sessionStorage.getItem('cmsVersionTypePermissions'));

            return [
                200,
                {
                    permissionsList: [
                        {
                            id: 'ContentPage',
                            permissions: [
                                {
                                    key: 'read',
                                    value: 'true'
                                },
                                {
                                    key: 'change',
                                    value: 'true'
                                },
                                {
                                    key: 'create',
                                    value: 'true'
                                },
                                {
                                    key: 'remove',
                                    value: 'true'
                                }
                            ]
                        },
                        {
                            id: 'CategoryPage',
                            permissions: [
                                {
                                    key: 'read',
                                    value: 'true'
                                },
                                {
                                    key: 'change',
                                    value: 'true'
                                },
                                {
                                    key: 'create',
                                    value: 'true'
                                },
                                {
                                    key: 'remove',
                                    value: 'true'
                                }
                            ]
                        },
                        {
                            id: 'ProductPage',
                            permissions: [
                                {
                                    key: 'read',
                                    value: 'true'
                                },
                                {
                                    key: 'change',
                                    value: 'true'
                                },
                                {
                                    key: 'create',
                                    value: 'true'
                                },
                                {
                                    key: 'remove',
                                    value: 'true'
                                }
                            ]
                        },
                        {
                            id: 'CMSVersion',
                            permissions: typePermissions
                        }
                    ]
                }
            ];
        });
});
try {
    angular.module('smarteditloader').requires.push('customMocksModule');
} catch (e) {}
try {
    angular.module('smarteditcontainer').requires.push('customMocksModule');
} catch (e) {}
