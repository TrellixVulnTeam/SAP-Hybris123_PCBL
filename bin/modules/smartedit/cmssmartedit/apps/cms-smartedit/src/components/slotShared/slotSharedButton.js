/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('slotSharedButtonModule', [
        'translationServiceModule',
        'smarteditServicesModule',
        'seConstantsModule',
        'hasOperationPermissionModule'
    ])
    .controller('slotSharedButtonController', function (
        slotSharedService,
        componentHandlerService,
        $q,
        $window,
        $translate,
        crossFrameEventService,
        catalogService,
        EVENT_OUTER_FRAME_CLICKED
    ) {
        this.buttonName = 'slotSharedButton';
        this.isPopupOpened = false;
        this.isPopupOpenedPreviousValue = false;

        this.$onInit = function () {
            this.isExternalSlot = componentHandlerService.isExternalComponent(
                this.slotId,
                this.componentAttributes.smarteditComponentType
            );

            $q.all([
                slotSharedService.isSlotShared(this.slotId),
                catalogService.isCurrentCatalogMultiCountry(),
                slotSharedService.isGlobalSlot(
                    this.slotId,
                    this.componentAttributes.smarteditComponentType
                )
            ]).then(
                function (values) {
                    /*
                     * isSlotShared -> Is slot shared by current content catalog version ?
                     * checks only slots on the page (both page and template slots but not multicountry external slots)
                     */
                    this.isSlotShared = values[0] || false;

                    // isMultiCountry -> Has the current site with current catalog have any parent catalog ?
                    this.isMultiCountry = values[1] || false;

                    // isMultiCountry && (isExternalSlot || (isCurrentPageFromParentCatalog && !isExternalSlot))
                    this.isGlobalSlot = values[2];

                    this.isSharedSlot =
                        !this.isMultiCountry && !this.isExternalSlot && this.isSlotShared;
                }.bind(this)
            );

            this.unregFn = crossFrameEventService.subscribe(
                EVENT_OUTER_FRAME_CLICKED,
                function () {
                    this.isPopupOpened = false;
                }.bind(this)
            );
        };

        this.$doCheck = function () {
            if (this.isPopupOpenedPreviousValue !== this.isPopupOpened) {
                this.setRemainOpen({
                    button: this.buttonName,
                    remainOpen: this.isPopupOpened
                });
                this.isPopupOpenedPreviousValue = this.isPopupOpened;
            }
        };

        this.getLabel = function () {
            return this.isGlobalSlot
                ? 'se.globalslot.decorator.label'
                : 'se.sharedslot.decorator.label';
        };

        this.getDescription = function () {
            var label = this.isGlobalSlot
                ? 'se.cms.slot.shared.global.popover.message'
                : 'se.cms.slot.shared.popover.message';
            return $translate.instant(label, {
                catalogVersion: this.componentAttributes.smarteditCatalogVersionUuid
            });
        };

        this.replaceSlot = function () {
            var promise;
            if (this.isGlobalSlot) {
                // MultiCountry scenario
                promise = slotSharedService.replaceGlobalSlot(this.componentAttributes);
            } else {
                // Non-multicountry scenario
                promise = slotSharedService.replaceSharedSlot(this.componentAttributes);
            }

            promise.then(
                function () {
                    this.isPopupOpened = false;
                    $window.location.reload();
                }.bind(this)
            );
        };

        this.$onDestroy = function () {
            this.unregFn();
        };
    })
    .component('slotSharedButton', {
        templateUrl: 'slotSharedButtonTemplate.html',
        controller: 'slotSharedButtonController',
        controllerAs: 'ctrl',
        bindings: {
            setRemainOpen: '&',
            slotId: '@',
            componentAttributes: '<'
        }
    });
