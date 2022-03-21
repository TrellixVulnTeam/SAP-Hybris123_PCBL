/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('slotSyncButtonModule', ['seConstantsModule', 'cmsComponentsModule'])
    .controller('slotSyncButtonController', function (
        $scope,
        $translate,
        SYNCHRONIZATION_POLLING,
        SYNCHRONIZATION_STATUSES,
        EVENT_OUTER_FRAME_CLICKED,
        slotSynchronizationService,
        pageInfoService,
        crossFrameEventService
    ) {
        $scope.$watch(
            'ctrl.isPopupOpened',
            function () {
                this.setRemainOpen({
                    button: this.buttonName,
                    remainOpen: this.isPopupOpened
                });
            }.bind(this)
        );

        this.statusIsInSync = function (syncStatus) {
            return syncStatus.status && syncStatus.status === SYNCHRONIZATION_STATUSES.IN_SYNC;
        };

        this.getSyncStatus = function () {
            pageInfoService.getPageUUID().then(
                function (pageUUID) {
                    slotSynchronizationService.getSyncStatus(pageUUID, this.slotId).then(
                        function (syncStatus) {
                            if (slotSynchronizationService.syncStatusExists(syncStatus)) {
                                this.isSlotInSync = this.statusIsInSync(syncStatus);
                                this.newSlotIsNotSynchronized = this._slotHasBeenSynchronizedAtLeastOnce(
                                    syncStatus
                                );
                                this.slotIsShared = syncStatus.fromSharedDependency;

                                this.ready = true;
                            } else {
                                this.ready = false;
                            }
                        }.bind(this)
                    );
                }.bind(this)
            );
        }.bind(this);

        /**
         * Verifies whether the sync status indicates that the slot was synchronized at least once.
         * @param syncStatus - the sync status to verify
         * @returns {boolean} - true if the slot has been synchronized at least once, false otherwise.
         * @private
         */
        this._slotHasBeenSynchronizedAtLeastOnce = function (syncStatus) {
            return !syncStatus.lastSyncStatus;
        };

        this.$onInit = function () {
            this.buttonName = 'slotSyncButton';
            this.isPopupOpened = false;
            this.newSlotIsNotSynchronized = false;
            this.slotIsShared = false;
            this.ready = false;
            this.isSlotInSync = true;

            this.getSyncStatus();

            this.newLocalSlotIsNotSynchronizedTemplate =
                "<div class='se-popover--inner-content'>" +
                $translate.instant('se.cms.slot.sync.from.catalog.level') +
                '</div>';

            this.newCustomSlotIsNotSynchronizedTemplate =
                "<div class='se-popover--inner-content'>" +
                $translate.instant('se.cms.slot.sync.from.page.level') +
                '</div>';

            this.unRegisterSyncPolling = crossFrameEventService.subscribe(
                SYNCHRONIZATION_POLLING.FAST_FETCH,
                this.getSyncStatus
            );

            this.unregFn = crossFrameEventService.subscribe(
                EVENT_OUTER_FRAME_CLICKED,
                function () {
                    this.isPopupOpened = false;
                }.bind(this)
            );
        };

        this.$onDestroy = function () {
            this.unRegisterSyncPolling();
            this.unregFn();
        };
    })
    .component('slotSyncButton', {
        templateUrl: 'slotSyncButtonTemplate.html',
        controller: 'slotSyncButtonController',
        controllerAs: 'ctrl',
        bindings: {
            setRemainOpen: '&',
            slotId: '@'
        }
    });
