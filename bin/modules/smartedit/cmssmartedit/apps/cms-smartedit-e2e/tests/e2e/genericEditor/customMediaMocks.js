/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('customMediaMocksModule', ['backendMocksUtilsModule'])
    .run(function (httpBackendService) {
        httpBackendService.whenGET(/smartedit\/settings/).respond({
            'smartedit.validImageMimeTypeCodes': [
                'FFD8FFDB',
                'FFD8FFE0',
                'FFD8FFE1',
                '474946383761',
                '474946383961',
                '424D',
                '49492A00',
                '4D4D002A',
                '89504E470D0A1A0A'
            ]
        });
        httpBackendService
            .whenPOST(
                /permissionswebservices\/v1\/permissions\/types\/search\?permissionNames=create,change,read,remove&types=(.*)/
            )
            .respond({
                permissionsList: [
                    {
                        id: 'MediaContainer',
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
                        id: 'MediaFormat',
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
                    }
                ]
            });
    });
try {
    angular.module('smarteditloader').requires.push('customMediaMocksModule');
} catch (e) {}
try {
    angular.module('smarteditcontainer').requires.push('customMediaMocksModule');
} catch (e) {}
