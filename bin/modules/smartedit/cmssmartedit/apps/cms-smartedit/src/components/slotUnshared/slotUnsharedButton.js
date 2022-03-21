/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('slotUnsharedButtonModule', [
        'translationServiceModule',
        'confirmationModalServiceModule',
        'smarteditServicesModule',
        'seConstantsModule',
        'hasOperationPermissionModule'
    ])
    .controller('slotUnsharedButtonController', function (
        $scope,
        $q,
        $window,
        $translate,
        EVENT_OUTER_FRAME_CLICKED,
        slotUnsharedService,
        confirmationModalService,
        crossFrameEventService,
        componentHandlerService,
        catalogService,
        sharedDataService
    ) {
        this.revertBackSlot = function () {
            var message = {
                title: this.getRevertBackLinkLabel(),
                templateUrl: 'revertBackSlotConfirmationTemplate.html'
            };

            confirmationModalService.confirm(message).then(
                function () {
                    slotUnsharedService
                        .revertToSharedSlot(this.componentAttributes.smarteditComponentUuid)
                        .then(
                            function () {
                                this.isPopupOpened = false;
                                $window.location.reload();
                            }.bind(this)
                        );
                }.bind(this)
            );
        };

        this.$onInit = function () {
            this.buttonName = 'slotUnsharedButton';
            this.isPopupOpened = false;
            this.isPopupOpenedOldValue = this.isPopupOpened;

            this.isExternalSlot = componentHandlerService.isExternalComponent(
                this.slotId,
                this.componentAttributes.smarteditComponentType
            );

            $q.all([
                slotUnsharedService.isSlotShared(this.slotId),
                catalogService.isCurrentCatalogMultiCountry(),
                slotUnsharedService.isSlotUnshared(this.slotId),
                sharedDataService.get('experience')
            ]).then(
                function (values) {
                    /*
                     * isSlotShared -> Is slot shared by current content catalog version ?
                     * checks only slots on the page (both page and template slots but not multicountry external slots)
                     */
                    this.isSlotShared = values[0] || false;

                    // isMultiCountry -> Has the current site with current catalog have any parent catalog ?
                    this.isMultiCountry = values[1] || false;

                    // isSlotUnshared -> Is the slot status OVERRIDE ?
                    this.isSlotUnshared = values[2];

                    // isCurrentPageFromParent -> Is the current page from the parent catalog ?
                    var experience = values[3];
                    var pageContextCatalogVersionUuid =
                        experience &&
                        experience.pageContext &&
                        experience.pageContext.catalogVersionUuid
                            ? experience.pageContext.catalogVersionUuid
                            : '';
                    var catalogDescriptorCatalogVersionUuid =
                        experience &&
                        experience.catalogDescriptor &&
                        experience.catalogDescriptor.catalogVersionUuid
                            ? experience.catalogDescriptor.catalogVersionUuid
                            : '';
                    this.isCurrentPageFromParent =
                        catalogDescriptorCatalogVersionUuid !== pageContextCatalogVersionUuid;
                }.bind(this)
            );

            this.unregFn = crossFrameEventService.subscribe(
                EVENT_OUTER_FRAME_CLICKED,
                function () {
                    this.isPopupOpened = false;
                }.bind(this)
            );
        };

        this.isLocalSlot = function () {
            return (
                this.isMultiCountry &&
                !this.isExternalSlot &&
                !this.isCurrentPageFromParent &&
                this.isSlotShared
            );
        };

        this.isCustomSlot = function () {
            return !this.isExternalSlot && !this.isSlotShared && this.isSlotUnshared;
        };

        this.getLabel = function () {
            return this.isLocalSlot()
                ? 'se.localslot.decorator.label'
                : 'se.customslot.decorator.label';
        };

        this.getRevertBackLinkLabel = function () {
            return $translate.instant('se.cms.slot.shared.revert.back.title', {
                slotType: this.isMultiCountry ? 'Global' : 'Shared'
            });
        };

        this.$doCheck = function () {
            if (this.isPopupOpenedOldValue !== this.isPopupOpened) {
                this.isPopupOpenedOldValue = this.isPopupOpened;
                this.setRemainOpen({
                    button: this.buttonName,
                    remainOpen: this.isPopupOpened
                });
            }
        };

        this.$onDestroy = function () {
            this.unregFn();
        };
    })
    .component('slotUnsharedButton', {
        templateUrl: 'slotUnsharedButtonTemplate.html',
        controller: 'slotUnsharedButtonController',
        controllerAs: 'ctrl',
        bindings: {
            setRemainOpen: '&',
            slotId: '@',
            componentAttributes: '<'
        }
    });
