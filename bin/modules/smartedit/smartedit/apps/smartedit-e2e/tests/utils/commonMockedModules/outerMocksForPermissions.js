/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('e2ePermissionsMocks', []).run(function (httpBackendService) {
    httpBackendService.whenPOST(/permissionswebservices\/v1\/permissions/).respond({
        id: 'global',
        permissions: [
            {
                key: 'smartedit.configurationcenter.read',
                value: 'true'
            }
        ]
    });
});

angular.module('smarteditloader').requires.push('e2ePermissionsMocks');
angular.module('smarteditcontainer').requires.push('e2ePermissionsMocks');
