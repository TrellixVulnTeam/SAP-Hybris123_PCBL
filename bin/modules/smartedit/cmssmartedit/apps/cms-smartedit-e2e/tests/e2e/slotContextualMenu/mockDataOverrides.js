/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
angular
    .module('mockDataOverridesModule', ['backendMocksUtilsModule'])
    .run(function (httpBackendService) {
        httpBackendService
            .whenPOST(
                /permissionswebservices\/v1\/permissions\/types\/search\?permissionNames=create,change,read,remove&types=(.*)/
            )
            .respond(function () {
                var typePermissions = JSON.parse(
                    sessionStorage.getItem('contentSlotTypePermissions')
                );
                var defaultContentSlotPermissions = [
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
                ];

                return [
                    200,
                    {
                        permissionsList: [
                            {
                                id: 'ContentSlot',
                                permissions: typePermissions || defaultContentSlotPermissions
                            }
                        ]
                    }
                ];
            });
    });

try {
    angular.module('smarteditloader').requires.push('mockDataOverridesModule');
} catch (e) {}
try {
    angular.module('smarteditcontainer').requires.push('mockDataOverridesModule');
} catch (e) {}
