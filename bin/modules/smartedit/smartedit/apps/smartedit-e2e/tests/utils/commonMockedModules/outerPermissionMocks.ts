/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';
import { moduleUtils, HttpBackendService } from 'smarteditcommons';

@NgModule({
    providers: [
        moduleUtils.initialize(
            (httpBackendService: HttpBackendService) => {
                httpBackendService
                    .whenPOST(
                        /permissionswebservices\/v1\/permissions\/catalogs\/search\?catalogId=toysContentCatalog&catalogVersion=Online/
                    )
                    .respond({
                        permissionsList: [
                            {
                                catalogId: 'toysContentCatalog',
                                catalogVersion: 'Online',
                                permissions: [
                                    {
                                        key: 'read',
                                        value: 'true'
                                    },
                                    {
                                        key: 'write',
                                        value: 'false'
                                    }
                                ],
                                syncPermissions: [{}]
                            }
                        ]
                    });

                httpBackendService
                    .whenPOST(
                        /permissionswebservices\/v1\/permissions\/catalogs\/search\?catalogId=actionFiguresContentCatalog&catalogVersion=Online/
                    )
                    .respond({
                        permissionsList: [
                            {
                                catalogId: 'actionFiguresContentCatalog',
                                catalogVersion: 'Online',
                                permissions: [
                                    {
                                        key: 'read',
                                        value: 'true'
                                    },
                                    {
                                        key: 'write',
                                        value: 'false'
                                    }
                                ],
                                syncPermissions: [{}]
                            }
                        ]
                    });

                httpBackendService
                    .whenPOST(
                        /permissionswebservices\/v1\/permissions\/catalogs\/search\?catalogId=electronicsContentCatalog&catalogVersion=Online/
                    )
                    .respond({
                        permissionsList: [
                            {
                                catalogId: 'electronicsContentCatalog',
                                catalogVersion: 'Online',
                                permissions: [
                                    {
                                        key: 'read',
                                        value: 'true'
                                    },
                                    {
                                        key: 'write',
                                        value: 'true'
                                    }
                                ],
                                syncPermissions: [{}]
                            }
                        ]
                    });

                httpBackendService
                    .whenPOST(
                        /permissionswebservices\/v1\/permissions\/catalogs\/search\?catalogId=electronicsContentCatalog&catalogVersion=Staged/
                    )
                    .respond({
                        permissionsList: [
                            {
                                catalogId: 'electronicsContentCatalog',
                                catalogVersion: 'Staged',
                                permissions: [
                                    {
                                        key: 'read',
                                        value: 'true'
                                    },
                                    {
                                        key: 'write',
                                        value: 'true'
                                    }
                                ],
                                syncPermissions: [
                                    {
                                        canSynchronize: true,
                                        targetCatalogVersion: 'Online'
                                    }
                                ]
                            }
                        ]
                    });

                httpBackendService
                    .whenPOST(
                        /permissionswebservices\/v1\/permissions\/catalogs\/search\?catalogId=apparel-ukContentCatalog&catalogVersion=Online/
                    )
                    .respond({
                        permissionsList: [
                            {
                                catalogId: 'apparel-ukContentCatalog',
                                catalogVersion: 'Online',
                                permissions: [
                                    {
                                        key: 'read',
                                        value: 'true'
                                    },
                                    {
                                        key: 'write',
                                        value: 'true'
                                    }
                                ],
                                syncPermissions: [{}]
                            }
                        ]
                    });

                httpBackendService
                    .whenPOST(
                        /permissionswebservices\/v1\/permissions\/catalogs\/search\?catalogId=apparel-ukContentCatalog&catalogVersion=Staged/
                    )
                    .respond({
                        permissionsList: [
                            {
                                catalogId: 'apparel-ukContentCatalog',
                                catalogVersion: 'Staged',
                                permissions: [
                                    {
                                        key: 'read',
                                        value: 'true'
                                    },
                                    {
                                        key: 'write',
                                        value: 'true'
                                    }
                                ],
                                syncPermissions: [
                                    {
                                        canSynchronize: true,
                                        targetCatalogVersion: 'Online'
                                    }
                                ]
                            }
                        ]
                    });

                httpBackendService
                    .whenPOST(/permissionswebservices\/v1\/permissions\/global\/search/)
                    .respond(function (method, url, data) {
                        const user = getUserFromData(data);
                        if (user === 'admin') {
                            return [
                                200,
                                {
                                    id: 'global',
                                    permissions: [
                                        {
                                            key: 'smartedit.configurationcenter.read',
                                            value: 'true'
                                        }
                                    ]
                                }
                            ];
                        } else {
                            return [
                                200,
                                {
                                    id: 'global',
                                    permissions: [
                                        {
                                            key: 'smartedit.configurationcenter.read',
                                            value: 'false'
                                        }
                                    ]
                                }
                            ];
                        }
                    });

                function getUserFromData(data: any) {
                    return data ? JSON.parse(data).principalUid : '';
                }
            },
            [HttpBackendService]
        )
    ]
})
export class OuterPermissionMocks {}

window.pushModules(OuterPermissionMocks);
