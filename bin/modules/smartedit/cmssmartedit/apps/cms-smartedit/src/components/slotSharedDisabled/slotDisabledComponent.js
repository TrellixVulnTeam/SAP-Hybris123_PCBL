/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular
    .module('slotDisabledDecoratorModule', ['yPopoverModule', 'cmsSmarteditServicesModule'])
    .controller('slotDisabledComponentController', function (
        $translate,
        catalogService,
        l10nFilter,
        cMSModesService,
        slotSharedService
    ) {
        var DEFAULT_DECORATOR_MSG = 'se.cms.sharedslot.decorator.label';
        var GLOBAL_SLOT_DECORATOR_MSG = 'se.cms.globalsharedslot.decorator.label';

        var DEFAULT_DECORATOR_MSG_VERSIONING_MODE = 'se.cms.versioning.shared.slot.from.label';
        var GLOBAL_SLOT_DECORATOR_MSG_VERSIONING_MODE =
            'se.cms.versioning.global.shared.slot.from.label';

        var ICONS_CLASSES = {
            GLOBE: 'hyicon-globe',
            LOCK: 'hyicon-lock',
            HOVERED: 'hyicon-linked'
        };

        this.$onInit = function () {
            this.isReady = false;
            this._getSourceCatalogName();
            this._isVersioningPerspectiveActive();

            slotSharedService
                .isGlobalSlot(
                    this.componentAttributes.smarteditComponentId,
                    this.componentAttributes.smarteditComponentType
                )
                .then(
                    function (value) {
                        this.isGlobalSlot = value;
                    }.bind(this)
                );
        };

        this._getSourceCatalogName = function () {
            var catalogVersionUUID = this.componentAttributes.smarteditCatalogVersionUuid;
            catalogService.getCatalogVersionByUuid(catalogVersionUUID).then(
                function (catalogVersion) {
                    this.catalogName = catalogVersion.catalogName;
                }.bind(this)
            );
        };

        this._isVersioningPerspectiveActive = function () {
            cMSModesService.isVersioningPerspectiveActive().then(
                function (isActive) {
                    this.isVersioningPerspective = isActive;
                    this.isReady = true;
                }.bind(this)
            );
        };

        this.getPopoverMessage = function () {
            var msgToLocalize;
            if (this.isVersioningPerspective) {
                msgToLocalize = this.isGlobalSlot
                    ? GLOBAL_SLOT_DECORATOR_MSG_VERSIONING_MODE
                    : DEFAULT_DECORATOR_MSG_VERSIONING_MODE;
            } else {
                msgToLocalize = this.isGlobalSlot
                    ? GLOBAL_SLOT_DECORATOR_MSG
                    : DEFAULT_DECORATOR_MSG;
            }

            var msgParams = {
                catalogName: l10nFilter(this.catalogName),
                slotId: this.componentAttributes.smarteditComponentId
            };
            return $translate.instant(msgToLocalize, msgParams);
        };

        this.getSlotIconClass = function () {
            var iconClass = '';
            if (this.active || this.isGlobalSlot !== undefined) {
                iconClass = this.isGlobalSlot ? ICONS_CLASSES.GLOBE : ICONS_CLASSES.HOVERED;
            }
            return iconClass;
        };

        this.getOuterSlotClass = function () {
            return this.getSlotIconClass() === ICONS_CLASSES.GLOBE
                ? 'disabled-shared-slot__icon--outer-globe'
                : '';
        }.bind(this);
    })
    .component('slotDisabledComponent', {
        templateUrl: 'slotDisabledTemplate.html',
        controller: 'slotDisabledComponentController',
        controllerAs: 'ctrl',
        bindings: {
            active: '=',
            componentAttributes: '<'
        }
    });
