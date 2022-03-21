/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
angular
    .module('customViewModule', [
        'templateCacheDecoratorModule',
        'cmssmarteditContainerTemplates',
        'cmssmarteditContainerTemplates',
        'cmscommonsTemplates',
        'synchronizationMocksModule',
        'smarteditServicesModule'
    ])
    .constant('PATH_TO_CUSTOM_VIEW', '../e2e/synchronization/synchronizationPanel/customView.html')
    .controller('customViewController', function (restServiceFactory) {
        this.pageSyncConditions = {
            canSyncHomepage: true,
            pageHasUnavailableDependencies: false,
            pageHasSyncStatus: false,
            pageHasNoDepOrNoSyncStatus: false
        };

        this.itemId = 'homepage';
        this.getSyncStatus = function (itemId) {
            return restServiceFactory
                .get(
                    '/cmssmarteditwebservices/v1/sites/apparel-uk/catalogs/apparel-ukContentCatalog/versions/Staged/synchronizations/versions/Online/pages'
                )
                .getById(itemId)
                .then(
                    function (results) {
                        results.selectAll = 'se.cms.synchronization.page.select.all.slots';

                        this.syncStatus = results;
                        this.pageSyncConditions.pageHasUnavailableDependencies =
                            results.unavailableDependencies.length > 0;
                        this.pageSyncConditions.pageHasSyncStatus = !!results.lastSyncStatus;
                        this.pageSyncConditions.pageHasNoDepOrNoSyncStatus =
                            this.pageSyncConditions.pageHasUnavailableDependencies ||
                            !this.pageSyncConditions.pageHasSyncStatus;
                        return results;
                    }.bind(this)
                );
        }.bind(this);

        this.performSync = function (array) {
            return restServiceFactory
                .get(
                    '/cmssmarteditwebservices/v1/sites/apparel-uk/catalogs/apparel-ukContentCatalog/versions/Staged/synchronizations/versions/Online/items'
                )
                .save({
                    items: array
                });
        };
    });
angular.module('smarteditcontainer').requires.push('customViewModule');
