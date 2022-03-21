/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
angular.module('customMocksModule', ['backendMocksUtilsModule']).run((httpBackendService) => {
    const componentTypes = [
        {
            category: 'COMPONENT',
            code: 'SimpleBannerComponent',
            i18nKey: 'type.simplebannercomponent.name',
            name: 'Simple Banner Component'
        }
    ];

    httpBackendService.whenGET(/smartedit\/settings/).respond({
        'smartedit.validImageMimeTypeCodes': [
            'FFD8FFDB',
            'FFD8FFE0',
            'FFD8FFE1',
            'FFD8FFED',
            '474946383761',
            '474946383961',
            '424D',
            '49492A00',
            '4D4D002A',
            '89504E470D0A1A0A'
        ]
    });

    httpBackendService
        .whenGET(
            /cmssmarteditwebservices\/v1\/catalogs\/apparel-ukContentCatalog\/versions\/Staged\/pages\/homepage\/types((?!\/).)*$/
        )
        .respond(() => {
            return [
                200,
                {
                    pagination: {
                        totalCount: componentTypes.length
                    },
                    results: componentTypes
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
