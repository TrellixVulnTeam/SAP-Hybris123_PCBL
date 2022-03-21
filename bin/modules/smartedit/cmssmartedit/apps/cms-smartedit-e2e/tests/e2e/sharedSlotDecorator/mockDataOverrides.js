/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
angular
    .module('mockDataOverridesModule', ['backendMocksUtilsModule'])
    .run(function (httpBackendService) {
        httpBackendService
            .whenGET(
                /cmswebservices\/v1\/sites\/apparel-uk\/catalogs\/apparel-ukContentCatalog\/versions\/Staged\/pagescontentslots/
            )
            .respond(function () {
                var obj = {
                    pageContentSlotList: [
                        {
                            pageId: 'homepage',
                            position: 'topHeader',
                            slotId: 'topHeaderSlot',
                            slotShared: true,
                            slotStatus: 'TEMPLATE'
                        },
                        {
                            pageId: 'homepage',
                            position: 'bottomHeader',
                            slotId: 'bottomHeaderSlot',
                            slotShared: false,
                            slotStatus: 'OVERRIDE'
                        },
                        {
                            pageId: 'homepage',
                            position: 'footer',
                            slotId: 'footerSlot',
                            slotShared: true,
                            slotStatus: 'TEMPLATE'
                        },
                        {
                            pageId: 'homepage',
                            position: 'other',
                            slotId: 'otherSlot',
                            slotShared: false,
                            slotStatus: 'PAGE'
                        }
                    ]
                };
                return [200, obj];
            });
    });

try {
    angular.module('smarteditloader').requires.push('mockDataOverridesModule');
} catch (e) {}
try {
    angular.module('smarteditcontainer').requires.push('mockDataOverridesModule');
} catch (e) {}
