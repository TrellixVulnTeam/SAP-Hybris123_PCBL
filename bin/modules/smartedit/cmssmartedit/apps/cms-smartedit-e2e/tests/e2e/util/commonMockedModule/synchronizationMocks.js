/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
angular
    .module('synchronizationMocksModule', ['yLoDashModule'])
    .run(function (httpBackendService, $window, lodash) {
        /// ///////////////////////////////PAGE SYNC///////////////////////////////////////////////////////////
        var currentSyncJob = {
            creationDate: '2016-01-29T16:25:28',
            syncStatus: 'FINISHED',
            endDate: '2016-01-29T16:25:28',
            lastModifiedDate: '2016-01-29T16:25:28',
            syncResult: 'SUCCESS',
            startDate: '2016-01-29T16:25:28',
            sourceCatalogVersion: 'Staged',
            targetCatalogVersion: 'Online'
        };

        function getSyncTargetVersionsPayload() {
            var syncResult = $window.localStorage.syncResult;
            if (syncResult) {
                if (syncResult === 'Failed') {
                    currentSyncJob.syncStatus = 'FAILURE';
                    currentSyncJob.syncResult = 'FAILURE';
                } else if (syncResult === 'Finished') {
                    currentSyncJob.syncStatus = 'FINISHED';
                    currentSyncJob.syncResult = 'SUCCESS';
                }

                $window.localStorage.syncResult = 'ACK';
            }

            return [200, currentSyncJob];
        }

        httpBackendService
            .whenGET(
                /cmswebservices\/v1\/catalogs\/apparel-ukContentCatalog\/synchronizations\/targetversions\/Online/
            )
            .respond(function () {
                return getSyncTargetVersionsPayload();
            });

        httpBackendService
            .whenGET(
                /cmswebservices\/v1\/catalogs\/apparelContentCatalog\/synchronizations\/targetversions\/Online/
            )
            .respond(function () {
                return getSyncTargetVersionsPayload();
            });

        httpBackendService
            .whenGET(
                /cmswebservices\/v1\/catalogs\/apparel-ukContentCatalog\/versions\/Staged\/synchronizations\/versions\/Online/
            )
            .respond(function () {
                return [200, currentSyncJob];
            });

        httpBackendService
            .whenGET(
                /cmswebservices\/v1\/catalogs\/apparelContentCatalog\/versions\/Staged\/synchronizations\/versions\/Online/
            )
            .respond(function () {
                return [200, currentSyncJob];
            });

        httpBackendService
            .whenPOST(
                /cmswebservices\/v1\/catalogs\/apparel-ukContentCatalog\/versions\/Staged\/synchronizations\/versions\/Online/
            )
            .respond(function () {
                currentSyncJob.syncStatus = 'RUNNING';
                currentSyncJob.syncResult = 'UNKNOWN';
                return [200, currentSyncJob];
            });
    });

try {
    angular.module('smarteditloader').requires.push('synchronizationMocksModule');
} catch (e) {}
try {
    angular.module('smarteditcontainer').requires.push('synchronizationMocksModule');
} catch (e) {}
